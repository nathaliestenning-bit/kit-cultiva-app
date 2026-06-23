# App Cultiva — Guía de despliegue

PWA del Kit Cultiva (rituales de liderazgo + escaladas) para Hortifrut.
Stack: HTML + React (sin build obligatorio) · Supabase (datos/auth) · GitHub Pages (hosting).

> **Privacidad — leer primero.** El padrón real contiene PII (nombres, correos
> corporativos, celulares y legajos que incorporan el DNI). **Nunca** subas el
> `.xlsx` ni la carpeta `private/` a un repo público. El `.gitignore` ya las
> excluye. A Supabase solo viajan datos mínimos (legajo, nombre, cargo,
> gerencia/área/sede/nivel, perfil, legajo_jefe) — sin correo corporativo,
> celular ni DNI.

---

## Dónde va cada llave (resumen)

| Llave | Dónde | ¿Pública? | ¿Al repo? |
|---|---|---|---|
| `SUPABASE_URL` | `config.js` **y** variable de entorno (scripts) | sí | sí |
| **anon key** | `config.js` → `supabaseAnonKey` | sí (la protege RLS) | sí |
| **service_role key** | **solo** variable de entorno `SUPABASE_SERVICE_KEY` | **NO — secreta** | **NO, jamás** |

---

## Fase A — Correr local (sin Supabase, modo demo)

No requiere Node. Con `config.js` vacío, la app usa el modo demo (localStorage),
idéntico al prototipo.

```bash
cd "…/Deployment Cultiva/kit-cultiva-app"
python3 -m http.server 8000
# abrir http://localhost:8000
```

Verifica: ningún request a `unpkg.com`/Google Fonts (todo local); en DevTools ›
Application › Service Workers debe figurar *activated*; marca **Offline** y
recarga → la app sigue abriendo.

Estructura relevante:
```
index.html            manifest.webmanifest   sw.js
config.js             cultiva-auth.js        usuarios.js (padrón demo)
data-*.js             CosechaApp.js · LoginScreen.js · EscaladasInbox.js · CultivaRegistroForm.js
assets/  (styles.css, logo, fonts/, icons/)   vendor/ (react, react-dom, lucide, supabase)
supabase/schema.sql   scripts/  (cultiva_admin.py, build_padron.py)
private/  (PII — gitignored)
```

---

## Fase B — Datos + Auth con Supabase

### 1) Crear el proyecto y cargar el esquema
1. Crea un proyecto en https://supabase.com.
2. **Auth › Providers › Email**: desactiva *Confirm email* (los correos son sintéticos).
3. **SQL Editor**: pega y ejecuta `supabase/schema.sql` (crea tablas `usuarios`,
   `registros`, `escaladas`, `escalada_mensajes`, el RPC `mark_password_changed`
   y las políticas RLS de dueño/parte).

### 2) Conectar la app (anon key → `config.js`)
En **Project Settings › API** copia *Project URL* y *anon public*:
```js
// config.js
window.CULTIVA_CONFIG = {
  supabaseUrl: "https://TU-PROYECTO.supabase.co",
  supabaseAnonKey: "eyJhbGciOi...",   // anon public (segura)
  emailDomain: "cultiva.interno",
};
```
Al rellenarlo, la app pasa automáticamente a modo Supabase (login real por legajo).

### 3) Validar la jerarquía (legajo_jefe)
La regla automática (gerencia+área+nivel+sede) resolvió 24/51; el resto tiene
varios jefes posibles. **Corrige antes de aprovisionar:**
1. Abre `private/jerarquia.csv` en Excel.
2. Ajusta la columna `legajo_jefe` en las filas marcadas `REVISAR = SÍ`
   (las columnas `candidatos_*` te muestran las opciones).
3. Reconstruye el padrón:
   ```bash
   python3 scripts/build_padron.py     # jerarquia.csv → private/padron.json
   ```

