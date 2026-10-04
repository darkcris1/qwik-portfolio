import type { RequestEventAction, z as zod } from "@qwik.dev/router";
import { savePost } from "./posts";
import { slugify } from "./slug";
import { createSupabase } from "./supabase";

// Field rules for the post editor form.
export const postFields = (z: typeof zod) => ({
  title: z.string().trim().min(1, "Add a title").max(200, "Keep the title under 200 characters"),
  slug: z
    .string()
    .trim()
    .max(80, "Keep the slug under 80 characters")
    .regex(/^([a-z0-9]+(-[a-z0-9]+)*)?$/, "Use lowercase letters, numbers and single dashes"),
  description: z.string().trim().max(300, "Keep the description under 300 characters"),
  content_html: z.string().max(500_000, "The post is too long"),
  og_image_url: z
    .string()
    .trim()
    .refine((v) => v === "" || /^https?:\/\/\S+$/.test(v), "Use a full http(s) image URL"),
  status: z.enum(["draft", "published"]),
});

type PostFormData = zod.infer<zod.ZodObject<ReturnType<typeof postFields>>>;

export const handleSavePost = async (data: PostFormData, requestEv: RequestEventAction, id?: string) => {
  const slug = data.slug || slugify(data.title);
  if (!slug) {
    return requestEv.fail(400, { fieldErrors: { slug: "Add a slug with letters or numbers" } as Record<string, string> });
  }

  const { data: saved, error } = await savePost(
    createSupabase(requestEv),
    {
      title: data.title,
      slug,
      description: data.description,
      content_html: data.content_html,
      og_image_url: data.og_image_url || null,
      status: data.status,
    },
    id,
  );

  if (error) {
    if (error.code === "23505") {
      return requestEv.fail(400, { fieldErrors: { slug: "Another post already uses this slug" } as Record<string, string> });
    }
    return requestEv.fail(500, { message: error.message });
  }

  return { id: saved.id as string, slug, status: data.status };
};

export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
