-- ============================================================
-- MODO MAESTRO · lookup de un colaborador por legajo
-- Devuelve datos del colaborador + sus registros (para seguimiento).
-- El maestro NO inicia sesión (se registra localmente en su equipo), así que
-- esta función es SECURITY DEFINER y se concede a 'anon'.
-- ⚠️ Esto abre la lectura de perfil + registros de cualquier legajo a quien
--    tenga el link de la app. Es lo acordado "por el momento" para el modo
--    maestro. Si luego se quiere cerrar, se puede exigir una cuenta de maestro
--    (flag es_maestro) y cambiar el grant a 'authenticated' + chequeo.
-- Correr una vez en el SQL Editor de Supabase.
-- ============================================================
create or replace function public.maestro_colaborador(p_legajo text)
returns json language sql stable security definer set search_path = public as $$
  select case when u.legajo is null then null else json_build_object(
    'legajo', u.legajo,
    'nombre', u.nombre,
    'perfil', u.perfil,
    'area',   u.area,
    'nivel',  u.nivel,
    'registros', coalesce((
      select json_agg(json_build_object(
               'ritual_id', r.ritual_id, 'vals', r.vals, 'created_at', r.created_at
             ) order by r.created_at desc)
      from registros r where r.legajo = u.legajo
    ), '[]'::json)
  ) end
  from (select * from usuarios where legajo = p_legajo limit 1) u;
$$;

grant execute on function public.maestro_colaborador(text) to anon, authenticated;
