-- ============================================================
-- Nombres actuales de rituales (para descargas legibles).
-- Mapea el id interno (estable) al nombre que se muestra HOY en la app.
-- Correr una vez en el SQL Editor de Supabase. Re-correr es seguro (upsert).
-- ============================================================
create table if not exists public.ritual_nombres (
  ritual_id text primary key,
  nombre    text not null
);

insert into public.ritual_nombres (ritual_id, nombre) values
  ('acercamiento-calido', 'Charla de Impulso'),
  ('acompanamiento-1-1', 'Acompañamiento 1 a 1'),
  ('asegurando-la-calidad', 'Acompañamiento 1 a 1'),
  ('caminata-de-liderazgo', 'Caminata de Liderazgo'),
  ('caminata-dia-noche', 'Caminata de Liderazgo'),
  ('caminata-por-areas', 'Caminata de Liderazgo'),
  ('cierre-con-agradecimiento', 'Cierre con agradecimiento'),
  ('coaching-de-terreno', 'Acompañamiento 1 a 1'),
  ('coaching-en-terreno', 'Acompañamiento 1 a 1'),
  ('coaching-friccion', 'Acompañamiento 1 a 1'),
  ('escucha-antes-de-cosechar', 'Espacio de confianza'),
  ('escucha-antes-de-iniciar', 'Espacio de confianza'),
  ('escucho-para-ayudar', 'Diálogo con Evidencia'),
  ('espacio-de-confianza', 'Espacio de confianza'),
  ('feedback-1-1-friccion', 'Acompañamiento 1 a 1'),
  ('feedback-1-1-mensual', 'Acompañamiento 1 a 1'),
  ('presencia-activa-en-campo', 'Acompañamiento 1 a 1'),
  ('presencia-activa-en-planta', 'Acompañamiento 1 a 1'),
  ('reconocimiento', 'Reconocimiento Sincero'),
  ('reconocimiento-sincero', 'Reconocimiento Sincero'),
  ('revisar-escaladas-diarias', 'Revisión de escaladas'),
  ('saludo-con-proposito', 'Saludo con propósito')
on conflict (ritual_id) do update set nombre = excluded.nombre;

-- Vista para DESCARGAR registros ya con el nombre actual del ritual.
-- Para exportar: SQL Editor -> "select * from v_registros;" -> Run -> Export CSV.
create or replace view public.v_registros with (security_invoker = on) as
  select r.legajo,
         r.perfil,
         coalesce(n.nombre, r.ritual_id) as ritual,
         r.ritual_id,
         r.vals,
         r.escalado,
         (r.created_at at time zone 'America/Lima') as creado_peru,
         r.created_at
  from public.registros r
  left join public.ritual_nombres n on n.ritual_id = r.ritual_id;

-- Vista para DESCARGAR escaladas, con el DETALLE del registro que las originó.
-- Trae: quién la levantó, tema/detalle, estado, el ritual de origen (nombre
-- actual), el perfil y lo que la persona escribió en el registro (vals), y las
-- fechas en hora Perú.
-- Para exportar: SQL Editor -> "select * from v_escaladas;" -> Run -> Export CSV.
create or replace view public.v_escaladas with (security_invoker = on) as
  select e.from_legajo,
         e.from_nombre,
         e.from_cargo,
         e.to_legajo,
         e.tema,
         e.detalle,
         e.requiere,
         e.status,
         e.req_superior,
         e.escalated_up,
         coalesce(n.nombre, r.ritual_id) as ritual_origen,
         r.perfil                        as perfil_origen,
         r.vals                          as registro_detalle,
         (e.created_at at time zone 'America/Lima') as creada_peru,
         (e.updated_at at time zone 'America/Lima') as actualizada_peru,
         e.registro_id
  from public.escaladas e
  left join public.registros r       on r.id = e.registro_id
  left join public.ritual_nombres n  on n.ritual_id = r.ritual_id;
