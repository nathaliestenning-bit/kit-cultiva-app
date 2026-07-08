/* ============================================================
   APP · KIT CULTIVA — COSECHA (N1–N4) + ESCALADAS
   Flujo: START (área → perfil) → GALLERY → DETAIL / ESCALADAS
   Data-driven: lee window.PROFILES / AREAS / DIMS / TEMAS.
   ============================================================ */
const { createElement: h, useState, useEffect, useRef } = React;
const I = (name, cls) => h("i", { "data-lucide": name, className: cls || "" });

/* a quién escala cada perfil su ritual de escucha (origen de escaladas) */
const ESCALATE_TO = { "cos-n4": "Supervisor de Fundo", "prod-n4": "Jefe de Producción de Área", "pack-n4": "Jefe de Producción de Planta", "cal-tac": "Supervisor de Calidad" };

/* ---------- pantalla inicial: área → perfil ---------------- */
function Start({ onEnter, onBackToLogin }) {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState(null);
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const areaDef = window.AREAS.find((a) => a.id === area);
  const puestos = area ? (window.PROFILES_BY_AREA[area] || []) : [];

  return h("div", { className: "screen start" },
    h("div", { className: "start-brand" },
      h("span", { className: "start-logo" }, h("img", { src: (window.__resources && window.__resources.logo) || "../assets/logo-cultiva-color.png", alt: "Programa Cultiva" })),
      h("div", null,
        h("div", { className: "start-kicker" }, "Programa Cultiva"),
        h("div", { className: "start-prog" }, "Liderazgo en acción"),
      ),
    ),
    h("div", { className: "start-steps" },
      h("span", { className: "stepdot" + (step >= 1 ? " on" : "") }),
      h("span", { className: "stepline" + (step >= 2 ? " on" : "") }),
      h("span", { className: "stepdot" + (step >= 2 ? " on" : "") }),
    ),

    step === 1
      ? h("div", { className: "start-body", key: "s1" },
          h("div", { className: "review-banner" },
            I("key-round", "ico-xs"),
            h("span", null, h("b", null, "Acceso de revisión*"), " — sin restricciones a todas las áreas y perfiles."),
            onBackToLogin ? h("button", { className: "review-exit", type: "button", onClick: onBackToLogin }, "Salir") : null,
          ),
          h("h1", { className: "start-q" }, "¿A qué área perteneces?"),
          h("p", { className: "start-hint" }, "Selecciona un área para revisar sus rituales."),
          h("div", { className: "area-grid" },
            window.AREAS.map((a) =>
              h("button", {
                key: a.id, type: "button",
                className: "area-card" + (a.ready ? "" : " soon"),
                disabled: !a.ready,
                onClick: () => { if (a.ready) { setArea(a.id); setStep(2); } },
              },
                h("span", { className: "area-ico" }, I(a.icon)),
                h("span", { className: "area-name" }, a.label),
                a.ready ? null : h("span", { className: "soon-tag" }, "Próximamente"),
              )),
          ),
        )
      : h("div", { className: "start-body", key: "s2" },
          h("button", { className: "back-link", type: "button", onClick: () => setStep(1) },
            I("chevron-left", "ico-sm"), "Cambiar área"),
          h("div", { className: "start-area-pill" }, I(areaDef.icon, "ico-sm"), areaDef.label),
          h("h1", { className: "start-q" }, "¿Cuál es tu puesto?"),
          h("p", { className: "start-hint" }, "Entrarás directo a los rituales de tu puesto."),
          h("div", { className: "puesto-list" },
            puestos.map((p) =>
              h("button", {
                key: p.id, type: "button", className: "puesto-card",
                onClick: () => onEnter(p.id),
              },
                h("span", { className: "puesto-ico" }, I("user-round"),
                  h("span", { className: "puesto-lvl" }, p.level)),
                h("span", { className: "puesto-txt" },
                  h("span", { className: "puesto-name" }, p.role),
                  h("span", { className: "puesto-sub" }, p.sub),
                ),
                I("arrow-right", "ico-sm"),
              )),
          ),
        ),
  );
}

