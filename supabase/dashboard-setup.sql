-- ============================================================
-- DASHBOARD (admin · vista de gerencia)
-- 1) Marca es_admin en usuarios.
-- 2) is_admin(): ¿el usuario actual es admin?
-- 3) dash_resumen(): agrega TODO el piloto (participación, rituales,
--    puntos/ranking, escaladas/SLA). SECURITY DEFINER + gate is_admin()
--    → solo los admin pueden obtener los datos org-wide.
-- Correr una vez en el SQL Editor de Supabase.
-- ============================================================

-- 1) Columna es_admin ----------------------------------------
alter table public.usuarios add column if not exists es_admin boolean not null default false;

-- 2) ¿admin? -------------------------------------------------
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from usuarios
    where legajo = public.current_legajo() and coalesce(es_admin, false)
  );
$$;
grant execute on function public.is_admin() to authenticated;

-- 3) Resumen del piloto (solo admin) -------------------------
create or replace function public.dash_resumen()
returns json language plpgsql stable security definer set search_path = public as $$
declare result json;
begin
  if not public.is_admin() then
    raise exception 'no autorizado';
  end if;

  with base as (
    select u.legajo,
      case split_part(u.perfil, '-', 1)
        when 'cos' then 'cosecha' when 'prod' then 'produccion'
        when 'pack' then 'packing' when 'cal' then 'calidad' else 'otro' end as area
    from usuarios u
    where coalesce(u.es_admin, false) = false
      and coalesce(u.activo, true) = true
      and u.perfil is not null
  ),
  reg_week as (
    select legajo, ritual_id from registros
    where created_at >= date_trunc('week', now())
  ),
  activos as (select distinct legajo from reg_week),
  pts as (
    select legajo, sum(10 + 3 * (c - 1))::int as p
    from (
      select legajo, ritual_id, count(*) c from registros
      where created_at >= date_trunc('week', now())
      group by legajo, ritual_id
    ) g
    group by legajo
  )
  select json_build_object(
    'total_registros_semana', (select count(*) from reg_week),
    'participacion', (
      select coalesce(json_agg(json_build_object('area', area, 'lideres', lideres, 'activos', activos) order by area), '[]')
      from (
        select b.area, count(*) as lideres, count(a.legajo) as activos
        from base b left join activos a on a.legajo = b.legajo
        group by b.area
      ) t
    ),
    'rituales', (
      select coalesce(json_agg(json_build_object('ritual', ritual_id, 'n', n) order by n desc), '[]')
      from (select ritual_id, count(*) as n from reg_week group by ritual_id) r
    ),
    'puntos', (
      select coalesce(json_agg(json_build_object('nombre', nombre, 'area', area, 'nivel', nivel, 'puntos', puntos) order by puntos desc), '[]')
      from (
        select u.nombre,
          case split_part(u.perfil, '-', 1)
            when 'cos' then 'cosecha' when 'prod' then 'produccion'
            when 'pack' then 'packing' when 'cal' then 'calidad' else 'otro' end as area,
          u.nivel, coalesce(pt.p, 0)::int as puntos
        from usuarios u
        join pts pt on pt.legajo = u.legajo
        where coalesce(u.es_admin, false) = false and u.perfil is not null
        order by puntos desc
        limit 15
      ) rk
    ),
    'escaladas', (
      select json_build_object(
        'total', count(*),
        'pendientes', count(*) filter (where coalesce(status, 'pendiente') = 'pendiente'),
        'proceso',    count(*) filter (where status = 'proceso'),
        'resueltas',  count(*) filter (where status = 'resuelvo'),
        'vencidas',   count(*) filter (where coalesce(status,'pendiente') in ('pendiente','proceso')
                                          and plazo is not null and plazo < now())
      ) from escaladas
    )
  ) into result;
  return result;
end;
$$;
grant execute on function public.dash_resumen() to authenticated;

-- ============================================================
-- (fin: solo pasos 1-3, la creación de cuentas va con el script)
