/* ============================================================
   ESCALADAS INBOX · bandeja de temas escalados por subordinados
   - el líder ve SOLO lo que le corresponde (RLS por parte en Supabase;
     ESCALADAS_DEMO en modo demo)
   - por tema: estado (Resuelvo yo / En proceso / Derivo / Escalo)
   - comentarios y CONSULTAS de ida y vuelta al subordinado
   - al "Escalo": campo extra de qué requiere puntualmente del superior
   - datos vía window.CultivaData (demo localStorage ↔ Supabase)
   ============================================================ */
const { createElement: eh, useState: eUse, useEffect: eEff } = React;
const EI = (name, cls) => eh("i", { "data-lucide": name, className: cls || "" });
const ET = (k) => (window.t ? window.t(k) : k);                                  // interfaz
const ETC = (s) => (window.CultivaI18N ? window.CultivaI18N.tc(s) : s);          // contenido

function initials(name) {
  const p = (name || "").trim().split(/\s+/);
  return ((p[0] || "")[0] || "") + ((p[1] || "")[0] || "");
}
function timeAgo(ts) {
  const m = Math.round((Date.now() - ts) / 60000);
  if (m < 60) return ET("esc.ago") + " " + m + " " + ET("esc.min");
  const h = Math.round(m / 60);
  if (h < 24) return ET("esc.ago") + " " + h + " " + ET("esc.hour");
  return ET("esc.ago") + " " + Math.round(h / 24) + " " + ET("esc.day");
}

