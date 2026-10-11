import type { RequestHandler } from "@qwik.dev/router";
import { BLOG_TOPICS } from "~/lib/blog-topics";
import { savePost } from "~/lib/posts";
import { slugify } from "~/lib/slug";
import { createServiceSupabase } from "~/lib/supabase";

interface GeneratedPost {
  title: string;
  description: string;
  content_html: string;
}

const SYSTEM_PROMPT =
  "You write blog posts for the personal site of Cris Fandiño, a full stack developer. " +
  "Each post covers only the one topic you're given; don't drift into other tools or subjects. " +
  "Write practical, first-person posts for other developers: one focused idea, real code or config examples where they fit, no fluff. " +
  "He has built web apps since 2021 with Django, Python, TypeScript, Angular, React, Svelte, Qwik, PostgreSQL, AWS, Terraform and Docker. " +
  "Don't invent employers, clients, team names, metrics, dates or personal history; when you lack a fact, speak in general terms. " +
  "Title under 100 characters. Description is one or two sentences under 280 characters. " +
  "content_html is 600 to 900 words using only p, h2, h3, ul, ol, li, strong, em, a, blockquote, pre and code tags. " +
  "HTML-escape <, > and & inside pre and code blocks. Do not repeat the title as a heading.";

const generatePost = async (apiKey: string, model: string, topic: string, pastTitles: string): Promise<GeneratedPost> => {
  const today = new Date().toISOString().slice(0, 10);
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                `Write today's post (${today}) about this topic only: ${topic}\n` +
                `Pick an angle not already covered by these earlier posts on it:\n${pastTitles}`,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            description: { type: "STRING" },
            content_html: { type: "STRING" },
          },
          required: ["title", "description", "content_html"],
        },
        // Keep thinking low so the reply lands inside Vercel's edge time limit.
        thinkingConfig: { thinkingLevel: "low" },
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Gemini returned ${res.status}: ${await res.text()}`);
  }
  const body = await res.json();
  const text = body?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error(`Gemini gave no content (finishReason: ${body?.candidates?.[0]?.finishReason})`);
  }
  const post = JSON.parse(text) as GeneratedPost;
  if (!post.title || !post.description || !post.content_html) {
    throw new Error("Gemini reply is missing a title, description or content");
  }
  return post;
};

// Called every 3 days by .github/workflows/weekly-post.yml; kept out of /api since Vercel sends that to the root api/ folder.
export const onPost: RequestHandler = async (requestEv) => {
  const { env, request, json } = requestEv;
  const secret = env.get("CRON_SECRET");
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    throw json(401, { error: "unauthorized" });
  }

  const apiKey = env.get("GEMINI_API_KEY");
  if (!apiKey) {
    throw json(500, { error: "GEMINI_API_KEY is not set" });
  }

  // Gemini often takes longer than Edge's 25s first-byte limit, so send spaces while it works.
  requestEv.headers.set("content-type", "application/json");
  const writer = requestEv.getWritableStream().getWriter();
  const encoder = new TextEncoder();
  await writer.write(encoder.encode(" "));
  const heartbeat = setInterval(() => writer.write(encoder.encode(" ")).catch(() => {}), 10_000);

  let result: Record<string, unknown> | undefined;
  try {
    const supabase = createServiceSupabase(requestEv);
    const status = env.get("POST_STATUS")?.trim().toLowerCase() === "draft" ? "draft" : "published";
    if (BLOG_TOPICS.length === 0) throw new Error("BLOG_TOPICS is empty");

    const { data: past, error: pastError } = await supabase
      .from("posts")
      .select("title, topic, created_at")
      .not("topic", "is", null)
      .order("created_at", { ascending: false });
    if (pastError) throw pastError;

    // Newest post date per topic; a topic with no posts yet goes first, otherwise the stalest one.
    const lastUsed = new Map<string, string>();
    for (const p of past) if (!lastUsed.has(p.topic)) lastUsed.set(p.topic, p.created_at);
    const topic =
      BLOG_TOPICS.find((t) => !lastUsed.has(t)) ??
      [...BLOG_TOPICS].sort((a, b) => lastUsed.get(a)!.localeCompare(lastUsed.get(b)!))[0];
    const pastTitles =
      past
        .filter((p) => p.topic === topic)
        .map((p) => `- ${p.title}`)
        .join("\n") || "(none yet)";

    const post = await generatePost(apiKey, env.get("GEMINI_MODEL") || "gemini-3.8-flash", topic, pastTitles);
    const baseSlug = slugify(post.title) || `post-${Date.now()}`;
    const input = {
      title: post.title.slice(0, 200),
      slug: baseSlug,
      description: post.description.slice(0, 300),
      content_html: post.content_html,
      og_image_url: null,
      status,
      topic,
    } as const;

    let { data, error } = await savePost(supabase, input);
    if (error?.code === "23505") {
      // Slug already taken, so tack the date on.
      const dated = `${baseSlug.slice(0, 69).replace(/-+$/, "")}-${new Date().toISOString().slice(0, 10)}`;
      ({ data, error } = await savePost(supabase, { ...input, slug: dated }));
    }
    if (error) throw error;

    result = { ok: true, id: data?.id, title: post.title, topic, status };
  } catch (err) {
    console.error("Scheduled post failed", err);
    // Supabase errors are plain objects with a message, not Error instances.
    const raw = typeof err === "object" && err && "message" in err ? err.message : undefined;
    const message = typeof raw === "string" && raw ? raw : err instanceof Object ? JSON.stringify(err) : String(err);
    result = { ok: false, error: message };
  } finally {
    clearInterval(heartbeat);
    // The status is already 200 once streaming starts, so callers check "ok" instead.
    const body = result ?? { ok: false, error: "Unexpected failure while building the result" };
    await writer.write(encoder.encode(JSON.stringify(body))).catch(() => {});
    await writer.close().catch(() => {});
  }
};
