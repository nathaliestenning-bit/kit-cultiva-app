/* ============================================================
   CULTIVA AUTH · capa unificada (DEMO ↔ Supabase)
   - Sin config → DEMO: findUsuario(padrón local) + localStorage
     (comportamiento idéntico a Fase A).
   - Con config → Supabase Auth: login por legajo vía correo
     sintético <legajo>@cultiva.interno; el perfil sale de la
     tabla `usuarios` (gerencia+nivel). Cambio de contraseña
     forzado al primer ingreso (must_change_password).
   Expone window.CultivaAuth (API basada en Promesas).
   ============================================================ */
(function () {
  var CFG = window.CULTIVA_CONFIG || {};
  var domain = CFG.emailDomain || "cultiva.interno";
  var hasSb = !!(CFG.supabaseUrl && CFG.supabaseAnonKey && window.supabase);
  var client = hasSb ? window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey) : null;

  function emailFor(legajo) { return String(legajo).trim().toLowerCase() + "@" + domain; }
  function demoPwdKey(legajo) { return "cultiva:pwd:" + legajo; }

  function profileFromRow(row) {
    return {
      legajo: row.legajo, nombre: row.nombre, nombre_corto: row.nombre_corto,
      cargo: row.cargo, perfil: row.perfil,
      gerencia: row.gerencia, nivel: row.nivel, area: row.area, sede: row.sede,
      legajo_jefe: row.legajo_jefe, es_admin: !!row.es_admin,
    };
  }

  function loadProfile() {
    return client.auth.getUser().then(function (r) {
      var au = r.data && r.data.user; if (!au) return null;
      var legajo = (au.email || "").split("@")[0];
      return client.from("usuarios").select("*").eq("legajo", legajo).single().then(function (q) {
        if (q.error || !q.data) return null;
        return { user: profileFromRow(q.data), mustChange: !!q.data.must_change_password };
      });
    });
  }

  var Auth = {
    mode: function () { return hasSb ? "supabase" : "demo"; },
    client: function () { return client; },

    /* resuelve datos del legajo para la pantalla de contraseña.
       demo: lee el padrón local; supabase: solo el legajo (sin pre-auth). */
    lookup: function (legajo) {
      if (!hasSb) return Promise.resolve(window.findUsuario(legajo));
      return Promise.resolve({ legajo: String(legajo).trim() });
    },

    /* demo: ¿ya creó contraseña? (elige pantalla crear/ingresar).
       supabase: null → desconocido pre-auth (siempre se ingresa). */
    hasPassword: function (legajo) {
      if (hasSb) return null;
      try { return !!localStorage.getItem(demoPwdKey(legajo)); } catch (e) { return false; }
    },

    /* demo: fija la contraseña en el primer ingreso (sin temporal). */
    createDemoPassword: function (user, pwd) {
      try { localStorage.setItem(demoPwdKey(user.legajo), pwd); } catch (e) {}
      return user;
    },

    /* acceso SOLO con legajo (sin contraseña visible).
       Por detrás usa el legajo como contraseña para mantener sesión + RLS. */
    signInByLegajo: function (legajo) {
      legajo = String(legajo || "").trim();
      if (!legajo) return Promise.resolve({ error: "Ingresa tu número de legajo." });
      if (!hasSb) {
        var u = window.findUsuario(legajo);
        if (!u) return Promise.resolve({ error: "No encontramos ese legajo en el padrón." });
        return Promise.resolve({ user: u });
      }
      return client.auth.signInWithPassword({ email: emailFor(legajo), password: legajo })
        .then(function (res) {
          if (res.error) return { error: "No encontramos ese legajo o tu cuenta no está activa." };
          return loadProfile().then(function (p) {
            if (!p) return { error: "Tu cuenta no tiene un perfil asignado en el padrón." };
            return { user: p.user };
          });
        });
    },

    /* inicia sesión. Devuelve {user, mustChange} | {error}. */
    signIn: function (legajo, pwd) {
      if (!hasSb) {
        var u = window.findUsuario(legajo);
        if (!u) return Promise.resolve({ error: "No encontramos ese legajo en el padrón." });
        var saved = null; try { saved = localStorage.getItem(demoPwdKey(u.legajo)); } catch (e) {}
        if (saved !== pwd) return Promise.resolve({ error: "Contraseña incorrecta." });
        return Promise.resolve({ user: u, mustChange: false });
      }
      return client.auth.signInWithPassword({ email: emailFor(legajo), password: pwd })
        .then(function (res) {
          if (res.error) return { error: "Legajo o contraseña incorrectos." };
          return loadProfile().then(function (p) {
            if (!p) return { error: "Tu cuenta no tiene perfil asignado en el padrón." };
            return { user: p.user, mustChange: p.mustChange };
          });
        });
    },

    /* fija nueva contraseña: supabase = cambio forzado (updateUser + RPC). */
    setNewPassword: function (pwd) {
      if (!hasSb) return Promise.resolve({ ok: true });
      return client.auth.updateUser({ password: pwd }).then(function (res) {
        if (res.error) return { error: res.error.message };
        return client.rpc("mark_password_changed").then(function () { return { ok: true }; });
      });
    },

    /* restaura sesión al cargar (supabase). demo → null. */
    restore: function () {
      if (!hasSb) return Promise.resolve(null);
      return client.auth.getSession().then(function (r) {
        if (!(r.data && r.data.session)) return null;
        return loadProfile();
      });
    },

    signOut: function () {
      if (!hasSb) return Promise.resolve();
      return client.auth.signOut();
    },
  };

  window.CultivaAuth = Auth;
})();
