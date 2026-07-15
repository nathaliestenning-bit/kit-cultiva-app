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
function Start({ onEnter, onBackToLogin, backLabel }) {
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
            onBackToLogin ? h("button", { className: "review-exit", type: "button", onClick: onBackToLogin }, backLabel || "Salir") : null,
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
/* ---------- banner de seguimientos de hoy ------------------ */
function SeguimientosBanner({ segs, open, onToggle, onOpenRitual, onEscaladas, ritualsById }) {
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  if (!segs) return null;
  const total = segs.propios.length + segs.porResolver;
  if (total === 0 && !segs.enviadasPendientes) return null;
  return h("div", { className: "segs-banner" + (open ? " open" : "") },
    h("button", { className: "segs-h", type: "button", onClick: onToggle },
      I("bell", "ico-sm"),
      h("span", null, "Tienes ", h("b", null, total), " seguimiento", total === 1 ? "" : "s", " para hoy"),
      I(open ? "chevron-up" : "chevron-down", "ico-xs"),
    ),
    open ? h("div", { className: "segs-list" },
      segs.propios.map((p, i) =>
        h("button", { key: "p" + i, type: "button", className: "segs-item", onClick: () => onOpenRitual(p.ritual_id) },
          I("calendar-check", "ico-xs"),
          h("span", null, "Seguimiento pactado en ", (ritualsById[p.ritual_id] || {}).title || p.ritual_id))),
      segs.porResolver > 0 ? h("button", { className: "segs-item alert", type: "button", onClick: onEscaladas },
        I("inbox", "ico-xs"), h("span", null, "Tienes ", segs.porResolver, " escalada(s) por resolver hoy")) : null,
      segs.enviadasPendientes > 0 ? h("div", { className: "segs-item info" },
        I("clock", "ico-xs"), h("span", null, "Tu líder aún no resuelve ", segs.enviadasPendientes, " tema(s) que escalaste")) : null,
    ) : null,
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

/* ---------- tarjeta de puntos (expandible con explicativo) ---------- */
const PUNTOS_INFO = [
  { icon: "star", h: "¿Qué son los puntos Cultiva?",
    t: "Reconocen a los líderes que aplican sus rituales en campo. Cada ritual que registras —liderar, valorar y escuchar a tu equipo— suma puntos. Son la forma de hacer visible y tangible lo que haces cada día para fortalecer a tu equipo." },
  { icon: "plus-circle", h: "¿Cómo se suman?",
    t: "Cada ejecución de un ritual suma 10 puntos, y cada registro extra en un mismo ritual suma 3 puntos." },
  { icon: "shield-check", h: "Validación de puntos",
    t: "Los registros que hagas serán revisados para asegurar que la información sea veraz y esté debidamente sustentada." },
];
/* Panel de puntos: se abre desde el chip del encabezado (esquina sup. derecha).
   Muestra el progreso semanal + explicativo + "Ver a mi equipo". */
function PuntosModal({ pts, level, onEquipo, onClose }) {
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const ptsCap = Math.min(pts || 0, 100);
  const canEquipo = ["N1", "N2", "N3"].indexOf(level) >= 0;
  return h("div", { className: "pts-overlay", onClick: onClose },
    h("div", { className: "pts-modal", onClick: (e) => e.stopPropagation() },
      h("div", { className: "pts-modal-h" },
        h("span", null, I("star", "ico-xs"), " Tus puntos · esta semana"),
        h("button", { className: "pts-close", type: "button", onClick: onClose, "aria-label": "Cerrar" }, I("x")),
      ),
      h("div", { style: { fontSize: "30px", fontWeight: 800, color: "#C9651C", margin: "2px 0 8px" } }, (pts == null ? "…" : pts) + " / 100"),
      h("div", { style: { height: "10px", background: "#f0e7da", borderRadius: "999px", overflow: "hidden" } },
        h("div", { style: { height: "100%", width: ptsCap + "%", background: "#C9651C", borderRadius: "999px", transition: "width .3s" } })),
      h("div", { style: { marginTop: "12px", borderTop: "1px solid #f0e7da", paddingTop: "6px" } },
        PUNTOS_INFO.map((s, i) =>
          h("div", { key: i, style: { display: "flex", gap: "9px", margin: "10px 0" } },
            h("span", { style: { color: "#C9651C", flexShrink: 0, marginTop: "1px" } }, I(s.icon, "ico-sm")),
            h("div", null,
              h("div", { style: { fontSize: "13px", fontWeight: 700, color: "#3a2f22" } }, s.h),
              h("div", { style: { fontSize: "12.5px", color: "#5a4a38", lineHeight: 1.45, marginTop: "2px" } }, s.t))))),
      canEquipo ? h("button", { type: "button", onClick: onEquipo,
        style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
          marginTop: "4px", width: "100%", padding: "11px", borderRadius: "12px",
          border: "1px solid #cdd7d9", background: "#eef4f5", color: "#2F6E7A", fontSize: "14px", cursor: "pointer" } },
        I("users", "ico-sm"), "Ver a mi equipo") : null,
    ),
  );
}

/* nombre corto para el saludo. Padrón real: "APELLIDO_P APELLIDO_M NOMBRE1
   NOMBRE2" → "Nombre1 ApellidoP". Si viene "Nombre Apellido" (2 palabras, demo)
   lo respeta. */
function nombreCorto(full) {
  if (!full) return "";
  const t = String(full).trim().split(/\s+/);
  const cap = (w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : "");
  let nombre, apellido;
  if (t.length >= 3) { nombre = t[2]; apellido = t[0]; }
  else if (t.length === 2) { nombre = t[0]; apellido = t[1]; }
  else return cap(t[0] || "");
  return cap(nombre) + " " + cap(apellido);
}

/* ---------- gallery ---------------------------------------- */
function Gallery({ profile, onOpen, onBack, onEscaladas, onEquipo, userName }) {
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const areaDef = window.AREAS.find((a) => a.id === profile.area) || { icon: "wheat", label: "" };
  const R = profile.rituals;
  const inicio = R.filter((r) => r.kind === "light" && /saludo|inicio/i.test(r.id + " " + r.freq));
  const cierre = R.filter((r) => r.kind === "light" && !/saludo|inicio/i.test(r.id + " " + r.freq));
  const escaladas = R.filter((r) => r.kind === "escaladas");
  const groups = window.DIM_ORDER
    .map((d) => ({ dim: d, def: window.DIMS[d], items: R.filter((r) => r.dimension === d && (r.kind === "full" || r.kind === "escaladas")) }))
    .filter((g) => g.items.length);
  const escCount = (window.ESCALADAS_DEMO[profile.id] || []).length;
  const ritualsById = {}; R.forEach((r) => { ritualsById[r.id] = r; });

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

  const [ptsOpen, setPtsOpen] = useState(false);   // panel de puntos (desde el chip)

  // seguimientos de hoy (fecha propia + escaladas por vencer)
  const [segs, setSegs] = useState(null);
  const [segsOpen, setSegsOpen] = useState(false);
  useEffect(() => {
    let alive = true; const D = window.CultivaData;
    if (D && D.seguimientosHoy) {
      D.seguimientosHoy(profile.id).then((r) => { if (alive) setSegs(r); })
        .catch(() => { if (alive) setSegs({ propios: [], porResolver: 0, enviadasPendientes: 0 }); });
    }
    return () => { alive = false; };
  }, [profile.id]);

  return h("div", { className: "screen gallery" },
    h("div", { className: "topbar" },
      h("button", { className: "icon-btn icon-btn-sm", type: "button", onClick: onBack, "aria-label": userName ? "Cerrar sesión" : "Cambiar puesto" }, I(userName ? "log-out" : "chevron-left")),
      h("div", { className: "topbar-id" },
        h("span", { className: "topbar-role topbar-role-sm" }, profile.role),
      ),
      h("button", { className: "topbar-pts", type: "button", onClick: () => setPtsOpen(true), "aria-label": "Ver tus puntos" },
        I("star", "ico-xs"), h("b", null, (pts == null ? "…" : pts) + "/100")),
    ),

    ptsOpen ? h(PuntosModal, { pts: pts, level: profile.level, onEquipo: onEquipo, onClose: () => setPtsOpen(false) }) : null,

    h(SeguimientosBanner, {
      segs: segs, open: segsOpen, onToggle: () => setSegsOpen(!segsOpen),
      onOpenRitual: onOpen, onEscaladas: onEscaladas, ritualsById: ritualsById,
    }),

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
          g.items.map((r) => {
            const isEsc = r.kind === "escaladas";
            return h("button", {
              key: r.id, type: "button", className: "thumb" + (isEsc ? " thumb-esc" : ""),
              style: { "--dc": g.def.color },
              onClick: () => onOpen(r.id),
            },
              h("span", { className: "thumb-top" },
                h("span", { className: "thumb-ico" }, I(r.icon)),
                isEsc ? h("span", { className: "esc-badge" + (escCount === 0 ? " zero" : ""), style: { marginLeft: "auto" } }, escCount, " ", I("inbox", "ico-xs")) : null,
              ),
              h("span", { className: "thumb-name" }, r.title),
              h("span", { className: "thumb-freq" }, I("repeat", "ico-xs"), r.freq),
            );
          }),
        ),
      )),

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

/* ---------- videos por ritual ----------
   Alojados en Supabase Storage (bucket público "videos"). Sube cada archivo
   con EXACTAMENTE el nombre de abajo y el reproductor lo toma solo; si un
   archivo aún no está subido, el reproductor no se muestra (no rompe la
   pantalla).
   - N4 (todas las áreas): video por TÍTULO de ritual (mismo en todas las áreas).
   - Técnico TAC (cal-tac): video SOLO en los rituales mapeados abajo por id. */
const VIDEO_BASE = "https://qytcqopoqlqogctxnbwk.supabase.co/storage/v1/object/public/videos/";
const N4_VIDEOS = {
  "Acompañamiento 1 a 1":   VIDEO_BASE + "acompanamiento-1a1.mp4",
  "Espacio de confianza":   VIDEO_BASE + "espacio-de-confianza.mp4",
  "Reconocimiento Sincero": VIDEO_BASE + "reconocimiento-sincero.mp4",
};
// Videos exclusivos de la posición Técnico TAC, por id de ritual.
const TAC_VIDEOS = {
  "reconocimiento": VIDEO_BASE + "tac-reconocimiento.mp4",
};
// URL del video que corresponde a este perfil+ritual (o null si no hay).
function videoDeRitual(profile, ritual) {
  if (!profile || !ritual) return null;
  if (profile.level === "N4") return N4_VIDEOS[ritual.title] || null;
  if (profile.id === "cal-tac") return TAC_VIDEOS[ritual.id] || null;
  return null;
}
function RitualVideo({ url }) {
  const [err, setErr] = useState(false);
  const [open, setOpen] = useState(true);   // abierto al entrar al ritual
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  if (err || !url) return null;
  return h("div", { className: "ritual-video" + (open ? " open" : "") },
    h("button", { className: "ritual-video-h", type: "button", onClick: () => setOpen(!open), "aria-expanded": open },
      I("play-circle", "ico-xs"),
      h("span", null, "Míralo en video"),
      I(open ? "chevron-up" : "chevron-down", "ico-xs rv-chev")),
    open ? h("video", {
      className: "ritual-video-el", src: url, controls: true, playsInline: true, preload: "metadata",
      onError: () => setErr(true),
    }) : null,
  );
}

/* ---------- detalle de un ritual --------------------------- */
function Detail({ profile, ritual, onBack, onEscaladas }) {
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
  // video del ritual (N4 por título; TAC solo en rituales mapeados) — se ubica bajo el "Paso a paso"
  const videoUrl = videoDeRitual(profile, ritual);

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
            // rituales light no tienen "Paso a paso": el video va al final
            videoUrl ? h(RitualVideo, { url: videoUrl }) : null,
          )
        : h("div", { className: "full-wrap" },
            ritual.purpose ? h("p", { className: "purpose" }, ritual.purpose) : null,

            ritual.kind === "escaladas" ? h("button", { className: "done-btn on", type: "button", onClick: onEscaladas, style: { marginBottom: "10px" } },
              I("inbox", "ico-sm"), "Ver bandeja de escaladas") : null,

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

            // video del ritual — debajo del Paso a paso
            videoUrl ? h(RitualVideo, { url: videoUrl }) : null,

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

            // rituales "full" SIN formulario de registro: botón para marcar "se realizó".
            // Excepción: los de escaladas NO lo llevan — sus puntos se ganan al
            // gestionar los temas en la bandeja (ver EscaladasInbox).
            (ritual.kind !== "escaladas" && (!ritual.registro || ritual.registro.hidden)) ? h("button", { className: "done-btn" + (done ? " on" : ""), type: "button", onClick: toggleDone },
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
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let alive = true; setLoaded(false);
    (D && D.equipoPuntos ? D.equipoPuntos(profile.id) : Promise.resolve([]))
      .then((res) => { if (!alive) return; setTeam(res || []); setLoaded(true); })
      .catch(() => { if (alive) setLoaded(true); });
    return () => { alive = false; };
  }, [profile.id]);
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  return h("div", { className: "screen" },
    h("div", { className: "topbar" },
      h("button", { className: "icon-btn", type: "button", onClick: onBack, "aria-label": "Volver" }, I("arrow-left")),
      h("div", { className: "topbar-id" },
        h("span", { className: "topbar-role" }, "Mi equipo"),
        h("span", { className: "topbar-area" }, I("users", "ico-xs"), "Puntos de tu equipo")),
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
    ),
  );
}

