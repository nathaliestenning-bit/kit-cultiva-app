-- ============================================================
--  APP CULTIVA · ESQUEMA (Fase B)
--  Tablas: usuarios (con legajo_jefe), registros, escaladas
--          + escalada_mensajes (hilo de ida y vuelta).
--  Auth:   login por legajo vía correo sintético <legajo>@cultiva.interno
--          sobre Supabase Auth (confirmación de correo desactivada).
--  RLS:    se habilita aquí con políticas "de dueño / parte" (lo mínimo
--          para que cada usuario use SUS datos). Las políticas de
--          JERARQUÍA y el enrutamiento por legajo_jefe viven en Fase C
--          (supabase/policies-hierarchy.sql + Edge Function).
--  Ejecutar en: Supabase → SQL Editor (o `supabase db push`).
-- ============================================================

create extension if not exists pgcrypto;   -- gen_random_uuid()

-- ── helper: legajo del usuario autenticado (del email del JWT) ──────────
create or replace function public.current_legajo()
returns text language sql stable as $$
  select split_part(coalesce(auth.jwt() ->> 'email', ''), '@', 1)
$$;

-- ── helper genérico: updated_at automático ──────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;

-- ============================================================
--  1) USUARIOS  (directorio / padrón mínimo — sin PII innecesaria)
--     correo corporativo, celular y DNI NO se almacenan aquí.
-- ============================================================
create table if not exists public.usuarios (
  legajo                text primary key,
  auth_id               uuid unique references auth.users(id) on delete set null,
  nombre                text not null,
  cargo                 text,
  gerencia              text,
  area                  text,
  sede                  text,
  nivel                 text,                       -- N1..N4
  perfil                text not null,              -- cos-n4, prod-n2, cal-tac, ...
  legajo_jefe           text references public.usuarios(legajo) on delete set null,
  must_change_password  boolean not null default true,
  activo                boolean not null default true,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);
create index if not exists usuarios_legajo_jefe_idx on public.usuarios(legajo_jefe);
create index if not exists usuarios_auth_id_idx     on public.usuarios(auth_id);

drop trigger if exists usuarios_set_updated_at on public.usuarios;
create trigger usuarios_set_updated_at before update on public.usuarios
  for each row execute function public.set_updated_at();

-- ============================================================
--  2) REGISTROS  (historial por ritual — reemplaza localStorage)
-- ============================================================
create table if not exists public.registros (
  id          uuid primary key default gen_random_uuid(),
  legajo      text not null references public.usuarios(legajo) on delete cascade
                default public.current_legajo(),
  perfil      text not null,
  ritual_id   text not null,
  vals        jsonb not null default '{}'::jsonb,    -- valores del formulario
  escalado    boolean not null default false,
  follow_ts   timestamptz,                           -- seguimiento (feedback/coaching)
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists registros_legajo_idx on public.registros(legajo);
create index if not exists registros_ritual_idx on public.registros(legajo, ritual_id);

drop trigger if exists registros_set_updated_at on public.registros;
create trigger registros_set_updated_at before update on public.registros
  for each row execute function public.set_updated_at();

-- ============================================================
--  3) ESCALADAS  (un tema escalado de subordinado → jefe directo)
--     status: pendiente | resuelvo | proceso | derivo | escalo
--     plazo 48 h desde la creación (SLA).
-- ============================================================
create table if not exists public.escaladas (
  id            uuid primary key default gen_random_uuid(),
  from_legajo   text not null references public.usuarios(legajo) on delete cascade,
  to_legajo     text not null references public.usuarios(legajo) on delete cascade,
  registro_id   uuid references public.registros(id) on delete set null,
  parent_id     uuid references public.escaladas(id) on delete set null,  -- al derivar/subir
  tema          text not null,
  detalle       text not null,
  requiere      text,
  status        text not null default 'pendiente'
                  check (status in ('pendiente','resuelvo','proceso','derivo','escalo')),
  req_superior  text,                                 -- qué pide a su superior (al "escalo")
  escalated_up  boolean not null default false,
  plazo         timestamptz not null default (now() + interval '48 hours'),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists escaladas_to_idx   on public.escaladas(to_legajo, status);
create index if not exists escaladas_from_idx on public.escaladas(from_legajo);

drop trigger if exists escaladas_set_updated_at on public.escaladas;
create trigger escaladas_set_updated_at before update on public.escaladas
  for each row execute function public.set_updated_at();

-- ============================================================
--  4) ESCALADA_MENSAJES  (hilo: notas, consultas y respuestas)
-- ============================================================
create table if not exists public.escalada_mensajes (
  id            uuid primary key default gen_random_uuid(),
  escalada_id   uuid not null references public.escaladas(id) on delete cascade,
  autor_legajo  text not null references public.usuarios(legajo) on delete cascade
                  default public.current_legajo(),
  kind          text not null default 'nota'
                  check (kind in ('nota','consulta','respuesta')),
  texto         text not null,
  created_at    timestamptz not null default now()
);
create index if not exists esc_msg_escalada_idx on public.escalada_mensajes(escalada_id, created_at);

