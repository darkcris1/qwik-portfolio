import type { SupabaseClient } from "@supabase/supabase-js";
import { FilterXSS } from "xss";

export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string;
}

export interface Post extends PostSummary {
  content_html: string;
  og_image_url: string | null;
  created_at: string;
}

export interface PostInput {
  title: string;
  slug: string;
  description: string;
  content_html: string;
  og_image_url: string | null;
  status: "draft" | "published";
}

const SUMMARY_COLUMNS = "id, slug, title, description, status, published_at, updated_at";

export const listPublishedPosts = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase
    .from("posts")
    .select(`${SUMMARY_COLUMNS}, content_html`)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data as (PostSummary & { content_html: string })[];
};

// Titles and dates only, for the sitemap and RSS feed.
export const listPublishedPostMeta = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase
    .from("posts")
    .select(SUMMARY_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data as PostSummary[];
};

export const getPublishedPost = async (supabase: SupabaseClient, slug: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return data as Post | null;
};

export const listAllPosts = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase
    .from("posts")
    .select(SUMMARY_COLUMNS)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data as PostSummary[];
};

export const getPostById = async (supabase: SupabaseClient, id: string) => {
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as Post | null;
};

// Inserts or updates a post; published_at is stamped the first time it goes live.
export const savePost = async (supabase: SupabaseClient, input: PostInput, id?: string) => {
  const existing = id ? await getPostById(supabase, id) : null;
  const published_at =
    input.status === "published" ? (existing?.published_at ?? new Date().toISOString()) : existing?.published_at ?? null;
  const row = { ...input, content_html: sanitizePostHtml(input.content_html), published_at };

  const query = id
    ? supabase.from("posts").update(row).eq("id", id).select("id").single()
    : supabase.from("posts").insert(row).select("id").single();
  return query;
};

export const deletePost = async (supabase: SupabaseClient, id: string) => {
  return supabase.from("posts").delete().eq("id", id);
};

const htmlFilter = new FilterXSS({
  whiteList: {
    p: [],
    br: [],
    hr: [],
    h2: [],
    h3: [],
    h4: [],
    strong: [],
    b: [],
    em: [],
    i: [],
    u: [],
    s: [],
    a: ["href", "title", "target"],
    ul: [],
    ol: ["start"],
    li: [],
    blockquote: [],
    pre: [],
    code: ["class"],
    img: ["src", "alt", "title"],
  },
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "style", "iframe", "object"],
});

// Strips anything outside the editor's formatting and makes links safe to open.
export const sanitizePostHtml = (html: string) =>
  htmlFilter.process(html).replace(/<a /g, '<a rel="noopener noreferrer" ');

export const readingMinutes = (html: string) => {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

export const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";
