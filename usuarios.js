/* ============================================================
   DATA · USUARIOS (padrón demo) + REGLA DE SCOPING
   Etapa 6 (login). Datos DEMO simulados — sin backend real.
   Al deployment se reemplaza por el padrón real
   ("Usuarios App Cultiva.xlsx", 51 usuarios).

   Regla de scoping (PLAN §3):
     perfil = f( GERENCIA , NIVEL )   // override: CARGO "TAC" → cal-tac
   ============================================================ */

/* GERENCIA (padrón) → prefijo de área (Kit) */
window.GERENCIA_AREA = {
  "GERENCIA DE COSECHA": "cos",
  "GERENCIA DE PRODUCCION": "prod",
  "GERENCIA DE OPERACIONES INDUSTRIALES": "pack",
  "GERENCIA DE CALIDAD": "cal",
};

/* resuelve el id de perfil del Kit a partir del padrón */
window.perfilDe = function (u) {
  if (u.cargo && /\bTAC\b/i.test(u.cargo)) return "cal-tac";
  var pre = window.GERENCIA_AREA[(u.gerencia || "").toUpperCase()];
  if (!pre) return null;
  return pre + "-" + String(u.nivel || "").toLowerCase();
};

/* padrón demo — nombres de muestra por perfil (legajo = 10 + DNI) */
window.USUARIOS = [
  // ---- Cosecha ----
  { legajo: "1070110011", nombre: "Ricardo Alva",       correo: "ricardo.alva@hortifrut.com",     gerencia: "GERENCIA DE COSECHA",  nivel: "N1", cargo: "Subgerente de Cosecha" },
  { legajo: "1070110022", nombre: "Neiser Flores",      correo: "neiser.flores@hortifrut.com",    gerencia: "GERENCIA DE COSECHA",  nivel: "N2", cargo: "Jefe de Cosecha" },
  { legajo: "1070110033", nombre: "Tomás Castillo",     correo: "tomas.castillo@hortifrut.com",   gerencia: "GERENCIA DE COSECHA",  nivel: "N3", cargo: "Supervisor de Fundo" },
  { legajo: "1070110044", nombre: "Romel Zamudio",      correo: "romel.zamudio@hortifrut.com",    gerencia: "GERENCIA DE COSECHA",  nivel: "N4", cargo: "Líder de Cosecha" },
  { legajo: "1070110055", nombre: "Alexandra Ríos",     correo: "alexandra.rios@hortifrut.com",   gerencia: "GERENCIA DE COSECHA",  nivel: "N4", cargo: "Líder de Cosecha" },

  // ---- Producción Agrícola ----
  { legajo: "1070120011", nombre: "Julio García",       correo: "julio.garcia@hortifrut.com",     gerencia: "GERENCIA DE PRODUCCION", nivel: "N1", cargo: "Sub-gerente de Producción Agrícola" },
  { legajo: "1070120022", nombre: "Víctor Pais",        correo: "victor.pais@hortifrut.com",      gerencia: "GERENCIA DE PRODUCCION", nivel: "N2", cargo: "Jefe de Producción Agrícola" },
  { legajo: "1070120033", nombre: "Percy Villegas",     correo: "percy.villegas@hortifrut.com",   gerencia: "GERENCIA DE PRODUCCION", nivel: "N3", cargo: "Jefe de Producción de Área" },
  { legajo: "1070120044", nombre: "Rosa Marín",         correo: "rosa.marin@hortifrut.com",       gerencia: "GERENCIA DE PRODUCCION", nivel: "N4", cargo: "Supervisora de Riego" },

  // ---- Operaciones Industriales / Packing ----
  { legajo: "1070130011", nombre: "Huber Castillo",     correo: "huber.castillo@hortifrut.com",   gerencia: "GERENCIA DE OPERACIONES INDUSTRIALES", nivel: "N1", cargo: "Sub-gerente de Operaciones Industriales" },
  { legajo: "1070130022", nombre: "Marco Ríos",         correo: "marco.rios@hortifrut.com",       gerencia: "GERENCIA DE OPERACIONES INDUSTRIALES", nivel: "N2", cargo: "Líder de Planta" },
  { legajo: "1070130033", nombre: "Diego Salas",        correo: "diego.salas@hortifrut.com",      gerencia: "GERENCIA DE OPERACIONES INDUSTRIALES", nivel: "N3", cargo: "Jefe de Producción de Planta" },
  { legajo: "1070130044", nombre: "Luis Tapia",         correo: "luis.tapia@hortifrut.com",       gerencia: "GERENCIA DE OPERACIONES INDUSTRIALES", nivel: "N4", cargo: "Supervisor de Control" },

  // ---- Calidad (+ TAC) ---- (N1 sin usuario: puesto vacante)
  { legajo: "1070140022", nombre: "Guillermo Ganoza",   correo: "guillermo.ganoza@hortifrut.com", gerencia: "GERENCIA DE CALIDAD",  nivel: "N2", cargo: "Jefe de Calidad" },
  { legajo: "1070140033", nombre: "Carlos Leyva",       correo: "carlos.leyva@hortifrut.com",     gerencia: "GERENCIA DE CALIDAD",  nivel: "N3", cargo: "Coordinador de Calidad" },
  { legajo: "1070140044", nombre: "Marta Ríos",         correo: "marta.rios@hortifrut.com",       gerencia: "GERENCIA DE CALIDAD",  nivel: "N4", cargo: "Supervisora de Calidad" },
  { legajo: "1070140055", nombre: "Pedro Saldaña",      correo: "pedro.saldana@hortifrut.com",    gerencia: "GERENCIA DE CALIDAD",  nivel: "N4", cargo: "Técnico TAC" },
];

/* completa el perfil resuelto en cada usuario (scoping) */
window.USUARIOS.forEach(function (u) { u.perfil = window.perfilDe(u); });

/* busca un usuario por correo o por legajo (10 + DNI). Tolera espacios. */
window.findUsuario = function (raw) {
  if (!raw) return null;
  var q = String(raw).trim().toLowerCase();
  return window.USUARIOS.find(function (u) {
    return u.correo.toLowerCase() === q || u.legajo === q;
  }) || null;
};