-- ============================================================
--  RPC: marcar contraseña como cambiada (primer ingreso)
--  El usuario llama a esto tras fijar su nueva contraseña.
-- ============================================================
create or replace function public.mark_password_changed()
returns void language sql security definer set search_path = public as $$
  update public.usuarios set must_change_password = false
   where legajo = public.current_legajo();
$$;
revoke all on function public.mark_password_changed() from public;
grant execute on function public.mark_password_changed() to authenticated;

-- ============================================================
--  RLS · políticas DE DUEÑO / PARTE (Fase B)
--  (las de jerarquía van en Fase C)
-- ============================================================
alter table public.usuarios          enable row level security;
alter table public.registros         enable row level security;
alter table public.escaladas         enable row level security;
alter table public.escalada_mensajes enable row level security;

-- usuarios: cada quien lee su propia ficha; y la ficha de su jefe directo
-- (para mostrar "a quién escalas"). Edición de campos sensibles: solo service key.
drop policy if exists usuarios_self_select on public.usuarios;
create policy usuarios_self_select on public.usuarios
  for select to authenticated
  using ( legajo = public.current_legajo()
          or legajo = (select u.legajo_jefe from public.usuarios u
                       where u.legajo = public.current_legajo()) );

-- registros: dueño total sobre los suyos.
drop policy if exists registros_owner_all on public.registros;
create policy registros_owner_all on public.registros
  for all to authenticated
  using ( legajo = public.current_legajo() )
  with check ( legajo = public.current_legajo() );

-- escaladas: las ve/edita quien es PARTE (autor o destinatario).
--  · insert: solo como autor (from_legajo = yo).
--  · update: autor o destinatario (el jefe cambia status / responde).
drop policy if exists escaladas_party_select on public.escaladas;
create policy escaladas_party_select on public.escaladas
  for select to authenticated
  using ( from_legajo = public.current_legajo() or to_legajo = public.current_legajo() );

drop policy if exists escaladas_author_insert on public.escaladas;
create policy escaladas_author_insert on public.escaladas
  for insert to authenticated
  with check ( from_legajo = public.current_legajo() );

drop policy if exists escaladas_party_update on public.escaladas;
create policy escaladas_party_update on public.escaladas
  for update to authenticated
  using ( from_legajo = public.current_legajo() or to_legajo = public.current_legajo() );

-- mensajes: visibles si eres parte de la escalada; insertas como tú mismo.
drop policy if exists esc_msg_party_select on public.escalada_mensajes;
create policy esc_msg_party_select on public.escalada_mensajes
  for select to authenticated
  using ( exists (select 1 from public.escaladas e
                  where e.id = escalada_id
                    and (e.from_legajo = public.current_legajo()
                         or e.to_legajo = public.current_legajo())) );

drop policy if exists esc_msg_author_insert on public.escalada_mensajes;
create policy esc_msg_author_insert on public.escalada_mensajes
  for insert to authenticated
  with check ( autor_legajo = public.current_legajo()
               and exists (select 1 from public.escaladas e
                           where e.id = escalada_id
                             and (e.from_legajo = public.current_legajo()
                                  or e.to_legajo = public.current_legajo())) );

-- Nota: la tabla usuarios NO tiene política de INSERT/UPDATE para 'authenticated'
-- a propósito → el padrón se gestiona solo con la service key (aprovisionamiento).