### 4) Pre-aprovisionar las 51 cuentas (service key → entorno)
La service key **nunca** se escribe en archivos del repo; va en el entorno:
```bash
export SUPABASE_URL="https://TU-PROYECTO.supabase.co"
export SUPABASE_SERVICE_KEY="eyJ...service_role..."   # secreta

python3 scripts/cultiva_admin.py provision --dry-run   # revisión previa
python3 scripts/cultiva_admin.py provision             # crea/actualiza cuentas
python3 scripts/cultiva_admin.py list                  # diagnóstico
```
Cada cuenta se crea con correo `<legajo>@cultiva.interno`, una **contraseña
temporal aleatoria** y `must_change_password = TRUE` (cambio forzado al primer
ingreso). Las temporales quedan en `private/credenciales_iniciales.csv`
(gitignored) para repartir 1-a-1.

### 5) Reseteo de contraseñas ("mostrador")
Lo opera Mambo con la service key:
```bash
python3 scripts/cultiva_admin.py reset 1070110044
# → imprime nueva contraseña temporal y vuelve a forzar cambio
```

### Verificar Fase B
1. Con `config.js` lleno, abre la app → ingresa un **legajo** → contraseña
   temporal → debe forzar **crear nueva contraseña** → entra a su perfil real.
2. Cierra sesión y reingresa con la nueva contraseña (ya no la pide cambiar).
3. En Supabase › Table editor › `usuarios`: el usuario aparece con su `perfil`
   y `legajo_jefe`, y `must_change_password = false` tras el cambio.

---

## Fase C — Escaladas cross-device + RLS

Hace que una escalada creada por un subordinado le aparezca a su **jefe directo
en otro dispositivo**, con respuestas de ida y vuelta.

### 1) RLS por jerarquía + denormalización
En **SQL Editor**, ejecuta `supabase/policies-hierarchy.sql` (después de
`schema.sql`). Agrega `from_nombre/from_cargo` a `escaladas`, `autor_nombre` a
los mensajes, deja que un jefe lea la ficha de sus reportes y **quita la
inserción directa de escaladas** (la creación pasa solo por la Edge Function).

### 2) Edge Function de enrutamiento
Requiere la CLI de Supabase (`brew install supabase/tap/supabase`).
```bash
supabase login
supabase link --project-ref TU-REF
# secrets que usa la función (la service role NO va al cliente):
supabase secrets set SUPABASE_URL="https://TU-PROYECTO.supabase.co" \
                     SUPABASE_ANON_KEY="eyJ...anon..." \
                     SUPABASE_SERVICE_ROLE_KEY="eyJ...service_role..."
supabase functions deploy escalar
```
La función `escalar` calcula el destinatario (`to_legajo = legajo_jefe`) con
service role, así no se puede falsificar. Acciones: `crear`, `subir`, `derivar`.

### Verificar Fase C (con 2 cuentas)
1. Entra como un **subordinado** (p.ej. un N4) → registra un tema en "Escucha
   antes de cosechar" → en el historial pulsa **Escalar**.
2. Entra como su **jefe** (su `legajo_jefe`) en otro navegador/dispositivo →
   abre "Revisar escaladas diarias" → el tema aparece en su bandeja.
3. El jefe **Comenta/Consulta** y cambia el estado; al **Escalo** + "Escalar
   hacia arriba", el tema sube al jefe del jefe.

> En modo demo (sin `config.js`) todo el flujo de la bandeja funciona local
> (incluida una respuesta simulada del subordinado), útil para revisión.
>
> Alcance: los `registros` (historial por ritual) siguen en localStorage; el
> botón **Escalar** sí crea una escalada real enrutada. Migrar el historial de
> registros a Supabase es un add-on opcional.

---

## Fase D — Deploy a GitHub Pages

### 1) Subir el repo
Sube **solo** el contenido de `kit-cultiva-app/` a un repo de GitHub. El
`.gitignore` ya excluye `private/` (PII), `.env` y llaves. Verifica antes de
hacer push que `private/` NO esté trackeado.

