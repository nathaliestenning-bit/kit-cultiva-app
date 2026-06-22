/* ============================================================
   LOGIN · Etapa 6 → producción (Fase B)
   Ingreso por LEGAJO (10+DNI). La autenticación pasa por
   window.CultivaAuth (DEMO localStorage ↔ Supabase Auth).
   - Demo: primer ingreso crea contraseña; luego la ingresa.
   - Supabase: ingresa contraseña; si es primer ingreso
     (must_change_password) se fuerza crear una nueva.
   Cada usuario entra DIRECTO a su perfil (scoping por área+nivel).
   Incluye acceso de REVISIÓN TEMPORAL marcado con *.
   ============================================================ */
const { createElement: gh, useState: gUse, useEffect: gEff, useRef: gRef } = React;
const GI = (n, c) => gh("i", { "data-lucide": n, className: c || "" });

function LoginScreen({ onLogin, onReview }) {
  const [stage, setStage] = gUse("id");      // id | enter | create
  const [idv, setIdv] = gUse("");
  const [user, setUser] = gUse(null);
  const [pwd, setPwd] = gUse("");
  const [pwd2, setPwd2] = gUse("");
  const [err, setErr] = gUse("");
  const [busy, setBusy] = gUse(false);
  const [forced, setForced] = gUse(false);    // supabase: cambio forzado 1er ingreso
  const idRef = gRef(null);

  const A = window.CultivaAuth;
  const isSb = A && A.mode() === "supabase";

  gEff(() => { if (window.lucide) window.lucide.createIcons(); });
  gEff(() => { if (stage === "id" && idRef.current) idRef.current.focus(); }, [stage]);

  function continuar() {
    if (busy) return;
    const legajo = idv.trim();
    if (!legajo) { setErr("Ingresa tu número de legajo."); return; }
    setBusy(true); setErr("");
    Promise.resolve(A.lookup(legajo)).then((u) => {
      if (!isSb) {
        if (!u) { setErr("No encontramos ese correo o legajo en el padrón."); setBusy(false); return; }
        if (!u.perfil || !window.PROFILES[u.perfil]) {
          setErr("Tu perfil aún no está disponible en la app."); setBusy(false); return;
        }
        setUser(u); setPwd(""); setPwd2(""); setForced(false);
        setStage(A.hasPassword(u.legajo) ? "enter" : "create");
      } else {
        setUser({ legajo: legajo }); setPwd(""); setPwd2(""); setForced(false);
        setStage("enter");
      }
      setBusy(false);
    });
  }

  function finishLogin(u) {
    if (u && (!u.perfil || !window.PROFILES[u.perfil])) {
      setErr("Tu perfil (" + (u.perfil || "—") + ") aún no está disponible en la app."); setBusy(false); return;
    }
    onLogin(u);
  }

  function submitPwd() {
    if (busy) return;
    setBusy(true); setErr("");

    if (stage === "create") {
      if (pwd.length < 4) { setErr("Usa al menos 4 caracteres."); setBusy(false); return; }
      if (pwd !== pwd2) { setErr("Las contraseñas no coinciden."); setBusy(false); return; }
      if (!isSb) { finishLogin(A.createDemoPassword(user, pwd)); return; }
      A.setNewPassword(pwd).then((res) => {
        if (res.error) { setErr("No se pudo guardar la contraseña. Intenta de nuevo."); setBusy(false); return; }
        finishLogin(user);
      });
      return;
    }

    // stage === "enter"
    A.signIn(user.legajo, pwd).then((res) => {
      if (res.error) { setErr(res.error); setBusy(false); return; }
      if (res.mustChange) {
        setUser(res.user); setForced(true); setPwd(""); setPwd2(""); setBusy(false); setStage("create");
        return;
      }
      finishLogin(res.user);
    });
  }

  function reset() { setStage("id"); setUser(null); setPwd(""); setPwd2(""); setErr(""); setForced(false); setBusy(false); }

  const brand = gh("div", { className: "start-brand" },
    gh("span", { className: "start-logo" },
      gh("img", { src: (window.__resources && window.__resources.logo) || "assets/logo-cultiva-color.png", alt: "Programa Cultiva" })),
    gh("div", null,
      gh("div", { className: "start-kicker" }, "Programa Cultiva"),
      gh("div", { className: "start-prog" }, "Liderazgo en acción"),
    ),
  );

  function field(props) {
    return gh("input", Object.assign({
      className: "login-input",
      onKeyDown: (e) => { if (e.key === "Enter") (stage === "id" ? continuar() : submitPwd()); },
    }, props));
  }

  let body;
  if (stage === "id") {
    body = gh("div", { className: "login-card", key: "id" },
      gh("h1", { className: "login-q" }, "Ingresa a tu Kit Cultiva"),
      gh("p", { className: "login-hint" }, "Ingresa tu número de LEGAJO (10+DNI)."),
      gh("label", { className: "login-l" }, "LEGAJO"),
      field({ ref: idRef, value: idv, placeholder: "10XXXXXXXX", inputMode: "numeric",
        onChange: (e) => { setIdv(e.target.value); if (err) setErr(""); } }),
      err ? gh("div", { className: "login-err" }, GI("alert-circle", "ico-xs"), err) : null,
      gh("button", { className: "login-btn", type: "button", onClick: continuar, disabled: busy },
        busy ? "Verificando…" : "Continuar", GI("arrow-right", "ico-sm")),
    );
  } else {
    const creating = stage === "create";
    const uname = user && (user.nombre || ("Legajo " + user.legajo));
    const urole = user && (user.cargo || "Programa Cultiva");
    body = gh("div", { className: "login-card", key: "pwd" },
      gh("button", { className: "login-back", type: "button", onClick: reset },
        GI("chevron-left", "ico-sm"), "Cambiar usuario"),
      gh("div", { className: "login-user" },
        gh("span", { className: "login-avatar" }, (uname || "?").slice(0, 1)),
        gh("div", null,
          gh("div", { className: "login-user-name" }, uname),
          gh("div", { className: "login-user-role" }, urole),
        ),
      ),
      gh("h1", { className: "login-q" }, creating ? "Crea tu contraseña" : "Hola de nuevo"),
      gh("p", { className: "login-hint" },
        creating
          ? (forced ? "Por seguridad, define una contraseña nueva para tu cuenta."
                    : "Es tu primer ingreso. Define una contraseña para tu cuenta.")
          : "Ingresa tu contraseña para continuar."),
      gh("label", { className: "login-l" }, creating ? "Nueva contraseña" : "Contraseña"),
      field({ type: "password", value: pwd, placeholder: "••••••••",
        onChange: (e) => { setPwd(e.target.value); if (err) setErr(""); } }),
      creating ? gh("label", { className: "login-l" }, "Repite la contraseña") : null,
      creating ? field({ type: "password", value: pwd2, placeholder: "••••••••",
        onChange: (e) => { setPwd2(e.target.value); if (err) setErr(""); } }) : null,
      err ? gh("div", { className: "login-err" }, GI("alert-circle", "ico-xs"), err) : null,
      gh("button", { className: "login-btn", type: "button", onClick: submitPwd, disabled: busy },
        busy ? "Un momento…" : (creating ? "Crear y entrar" : "Entrar"), GI("arrow-right", "ico-sm")),
    );
  }

  return gh("div", { className: "screen start login" },
    brand,
    gh("div", { className: "login-body" }, body),
    gh("div", { className: "login-review" },
      gh("span", { className: "login-review-star" }, "*"),
      gh("button", { className: "login-review-btn", type: "button", onClick: onReview },
        GI("key-round", "ico-xs"), "Acceso de revisión (temporal)"),
      gh("span", { className: "login-review-note" }, "Entra sin restricciones a cualquier área y perfil. Se retira al cierre de la revisión."),
    ),
  );
}

window.LoginScreen = LoginScreen;
