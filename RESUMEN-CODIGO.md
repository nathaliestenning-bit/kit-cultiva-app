# Resumen técnico · App Cultiva (para continuar el desarrollo)

Documento para que un desarrollador —o Claude— entienda el app completo y pueda continuarlo o migrarlo.
Pega este documento al inicio de un chat nuevo con Claude y di: *"Este es el resumen del app Cultiva; ayúdame con …"*.

---

## 1. Qué es

App **"Cultiva"**: PWA móvil de **rituales de liderazgo** + escaladas para **Hortifrut**. Es un **MVP** para validar el *programa* Cultiva (modelo de liderazgo), no un producto final.

- **SPA data-driven, SIN build:** no hay Node/npm/bundler. Scripts globales que cuelgan de `window.*`, React cargado por CDN local. Se usa **`React.createElement`** (alias `h`/`gh`/`eh`/`rh`), **NO JSX**.
- **App en vivo:** GitHub Pages. Deploy automático al mergear a `main` (GitHub Actions "Deploy a GitHub Pages").
- **Backend:** **Supabase** (Postgres + Auth + Storage). Login passwordless por legajo (correo sintético `‹legajo›@cultiva.interno`, password inicial = legajo). RLS por jerarquía (`legajo_jefe`).

## 2. Enlaces

- **Repo:** `nathaliestenning-bit/kit-cultiva-app` (GitHub Pages, público).
- **Supabase:** proyecto `qytcqopoqlqogctxnbwk` (tablas `usuarios`, `registros`, `escaladas`, `escalada_mensajes`; Storage bucket público `videos`).
- Config con las claves reales (URL + anon key) en `config.js`.

## 3. Mapa de archivos

**Contenido (los rituales):**
- `data-cosecha.js` / `data-produccion.js` / `data-packing.js` / `data-calidad.js` — definen `window.PROFILES` (18 perfiles). `data-cosecha.js` además define `DIMS`, `AREAS`, `TEMAS`, `ESCALADA_ESTADOS`, `PROFILES_BY_AREA`; los otros hacen `Object.assign(window.PROFILES, …)`.
- Cada perfil: `{ id, area, level, role, sub, context, rituals[] }`. Cada ritual: `{ id, kind (light|full|escaladas), dimension (lidera|escucha|valora), icon, title, freq, purpose, context{freq,when,place}, steps[{k,t}], phrases[], no[], note, registro{soporte, fields[{k,l,t,o}], hidden, autoBroadcast, escuchaTemas} }`.

**UI (componentes React sin JSX):**
- `CosechaApp.js` — router de vistas + Gallery + Detail + MiEquipo + PuntosModal + **modo Maestro** + **Dashboard** de gerencia + helpers (`videoDeRitual`, `N4_VIDEOS`, `TAC_VIDEOS`, `RitualVideo`, `nombreCorto`).
- `CultivaRegistroForm.js` — formulario de registro por ritual (campos diferidos, toggle "¿Lo resuelvo yo?" en el ritual de escucha, chip de estado de escaladas que uno levantó).
- `EscaladasInbox.js` — bandeja de escaladas *recibidas* (por jefe) + gestión de estado.
- `LoginScreen.js` — login por legajo + "Acceso de revisión" + "Soy maestro".

**Datos / auth:**
- `cultiva-data.js` — capa de datos demo(localStorage) ↔ Supabase: registros, puntos, equipo (RPC), escaladas (Edge Function), dashboard (RPC), maestro. API en promesas `window.CultivaData`.
- `cultiva-auth.js` — login por legajo (demo/Supabase), `profileFromRow`, restore de sesión. `window.CultivaAuth`.
- `usuarios.js` — padrón **DEMO** (nombres de muestra, público, sin PII real) para el modo sin Supabase.

