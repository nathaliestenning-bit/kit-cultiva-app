-- ============================================================
--  APP CULTIVA · JERARQUÍA + ESCALADAS (Fase C)
--  Ejecutar DESPUÉS de schema.sql.
--  - Denormaliza nombre/cargo del autor en escaladas/mensajes
--    (evita lecturas cruzadas y deja el "from" como en el demo).
--  - RLS por jerarquía: un jefe ve la ficha de sus reportes directos.
--  - La CREACIÓN/derivación/subida de escaladas pasa SOLO por la
--    Edge Function `escalar` (service role) → enrutamiento confiable.
-- ============================================================

-- ── denormalización para mostrar el "de quién" sin lecturas cruzadas ──
alter table public.escaladas         add column if not exists from_nombre text;
alter table public.escaladas         add column if not exists from_cargo  text;
alter table public.escalada_mensajes add column if not exists autor_nombre text;

-- ── RLS por jerarquía: ver la ficha de mis reportes directos ──────────
--  (se suma a las políticas de Fase B: self + jefe).  Permite, p.ej.,
--  que un jefe resuelva nombres/cargos de su equipo.
drop policy if exists usuarios_reports_select on public.usuarios;
create policy usuarios_reports_select on public.usuarios
  for select to authenticated
  using ( legajo_jefe = public.current_legajo() );

-- ── la creación de escaladas YA NO es inserción directa del cliente ──
--  El enrutamiento (to_legajo = jefe directo) lo hace la Edge Function
--  con service role; así el destinatario no se puede falsificar.
drop policy if exists escaladas_author_insert on public.escaladas;

-- (se mantienen de Fase B:)
--   escaladas_party_select  → ve quien es parte (from/to)
--   escaladas_party_update  → actualiza estado/respuesta quien es parte
--   esc_msg_* en escalada_mensajes → hilo de ida y vuelta entre las partes

-- ── helper opcional: ¿soy jefe (directo) de <legajo>? ─────────────────
create or replace function public.es_mi_reporte(otro text)
returns boolean language sql stable as $$
  select exists (select 1 from public.usuarios u
                 where u.legajo = otro and u.legajo_jefe = public.current_legajo())
$$;