function EscaladaCard({ item, escState, superiorRole, canEscalateUp, onStatus, onMessage, onEscalateUp }) {
  const st = escState || {};
  const status = st.status || null;
  const [showComment, setShowComment] = eUse(false);
  const [showConsulta, setShowConsulta] = eUse(false);
  const [draft, setDraft] = eUse("");
  const [reqSuperior, setReqSuperior] = eUse(st.reqSuperior || "");
  const thread = st.thread || [];

  eEff(() => { if (window.lucide) window.lucide.createIcons(); });

  function setStatus(s) { onStatus(s === status ? null : s); }
  function addMsg(kind) {
    if (!draft.trim()) return;
    onMessage(kind, draft.trim());
    setDraft(""); setShowComment(false); setShowConsulta(false);
  }
  function escalarUp() { onEscalateUp(reqSuperior.trim()); }

  const resolved = status === "resuelvo";
  return eh("div", { className: "esc-card" + (resolved ? " resolved" : "") },
    eh("div", { className: "esc-card-h" },
      eh("span", { className: "esc-avatar" }, initials(item.from)),
      eh("span", { className: "esc-who" },
        eh("span", { className: "esc-name" }, item.from),
        eh("span", { className: "esc-role" }, item.role),
      ),
      eh("span", { className: "esc-time" }, timeAgo(item.date)),
    ),
    eh("div", { className: "esc-card-body" },
      eh("span", { className: "esc-tema" }, EI("tag"), item.tema),
      eh("p", { className: "esc-detalle" }, item.detalle),
      item.requiere ? eh("div", { className: "esc-requiere" },
        EI("flag", "ico-sm"),
        eh("div", null, eh("b", null, ET("esc.requiresOfYou")), item.requiere)) : null,

      // estados
      eh("div", { className: "esc-states" },
        // "Derivar" oculto; "Escalo" oculto si no hay a quién escalar (tope de la cadena).
        window.ESCALADA_ESTADOS
          .filter((s) => s.id !== "derivo" && (s.id !== "escalo" || canEscalateUp))
          .map((s) =>
          eh("button", {
            key: s.id, type: "button",
            className: "esc-state" + (status === s.id ? " on" : ""),
            style: status === s.id ? { "--sc": s.color } : null,
            onClick: () => setStatus(s.id),
            // "Resuelvo yo" (acción) → "Resuelto" (estado) cuando ya está resuelto
          }, EI(s.icon), (s.id === "resuelvo" && status === "resuelvo") ? ET("esc.resolved") : s.label))),

      // campo extra al escalar hacia arriba
      status === "escalo" ? eh("div", { className: "esc-escfield" },
        eh("label", null, ET("esc.needFromPre") + " " + (superiorRole || ET("esc.superior")) + ET("esc.needFromPost")),
        eh("textarea", { value: reqSuperior, placeholder: ET("esc.beSpecific"),
          onChange: (e) => setReqSuperior(e.target.value) }),
        eh("button", { className: "btn-escalar-up", type: "button", onClick: escalarUp },
          EI("arrow-up", "ico-xs"), st.escalatedUp ? ET("esc.updateReq") : ET("esc.escalateUp")),
        st.escalatedUp ? eh("span", { style: { fontSize: "10.5px", color: "#8A5A12" } },
          EI("check", "ico-xs"), " " + ET("esc.sentTo") + " " + (superiorRole || ET("esc.superior"))) : null,
      ) : null,

      // herramientas
      eh("div", { className: "esc-tools" },
        eh("button", { className: "esc-tool" + (showComment ? " on" : ""), type: "button",
          onClick: () => { setShowComment(!showComment); setShowConsulta(false); setDraft(""); } },
          EI("message-square"), ET("esc.comment")),
        eh("button", { className: "esc-tool" + (showConsulta ? " on" : ""), type: "button",
          onClick: () => { setShowConsulta(!showConsulta); setShowComment(false); setDraft(""); } },
          EI("help-circle"), ET("esc.consult")),
      ),

      // thread
      thread.length > 0 ? eh("div", { className: "esc-thread" },
        thread.map((m, i) => eh("div", { key: i, className: "esc-msg " + (m.who === "me" ? "me" : "them") },
          eh("span", { className: "esc-msg-bubble" }, m.text),
          eh("span", { className: "esc-msg-meta" },
            eh("span", { className: "esc-msg-kind" },
              m.kind === "consulta" ? ET("esc.consultLabel") : m.kind === "respuesta" ? (item.from || "").split(" ")[0] : ET("esc.noteLabel")),
            " · ", timeAgo(m.ts)),
        ))) : null,

      // composer
      (showComment || showConsulta) ? eh("div", { className: "esc-composer" },
        eh("textarea", {
          value: draft, autoFocus: true,
          placeholder: showConsulta ? ET("esc.askSub") : ET("esc.writeNote"),
          onChange: (e) => setDraft(e.target.value),
        }),
        eh("button", { className: "esc-send", type: "button", disabled: !draft.trim(),
          onClick: () => addMsg(showConsulta ? "consulta" : "nota") }, EI("send")),
      ) : null,
    ),
  );
}

