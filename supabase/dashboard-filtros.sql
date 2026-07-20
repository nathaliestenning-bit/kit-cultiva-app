-- ============================================================
-- DASHBOARD · FILTROS (Área / Nivel / Periodo)
-- Reemplaza dash_resumen() por una versión con parámetros.
-- Correr UNA vez en el SQL Editor de Supabase (después de dashboard-setup.sql).
--   p_area    : null|'' = todas | 'cosecha'|'produccion'|'packing'|'calidad'
--   p_nivel   : null|'' = todos | 'N1'|'N2'|'N3'|'N4'|'TAC'
--   p_periodo : 'semana' (por defecto) | 'mes' | 'acumulado'
-- Área y nivel se derivan del `perfil` (cos/prod/pack/cal + sufijo).
-- ============================================================

-- quita la versión sin parámetros (evita ambigüedad de sobrecarga)
drop function if exists public.dash_resumen();

create or replace function public.dash_resumen(
  p_area text default null,
  p_nivel text default null,
  p_periodo text default 'semana'
) returns json language plpgsql stable security definer set search_path = public as $$
declare
  result json;
  v_desde timestamptz;
begin
  if not public.is_admin() then
    raise exception 'no autorizado';
  end if;

  v_desde := case lower(coalesce(p_periodo, 'semana'))
               when 'mes'       then date_trunc('month', now())
               when 'acumulado' then '-infinity'::timestamptz
               else date_trunc('week', now())
             end;

  with base as (
    select u.legajo, u.nombre,
      case split_part(u.perfil, '-', 1)
        when 'cos' then 'cosecha' when 'prod' then 'produccion'
        when 'pack' then 'packing' when 'cal' then 'calidad' else 'otro' end as area,
      upper(split_part(u.perfil, '-', 2)) as nivel
    from usuarios u
    where coalesce(u.es_admin, false) = false
      and coalesce(u.activo, true) = true
      and u.perfil is not null
      and (p_area is null or p_area = '' or
           (case split_part(u.perfil, '-', 1)
              when 'cos' then 'cosecha' when 'prod' then 'produccion'
              when 'pack' then 'packing' when 'cal' then 'calidad' else 'otro' end) = lower(p_area))
      and (p_nivel is null or p_nivel = '' or upper(split_part(u.perfil, '-', 2)) = upper(p_nivel))
  ),
  reg as (
    select r.legajo, r.ritual_id
    from registros r
    join base b on b.legajo = r.legajo
    where r.created_at >= v_desde
  ),
  activos as (select distinct legajo from reg),
  pts as (
    select legajo, sum(10 + 3 * (c - 1))::int as p
    from (select legajo, ritual_id, count(*) c from reg group by legajo, ritual_id) g
    group by legajo
  )
  select json_build_object(
    'total_registros', (select count(*) from reg),
    'participacion', (
      select coalesce(json_agg(json_build_object('area', area, 'lideres', lideres, 'activos', activos) order by area), '[]')
      from (select b.area, count(*) as lideres, count(a.legajo) as activos
            from base b left join activos a on a.legajo = b.legajo
            group by b.area) t
    ),
    'rituales', (
      select coalesce(json_agg(json_build_object('ritual', ritual_id, 'n', n) order by n desc), '[]')
      from (select ritual_id, count(*) as n from reg group by ritual_id) r
    ),
    'puntos', (
      select coalesce(json_agg(json_build_object('nombre', nombre, 'area', area, 'nivel', nivel, 'puntos', puntos) order by puntos desc), '[]')
      from (select b.nombre, b.area, b.nivel, coalesce(pt.p, 0)::int as puntos
            from base b join pts pt on pt.legajo = b.legajo
            order by puntos desc limit 15) rk
    ),
    'escaladas', (
      select json_build_object(
        'total',      count(*),
        'pendientes', count(*) filter (where coalesce(e.status, 'pendiente') = 'pendiente'),
        'proceso',    count(*) filter (where e.status = 'proceso'),
        'resueltas',  count(*) filter (where e.status = 'resuelvo'),
        'vencidas',   count(*) filter (where coalesce(e.status, 'pendiente') in ('pendiente','proceso')
                                          and e.plazo is not null and e.plazo < now())
      )
      from escaladas e join base b on b.legajo = e.from_legajo
      where e.created_at >= v_desde
    )
  ) into result;
  return result;
end;
$$;
grant execute on function public.dash_resumen(text, text, text) to authenticated;