/* ---------- franjas (light + escaladas) -------------------- */
function DayStrip({ ritual, foot }) {
  const dim = window.DIMS[ritual.dimension];
  return h("div", { className: "day-strip" + (foot ? " foot" : " slim"), style: { "--dc": dim.color } },
    h("span", { className: "ds-ico" }, I(ritual.icon)),
    h("span", { className: "ds-txt" },
      h("span", { className: "ds-title" }, ritual.title),
      h("span", { className: "ds-reminder" }, ritual.reminder),
    ),
  );
}
function EscStrip({ ritual, count, onOpen }) {
  return h("button", { className: "esc-strip", type: "button", onClick: onOpen,
    style: { "--esc": window.DIMS.escucha.color } },
    h("span", { className: "ds-ico" }, I(ritual.icon)),
    h("span", { className: "ds-txt" },
      h("span", { className: "ds-title" }, ritual.title),
      h("span", { className: "ds-reminder" }, "Revisa lo que tu equipo escaló hoy."),
    ),
    h("span", { className: "esc-badge" + (count === 0 ? " zero" : "") }, count, " ", I("inbox", "ico-xs")),
    I("chevron-right", "esc-chev"),
  );
}

/* ---------- encabezado de dimensión (mismo formato, sin número) ---------- */
function DimHeader({ dim }) {
  const def = window.DIMS[dim];
  if (!def) return null;
  return h("div", { className: "dim-head", style: { "--dc": def.color, padding: "0 18px", margin: "16px 0 0" } },
    h("span", { className: "dim-dot" }),
    h("span", { className: "dim-label" }, def.label),
  );
}