**Infra / plataforma:**
- `index.html` — shell del SPA. ⚠️ **Las clases CSS de los componentes viven en un `<style>` inline aquí** (NO en `assets/styles.css`).
- `sw.js` — service worker: **network-first para el código** (.js/config/data/manifest) → reabrir el link muestra lo último sin borrar caché; cache-first solo para `assets/` y `vendor/`.
- `config.js` — claves reales de Supabase (producción). Vacío = modo demo (localStorage).
- `.github/workflows/deploy.yml` — deploy a Pages. `ping-supabase.yml` — cron anti-pausa (requiere secrets `SUPABASE_URL` + `SUPABASE_ANON_KEY`).

**Supabase (SQL, sin secretos):** `supabase/schema.sql` (tablas + RLS de dueño), `policies-hierarchy.sql` (RLS jefe→reporte + Edge Function de escaladas), `equipo.sql` / `equipo-gestion.sql` (RPCs de equipo), `maestros.sql` (RPC `maestro_colaborador`), `dashboard-setup.sql` + `dashboard-filtros.sql` (columna `es_admin` + `dash_resumen`).

**Scripts (Python estándar, sin pip):**
- `scripts/cultiva_admin.py` — aprovisiona/sincroniza usuarios a Supabase con la **service key** del entorno (`provision`, `sync`, `reset`, `admin`, `list`). Ver `GUIA-ADMINISTRACION.md`.
- `scripts/build_padron.py` — `private/jerarquia.csv` → `private/padron.json`.
- `private/` está **gitignored** (padrón real con PII, credenciales iniciales).

## 4. Modelo de datos (Supabase)

- **`usuarios`** — padrón mínimo: `legajo` (PK), `auth_id`, `nombre`, `cargo`, `gerencia`, `area`, `sede`, `nivel`, `perfil`, `legajo_jefe`, `es_admin`, `must_change_password`, `activo`. *(Nota: `activo` existe pero el app no lo usa para bloquear login.)*
- **`registros`** — historial por ritual: `legajo` (default `current_legajo()`), `perfil`, `ritual_id`, `vals` (jsonb del formulario), `escalado`, `follow_ts`, `created_at`.
- **`escaladas`** — un tema escalado subordinado→jefe: `from_legajo`, `to_legajo`, `registro_id`, `tema`, `detalle`, `status` (pendiente|resuelvo|proceso|derivo|escalo), `plazo` (SLA 48h), denormaliza `from_nombre`/`from_cargo`.
- **`escalada_mensajes`** — hilo de notas/consultas.
- **RLS:** dueño sobre lo suyo (`legajo = current_legajo()`); jefe ve ficha de sus reportes directos; escaladas visibles a ambas partes (from/to). `current_legajo()` = parte antes de `@` del email del JWT.
- La **creación** de escaladas pasa por una **Edge Function** (`escalar`, service role) para enrutar `to_legajo` = jefe directo de forma confiable.

## 5. Mecanismos clave

- **Login:** legajo → correo sintético → Supabase Auth. `must_change_password` fuerza crear clave al primer ingreso. `es_admin` → va directo al Dashboard.
- **Puntos (semanal, reinicia lunes, tope 100):** 10 por aplicar un ritual + 3 por cada registro extra del mismo ritual esa semana. Escaladas: puntos por *gestionar* (dar estado), no por botón.
- **Rituales sin formulario:** botón "Marcar como realizado" → `registrarHecho` (idempotente por día, inicio de día en hora **local**); el botón se reinicia y queda la marca "Registrado el …".
- **Escaladas — dos lados:** el **jefe** las recibe en su bandeja (`EscaladasInbox`, lee `to_legajo`); el **autor** las ve en su ritual de escucha con un **chip de estado** ("Resuelto por tu líder", "en proceso", …) que cruza `registro_id` (`misEscaladasPorRegistro`). El toggle "¿Lo resuelvo yo?" en "Espacio de confianza" decide si escala al jefe.
- **Videos (Supabase Storage, bucket `videos`):** `videoDeRitual(profile, ritual)` → **N4** por TÍTULO (`N4_VIDEOS`); **Técnico TAC** por ID de ritual (`TAC_VIDEOS`). `RitualVideo` se auto-oculta si el archivo no existe.
- **Dashboard de gerencia:** RPC `dash_resumen` agrega por `ritual_id`; el **cliente agrupa por TÍTULO** (mismo ritual con ids distintos por perfil se suma en una barra). Acceso por `es_admin`.
- **Modo Maestro:** lookup de un colaborador por legajo (RPC `maestro_colaborador`, SECURITY DEFINER, `anon`) → ve su perfil + registros. ⚠️ abre lectura por legajo a quien tenga el link (acordado "por el momento").

