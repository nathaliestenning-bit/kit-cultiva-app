/* ============================================================
   LOGIN · acceso SOLO con LEGAJO (sin contraseña)
   El usuario teclea su número de legajo y entra directo a su
   perfil. Por detrás, window.CultivaAuth usa el legajo como
   contraseña para mantener sesión + RLS de Supabase (en modo
   demo solo resuelve contra el padrón local).
   Incluye acceso de REVISIÓN TEMPORAL marcado con *.
   ============================================================ */
const { createElement: gh, useState: gUse, useEffect: gEff, useRef: gRef } = React;
const GI = (n, c) => gh("i", { "data-lucide": n, className: c || "" });

function LoginScreen({ onLogin, onReview, onMaestro }) {
  const [idv, setIdv] = gUse("");
  const [err, setErr] = gUse("");
  const [busy, setBusy] = gUse(false);
  const idRef = gRef(null);

  const A = window.CultivaAuth;

  gEff(() => { if (window.lucide) window.lucide.createIcons(); });
  gEff(() => { if (idRef.current) idRef.current.focus(); }, []);

  function entrar() {
    if (busy) return;
    const legajo = idv.trim();
    if (!legajo) { setErr("Ingresa tu número de legajo."); return; }
    setBusy(true); setErr("");
    A.signInByLegajo(legajo).then((res) => {
      if (res.error) { setErr(res.error); setBusy(false); return; }
      const u = res.user;
      if (!u.perfil || !window.PROFILES[u.perfil]) {
        setErr("Tu perfil (" + (u.perfil || "—") + ") aún no está disponible en la app."); setBusy(false); return;
      }
      onLogin(u);
    }).catch(() => { setErr("No se pudo ingresar. Intenta de nuevo."); setBusy(false); });
  }

  const brand = gh("div", { className: "start-brand" },
    gh("span", { className: "start-logo" },
      gh("img", { src: (window.__resources && window.__resources.logo) || "assets/logo-cultiva-color.png", alt: "Programa Cultiva" })),
    gh("div", null,
      gh("div", { className: "start-kicker" }, "Programa Cultiva"),
      gh("div", { className: "start-prog" }, "Liderazgo en acción"),
    ),
  );

  const body = gh("div", { className: "login-card", key: "id" },
    gh("h1", { className: "login-q" }, "Ingresa a tu Kit Cultiva"),
    gh("p", { className: "login-hint" }, "Ingresa tu número de LEGAJO (10+DNI) para entrar."),
    gh("label", { className: "login-l" }, "LEGAJO"),
    gh("input", {
      ref: idRef, className: "login-input", value: idv, placeholder: "10XXXXXXXX", inputMode: "numeric",
      onChange: (e) => { setIdv(e.target.value); if (err) setErr(""); },
      onKeyDown: (e) => { if (e.key === "Enter") entrar(); },
    }),
    err ? gh("div", { className: "login-err" }, GI("alert-circle", "ico-xs"), err) : null,
    gh("button", { className: "login-btn", type: "button", onClick: entrar, disabled: busy },
      busy ? "Ingresando…" : "Ingresar", GI("arrow-right", "ico-sm")),
  );

  return gh("div", { className: "screen start login" },
    brand,
    gh("div", { className: "login-body" }, body),
    onMaestro ? gh("button", { className: "login-maestro-btn", type: "button", onClick: onMaestro },
      GI("graduation-cap", "ico-sm"), "Soy maestro") : null,
    gh("div", { className: "login-review" },
      gh("span", { className: "login-review-star" }, "*"),
      gh("button", { className: "login-review-btn", type: "button", onClick: onReview },
        GI("key-round", "ico-xs"), "Acceso de revisión (temporal)"),
      gh("span", { className: "login-review-note" }, "Entra sin restricciones a cualquier área y perfil. Se retira al cierre de la revisión."),
    ),
  );
}

window.LoginScreen = LoginScreen;
