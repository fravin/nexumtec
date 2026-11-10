create type public.app_role as enum ('admin', 'moderator', 'user');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

create policy "Users can view their own roles"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid());

create policy "Users can create their own profile"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "Users can delete their own profile"
on public.profiles
for delete
to authenticated
using (id = auth.uid());

create table public.website_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  kind text not null default 'demo',
  section text not null default 'general',
  category text not null,
  segment text,
  format text,
  description text not null default '',
  features text[] not null default '{}',
  image_url text not null,
  mobile_image_url text,
  project_url text,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint website_projects_kind_check check (kind in ('demo', 'real')),
  constraint website_projects_section_check check (section in ('general', 'health'))
);

grant select on public.website_projects to anon;
grant select, insert, update, delete on public.website_projects to authenticated;
grant all on public.website_projects to service_role;

alter table public.website_projects enable row level security;

create policy "Published projects are publicly visible"
on public.website_projects
for select
to anon, authenticated
using (published = true or public.has_role(auth.uid(), 'admin'));

create policy "Admins can create website projects"
on public.website_projects
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update website projects"
on public.website_projects
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete website projects"
on public.website_projects
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_website_projects_updated_at
before update on public.website_projects
for each row execute function public.set_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;

  if new.email_confirmed_at is not null and lower(new.email) = 'flavio.de.souza10@gmail.com' then
    insert into public.user_roles (user_id, role)
    values (new.id, 'admin')
    on conflict (user_id, role) do nothing;
  end if;

  return new;
end;
$$;

create or replace function public.sync_verified_admin_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email_confirmed_at is not null and lower(new.email) = 'flavio.de.souza10@gmail.com' then
    insert into public.user_roles (user_id, role)
    values (new.id, 'admin')
    on conflict (user_id, role) do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function public.handle_new_auth_user();

create trigger on_auth_user_verified_admin
after update of email, email_confirmed_at on auth.users
for each row execute function public.sync_verified_admin_role();

insert into public.profiles (id, display_name)
select id, coalesce(raw_user_meta_data ->> 'full_name', raw_user_meta_data ->> 'name', split_part(email, '@', 1))
from auth.users
on conflict (id) do nothing;

insert into public.user_roles (user_id, role)
select id, 'admin'
from auth.users
where email_confirmed_at is not null
  and lower(email) = 'flavio.de.souza10@gmail.com'
on conflict (user_id, role) do nothing;

create policy "Admins can view project images"
on storage.objects
for select
to authenticated
using (bucket_id = 'website-project-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can upload project images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'website-project-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can update project images"
on storage.objects
for update
to authenticated
using (bucket_id = 'website-project-images' and public.has_role(auth.uid(), 'admin'))
with check (bucket_id = 'website-project-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete project images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'website-project-images' and public.has_role(auth.uid(), 'admin'));