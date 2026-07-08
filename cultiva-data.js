/* ============================================================
   CULTIVA DATA · capa de datos de ESCALADAS (DEMO ↔ Supabase)
   - Demo: window.ESCALADAS_DEMO + localStorage (idéntico a antes,
     incluida la respuesta simulada del subordinado).
   - Supabase: tabla `escaladas` (RLS por parte) + `escalada_mensajes`
     (hilo de ida y vuelta) + Edge Function `escalar` (enrutamiento
     al jefe directo). Una escalada creada por un subordinado le
     aparece a su jefe en otro dispositivo.
   Nota: los `registros` siguen en localStorage en esta fase; el
   botón "Escalar" de un registro sí crea una escalada real.
   Expone window.CultivaData (API basada en Promesas).
   ============================================================ */
(function () {
  var A = window.CultivaAuth;
  var FN = (window.CULTIVA_CONFIG && window.CULTIVA_CONFIG.escalarFunction) || "escalar";
  function isSb() { return !!(A && A.mode && A.mode() === "supabase"); }
  function client() { return A.client(); }

  var _me = null;
  function me() {
    if (!isSb()) return Promise.resolve(null);
    if (_me) return Promise.resolve(_me);
    return client().auth.getUser().then(function (r) {
      _me = ((r.data && r.data.user && r.data.user.email) || "").split("@")[0];
      return _me;
    });
  }

  // ---------------- DEMO (localStorage) ----------------
  function dKey(pid) { return "cultiva3:escbox:" + pid; }
  function dRead(pid) { try { var r = localStorage.getItem(dKey(pid)); return r ? JSON.parse(r) : {}; } catch (e) { return {}; } }
  function dWrite(pid, st) { try { localStorage.setItem(dKey(pid), JSON.stringify(st)); } catch (e) {} }
  function lite(t) { return t.length > 60 ? t.slice(0, 57) + "…" : t.toLowerCase(); }

  // ---------------- REGISTROS (historial por ritual) ----------------
  function rKey(perfil, ritualId) { return "cultiva3:" + perfil + ":" + ritualId; }
  function rRead(perfil, ritualId) { try { var r = localStorage.getItem(rKey(perfil, ritualId)); return r ? JSON.parse(r) : []; } catch (e) { return []; } }
  function rWrite(perfil, ritualId, arr) { try { localStorage.setItem(rKey(perfil, ritualId), JSON.stringify(arr)); } catch (e) {} }
  function rowToEntry(r) {
    return { ts: Date.parse(r.created_at), id: r.id, escalado: !!r.escalado,
             vals: r.vals || {}, followTs: r.follow_ts ? Date.parse(r.follow_ts) : undefined };
  }

  // ---------------- API ----------------
  var Data = {
    mode: function () { return isSb() ? "supabase" : "demo"; },
    me: me,

    /* historial de un ritual (más reciente primero). */
    listRegistros: function (perfil, ritualId) {
      if (!isSb()) return Promise.resolve(rRead(perfil, ritualId));
      return client().from("registros").select("*")
        .eq("perfil", perfil).eq("ritual_id", ritualId)
        .order("created_at", { ascending: false }).then(function (q) {
          return (q.data || []).map(rowToEntry);
        });
    },

    /* guarda un registro nuevo; devuelve la entrada persistida (con id/ts). */
    saveRegistro: function (perfil, ritualId, entry) {
      if (!isSb()) {
        var arr = [entry].concat(rRead(perfil, ritualId)).slice(0, 30);
        rWrite(perfil, ritualId, arr); return Promise.resolve(entry);
      }
      return client().from("registros")
        .insert({ perfil: perfil, ritual_id: ritualId, vals: entry.vals, escalado: false })
        .select().single().then(function (q) {
          return q.data ? rowToEntry(q.data) : entry;
        });
    },

    /* marca un registro como escalado. */
    setRegistroEscalado: function (perfil, ritualId, entry) {
      if (!isSb()) {
        var arr = rRead(perfil, ritualId).map(function (e) { return e.ts === entry.ts ? Object.assign({}, e, { escalado: true }) : e; });
        rWrite(perfil, ritualId, arr); return Promise.resolve();
      }
      return client().from("registros").update({ escalado: true }).eq("id", entry.id).then(function () {});
    },

    /* guarda el seguimiento (acuerdo/comentarios) de un registro. */
    updateRegistroFollow: function (perfil, ritualId, entry, newVals) {
      if (!isSb()) {
        var arr = rRead(perfil, ritualId).map(function (e) {
          return e.ts === entry.ts ? Object.assign({}, e, { vals: newVals, followTs: Date.now() }) : e;
        });
        rWrite(perfil, ritualId, arr); return Promise.resolve(Date.now());
      }
      return client().from("registros").update({ vals: newVals, follow_ts: new Date().toISOString() })
        .eq("id", entry.id).then(function () { return Date.now(); });
    },

    /* ---- PUNTOS (semanal) ---- */
    /* inicio de la semana (lunes 00:00) en ms */
    weekStartTs: function () {
      var d = new Date(); var off = (d.getDay() + 6) % 7; // lunes = 0
      d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - off); return d.getTime();
    },
    /* todos los registros del perfil (todos los rituales) como [{ritual_id, ts}] */
    listRegistrosPerfil: function (perfil) {
      if (!isSb()) {
        var out = []; var pref = "cultiva3:" + perfil + ":";
        try {
          for (var i = 0; i < localStorage.length; i++) {
            var k = localStorage.key(i);
            if (k && k.indexOf(pref) === 0) {
              var rid = k.slice(pref.length);
              (JSON.parse(localStorage.getItem(k) || "[]") || []).forEach(function (e) {
                out.push({ ritual_id: rid, ts: e.ts });
              });
            }
          }
        } catch (e) {}
        return Promise.resolve(out);
      }
      return client().from("registros").select("ritual_id,created_at").eq("perfil", perfil)
        .then(function (q) {
          return (q.data || []).map(function (r) { return { ritual_id: r.ritual_id, ts: Date.parse(r.created_at) }; });
        });
    },
    /* puntos = por cada ritual con ≥1 registro en la semana: 10 + 3×(extras) */
    puntosDe: function (registros, desde) {
      var byR = {};
      (registros || []).forEach(function (r) { if (r.ts >= desde) byR[r.ritual_id] = (byR[r.ritual_id] || 0) + 1; });
      var total = 0; Object.keys(byR).forEach(function (k) { total += 10 + 3 * (byR[k] - 1); });
      return total;
    },
    /* marca un ritual como "aplicado" (rituales sin formulario). Idempotente por día. */
    registrarHecho: function (perfil, ritualId) {
      var day = new Date(); day.setHours(0, 0, 0, 0); var dayStart = day.getTime();
      if (!isSb()) {
        var arr = rRead(perfil, ritualId);
        if (!arr.some(function (e) { return e.ts >= dayStart; })) {
          rWrite(perfil, ritualId, [{ ts: Date.now(), hecho: true, vals: {} }].concat(arr).slice(0, 60));
        }
        return Promise.resolve();
      }
      return client().from("registros").select("id").eq("perfil", perfil).eq("ritual_id", ritualId)
        .gte("created_at", new Date(dayStart).toISOString()).limit(1).then(function (q) {
          if (q.data && q.data.length) return;
          return client().from("registros").insert({ perfil: perfil, ritual_id: ritualId, vals: { _hecho: true }, escalado: false }).then(function () {});
        });
    },

    /* inbox: lo que me escalaron. Devuelve [{item, state}]. */
    listInbox: function (pid) {
      if (!isSb()) {
        var items = window.ESCALADAS_DEMO[pid] || [];
        var st = dRead(pid);
        return Promise.resolve(items.map(function (it) { return { item: it, state: st[it.id] || {} }; }));
      }
      return me().then(function (legajo) {
        return client().from("escaladas").select("*").eq("to_legajo", legajo)
          .order("created_at", { ascending: false }).then(function (q) {
            var rows = (q.data || []);
            var ids = rows.map(function (r) { return r.id; });
            var byEsc = {};
            var p = ids.length
              ? client().from("escalada_mensajes").select("*").in("escalada_id", ids)
                  .order("created_at", { ascending: true }).then(function (m) {
                    (m.data || []).forEach(function (x) { (byEsc[x.escalada_id] = byEsc[x.escalada_id] || []).push(x); });
                  })
              : Promise.resolve();
            return p.then(function () {
              return rows.map(function (r) {
                var thread = (byEsc[r.id] || []).map(function (x) {
                  return { who: x.autor_legajo === legajo ? "me" : "them", kind: x.kind, text: x.texto, ts: Date.parse(x.created_at) };
                });
                return {
                  item: { id: r.id, from: r.from_nombre, role: r.from_cargo, tema: r.tema, detalle: r.detalle, requiere: r.requiere, date: Date.parse(r.created_at) },
                  state: { status: r.status === "pendiente" ? null : r.status, thread: thread, reqSuperior: r.req_superior || "", escalatedUp: r.escalated_up },
                };
              });
            });
          });
      });
    },

    /* cambia el estado (resuelvo/proceso/derivo/escalo o null). */
    setStatus: function (pid, id, status) {
      if (!isSb()) { var st = dRead(pid); st[id] = Object.assign({}, st[id], { status: status }); dWrite(pid, st); return Promise.resolve(); }
      return client().from("escaladas").update({ status: status || "pendiente" }).eq("id", id).then(function () {});
    },

    /* agrega nota/consulta al hilo (demo simula la respuesta). */
    addMensaje: function (pid, id, kind, text) {
      if (!isSb()) {
        var st = dRead(pid); var cur = st[id] || {};
        var thread = (cur.thread || []).concat([{ who: "me", kind: kind, text: text, ts: Date.now() }]);
        if (kind === "consulta") thread = thread.concat([{ who: "them", kind: "respuesta", text: "Gracias, lo aclaro: " + lite(text), ts: Date.now() + 1 }]);
        st[id] = Object.assign({}, cur, { thread: thread }); dWrite(pid, st); return Promise.resolve();
      }
      return client().from("escalada_mensajes").insert({ escalada_id: id, kind: kind, texto: text }).then(function () {});
    },

    /* el jefe sube el tema a SU jefe (Edge Function). */
    escalateUp: function (pid, id, reqSuperior) {
      if (!isSb()) { var st = dRead(pid); st[id] = Object.assign({}, st[id], { status: "escalo", escalatedUp: true, reqSuperior: reqSuperior }); dWrite(pid, st); return Promise.resolve(); }
      return client().functions.invoke(FN, { body: { action: "subir", escalada_id: id, req_superior: reqSuperior } })
        .then(function (r) { if (r.error) throw r.error; return r.data; });
    },

    /* crea una escalada nueva (puente desde un registro / ritual de escucha).
       Demo: no enruta (el form solo marca el flag local). */
    crearEscalada: function (payload) {
      if (!isSb()) return Promise.resolve({ demo: true });
      return client().functions.invoke(FN, { body: Object.assign({ action: "crear" }, payload) })
        .then(function (r) { if (r.error) throw r.error; return r.data; });
    },

    /* sube un tema registrado a TODA la cadena de jefes (una copia por jefe).
       Se usa automáticamente al guardar en los rituales de escucha del front-line.
       Demo: no hace nada (la cadena vive en Supabase). */
    broadcastChain: function (payload) {
      if (!isSb()) return Promise.resolve({ demo: true });
      return client().functions.invoke(FN, { body: Object.assign({ action: "broadcast" }, payload) })
        .then(function (r) { if (r.error) throw r.error; return r.data; });
    },
  };

  window.CultivaData = Data;
})();
