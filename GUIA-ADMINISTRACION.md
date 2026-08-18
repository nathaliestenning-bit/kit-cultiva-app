# Guía de administración · App Cultiva

Guía práctica para el/la administrador(a) del piloto (hoy Nathalie → mañana Carlos Eduardo).
Cubre lo básico del día a día: **agregar un legajo, quitar uno, resetear contraseña, ver quién está**.
No necesitas saber programar; solo seguir los pasos.

---

## 0. Cómo funciona una cuenta (contexto de 1 minuto)

Cada persona en la app tiene **dos piezas** que deben existir juntas:

1. **Cuenta de acceso (Auth):** es lo que le permite *entrar*. El usuario y el correo se arman solos con su legajo: `‹legajo›@cultiva.interno`. La contraseña inicial es **su propio legajo**, y en el primer ingreso la app lo obliga a crear una nueva.
2. **Ficha en la tabla `usuarios`:** guarda su **perfil** (`cos-n4`, `pack-n4-cl`, `cal-tac`, …), su **nivel** y **quién es su jefe** (`legajo_jefe`). De aquí sale lo que ve en la app y la jerarquía de escaladas/puntos.

> Regla de oro: para que alguien use la app, necesita **las dos**. La herramienta `cultiva_admin.py` crea/actualiza ambas de un solo comando.

---

## 1. Requisitos (una sola vez)

Para usar los comandos necesitas, en la computadora del administrador:

- **Python 3** (ya viene en Mac).
- El **repositorio** del proyecto (la carpeta `kit-cultiva-app`).
- Dos datos del proyecto Supabase, puestos como **variables de entorno** (NO se escriben en ningún archivo):
  - `SUPABASE_URL` = `https://‹tu-proyecto›.supabase.co`
  - `SUPABASE_SERVICE_KEY` = la **service_role key** (Supabase → Project Settings → API → *service_role*). **Secreta**: nunca al repo, al chat, ni a la web.

Se cargan así (en la Terminal, antes de correr los comandos):

```bash
export SUPABASE_URL="https://tu-proyecto.supabase.co"
export SUPABASE_SERVICE_KEY="pega-aqui-la-service-role-key"
cd "ruta/a/kit-cultiva-app"
```

---

## 2. Agregar un legajo nuevo

**Cuándo:** entra una persona nueva al piloto.

1. Abre el padrón privado **`private/padron.json`** y agrega un bloque con sus datos:
   ```json
   {
     "legajo": "1099999999",
     "nombre": "APELLIDO APELLIDO NOMBRE",
     "cargo": "Supervisor de Fundo",
     "gerencia": "GERENCIA DE COSECHA",
     "area": "cosecha",
     "sede": "FUNDO X",
     "nivel": "N3",
     "perfil": "cos-n3",
     "legajo_jefe": "1070000000"
   }
   ```
   - **`perfil`** define qué rituales ve. Valores válidos: `cos-n1..n4`, `prod-n1..n4`, `pack-n1..n4`, `pack-n4-cl` (Control de Línea), `cal-n2..n4`, `cal-tac`.
   - **`legajo_jefe`** es el legajo de su jefe directo. **Ese jefe ya debe existir** en la tabla (crea primero a los de arriba). Si es tope de cadena, déjalo `null`.

2. Provisiona **solo a esa persona**:
   ```bash
   python3 scripts/cultiva_admin.py provision 1099999999
   ```
   Esto crea su cuenta de acceso + su ficha + lo engancha con su jefe. (Usar el legajo al final es importante: así **no** re-toca a los demás usuarios.)

3. Listo. Esa persona entra con **su legajo como usuario y como contraseña**, y crea su clave nueva al primer ingreso.

> Tip: para ver qué haría sin ejecutar, agrega `--dry-run`.

---

## 3. Quitar un legajo (alguien que renunció)

Para que **deje de poder entrar**, hay que borrar su **cuenta de acceso (Auth)**:

1. Supabase → **Authentication** → **Users**.
2. Busca `‹legajo›@cultiva.interno` (ej. `1099999999@cultiva.interno`).
3. Menú **⋯** → **Delete user** → confirma.

Opcional (recomendado, para sacarlo también de la jerarquía y del dashboard) — Supabase → **SQL Editor**, pega y **Run**:
```sql
delete from usuarios where legajo = '1099999999';
```

> ⚠️ Ojo: existe una columna `activo` en la tabla, pero **hoy la app no la usa para bloquear el acceso**. Poner `activo=false` **no** impide entrar. Por eso lo que corta el acceso de verdad es **borrar la cuenta de Auth** (paso 1).

---

## 4. Resetear la contraseña de alguien (la olvidó)

```bash
python3 scripts/cultiva_admin.py reset 1099999999
```
Te devuelve una **contraseña temporal**; pásasela a la persona. Al entrar, la app le pedirá crear una nueva.

---

## 5. Ver quién está registrado (diagnóstico)

```bash
python3 scripts/cultiva_admin.py list
```
Lista todos los legajos con su perfil, su jefe y si aún deben cambiar contraseña.

---

## 6. Crear un administrador del dashboard

Un admin entra con su legajo y ve el **Dashboard de gerencia** (no la galería de rituales):
```bash
python3 scripts/cultiva_admin.py admin 1099999999 "APELLIDO NOMBRE"
```
Para quitarle el rol admin (sin borrarlo), en el SQL Editor:
```sql
update usuarios set es_admin = false where legajo = '1099999999';
```

---

## 7. Actualizar jerarquía/cargos en masa (cuando llega organigrama nuevo)

Si cambian muchos jefes/perfiles a la vez, edita `private/padron.json` (o el `private/jerarquia.csv` y corre `python3 scripts/build_padron.py`), y luego:
```bash
python3 scripts/cultiva_admin.py sync
```
`sync` actualiza jerarquía, cargos y perfiles **sin tocar las contraseñas** de quienes ya crearon la suya.

---

## Resumen rápido

| Necesito… | Comando / acción |
|---|---|
| Agregar 1 persona | editar `padron.json` → `provision ‹legajo›` |
| Quitar 1 persona | borrar su usuario en **Authentication** (+ opcional `delete from usuarios`) |
| Resetear su clave | `reset ‹legajo›` |
| Ver todos | `list` |
| Crear admin | `admin ‹legajo› "‹nombre›"` |
| Actualizar jerarquía en masa | editar padrón → `sync` |

**Seguridad:** la `service_role key` es la llave maestra. Solo la usa el administrador en su Terminal, como variable de entorno. Nunca en el repositorio, en la web, ni compartida por chat/correo.
