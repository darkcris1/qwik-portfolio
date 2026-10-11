-- Which BLOG_TOPICS entry an AI post covers. Run this once in the Supabase SQL editor.
alter table public.posts add column if not exists topic text;