/* ---------- Gestión de escaladas del equipo (solo lectura) --- */
const GEST_EST = {
  pendiente: { l: "Pendiente", c: "#8a7a68" },
  proceso:   { l: "En proceso", c: "#A8631A" },
  resuelvo:  { l: "Resuelto",   c: "#18571F" },
  derivo:    { l: "Derivado",   c: "#4156A2" },
  escalo:    { l: "Escaló",     c: "#A81519" },
};
function EquipoEscaladas({ profile, onBack }) {
  const D = window.CultivaData;
  const [rows, setRows] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let alive = true; setLoaded(false);
    (D && D.equipoGestionEscaladas ? D.equipoGestionEscaladas(profile.id) : Promise.resolve([]))
      .then((r) => { if (alive) { setRows(r || []); setLoaded(true); } })
      .catch(() => { if (alive) setLoaded(true); });
    return () => { alive = false; };
  }, [profile.id]);
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const estOf = (s) => GEST_EST[s || "pendiente"] || GEST_EST.pendiente;

  // agrupar por gestor (miembro del equipo que recibió la escalada)
  const groups = []; const idx = {};
  rows.forEach((r) => {
    const k = r.to_legajo || r.gestor_nombre || "—";
    if (idx[k] == null) { idx[k] = groups.length; groups.push({ key: k, nombre: r.gestor_nombre, nivel: r.gestor_nivel, items: [] }); }
    groups[idx[k]].items.push(r);
  });

  return h("div", { className: "screen" },
    h("div", { className: "topbar" },
      h("button", { className: "icon-btn", type: "button", onClick: onBack, "aria-label": "Volver" }, I("arrow-left")),
      h("div", { className: "topbar-id" },
        h("span", { className: "topbar-role" }, "Gestión de tu equipo"),
        h("span", { className: "topbar-area" }, I("inbox", "ico-xs"), "Cómo gestionan las escaladas que reciben")),
    ),
    !loaded ? null : h("div", { style: { padding: "16px 18px" } },
      groups.length === 0
        ? h("p", { style: { color: "#8a7a68", fontSize: "14px" } }, "Tu equipo aún no ha recibido escaladas para gestionar.")
        : groups.map((g, gi) => {
            const total = g.items.length;
            const byStatus = {}; g.items.forEach((it) => { const s = it.status || "pendiente"; byStatus[s] = (byStatus[s] || 0) + 1; });
            return h("div", { key: g.key || gi, style: { border: "1px solid #e6ddcf", borderRadius: "12px", padding: "12px 14px", margin: "12px 0", background: "#fff" } },
              h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
                h("span", { style: { fontSize: "14px", fontWeight: 700, color: "#3a2f22" } }, g.nombre || "—",
                  g.nivel ? h("span", { style: { color: "#9a8a78", fontWeight: 400 } }, " · " + g.nivel) : null),
                h("span", { style: { fontSize: "12px", color: "#8a7a68" } }, total + (total === 1 ? " escalada" : " escaladas"))),
              h("div", { style: { display: "flex", flexWrap: "wrap", gap: "6px", margin: "8px 0 2px" } },
                Object.keys(byStatus).map((s) => { const e = estOf(s); return h("span", { key: s,
                  style: { fontSize: "11px", fontWeight: 600, color: e.c, background: e.c + "14", borderRadius: "999px", padding: "3px 8px" } }, e.l + " · " + byStatus[s]); })),
              h("div", null,
                g.items.map((it, ii) => { const e = estOf(it.status); return h("div", { key: it.id || ii,
                  style: { display: "flex", justifyContent: "space-between", gap: "8px", padding: "8px 0", borderTop: "1px solid #f0e7da" } },
                  h("div", null,
                    h("div", { style: { fontSize: "13px", fontWeight: 500, color: "#3a2f22" } }, it.tema || "—"),
                    it.from_nombre ? h("div", { style: { fontSize: "11.5px", color: "#8a7a68" } }, "de " + it.from_nombre) : null),
                  h("span", { style: { fontSize: "11px", fontWeight: 700, color: e.c, whiteSpace: "nowrap" } }, e.l)); })),
            );
          }),
    ),
  );
}