function EscaladasInbox({ profile, onBack, onEquipo }) {
  const D = window.CultivaData;
  const [list, setList] = eUse([]);           // [{item, state}]
  const [loaded, setLoaded] = eUse(false);    // evita swap vacío→lista (conflicto Lucide/React)
  const [filter, setFilter] = eUse("todos");

  function reload() {
    return D.listInbox(profile.id)
      .then((r) => { setList(r); setLoaded(true); })
      .catch(() => { setList([]); setLoaded(true); });
  }
  eEff(() => { setLoaded(false); reload(); }, [profile.id]);
  eEff(() => { if (window.lucide) window.lucide.createIcons(); });

  // rol superior (a quién escala este perfil) — demo
  const supMap = { "cos-n2": "Jefe de Cosecha", "cos-n3": "Jefe de Cosecha", "cos-n1": "Gerencia" };
  const sup = (supMap[profile.id] ? ETC(supMap[profile.id]) : null) || ET("esc.superior");
  // tope de la cadena (sin jefe a quién escalar): N1 de todas las áreas y N2 de Calidad
  const esTope = profile.level === "N1" || profile.id === "cal-n2";
  const canEscalateUp = !esTope;

  // Puntos del ritual de escaladas: se ganan al GESTIONAR un tema (darle destino:
  // resuelvo / en proceso / escalo), no por un botón autodeclarado.
  // registrarHecho es idempotente por día, así que basta la 1ª gestión del día.
  const escRitual = (profile.rituals || []).find((r) => r.kind === "escaladas") || {};
  function premiaGestion() {
    if (escRitual.id && window.CultivaData && window.CultivaData.registrarHecho) {
      window.CultivaData.registrarHecho(profile.id, escRitual.id).catch(function () {});
    }
  }

  function onStatus(id, s) { D.setStatus(profile.id, id, s).then(reload).catch(() => {}); if (s) premiaGestion(); }
  function onMessage(id, kind, text) { D.addMensaje(profile.id, id, kind, text).then(reload).catch(() => {}); }
  function onEscalateUp(id, req) { D.escalateUp(profile.id, id, req).then(reload).catch(() => {}); premiaGestion(); }

  const items = list.map((x) => x.item);
  const stateOf = (id) => { const r = list.find((x) => x.item.id === id); return r ? r.state : {}; };
  const pendientes = list.filter((x) => !x.state.status);
  const resueltos = list.filter((x) => x.state.status === "resuelvo");
  const shown = list.filter((x) => {
    if (filter === "pendientes") return !x.state.status;
    if (filter === "resueltos") return x.state.status === "resuelvo";
    return true;
  }).map((x) => x.item);

  return eh("div", { className: "screen escbox" },
    eh("div", { className: "topbar" },
      eh("button", { className: "icon-btn", type: "button", onClick: onBack, "aria-label": ET("common.back") }, EI("arrow-left")),
      eh("div", { className: "topbar-id" },
        eh("span", { className: "topbar-role" }, ET("esc.title")),
        eh("span", { className: "topbar-area" }, EI("inbox", "ico-xs"), ET("esc.fromYour") + " " +
          (profile.id === "cos-n1" ? ET("esc.rolChiefs") : profile.id === "cos-n2" ? ET("esc.rolSupervisors") : ET("esc.rolLeaders"))),
      ),
    ),
    eh("div", { className: "escbox-scroll" },
      eh("div", { className: "escbox-hero" },
        eh("h1", { className: "escbox-title" }, ET("esc.heroTitle")),
        eh("p", { className: "escbox-sub" }, ET("esc.heroSub")),
        (onEquipo && ["N1", "N2", "N3"].indexOf(profile.level) >= 0) ? eh("button", {
          type: "button", onClick: onEquipo,
          style: { marginTop: "12px", display: "inline-flex", alignItems: "center", gap: "7px",
            fontSize: "13px", padding: "10px 16px", borderRadius: "999px", cursor: "pointer",
            border: "1px solid #cdd7d9", background: "#eef4f5", color: "#2F6E7A" },
        }, EI("users", "ico-xs"), ET("esc.myTeam")) : null,
      ),
      loaded ? eh("div", { className: "escbox-filters" },
        [["todos", ET("esc.fltAll"), list.length], ["pendientes", ET("esc.fltPending"), pendientes.length],
         ["resueltos", ET("esc.fltResolved"), resueltos.length]]
          .map(([id, lbl, n]) =>
            eh("button", { key: id, type: "button", className: "escbox-filter" + (filter === id ? " on" : ""),
              onClick: () => setFilter(id) }, lbl, " (" + n + ")")),
      ) : null,
      !loaded
        ? null
        : shown.length === 0
        ? eh("div", { className: "escbox-empty" }, EI("inbox"),
            eh("div", null, ET("esc.emptyView")))
        : eh("div", { className: "esc-list" },
            shown.map((it) => eh(EscaladaCard, {
              key: it.id, item: it, escState: stateOf(it.id),
              superiorRole: sup, canEscalateUp: canEscalateUp,
              onStatus: (s) => onStatus(it.id, s),
              onMessage: (kind, text) => onMessage(it.id, kind, text),
              onEscalateUp: (req) => onEscalateUp(it.id, req),
            }))),
    ),
  );
}

window.EscaladasInbox = EscaladasInbox;