/* ---------- gallery ---------------------------------------- */
function Gallery({ profile, onOpen, onBack, onEscaladas, onEquipo, userName }) {
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const areaDef = window.AREAS.find((a) => a.id === profile.area) || { icon: "wheat", label: "" };
  const R = profile.rituals;
  const inicio = R.filter((r) => r.kind === "light" && /inicio/i.test(r.freq));
  const cierre = R.filter((r) => r.kind === "light" && !/inicio/i.test(r.freq));
  const escaladas = R.filter((r) => r.kind === "escaladas");
  const groups = window.DIM_ORDER
    .map((d) => ({ dim: d, def: window.DIMS[d], items: R.filter((r) => r.dimension === d && r.kind === "full") }))
    .filter((g) => g.items.length);
  const escCount = (window.ESCALADAS_DEMO[profile.id] || []).length;

  // puntos de la semana (tope 100)
  const [pts, setPts] = useState(null);
  useEffect(() => {
    let alive = true; const D = window.CultivaData;
    if (D && D.listRegistrosPerfil) {
      D.listRegistrosPerfil(profile.id)
        .then((regs) => { if (alive) setPts(D.puntosDe(regs, D.weekStartTs())); })
        .catch(() => { if (alive) setPts(0); });
    }
    return () => { alive = false; };
  }, [profile.id]);
  const ptsCap = Math.min(pts || 0, 100);

  return h("div", { className: "screen gallery" },
    h("div", { className: "topbar" },
      h("button", { className: "icon-btn", type: "button", onClick: onBack, "aria-label": userName ? "Cerrar sesión" : "Cambiar puesto" }, I(userName ? "log-out" : "chevron-left")),
      h("div", { className: "topbar-id" },
        h("span", { className: "topbar-role" }, profile.role),
        h("span", { className: "topbar-area" }, I(areaDef.icon, "ico-xs"), areaDef.label,
          h("span", { className: "topbar-lvl" }, profile.level)),
      ),
    ),

    h("div", { style: { margin: "14px 18px 0", background: "#fff", border: "1px solid #eadfd0", borderRadius: "12px", padding: "12px 14px" } },
      h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", marginBottom: "8px", color: "#5a4a38" } },
        h("span", null, I("star", "ico-xs"), " Tus puntos · esta semana"),
        h("b", null, (pts == null ? "…" : pts) + " / 100")),
      h("div", { style: { height: "10px", background: "#f0e7da", borderRadius: "999px", overflow: "hidden" } },
        h("div", { style: { height: "100%", width: ptsCap + "%", background: "#C9651C", borderRadius: "999px", transition: "width .3s" } })),
    ),

    (["N1", "N2", "N3"].indexOf(profile.level) >= 0) ? h("button", {
      type: "button", onClick: onEquipo,
      style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
        margin: "10px 18px 0", width: "calc(100% - 36px)", padding: "11px", borderRadius: "12px",
        border: "1px solid #cdd7d9", background: "#eef4f5", color: "#2F6E7A", fontSize: "14px", cursor: "pointer" },
    }, I("users", "ico-sm"), "Ver a mi equipo") : null,

    inicio.length ? h(DimHeader, { key: "ih", dim: inicio[0].dimension }) : null,
    inicio.map((r) => h(DayStrip, { key: r.id, ritual: r })),

    h("div", { className: "gallery-head" },
      userName ? h("p", { className: "gallery-hi" }, "Hola, ", h("b", null, userName)) : null,
      h("h1", { className: "gallery-title" }, "Tus rituales"),
      h("p", { className: "gallery-sub" }, "Elige uno para ver el detalle."),
    ),

    groups.map((g) =>
      h("section", { key: g.dim, className: "dim-group" },
        h("div", { className: "dim-head", style: { "--dc": g.def.color } },
          h("span", { className: "dim-dot" }),
          h("span", { className: "dim-label" }, g.def.label),
        ),
        h("div", { className: "thumb-grid" },
          g.items.map((r) =>
            h("button", {
              key: r.id, type: "button", className: "thumb", style: { "--dc": g.def.color },
              onClick: () => onOpen(r.id),
            },
              h("span", { className: "thumb-top" },
                h("span", { className: "thumb-ico" }, I(r.icon)),
              ),
              h("span", { className: "thumb-name" }, r.title),
              h("span", { className: "thumb-freq" }, I("repeat", "ico-xs"), r.freq),
            )),
        ),
      )),

    escaladas.length ? h(DimHeader, { key: "eh", dim: escaladas[0].dimension }) : null,
    escaladas.map((r) => h(EscStrip, { key: r.id, ritual: r, count: escCount, onOpen: onEscaladas })),
    cierre.length ? h(DimHeader, { key: "ch", dim: cierre[0].dimension }) : null,
    cierre.map((r) => h(DayStrip, { key: r.id, ritual: r, foot: true })),
  );
}

