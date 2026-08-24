/* ============================================================
   CULTIVA · i18n (multi-idioma)
   - 5 idiomas: es (base/predeterminado), en, pt, fr, ar (RTL).
   - El español es la fuente: los data-*.js cargan el contenido en
     español; este motor lo traduce EN EL SITIO a nivel de frase.
   - UI (botones/menus): window.UI_STRINGS (i18n-ui.js) vía t(key).
   - Contenido (rituales): window.CONTENT_TR (i18n-content.js) por frase.
   - El idioma se guarda en localStorage; cambiarlo recarga la página
     (los data-*.js vuelven a cargar en español y se retraduce limpio).
   Debe cargar DESPUÉS de los data-*.js y ANTES de los componentes.
   ============================================================ */
(function () {
  var LANGS = [
    { code: "es", label: "Español", dir: "ltr" },
    { code: "en", label: "English", dir: "ltr" },
    { code: "pt", label: "Português", dir: "ltr" },
    { code: "fr", label: "Français", dir: "ltr" },
    { code: "ar", label: "العربية", dir: "rtl" },
  ];
  var KEY = "cultiva:lang";

  function getLang() {
    try {
      var l = localStorage.getItem(KEY);
      if (l && LANGS.some(function (x) { return x.code === l; })) return l;
    } catch (e) {}
    return "es";
  }
  function dirFor(code) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === code) return LANGS[i].dir;
    return "ltr";
  }
  function setLang(code) {
    try { localStorage.setItem(KEY, code); } catch (e) {}
    try { location.reload(); } catch (e) {}
  }

  /* --- UI (interfaz) --- */
  function t(key) {
    var l = getLang();
    var U = window.UI_STRINGS || {};
    if (U[l] && U[l][key] != null) return U[l][key];
    if (U.es && U.es[key] != null) return U.es[key];
    return key; // fallback: la clave misma
  }

  /* --- Contenido (rituales) a nivel de frase --- */
  function tc(s) {
    var l = getLang();
    if (l === "es" || typeof s !== "string") return s;
    var D = (window.CONTENT_TR && window.CONTENT_TR[l]) || null;
    if (!D) return s;
    return (D[s] != null && D[s] !== "") ? D[s] : s; // sin traducción → deja el español
  }

  // Traduce en el sitio todas las cadenas de una estructura. Las cadenas que
  // no están en el diccionario (ids, iconos, colores, tipos) pasan intactas.
  function translateDeep(obj) {
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        var v = obj[i];
        if (typeof v === "string") obj[i] = tc(v);
        else if (v && typeof v === "object") translateDeep(v);
      }
    } else if (obj && typeof obj === "object") {
      for (var k in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
        var val = obj[k];
        if (typeof val === "string") obj[k] = tc(val);
        else if (val && typeof val === "object") translateDeep(val);
      }
    }
  }

  function applyContent() {
    if (getLang() === "es") return;
    ["PROFILES", "PROFILES_BY_AREA", "DIMS", "AREAS", "TEMAS", "ESCALADA_ESTADOS"].forEach(function (name) {
      try { if (window[name]) translateDeep(window[name]); } catch (e) {}
    });
  }

  function applyDir() {
    var l = getLang();
    try {
      document.documentElement.setAttribute("lang", l);
      document.documentElement.setAttribute("dir", dirFor(l));
    } catch (e) {}
  }

  // Ejecuta al cargar (los data-*.js ya corrieron → contenido en español).
  applyDir();
  applyContent();

  window.CultivaI18N = { langs: LANGS, get: getLang, set: setLang, t: t, tc: tc, dirFor: dirFor };
  window.t = t; // atajo global para los componentes
})();
