-- Run in Supabase SQL Editor. Enable RLS and scope all data to the authenticated owner.
create extension if not exists pgcrypto;
create table if not exists public.projects (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 domain text not null, label text, created_at timestamptz not null default now(), unique(user_id, domain)
);
create table if not exists public.analysis_runs (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
 provider text not null, country_code text, report jsonb not null, created_at timestamptz not null default now()
);
create table if not exists public.competitors (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
 domain text not null, created_at timestamptz not null default now(), unique(project_id, domain)
);
create table if not exists public.tracked_keywords (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
 keyword text not null, country_code text not null default 'US', device text not null default 'desktop', created_at timestamptz not null default now(), unique(project_id, keyword, country_code, device)
);
create table if not exists public.keyword_snapshots (
 id uuid primary key default gen_random_uuid(), tracked_keyword_id uuid not null references public.tracked_keywords(id) on delete cascade,
 position numeric, search_volume integer, serp_url text, captured_at timestamptz not null default now()
);
alter table public.projects enable row level security;
alter table public.analysis_runs enable row level security;
alter table public.competitors enable row level security;
alter table public.tracked_keywords enable row level security;
alter table public.keyword_snapshots enable row level security;
create policy "owners manage projects" on public.projects for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owners manage analysis" on public.analysis_runs for all using (exists(select 1 from public.projects p where p.id=project_id and p.user_id=auth.uid())) with check (exists(select 1 from public.projects p where p.id=project_id and p.user_id=auth.uid()));
create policy "owners manage competitors" on public.competitors for all using (exists(select 1 from public.projects p where p.id=project_id and p.user_id=auth.uid())) with check (exists(select 1 from public.projects p where p.id=project_id and p.user_id=auth.uid()));
create policy "owners manage keywords" on public.tracked_keywords for all using (exists(select 1 from public.projects p where p.id=project_id and p.user_id=auth.uid())) with check (exists(select 1 from public.projects p where p.id=project_id and p.user_id=auth.uid()));
create policy "owners manage snapshots" on public.keyword_snapshots for all using (exists(select 1 from public.tracked_keywords k join public.projects p on p.id=k.project_id where k.id=tracked_keyword_id and p.user_id=auth.uid())) with check (exists(select 1 from public.tracked_keywords k join public.projects p on p.id=k.project_id where k.id=tracked_keyword_id and p.user_id=auth.uid()));
