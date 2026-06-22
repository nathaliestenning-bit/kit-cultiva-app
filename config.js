/* ============================================================
   CONFIG · App Cultiva
   - Deja supabaseUrl/anonKey VACÍOS para modo DEMO (localStorage,
     idéntico a Fase A, sin backend).
   - Rellénalos para activar Supabase (login real por legajo).
   La anon key es PÚBLICA por diseño (la seguridad la da RLS).
   La service key NUNCA va aquí ni en el bundle.
   ============================================================ */
window.CULTIVA_CONFIG = {
  supabaseUrl: "https://qytcqopoqlqogctxnbwk.supabase.co",       // p.ej. "https://abcd1234.supabase.co"
  supabaseAnonKey: "sb_publishable_MdYK3s09jg4t98pqWxsRrA_WcnFSak2",   // anon public key
  emailDomain: "cultiva.interno",
  // Nombre (slug) de la Edge Function de escaladas. Debe coincidir con el
  // slug real del Dashboard (la parte final de la URL /functions/v1/<slug>).
  escalarFunction: "smooth-task",
};
