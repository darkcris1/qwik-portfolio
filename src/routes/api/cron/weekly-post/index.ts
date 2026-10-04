import type { RequestHandler } from "@qwik.dev/router";
import { savePost } from "~/lib/posts";
import { slugify } from "~/lib/slug";
import { createServiceSupabase } from "~/lib/supabase";

interface GeneratedPost {
  title: string;
  description: string;
  content_html: string;
}

const SYSTEM_PROMPT =
  "You write blog posts for the personal site of Cris Fandiño, a full stack developer who works with " +
  "Django, Python, TypeScript, Svelte, React, Qwik, PostgreSQL, AWS, Terraform, Docker and Claude Code. " +
  "Write practical, first-person posts for other developers: one focused idea, real code examples, no fluff. " +
  "Title under 100 characters. Description is one or two sentences under 280 characters. " +
  "content_html is 600 to 900 words using only p, h2, h3, ul, ol, li, strong, em, a, blockquote, pre and code tags. " +
  "HTML-escape <, > and & inside pre and code blocks. Do not repeat the title as a heading.";

const generatePost = async (apiKey: string, model: string, recentTitles: string): Promise<GeneratedPost> => {
  const today = new Date().toISOString().slice(0, 10);
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [
        {
          role: "user",
          parts: [{ text: `Write today's post (${today}). Pick a topic not covered by these recent posts:\n${recentTitles}` }],
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
        // Skip thinking so the reply lands inside Vercel's edge time limit.
        thinkingConfig: { thinkingBudget: 0 },
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

// Called once a week by .github/workflows/weekly-post.yml.
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

  try {
    const supabase = createServiceSupabase(requestEv);
    const status = env.get("POST_STATUS") === "published" ? "published" : "draft";

    // Recent titles go into the prompt so topics don't repeat.
    const { data: recent, error: recentError } = await supabase
      .from("posts")
      .select("title")
      .order("created_at", { ascending: false })
      .limit(50);
    if (recentError) throw recentError;
    const recentTitles = recent.map((p) => `- ${p.title}`).join("\n") || "(none yet)";

    const post = await generatePost(apiKey, env.get("GEMINI_MODEL") || "gemini-2.5-flash", recentTitles);
    const baseSlug = slugify(post.title) || `post-${Date.now()}`;
    const input = {
      title: post.title.slice(0, 200),
      slug: baseSlug,
      description: post.description.slice(0, 300),
      content_html: post.content_html,
      og_image_url: null,
      status,
    } as const;

    let { data, error } = await savePost(supabase, input);
    if (error?.code === "23505") {
      // Slug already taken, so tack the date on.
      const dated = `${baseSlug.slice(0, 69).replace(/-+$/, "")}-${new Date().toISOString().slice(0, 10)}`;
      ({ data, error } = await savePost(supabase, { ...input, slug: dated }));
    }
    if (error) throw error;

    json(200, { ok: true, id: data?.id, title: post.title, status });
  } catch (err) {
    console.error("Weekly post failed", err);
    json(500, { error: err instanceof Error ? err.message : String(err) });
  }
};