## 6. Convenciones y "landmines"

- **JSX no existe:** todo con `React.createElement`. Para validar sin Node: **JavaScriptCore** (`/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc`) con shim `var window={}` + stubs.
- **CSS inline en `index.html`** (no en `assets/`). `.screen` es flex column; bloques con `overflow:hidden` sin `flex-shrink:0` pueden colapsar.
- **Los `ids` de ritual son estables** — de ellos dependen los registros guardados y el mapeo de videos. Renombrar TÍTULOS es seguro; cambiar IDs rompe datos.
- **`listRegistros` filtra solo por `ritual_id`** (la RLS acota por legajo) — a propósito, para no ocultar registros si cambia el perfil de la persona.
- **El dashboard agrupa por título** → dos perfiles con el mismo ritual pero distinto título salen como dos barras (mantener títulos consistentes).
- **Sin conector MCP a Supabase:** el SQL/RPC se pega a mano en el SQL Editor; los `.sql` viven en `supabase/`.
- **Deploy:** merge a `main` → Actions publica en ~1 min. Todo reversible con `git revert`. Al desplegar cambios de contenido/código se hace **backup** (rama+tag) del `main` previo.

## 7. Estado actual del contenido (ago-2026)

- **18 perfiles / 4 áreas.** Cosecha/Producción/Packing con N1–N4; Packing además `pack-n4-cl` (Control de Línea, = pack-n4 sin el ritual de escucha); Calidad con N2–N4 + `cal-tac` (Técnico TAC) + `cal-n1` (oculto del selector).
- Ritual de escucha unificado como **"Espacio de confianza"** en todos.
- Reconocimiento: el paso "Nombro" dice **"te felicito"** (antes "te agradezco").
- Modelo de feedback en Acompañamiento: **CIA en TODAS las posiciones** (N1–N4 + TAC) — Comportamiento o Problema · Impacto · Acuerdo. Ya no queda "SCI" en ningún perfil. Reconocimiento (elogio) no usa "acuerdo".
- **Videos TAC:** 3 rituales con video (Charla de Impulso, Diálogo con Evidencia, Reconocimiento Sincero). N4: Acompañamiento, Espacio de confianza, Reconocimiento.

## 8. Pendientes conocidos (para el handover)

- **Traspaso de propiedad:** sacar el link del nombre personal → dominio Hortifrut; migrar Supabase a cuenta del cliente; regenerar la `service_role key`.
- **Contenido:** limpieza de esta etapa ya aplicada y desplegada — título de Reconocimiento unificado a "Reconocimiento Sincero", ritual de escucha unificado a "Espacio de confianza", `cal-n1` "Caminata" con roles de Calidad (antes copiaba los de Cosecha), typo de comilla en `prod-n1` corregido, y CIA unificado en N1/N2 (ya no hay SCI).
- **Seguridad:** el acceso es solo por legajo (sin contraseña real en "Acceso de revisión"); apto para piloto controlado, no para 100%. La versión robusta (perfilamiento, conexión a nómina) la haría el equipo de TI del cliente al migrar a su ecosistema (p. ej. módulo dentro de HortiApp).
- **Panel de gestión de legajos en la web:** requeriría Edge Function con service role gated por `is_admin` (NO poner la service key en la web).