/* ---------- acordeón --------------------------------------- */
function Accordion({ icon, title, color, children, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return h("div", { className: "acc" + (open ? " open" : ""), style: color ? { "--ac": color } : null },
    h("button", { className: "acc-h", type: "button", onClick: () => setOpen(!open) },
      I(icon, "ico-sm"),
      h("span", { className: "acc-title" }, title),
      I(open ? "chevron-up" : "chevron-down", "ico-sm acc-chev"),
    ),
    open ? h("div", { className: "acc-body" }, children) : null,
  );
}

/* ---------- ayuda-memoria gráfica de temas ----------------- */
function TemasHelp() {
  return h("div", { className: "temas-help" },
    h("p", { className: "temas-help-intro" },
      "Cuando registres un tema, lo clasificas en una de estas opciones. Tenlas presentes mientras escuchas:"),
    window.TEMAS.grupos.map((g) =>
      h("div", { key: g.id, className: "temas-cat" },
        h("span", { className: "temas-cat-h", style: { "--tc": g.color } },
          h("span", { className: "dot" }), g.label),
        h("div", { className: "temas-chips" },
          g.items.map((it) =>
            h("div", { key: it.id, className: "tema-chip", style: { "--tc": g.color } },
              h("span", { className: "tc-ico" }, I(it.icon)),
              h("span", { className: "tc-label" }, it.label),
            ))),
      )),
  );
}

/* ---------- detalle de un ritual --------------------------- */
function Detail({ profile, ritual, onBack }) {
  const dim = window.DIMS[ritual.dimension];
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [ritual.id]);

  const doneKey = "cultiva3:done:" + profile.id + ":" + ritual.id;
  const todayStr = new Date().toISOString().slice(0, 10);
  const [done, setDone] = useState(() => {
    try { return localStorage.getItem(doneKey) === todayStr; } catch (e) { return false; }
  });
  function toggleDone() {
    const next = !done; setDone(next);
    try { next ? localStorage.setItem(doneKey, todayStr) : localStorage.removeItem(doneKey); } catch (e) {}
    // al marcarlo hecho, registra el ritual como aplicado (para puntos)
    if (next && window.CultivaData && window.CultivaData.registrarHecho) {
      window.CultivaData.registrarHecho(profile.id, ritual.id).catch(() => {});
    }
  }

  const isEscucha = ritual.registro && ritual.registro.escuchaTemas;
  // autoBroadcast: la subida a la cadena es automática al guardar → sin botón "Escalar" manual
  const canEscalate = ritual.registro && (ritual.registro.escuchaTemas || ritual.registro.escalates) && !ritual.registro.autoBroadcast;

  return h("div", { className: "screen detail", style: { "--dc": dim.color } },
    h("div", { className: "topbar" },
      h("button", { className: "icon-btn", type: "button", onClick: onBack, "aria-label": "Volver a la galería" }, I("arrow-left")),
      h("span", { className: "detail-dim", style: { color: dim.color } },
        h("span", { className: "dim-dot", style: { width: 10, height: 10, borderRadius: "50%", background: dim.color, display: "inline-block" } }), dim.label),
    ),

    h("div", { className: "detail-scroll" },
      h("div", { className: "detail-hero" },
        h("span", { className: "detail-ico" }, I(ritual.icon)),
        h("h1", { className: "detail-title" }, ritual.title),
        h("span", { className: "detail-freq" }, I("repeat", "ico-xs"), ritual.freq),
      ),

      ritual.kind === "light"
        ? h("div", { className: "light-wrap" },
            h("div", { className: "reminder" },
              I("quote", "reminder-q"),
              h("p", null, ritual.reminder),
            ),
            h("button", { className: "done-btn" + (done ? " on" : ""), type: "button", onClick: toggleDone },
              I(done ? "check-circle-2" : "circle", "ico-sm"),
              done ? "Hecho hoy" : "Marcar como hecho hoy"),
          )
        : h("div", { className: "full-wrap" },
            ritual.purpose ? h("p", { className: "purpose" }, ritual.purpose) : null,

            ritual.context ? h("div", { className: "ctx" },
              ritual.context.freq ? h("div", { className: "ctx-row" }, I("repeat", "ico-xs"), h("span", null, ritual.context.freq)) : null,
              ritual.context.when ? h("div", { className: "ctx-row" }, I("clock", "ico-xs"), h("span", null, ritual.context.when)) : null,
              ritual.context.place ? h("div", { className: "ctx-row" }, I("map-pin", "ico-xs"), h("span", null, ritual.context.place)) : null,
            ) : null,

            ritual.steps ? h("div", { className: "steps-block" },
              h("div", { className: "block-h" }, I("list-checks", "ico-sm"), "Paso a paso"),
              h("ol", { className: "steps" },
                ritual.steps.map((s, i) =>
                  h("li", { key: i, className: "step" },
                    h("span", { className: "num" }, i + 1),
                    h("span", { className: "step-body" },
                      s.k ? h("b", { className: "step-k" }, s.k + " — ") : null,
                      h("span", { className: "step-t" }, s.t)),
                  )),
              ),
            ) : null,

            ritual.note ? h("div", { className: "note" }, I("lightbulb", "ico-xs"), h("span", null, ritual.note)) : null,

            ritual.phrases ? h(Accordion, { icon: "quote", title: "Frases que ayudan", color: dim.color },
              h("div", { className: "phrases" },
                ritual.phrases.map((p, i) => h("div", { key: i, className: "phrase" }, "“", p, "”")))) : null,

            // Escucha: ayuda-memoria gráfica en vez de "Qué NO hacer"
            isEscucha
              ? h(Accordion, { icon: "list-tree", title: "Temas que puedes recoger", color: dim.color, defaultOpen: false },
                  h(TemasHelp))
              : (ritual.no ? h(Accordion, { icon: "x-circle", title: "Qué NO hacer", color: "#A81519" },
                  h("ul", { className: "no-list" }, ritual.no.map((x, i) => h("li", { key: i }, x)))) : null),

            (ritual.registro && !ritual.registro.hidden) ? h(Accordion, { icon: "square-pen", title: "Registrar", color: "#4156A2", defaultOpen: true },
              h(window.CultivaRegistroForm, {
                ritual: ritual, profileId: profile.id,
                escalateTo: canEscalate ? ESCALATE_TO[profile.id] : null,
              })) : null,

            // rituales "full" SIN formulario de registro: botón para marcar "se realizó"
            (!ritual.registro || ritual.registro.hidden) ? h("button", { className: "done-btn" + (done ? " on" : ""), type: "button", onClick: toggleDone },
              I(done ? "check-circle-2" : "circle", "ico-sm"),
              done ? "Se realizó" : "Marcar como realizado") : null,
          ),
    ),
  );
}