/* ================= MODO MAESTRO ================= */
function maestroGet() { try { return JSON.parse(localStorage.getItem("cultiva:maestro") || "null"); } catch (e) { return null; } }
function maestroSet(m) { try { localStorage.setItem("cultiva:maestro", JSON.stringify(m)); } catch (e) {} }
function maestroFavs() { try { return JSON.parse(localStorage.getItem("cultiva:maestro:favs") || "[]"); } catch (e) { return []; } }
function maestroFavsSet(a) { try { localStorage.setItem("cultiva:maestro:favs", JSON.stringify(a)); } catch (e) {} }
const MTR_LABEL = { display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", color: "#8a7a68", margin: "12px 0 5px" };

function MaestroHome({ onColab, onExplore, onLogout }) {
  const [m, setM] = useState(() => maestroGet());
  const [regNombre, setRegNombre] = useState("");
  const [regLegajo, setRegLegajo] = useState("");
  const [buscar, setBuscar] = useState("");
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  if (!m) {
    return h("div", { className: "screen", style: { padding: "22px 20px", overflowY: "auto" } },
      h("h1", { style: { fontSize: "22px", fontWeight: 800, color: "#1E2761", margin: "6px 0 4px" } }, "Modo maestro"),
      h("p", { style: { fontSize: "13.5px", color: "#5a4a38", marginBottom: "6px" } }, "Regístrate una vez — queda guardado en este equipo y la próxima vez entras directo."),
      h("label", { style: MTR_LABEL }, "Nombre y apellido"),
      h("input", { className: "mtr-input", value: regNombre, placeholder: "Tu nombre", onChange: (e) => setRegNombre(e.target.value) }),
      h("label", { style: MTR_LABEL }, "Legajo (opcional)"),
      h("input", { className: "mtr-input", value: regLegajo, placeholder: "10XXXXXXXX", inputMode: "numeric", onChange: (e) => setRegLegajo(e.target.value) }),
      h("button", { className: "login-btn", type: "button", disabled: !regNombre.trim(),
        onClick: () => { const mm = { nombre: regNombre.trim(), legajo: regLegajo.trim() }; maestroSet(mm); setM(mm); } },
        "Entrar", I("arrow-right", "ico-sm")),
      h("button", { type: "button", onClick: onLogout, style: { all: "unset", cursor: "pointer", display: "block", textAlign: "center", width: "100%", marginTop: "14px", color: "#8a7a68", fontSize: "13px" } }, "Volver"),
    );
  }

  const favs = maestroFavs();
  return h("div", { className: "screen" },
    h("div", { className: "topbar" },
      h("button", { className: "icon-btn icon-btn-sm", type: "button", onClick: onLogout, "aria-label": "Salir" }, I("log-out")),
      h("div", { className: "topbar-id" }, h("span", { className: "topbar-role topbar-role-sm" }, "Modo maestro")),
    ),
    h("div", { style: { padding: "16px 18px", overflowY: "auto" } },
      h("p", { style: { fontSize: "14px", color: "#5a4a38", margin: 0 } }, "Hola, ", h("b", null, m.nombre)),
      h("h1", { style: { fontSize: "20px", fontWeight: 800, margin: "6px 0 12px", color: "#1E2761" } }, "¿A quién vas a acompañar?"),
      h("label", { style: MTR_LABEL }, "Legajo del colaborador"),
      h("div", { style: { display: "flex", gap: "8px" } },
        h("input", { className: "mtr-input", style: { flex: 1, margin: 0 }, value: buscar, placeholder: "10XXXXXXXX", inputMode: "numeric",
          onChange: (e) => setBuscar(e.target.value), onKeyDown: (e) => { if (e.key === "Enter" && buscar.trim()) onColab(buscar.trim()); } }),
        h("button", { className: "login-btn", style: { width: "auto", padding: "0 18px", margin: 0 }, type: "button", disabled: !buscar.trim(), onClick: () => onColab(buscar.trim()) }, "Ver")),

      favs.length ? h("div", { style: { marginTop: "22px" } },
        h("div", { style: { fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", color: "#8a7a68", marginBottom: "8px" } }, I("star", "ico-xs"), " Favoritos"),
        favs.map((f) => h("button", { key: f.legajo, type: "button", onClick: () => onColab(f.legajo),
          style: { display: "flex", alignItems: "center", gap: "10px", width: "100%", textAlign: "left", background: "#fff", border: "1px solid #eadfd0", borderRadius: "12px", padding: "11px 14px", margin: "6px 0", cursor: "pointer" } },
          I("user-round", "ico-sm"),
          h("span", { style: { flex: 1, minWidth: 0 } },
            h("span", { style: { display: "block", fontSize: "14px", fontWeight: 600, color: "#3a2f22" } }, f.nombre || ("Legajo " + f.legajo)),
            h("span", { style: { display: "block", fontSize: "11.5px", color: "#8a7a68" } }, "Legajo " + f.legajo)),
          I("chevron-right", "ico-sm")))) : null,

      h("button", { type: "button", onClick: onExplore,
        style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", marginTop: "22px", width: "100%", padding: "11px", borderRadius: "12px", border: "1px solid #cdd7d9", background: "#eef4f5", color: "#2F6E7A", fontSize: "14px", cursor: "pointer" } },
        I("layout-grid", "ico-sm"), "Explorar rituales (todas las áreas)"),
    ),
  );
}

function MaestroRitual({ ritual, color, regs, total }) {
  const [open, setOpen] = useState(false);
  const [segOpen, setSegOpen] = useState(false);
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const fmt = (ts) => { try { return new Date(ts).toLocaleDateString("es-PE", { day: "2-digit", month: "short" }); } catch (e) { return ""; } };
  const flabels = {}; ((ritual.registro && ritual.registro.fields) || []).forEach((f) => { flabels[f.k] = f.l; });
  return h("div", { style: { border: "1px solid #eadfd0", borderLeft: "4px solid " + (color || "#ccc"), borderRadius: "10px", padding: "10px 12px", margin: "8px 0", background: "#fff" } },
    h("button", { type: "button", onClick: () => setOpen(!open), style: { all: "unset", cursor: "pointer", display: "flex", width: "100%", alignItems: "center", gap: "8px", boxSizing: "border-box" } },
      h("span", { style: { flex: 1, minWidth: 0 } },
        h("span", { style: { display: "block", fontSize: "14px", fontWeight: 700, color: "#3a2f22" } }, ritual.title),
        h("span", { style: { display: "block", fontSize: "11.5px", color: "#8a7a68" } }, ritual.freq)),
      h("span", { style: { fontSize: "12px", fontWeight: 700, color: total ? "#18571F" : "#b8a894", whiteSpace: "nowrap" } }, total + (total === 1 ? " registro" : " registros")),
      I(open ? "chevron-up" : "chevron-down", "ico-xs")),

    open ? h("div", { style: { marginTop: "8px", borderTop: "1px solid #f0e7da", paddingTop: "8px" } },
      // contenido del ritual
      ritual.purpose ? h("p", { style: { fontSize: "12.5px", color: "#5a4a38", lineHeight: 1.45, margin: "0 0 8px" } }, ritual.purpose) : null,
      (ritual.steps && ritual.steps.length) ? h("div", null,
        h("div", { style: { fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".03em", color: "#8a7a68", marginBottom: "5px" } }, "Paso a paso"),
        h("ol", { style: { margin: 0, paddingLeft: "18px" } },
          ritual.steps.map((s, i) => h("li", { key: i, style: { fontSize: "12.5px", color: "#3a2f22", lineHeight: 1.45, marginBottom: "4px" } },
            s.k ? h("b", null, s.k + " — ") : null, s.t)))) : null,

      // seguimiento desplegable
      h("button", { type: "button", onClick: () => setSegOpen(!segOpen),
        style: { all: "unset", cursor: "pointer", display: "flex", width: "100%", alignItems: "center", gap: "6px", boxSizing: "border-box", marginTop: "10px", paddingTop: "8px", borderTop: "1px solid #f0e7da" } },
        I("clipboard-list", "ico-xs"),
        h("span", { style: { flex: 1, fontSize: "12.5px", fontWeight: 700, color: "#2F6E7A" } }, "Seguimiento"),
        h("span", { style: { fontSize: "12px", fontWeight: 700, color: total ? "#18571F" : "#b8a894" } }, total),
        I(segOpen ? "chevron-up" : "chevron-down", "ico-xs")),
      segOpen ? (regs.length ? h("div", { style: { marginTop: "6px" } },
          regs.map((rg, i) => h("div", { key: i, style: { padding: "6px 0", borderTop: i ? "1px solid #f5efe6" : "none" } },
            h("div", { style: { fontSize: "11px", color: "#8a7a68", marginBottom: "3px" } }, fmt(rg.ts)),
            Object.keys(rg.vals).filter((k) => rg.vals[k] && k.charAt(0) !== "_").map((k) =>
              h("div", { key: k, style: { fontSize: "12.5px", color: "#3a2f22", lineHeight: 1.4 } }, h("b", null, (flabels[k] || k) + ": "), String(rg.vals[k]))))))
        : h("div", { style: { marginTop: "6px", fontSize: "12.5px", color: "#8a7a68" } }, total ? "Registrado (sin detalle)." : "Aún sin registros.")) : null,
    ) : null,
  );
}

function MaestroColab({ legajo, onBack }) {
  const [data, setData] = useState(null);
  const [fav, setFav] = useState(() => maestroFavs().some((f) => f.legajo === legajo));
  const [segOpen, setSegOpen] = useState(false);
  useEffect(() => {
    let alive = true; setData(null);
    window.CultivaData.maestroColaborador(legajo).then((r) => { if (alive) setData(r || { found: false }); }).catch(() => { if (alive) setData({ found: false }); });
    return () => { alive = false; };
  }, [legajo]);
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  function toggleFav() {
    const cur = maestroFavs(); const exists = cur.some((f) => f.legajo === legajo);
    const next = exists ? cur.filter((f) => f.legajo !== legajo)
      : cur.concat([{ legajo: legajo, nombre: (data && data.nombre) || "", perfil: (data && data.perfil) || "" }]);
    maestroFavsSet(next); setFav(!exists);
  }

  const topbar = h("div", { className: "topbar" },
    h("button", { className: "icon-btn icon-btn-sm", type: "button", onClick: onBack, "aria-label": "Volver" }, I("arrow-left")),
    h("div", { className: "topbar-id" }, h("span", { className: "topbar-role topbar-role-sm" }, "Seguimiento")),
    (data && data.found) ? h("button", { className: "icon-btn icon-btn-sm" + (fav ? " mtr-fav-on" : ""), type: "button", onClick: toggleFav, "aria-label": "Favorito",
      style: { marginLeft: "auto", color: fav ? "#C9651C" : "#8a7a68" } }, I("star")) : null,
  );

  if (data === null) return h("div", { className: "screen" }, topbar, h("p", { style: { padding: "18px", color: "#8a7a68" } }, "Cargando…"));
  if (!data.found) return h("div", { className: "screen" }, topbar, h("p", { style: { padding: "18px", color: "#8a7a68" } }, "No encontramos el legajo ", h("b", null, legajo), " en el padrón."));

  const prof = window.PROFILES[data.perfil];
  const role = prof ? prof.role : data.perfil;
  const D = window.CultivaData;
  const pts = D.puntosDe(data.registros.map((r) => ({ ritual_id: r.ritual_id, ts: r.ts })), D.weekStartTs());
  const byRitual = {}; data.registros.forEach((r) => { (byRitual[r.ritual_id] = byRitual[r.ritual_id] || []).push(r); });
  const rituals = prof ? prof.rituals : [];
  const groups = window.DIM_ORDER
    .map((d) => ({ dim: d, def: window.DIMS[d], items: rituals.filter((r) => r.dimension === d && (r.kind === "full" || r.kind === "escaladas")) }))
    .filter((g) => g.items.length);
  const conReg = rituals.map((r) => ({ r: r, regs: (byRitual[r.id] || []).filter((x) => x.vals && Object.keys(x.vals).length), total: (byRitual[r.id] || []).length })).filter((x) => x.total > 0);
  const totalReg = data.registros.length;
  const fmt = (ts) => { try { return new Date(ts).toLocaleDateString("es-PE", { day: "2-digit", month: "short" }); } catch (e) { return ""; } };

  return h("div", { className: "screen" }, topbar,
    h("div", { style: { padding: "16px 18px", overflowY: "auto" } },
      h("h1", { style: { fontSize: "20px", fontWeight: 800, color: "#1E2761", margin: "0 0 2px" } }, data.nombre || ("Legajo " + legajo)),
      h("p", { style: { fontSize: "13px", color: "#8a7a68", margin: 0 } }, role + (data.area ? " · " + data.area : "") + (data.nivel ? " · " + data.nivel : "")),
      h("div", { style: { display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "10px", background: "#faf6ef", borderRadius: "999px", padding: "6px 12px", fontSize: "13px" } },
        I("star", "ico-xs"), h("b", null, pts + " pts"), h("span", { style: { color: "#8a7a68" } }, "esta semana")),

      // rituales del colaborador (galería compacta, solo lectura)
      h("h2", { style: { fontSize: "15px", fontWeight: 800, margin: "18px 0 6px", color: "#3a2f22" } }, "Sus rituales"),
      !prof ? h("p", { style: { color: "#8a7a68" } }, "Perfil no disponible en la app.")
        : h("div", { className: "mtr-rit" }, groups.map((g) =>
            h("section", { key: g.dim, className: "dim-group" },
              h("div", { className: "dim-head", style: { "--dc": g.def.color } },
                h("span", { className: "dim-dot" }), h("span", { className: "dim-label" }, g.def.label)),
              h("div", { className: "thumb-grid" },
                g.items.map((r) => h("div", { key: r.id, className: "thumb", style: { "--dc": g.def.color } },
                  h("span", { className: "thumb-top" }, h("span", { className: "thumb-ico" }, I(r.icon))),
                  h("span", { className: "thumb-name" }, r.title),
                  h("span", { className: "thumb-freq" }, I("repeat", "ico-xs"), r.freq))))))),

      // seguimiento: barra única desplegable
      h("div", { style: { marginTop: "18px", border: "1px solid #eadfd0", borderRadius: "12px", background: "#fff", overflow: "hidden" } },
        h("button", { type: "button", onClick: () => setSegOpen(!segOpen),
          style: { all: "unset", cursor: "pointer", display: "flex", width: "100%", alignItems: "center", gap: "8px", boxSizing: "border-box", padding: "13px 14px" } },
          I("clipboard-list", "ico-sm"),
          h("span", { style: { flex: 1, fontSize: "14px", fontWeight: 800, color: "#3a2f22" } }, "Seguimiento"),
          h("span", { style: { fontSize: "12px", fontWeight: 700, color: totalReg ? "#18571F" : "#b8a894" } }, totalReg + (totalReg === 1 ? " registro" : " registros")),
          I(segOpen ? "chevron-up" : "chevron-down", "ico-xs")),
        segOpen ? h("div", { style: { padding: "0 14px 12px" } },
          conReg.length ? conReg.map((x) => {
            const flabels = {}; ((x.r.registro && x.r.registro.fields) || []).forEach((f) => { flabels[f.k] = f.l; });
            return h("div", { key: x.r.id, style: { borderTop: "1px solid #f0e7da", paddingTop: "8px", marginTop: "8px" } },
              h("div", { style: { fontSize: "13px", fontWeight: 700, color: "#3a2f22", marginBottom: "4px" } }, x.r.title),
              x.regs.length ? x.regs.map((rg, i) => h("div", { key: i, style: { padding: "5px 0", borderTop: i ? "1px solid #f5efe6" : "none" } },
                h("div", { style: { fontSize: "11px", color: "#8a7a68", marginBottom: "2px" } }, fmt(rg.ts)),
                Object.keys(rg.vals).filter((k) => rg.vals[k] && k.charAt(0) !== "_").map((k) =>
                  h("div", { key: k, style: { fontSize: "12.5px", color: "#3a2f22", lineHeight: 1.4 } }, h("b", null, (flabels[k] || k) + ": "), String(rg.vals[k])))))
                : h("div", { style: { fontSize: "12px", color: "#8a7a68" } }, x.total + " registrado(s) sin detalle."));
          }) : h("div", { style: { fontSize: "13px", color: "#8a7a68", paddingTop: "8px" } }, "Aún sin registros.")) : null,
      ),
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
  const [maestroColab, setMaestroColab] = useState(null);
  const [exploreMaestro, setExploreMaestro] = useState(false);
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
      onMaestro: () => { setUser(null); setProfileId(null); setAccessMode("maestro"); setView("maestro"); },
    }) : null,
    view === "maestro" ? h(MaestroHome, {
      onColab: (lg) => { setMaestroColab(lg); setView("maestro-colab"); },
      onExplore: () => { setExploreMaestro(true); setAccessMode("review"); setProfileId(null); setView("start"); },
      onLogout: () => { setAccessMode(null); setView("login"); },
    }) : null,
    view === "maestro-colab" ? h(MaestroColab, {
      legajo: maestroColab, onBack: () => setView("maestro"),
    }) : null,
    view === "start" ? h(Start, {
      onEnter: (pid) => { setProfileId(pid); setView("gallery"); },
      backLabel: exploreMaestro ? "Volver" : undefined,
      onBackToLogin: () => {
        if (exploreMaestro) { setExploreMaestro(false); setAccessMode("maestro"); setProfileId(null); setView("maestro"); }
        else { setProfileId(null); setView("login"); }
      },
    }) : null,
    view === "gallery" && profile ? h(Gallery, {
      profile: profile,
      userName: accessMode === "user" && user ? (user.nombre_corto || nombreCorto(user.nombre)) : null,
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
      onEscaladas: () => setView("escaladas"),
    }) : null,
    view === "escaladas" && profile ? h(window.EscaladasInbox, {
      profile: profile, onBack: () => setView("gallery"),
      onEquipo: () => setView("equipo-escaladas"),
    }) : null,
    view === "equipo-escaladas" && profile ? h(EquipoEscaladas, {
      profile: profile, onBack: () => setView("escaladas"),
    }) : null,
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(CosechaApp));
