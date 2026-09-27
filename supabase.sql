-- Pégalo en Supabase → SQL Editor → New query → Run (una sola vez).
-- Crea la tabla de notas: cualquiera puede leerlas y pegar una nueva,
-- pero nadie puede editarlas ni borrarlas desde la página (eso se hace en Table Editor).

create table public.notas (
  id     bigint generated always as identity primary key,
  texto  text not null default '' check (char_length(texto) <= 1000),
  firma  text not null default '' check (char_length(firma) <= 80),
  creada timestamptz not null default now(),
  check (length(trim(texto)) > 0 or length(trim(firma)) > 0)
);

alter table public.notas enable row level security;

create policy "cualquiera lee las notas" on public.notas
  for select to anon, authenticated using (true);

create policy "cualquiera pega una nota" on public.notas
  for insert to anon, authenticated with check (true);

grant select on public.notas to anon, authenticated;
grant insert (texto, firma) on public.notas to anon, authenticated;