/* ---------- Mi equipo (solo lectura, por jerarquía) -------- */
function MiEquipo({ profile, onBack }) {
  const D = window.CultivaData;
  const [team, setTeam] = useState([]);
  const [escs, setEscs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let alive = true; setLoaded(false);
    Promise.all([
      D && D.equipoPuntos ? D.equipoPuntos(profile.id) : Promise.resolve([]),
      D && D.equipoEscaladas ? D.equipoEscaladas(profile.id) : Promise.resolve([]),
    ]).then((res) => { if (!alive) return; setTeam(res[0] || []); setEscs(res[1] || []); setLoaded(true); })
      .catch(() => { if (alive) setLoaded(true); });
    return () => { alive = false; };
  }, [profile.id]);
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  function fmt(ts) { try { return new Date(ts).toLocaleDateString("es-PE", { day: "2-digit", month: "short" }); } catch (e) { return ""; } }

  return h("div", { className: "screen" },
    h("div", { className: "topbar" },
      h("button", { className: "icon-btn", type: "button", onClick: onBack, "aria-label": "Volver" }, I("arrow-left")),
      h("div", { className: "topbar-id" },
        h("span", { className: "topbar-role" }, "Mi equipo"),
        h("span", { className: "topbar-area" }, I("users", "ico-xs"), "Puntos y escaladas de tu equipo")),
    ),
    !loaded ? null : h("div", { style: { padding: "16px 18px" } },
      h("h2", { style: { fontSize: "18px", margin: "6px 0 8px" } }, "Puntos de la semana"),
      team.length === 0
        ? h("p", { style: { color: "#8a7a68", fontSize: "14px" } }, "Aún no hay actividad de tu equipo esta semana.")
        : team.map((m, i) => {
            const cap = Math.min(m.puntos || 0, 100);
            return h("div", { key: m.legajo || i, style: { margin: "12px 0" } },
              h("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "5px", color: "#5a4a38" } },
                h("span", null, h("b", null, m.nombre), m.nivel ? h("span", { style: { color: "#9a8a78" } }, " · " + m.nivel) : null),
                h("b", null, (m.puntos || 0) + " / 100")),
              h("div", { style: { height: "9px", background: "#f0e7da", borderRadius: "999px", overflow: "hidden" } },
                h("div", { style: { height: "100%", width: cap + "%", background: "#C9651C", borderRadius: "999px" } })));
          }),
      h("h2", { style: { fontSize: "18px", margin: "24px 0 8px" } }, "Escaladas del equipo"),
      escs.length === 0
        ? h("p", { style: { color: "#8a7a68", fontSize: "14px" } }, "Sin escaladas de tu equipo.")
        : escs.map((e, i) =>
            h("div", { key: e.id || i, style: { border: "1px solid #e6ddcf", borderRadius: "10px", padding: "10px 12px", margin: "8px 0" } },
              h("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#8a7a68" } },
                h("span", null, (e.from_nombre || "—") + (e.nivel ? " · " + e.nivel : "")),
                h("span", null, fmt(e.created_at))),
              h("div", { style: { fontSize: "14px", fontWeight: 500, margin: "3px 0" } }, e.tema),
              h("div", { style: { fontSize: "13px", color: "#5a4a38" } }, e.detalle),
              (e.status && e.status !== "pendiente") ? h("div", { style: { fontSize: "11px", color: "#18571F", marginTop: "4px" } }, "Estado: " + e.status) : null)),
    ),
  );
}

