-- Segunda parte (después de supabase.sql): títulos, descripciones y fechas de las fotos guardados en línea.
-- Pégalo en Supabase → SQL Editor → New query → Run (una sola vez).
-- Cualquiera puede LEER los textos; solo los usuarios de la tabla "editores" pueden cambiarlos.

-- Quién puede editar. Se llena a mano (ver el final de este archivo).
create table public.editores (
  user_id uuid primary key references auth.users on delete cascade
);
alter table public.editores enable row level security;
-- Cada usuario solo puede ver si él mismo es editor (así el álbum sabe si mostrarle el modo edición)
create policy "cada editor se ve a sí mismo" on public.editores
  for select to authenticated using (user_id = (select auth.uid()));
grant select on public.editores to authenticated;

create table public.textos (
  foto            text primary key check (char_length(foto) <= 300),
  titulo          text check (char_length(titulo) <= 200),
  descripcion     text check (char_length(descripcion) <= 3000),
  fecha           text check (char_length(fecha) <= 40),
  actualizado     timestamptz not null default now(),
  actualizado_por uuid
);
alter table public.textos enable row level security;

create policy "cualquiera lee los textos" on public.textos
  for select to anon, authenticated using (true);

create policy "editores agregan textos" on public.textos
  for insert to authenticated
  with check (exists (select 1 from public.editores where user_id = (select auth.uid())));

create policy "editores cambian textos" on public.textos
  for update to authenticated
  using (exists (select 1 from public.editores where user_id = (select auth.uid())))
  with check (exists (select 1 from public.editores where user_id = (select auth.uid())));

grant select on public.textos to anon, authenticated;
grant insert (foto, titulo, descripcion, fecha), update (titulo, descripcion, fecha) on public.textos to authenticated;

-- Quién y cuándo cambió cada texto (lo pone la base de datos, no se puede falsificar desde la página)
create function public.marcar_texto() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.actualizado := now();
  new.actualizado_por := auth.uid();
  return new;
end $$;
create trigger marcar_texto before insert or update on public.textos
  for each row execute function public.marcar_texto();

-- ------------------------------------------------------------------
-- Para agregar un editor:
--   1. Authentication → Users → Add user → Create new user (correo + contraseña, marca "Auto Confirm User")
--   2. Corre esto con su correo:
--
-- insert into public.editores (user_id) select id from auth.users where email = 'correo@ejemplo.com';
