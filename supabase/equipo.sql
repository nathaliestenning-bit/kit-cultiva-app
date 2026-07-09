-- ============================================================
-- ENTREGA 2 · Vista "Mi equipo" (puntos + escaladas por jerarquía)
-- Dos funciones SECURITY DEFINER: recorren el subárbol de reportes
-- (legajo_jefe) del usuario actual y devuelven SOLO lo de su equipo.
-- Correr una vez en el SQL Editor de Supabase.
-- ============================================================

-- Puntos de la SEMANA (lunes→hoy) de todo el equipo hacia abajo.
-- Regla: por cada ritual con >=1 registro en la semana: 10 + 3*(registros-1).
create or replace function public.equipo_puntos()
returns table (legajo text, nombre text, cargo text, nivel text, perfil text, puntos integer)
language sql stable security definer set search_path = public as $$
  with recursive team as (
    select u.legajo, u.nombre, u.cargo, u.nivel, u.perfil
    from usuarios u
    where u.legajo_jefe = public.current_legajo()
    union all
    select u.legajo, u.nombre, u.cargo, u.nivel, u.perfil
    from usuarios u
    join team t on u.legajo_jefe = t.legajo
  ),
  pts as (
    select legajo, sum(10 + 3 * (c - 1))::int as puntos
    from (
      select legajo, ritual_id, count(*) as c
      from registros
      where created_at >= date_trunc('week', now())
      group by legajo, ritual_id
    ) g
    group by legajo
  )
  select t.legajo, t.nombre, t.cargo, t.nivel, t.perfil, coalesce(p.puntos, 0)::int
  from team t
  left join pts p on p.legajo = t.legajo
  order by t.nivel nulls last, t.nombre;
$$;

grant execute on function public.equipo_puntos() to authenticated;

-- Escaladas levantadas por todo el equipo hacia abajo (recientes primero).
create or replace function public.equipo_escaladas()
returns table (id uuid, from_legajo text, from_nombre text, from_cargo text,
               nivel text, tema text, detalle text, status text, created_at timestamptz)
language sql stable security definer set search_path = public as $$
  with recursive team as (
    select u.legajo from usuarios u where u.legajo_jefe = public.current_legajo()
    union all
    select u.legajo from usuarios u join team t on u.legajo_jefe = t.legajo
  )
  select e.id, e.from_legajo, uu.nombre, uu.cargo, uu.nivel,
         e.tema, e.detalle, e.status, e.created_at
  from escaladas e
  join usuarios uu on uu.legajo = e.from_legajo
  where e.from_legajo in (select legajo from team)
  order by e.created_at desc
  limit 200;
$$;

grant execute on function public.equipo_escaladas() to authenticated;