/* ---------- contenedor principal --------------------------- */
function CosechaApp() {
  const [view, setView] = useState("login");        // login | start | gallery | detail | escaladas
  const [accessMode, setAccessMode] = useState(null); // 'user' | 'review'
  const [user, setUser] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [view, activeId]);

  // Restaurar sesión de Supabase al cargar (en modo demo no hace nada)
  useEffect(() => {
    if (!window.CultivaAuth) return;
    window.CultivaAuth.restore().then((p) => {
      if (p && p.user && window.PROFILES[p.user.perfil]) {
        setUser(p.user); setProfileId(p.user.perfil); setAccessMode("user"); setView("gallery");
      }
    }).catch(() => {});
  }, []);

  const profile = profileId ? window.PROFILES[profileId] : null;
  const ritual = profile && activeId ? profile.rituals.find((r) => r.id === activeId) : null;

  function logout() {
    if (window.CultivaAuth) window.CultivaAuth.signOut().catch(() => {});
    setUser(null); setProfileId(null); setActiveId(null); setAccessMode(null); setView("login");
  }
  function galleryBack() {
    if (accessMode === "user") { logout(); }
    else { setProfileId(null); setView("start"); }
  }

  return h("div", { className: "app", ref: scrollRef },
    view === "login" ? h(window.LoginScreen, {
      onLogin: (u) => { setUser(u); setProfileId(u.perfil); setAccessMode("user"); setView("gallery"); },
      onReview: () => { setUser(null); setProfileId(null); setAccessMode("review"); setView("start"); },
    }) : null,
    view === "start" ? h(Start, {
      onEnter: (pid) => { setProfileId(pid); setView("gallery"); },
      onBackToLogin: () => { setProfileId(null); setView("login"); },
    }) : null,
    view === "gallery" && profile ? h(Gallery, {
      profile: profile,
      userName: accessMode === "user" && user ? user.nombre : null,
      onOpen: (id) => { setActiveId(id); setView("detail"); },
      onEscaladas: () => setView("escaladas"),
      onEquipo: () => setView("equipo"),
      onBack: galleryBack,
    }) : null,
    view === "equipo" && profile ? h(MiEquipo, {
      profile: profile, onBack: () => setView("gallery"),
    }) : null,
    view === "detail" && ritual ? h(Detail, {
      profile: profile, ritual: ritual, onBack: () => setView("gallery"),
    }) : null,
    view === "escaladas" && profile ? h(window.EscaladasInbox, {
      profile: profile, onBack: () => setView("gallery"),
    }) : null,
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(CosechaApp));
