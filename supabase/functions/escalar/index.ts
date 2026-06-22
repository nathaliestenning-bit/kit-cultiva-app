// ============================================================
//  Edge Function · escalar  (Fase C)
//  Enrutamiento confiable de escaladas. El cliente NO inserta
//  escaladas directamente (RLS lo impide); las crea aquí, donde
//  el destinatario (to_legajo) se calcula del padrón con service
//  role y no se puede falsificar.
//
//  Acciones (body.action):
//   · "crear"   {tema, detalle, requiere?, registro_id?}
//        → nueva escalada del autor a SU jefe directo.
//   · "subir"   {escalada_id, req_superior?}
//        → el jefe sube el tema a SU jefe (nueva escalada enlazada
//          por parent_id) y marca la original como 'escalo'.
//   · "derivar" {escalada_id, to_legajo, nota?}
//        → marca 'derivo' y, si hay to_legajo, crea la enlazada.
//
//  Secrets requeridos (supabase secrets set):
//   SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
//  Deploy:  supabase functions deploy escalar
// ============================================================
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method" }, 405);

  const URL = Deno.env.get("SUPABASE_URL")!;
  const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
  const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const authHeader = req.headers.get("Authorization") || "";

  // Cliente como el usuario (para identificarlo por su JWT)
  const asUser = createClient(URL, ANON, { global: { headers: { Authorization: authHeader } } });
  const { data: u } = await asUser.auth.getUser();
  if (!u?.user) return json({ error: "no autenticado" }, 401);
  const legajo = (u.user.email || "").split("@")[0];

  // Cliente admin (service role) para enrutar/insertar
  const admin = createClient(URL, SERVICE);
  const { data: me } = await admin
    .from("usuarios").select("legajo,nombre,cargo,legajo_jefe").eq("legajo", legajo).single();
  if (!me) return json({ error: "sin perfil en el padrón" }, 400);

  let body: any = {};
  try { body = await req.json(); } catch { /* vacío */ }
  const action = body.action;

  if (action === "crear") {
    if (!me.legajo_jefe) return json({ error: "no tienes un jefe asignado para escalar" }, 409);
    if (!body.tema || !body.detalle) return json({ error: "faltan tema/detalle" }, 400);
    const { data, error } = await admin.from("escaladas").insert({
      from_legajo: me.legajo, to_legajo: me.legajo_jefe,
      from_nombre: me.nombre, from_cargo: me.cargo,
      tema: body.tema, detalle: body.detalle, requiere: body.requiere ?? null,
      registro_id: body.registro_id ?? null, status: "pendiente",
    }).select().single();
    if (error) return json({ error: error.message }, 400);
    return json({ ok: true, escalada: data });
  }

  if (action === "subir") {
    if (!body.escalada_id) return json({ error: "falta escalada_id" }, 400);
    // solo el destinatario puede subirla
    const { data: orig } = await admin.from("escaladas").select("*")
      .eq("id", body.escalada_id).eq("to_legajo", me.legajo).single();
    if (!orig) return json({ error: "escalada no encontrada o no es tuya" }, 404);
    await admin.from("escaladas").update({
      status: "escalo", escalated_up: true, req_superior: body.req_superior ?? null,
    }).eq("id", orig.id);
    if (!me.legajo_jefe) return json({ ok: true, escalada_up: null, nota: "sin superior; marcada como escalo" });
    const { data, error } = await admin.from("escaladas").insert({
      from_legajo: me.legajo, to_legajo: me.legajo_jefe,
      from_nombre: me.nombre, from_cargo: me.cargo,
      tema: orig.tema, detalle: orig.detalle,
      requiere: body.req_superior ?? orig.requiere, parent_id: orig.id, status: "pendiente",
    }).select().single();
    if (error) return json({ error: error.message }, 400);
    return json({ ok: true, escalada_up: data });
  }

  if (action === "derivar") {
    if (!body.escalada_id) return json({ error: "falta escalada_id" }, 400);
    const { data: orig } = await admin.from("escaladas").select("*")
      .eq("id", body.escalada_id).eq("to_legajo", me.legajo).single();
    if (!orig) return json({ error: "escalada no encontrada o no es tuya" }, 404);
    await admin.from("escaladas").update({ status: "derivo" }).eq("id", orig.id);
    let nueva = null;
    if (body.to_legajo) {
      const { data } = await admin.from("escaladas").insert({
        from_legajo: me.legajo, to_legajo: body.to_legajo,
        from_nombre: me.nombre, from_cargo: me.cargo,
        tema: orig.tema, detalle: orig.detalle,
        requiere: body.nota ?? orig.requiere, parent_id: orig.id, status: "pendiente",
      }).select().single();
      nueva = data;
    }
    return json({ ok: true, derivada: nueva });
  }

  return json({ error: "acción desconocida" }, 400);
});