> `config.js` (URL + anon key) SÍ se sube: la anon key es pública por diseño.
> La service key vive solo en tu entorno y en los *secrets* del repo.

### 2) Activar Pages
**Settings › Pages › Build and deployment › Source: GitHub Actions.**
Al hacer push a `main`, el workflow [`deploy.yml`](.github/workflows/deploy.yml)
arma `dist/` con **solo los archivos del cliente** (excluye `private/`,
`scripts/` y `supabase/`) y publica. La app queda en
`https://TU-USUARIO.github.io/TU-REPO/`.

`404.html` reapunta cualquier ruta desconocida a la raíz del proyecto (la app
no usa enrutamiento por URL, pero así los enlaces viejos/typos no rompen).

### 3) Ping anti-pausa (Supabase free)
El plan gratuito pausa el proyecto tras ~1 semana inactivo. El workflow
[`ping-supabase.yml`](.github/workflows/ping-supabase.yml) lo toca cada 3 días.
Crea dos *secrets* del repo (**Settings › Secrets and variables › Actions**):
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

### Verificar Fase D
1. Push a `main` → pestaña **Actions**: el deploy debe quedar verde y dar la URL.
2. Abre la URL → la app carga (modo demo si `config.js` está vacío; Supabase si
   lo llenaste). Revisa que **no** se publicó `private/` (abrir
   `…github.io/TU-REPO/private/padron.json` debe dar 404).
3. **Actions › Ping Supabase › Run workflow** → debe salir `HTTP 200` y
   "Proyecto activo".

---

## Cómo hacer cambios (día a día)

Ciclo: **editar archivo → commit → Push (GitHub Desktop) → la Action despliega sola (~1–2 min).**
La versión del Service Worker se inyecta automáticamente en cada deploy, así que
los usuarios siempre reciben lo último (no hay que tocar `sw.js` a mano).

| Quieres cambiar… | Archivo(s) | Dónde se aplica |
|---|---|---|
| Textos de rituales / pasos / frases / temas | `data-cosecha.js`, `data-produccion.js`, `data-packing.js`, `data-calidad.js` | Push a GitHub |
| Textos de la app (login, botones, títulos) | `LoginScreen.js`, `CosechaApp.js`, … | Push a GitHub |
| Colores / fuentes | `assets/styles.css` | Push a GitHub |
| Layout / espaciados | bloque `<style>` en `index.html` | Push a GitHub |
| Funcionalidades / pantallas | componentes `.js` + `cultiva-data.js` | Push a GitHub |
| Tablas / permisos (RLS) / escaladas | `supabase/schema.sql`, `policies-hierarchy.sql`, Edge Function | **Supabase** (SQL Editor / redeploy función), NO Pages |
| Jerarquía (jefes) | `private/jerarquia.csv` → `build_padron.py` → `cultiva_admin.py sync` | Supabase (local, service key) |

Reglas: nunca subir `private/` (PII) ni la service key al repo; `main` es producción
(para probar sin afectar, pedir una rama de staging). Cambios pequeños de texto se
pueden hacer directo en github.com (Edit ✏️ → Commit).

## Resumen de fases
- **A — Build/PWA:** sin Babel/CDN; React/Lucide/fuentes auto-alojados; manifest
  + íconos + service worker (abre offline). ✅
- **B — Datos + Auth:** tablas + RPC + RLS de dueño; login por legajo (correo
  sintético) sobre Supabase Auth; aprovisionamiento + reseteo con service key. ✅
- **C — Escaladas + RLS:** RLS por jerarquía; Edge Function de enrutamiento;
  escaladas y registros server-side (cross-device) con hilo de ida y vuelta. ✅
- **D — Deploy:** GitHub Pages + `404.html` + Action de build + ping anti-pausa. ✅
