-- ============================================================
-- Vista supervisora: escaladas que RECIBE el equipo y cómo las gestiona.
-- Recorre el subárbol de reportes (legajo_jefe) del usuario actual y
-- devuelve las escaladas cuyo to_legajo es un miembro del equipo, con
-- el estado en que las tiene cada gestor (pendiente/proceso/resuelvo/…).
-- SECURITY DEFINER para poder ver más allá del propio to_legajo (RLS).
-- Correr una vez en el SQL Editor de Supabase.
-- ============================================================
create or replace function public.equipo_gestion_escaladas()
returns table (id uuid, to_legajo text, gestor_nombre text, gestor_cargo text,
               gestor_nivel text, from_nombre text, tema text, detalle text,
               status text, created_at timestamptz)
language sql stable security definer set search_path = public as $$
  with recursive team as (
    select u.legajo from usuarios u where u.legajo_jefe = public.current_legajo()
    union all
    select u.legajo from usuarios u join team t on u.legajo_jefe = t.legajo
  )
  select e.id, e.to_legajo, g.nombre, g.cargo, g.nivel,
         f.nombre as from_nombre, e.tema, e.detalle,
         coalesce(e.status, 'pendiente') as status, e.created_at
  from escaladas e
  join usuarios g on g.legajo = e.to_legajo           -- el gestor (miembro del equipo)
  left join usuarios f on f.legajo = e.from_legajo    -- quién la escaló
  where e.to_legajo in (select legajo from team)
  order by g.nivel nulls last, g.nombre, e.created_at desc
  limit 300;
$$;

grant execute on function public.equipo_gestion_escaladas() to authenticated;
