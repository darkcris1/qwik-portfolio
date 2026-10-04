-- Blog posts. Run this once in the Supabase SQL editor.

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 200),
  description text not null default '' check (char_length(description) <= 300),
  content_html text not null default '',
  og_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_status_published_at_idx
  on public.posts (status, published_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

alter table public.posts enable row level security;

-- Anyone can read posts that are published and not scheduled for later.
drop policy if exists "Published posts are public" on public.posts;
create policy "Published posts are public"
  on public.posts for select
  to anon, authenticated
  using (status = 'published' and published_at <= now());

-- Only the site owner can read drafts and write posts.
drop policy if exists "Owner manages posts" on public.posts;
create policy "Owner manages posts"
  on public.posts for all
  to authenticated
  using ((auth.jwt() ->> 'email') = 'sircnujnuj@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'sircnujnuj@gmail.com');
