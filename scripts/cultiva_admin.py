#!/usr/bin/env python3
# ============================================================
#  CULTIVA · ADMIN (aprovisionamiento + reseteo de contraseñas)
#  Solo Python estándar (sin pip). Usa la SERVICE KEY desde el
#  entorno — NUNCA va en el bundle ni en el repo.
#
#  Requiere variables de entorno:
#    SUPABASE_URL          = https://xxxx.supabase.co
#    SUPABASE_SERVICE_KEY  = (service_role key, secreta)
#
#  Lee el padrón validado desde:  private/padron.json
#  (campos: legajo, nombre, cargo, gerencia, area, sede, nivel,
#           perfil, legajo_jefe)
#
#  Uso:
#    python3 scripts/cultiva_admin.py provision         # crea/actualiza TODAS las cuentas
#    python3 scripts/cultiva_admin.py provision --dry-run
#    python3 scripts/cultiva_admin.py provision 1044995392   # solo ese legajo (no re-marca a los demás)
#    python3 scripts/cultiva_admin.py reset 1070110044  # "mostrador de reseteos"
#    python3 scripts/cultiva_admin.py list              # diagnóstico
#
#  Correo sintético por usuario: <legajo>@cultiva.interno
#  Primer ingreso: contraseña temporal aleatoria + must_change_password=TRUE
#  (las temporales se vuelcan a private/credenciales_iniciales.csv — gitignored).
# ============================================================
import os, sys, json, csv, secrets, string, urllib.request, urllib.error, urllib.parse

URL = os.environ.get("SUPABASE_URL", "").rstrip("/")
KEY = os.environ.get("SUPABASE_SERVICE_KEY", "")
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PADRON = os.path.join(HERE, "private", "padron.json")
CREDS  = os.path.join(HERE, "private", "credenciales_iniciales.csv")
EMAIL_DOMAIN = "cultiva.interno"
NIVEL_RANK = {"N1": 1, "N2": 2, "N3": 3, "N4": 4}  # jefes (rank menor) primero

def die(msg):
    print("ERROR:", msg); sys.exit(1)

def need_env():
    if not URL or not KEY:
        die("Define SUPABASE_URL y SUPABASE_SERVICE_KEY en el entorno.")

def api(method, path, body=None, base="rest"):
    """Llama a Supabase. base='rest' (PostgREST) o 'auth' (GoTrue admin)."""
    root = f"{URL}/{'rest/v1' if base=='rest' else 'auth/v1'}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(root + path, data=data, method=method)
    req.add_header("apikey", KEY)
    req.add_header("Authorization", "Bearer " + KEY)
    req.add_header("Content-Type", "application/json")
    if base == "rest":
        req.add_header("Prefer", "resolution=merge-duplicates,return=representation")
    try:
        with urllib.request.urlopen(req) as r:
            raw = r.read().decode()
            return r.status, (json.loads(raw) if raw else None)
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
        try: payload = json.loads(raw)
        except Exception: payload = raw
        return e.code, payload

def email_for(legajo): return f"{legajo}@{EMAIL_DOMAIN}"
def temp_password():
    alpha = string.ascii_letters + string.digits
    return "Cv-" + "".join(secrets.choice(alpha) for _ in range(12))

def load_padron():
    if not os.path.exists(PADRON):
        die(f"No existe {PADRON}. Genera/valida el padrón primero.")
    data = json.load(open(PADRON, encoding="utf-8"))
    # jefes (nivel superior) primero, para satisfacer el FK legajo_jefe
    data.sort(key=lambda u: NIVEL_RANK.get(u.get("nivel"), 9))
    return data

_auth_cache = None
def all_auth_users():
    """Lista TODOS los usuarios de Auth (paginando, per_page alto) y los
       cachea por email. Evita el bug de paginación (50 por página)."""
    global _auth_cache
    if _auth_cache is not None:
        return _auth_cache
    users = {}
    page = 1
    while True:
        st, body = api("GET", f"/admin/users?per_page=1000&page={page}", base="auth")
        if st != 200:
            break
        batch = body.get("users", []) if isinstance(body, dict) else (body or [])
        for u in batch:
            if u.get("email"):
                users[u["email"].lower()] = u
        if len(batch) < 1000:
            break
        page += 1
    _auth_cache = users
    return users

def find_auth_user_by_email(email):
    return all_auth_users().get((email or "").lower())

def upsert_usuario(u, auth_id):
    # 1ra pasada: SIN legajo_jefe (evita fallos de llave foránea por orden).
    # La jerarquía se asigna en una 2da pasada, cuando ya existen todas las filas.
    row = {
        "legajo": u["legajo"], "auth_id": auth_id, "nombre": u["nombre"],
        "cargo": u.get("cargo"), "gerencia": u.get("gerencia"), "area": u.get("area"),
        "sede": u.get("sede"), "nivel": u.get("nivel"), "perfil": u["perfil"],
        "legajo_jefe": None,
        "must_change_password": True, "activo": True,
    }
    st, body = api("POST", "/usuarios?on_conflict=legajo", row)
    return st, body

# ---------------------------------------------------------------- provision
def cmd_provision(dry=False, only=None):
    need_env()
    padron = load_padron()
    if only:
        # provisionar UN solo legajo (no re-escribe las filas de los demás,
        # así no se les vuelve a activar must_change_password). El jefe debe
        # existir ya en la tabla `usuarios` para satisfacer el FK legajo_jefe.
        padron = [u for u in padron if u["legajo"] == only]
        if not padron:
            die(f"El legajo {only} no está en {PADRON}.")
    print(f"Aprovisionando {len(padron)} usuario(s) (dry-run={dry})…")
    creds = []
    created = updated = errors = 0
    for u in padron:
        email = email_for(u["legajo"])
        if dry:
            print(f"  [dry] {u['legajo']}  {email}  perfil={u['perfil']}  jefe={u.get('legajo_jefe')}")
            continue
        existing = find_auth_user_by_email(email)
        if existing:
            auth_id = existing["id"]; updated += 1; pw = None
            print(f"  ~ existe   {u['legajo']}  ({u['nombre']})")
        else:
            pw = u["legajo"]   # contraseña inicial = legajo (cambio forzado al 1er ingreso)
            st, body = api("POST", "/admin/users", {
                "email": email, "password": pw, "email_confirm": True,
                "user_metadata": {"legajo": u["legajo"], "nombre": u["nombre"], "perfil": u["perfil"]},
            }, base="auth")
            if st not in (200, 201):
                errors += 1; print(f"  ✗ auth    {u['legajo']}: {st} {body}"); continue
            auth_id = body["id"]; created += 1
            creds.append({"legajo": u["legajo"], "nombre": u["nombre"], "email": email, "password_temporal": pw})
            print(f"  + creado   {u['legajo']}  ({u['nombre']})")
        st, body = upsert_usuario(u, auth_id)
        if st not in (200, 201):
            errors += 1; print(f"  ✗ usuarios {u['legajo']}: {st} {body}")
    # 2da pasada: asignar legajo_jefe ahora que todas las filas existen
    print("\nAsignando jerarquía (legajo_jefe)…")
    jefes = jerr = 0
    for u in padron:
        if not u.get("legajo_jefe"):
            continue
        st, body = api("PATCH", f"/usuarios?legajo=eq.{u['legajo']}", {"legajo_jefe": u["legajo_jefe"]})
        if st in (200, 204): jefes += 1
        else: jerr += 1; print(f"  ✗ jefe {u['legajo']} → {u['legajo_jefe']}: {st} {body}")
    print(f"  jerarquía asignada: {jefes}  | errores jerarquía: {jerr}")
    if creds:
        new = not os.path.exists(CREDS)
        with open(CREDS, "a", newline="", encoding="utf-8-sig") as f:
            w = csv.DictWriter(f, fieldnames=["legajo", "nombre", "email", "password_temporal"])
            if new: w.writeheader()
            w.writerows(creds)
        print(f"\nContraseñas temporales → {CREDS}  (distribuir 1-a-1; gitignored)")
    print(f"\nResumen: creados={created}  existentes={updated}  errores={errors}")

# ---------------------------------------------------------------- sync
def cmd_sync(dry=False):
    """Actualiza jerarquía/cargos desde private/padron.json SIN tocar
       contraseñas (no resetea must_change_password). Útil al llegar el
       organigrama real cuando ya hay gente con su clave creada."""
    need_env()
    padron = load_padron()
    print(f"Sincronizando {len(padron)} usuarios (jerarquía/cargos, sin tocar contraseñas)…")
    upd = errors = 0
    for u in padron:
        fields = {
            "nombre": u["nombre"], "cargo": u.get("cargo"), "gerencia": u.get("gerencia"),
            "area": u.get("area"), "sede": u.get("sede"), "nivel": u.get("nivel"),
            "perfil": u["perfil"], "legajo_jefe": u.get("legajo_jefe") or None,
        }
        if dry:
            print(f"  [dry] {u['legajo']}  jefe={fields['legajo_jefe']}  perfil={fields['perfil']}"); continue
        st, body = api("PATCH", f"/usuarios?legajo=eq.{u['legajo']}", fields)
        if st in (200, 204): upd += 1
        else: errors += 1; print(f"  ✗ {u['legajo']}: {st} {body}")
    print(f"\nResumen: actualizados={upd}  errores={errors}")

# ---------------------------------------------------------------- init-pwd
def cmd_init_passwords(dry=False):
    """Pone la contraseña de CADA usuario = su propio legajo y fuerza el
       cambio al primer ingreso. Útil para un arranque simple del piloto."""
    need_env()
    padron = load_padron()
    print(f"Fijando contraseña = legajo en {len(padron)} cuentas (dry-run={dry})…")
    ok = errors = 0
    for u in padron:
        email = email_for(u["legajo"])
        if dry:
            print(f"  [dry] {u['legajo']}  pwd={u['legajo']}"); continue
        user = find_auth_user_by_email(email)
        if not user:
            errors += 1; print(f"  ✗ {u['legajo']}: sin cuenta auth"); continue
        st, body = api("PUT", f"/admin/users/{user['id']}", {"password": u["legajo"]}, base="auth")
        if st != 200:
            errors += 1; print(f"  ✗ {u['legajo']}: {st} {body}"); continue
        api("PATCH", f"/usuarios?legajo=eq.{u['legajo']}", {"must_change_password": True})
        ok += 1
    print(f"\nResumen: contraseñas fijadas={ok}  errores={errors}")
    print("Cada usuario entra con LEGAJO como usuario y contraseña → y crea una nueva.")

# ---------------------------------------------------------------- reset
def cmd_reset(legajo):
    need_env()
    email = email_for(legajo)
    user = find_auth_user_by_email(email)
    if not user: die(f"No existe cuenta para legajo {legajo} ({email}).")
    pw = temp_password()
    st, body = api("PUT", f"/admin/users/{user['id']}", {"password": pw}, base="auth")
    if st != 200: die(f"No se pudo resetear: {st} {body}")
    # vuelve a forzar cambio al próximo ingreso
    api("PATCH", f"/usuarios?legajo=eq.{legajo}", {"must_change_password": True})
    print(f"OK · {legajo} ({user.get('email')})")
    print(f"   nueva contraseña temporal: {pw}")
    print("   (se forzará cambio en el próximo ingreso)")

# ---------------------------------------------------------------- admin
def cmd_admin(legajo, nombre):
    """Crea (o actualiza) una cuenta ADMIN del dashboard: usuario en Auth +
       fila en `usuarios` con es_admin=true, perfil='admin'. Entra por legajo
       (contraseña = legajo). Requiere que dashboard.sql ya se haya corrido
       (columna es_admin). Para dar de baja un admin: cmd_admin no; usar
       `update usuarios set es_admin=false where legajo='...'` en el SQL Editor."""
    need_env()
    legajo = str(legajo).strip()
    email = email_for(legajo)
    existing = find_auth_user_by_email(email)
    if existing:
        auth_id = existing["id"]
        print(f"  ~ auth ya existe  {legajo}")
    else:
        st, body = api("POST", "/admin/users", {
            "email": email, "password": legajo, "email_confirm": True,
            "user_metadata": {"legajo": legajo, "nombre": nombre, "es_admin": True},
        }, base="auth")
        if st not in (200, 201): die(f"auth {legajo}: {st} {body}")
        auth_id = body["id"]
        print(f"  + auth creado    {legajo}")
    row = {"legajo": legajo, "auth_id": auth_id, "nombre": nombre, "perfil": "admin",
           "es_admin": True, "activo": True, "must_change_password": False}
    st, body = api("POST", "/usuarios?on_conflict=legajo", row)
    if st not in (200, 201): die(f"usuarios {legajo}: {st} {body}")
    print(f"OK admin · {legajo} ({nombre}) — entra con legajo como usuario y contraseña; ve el dashboard.")

# ---------------------------------------------------------------- list
def cmd_list():
    need_env()
    st, body = api("GET", "/usuarios?select=legajo,nombre,perfil,legajo_jefe,must_change_password&order=perfil")
    if st != 200: die(f"{st} {body}")
    print(f"{len(body)} usuarios en la tabla `usuarios`:")
    for r in body:
        flag = "  (debe cambiar pwd)" if r.get("must_change_password") else ""
        print(f"  {r['legajo']:12} {r['perfil']:8} jefe={str(r.get('legajo_jefe')):12} {r['nombre']}{flag}")

if __name__ == "__main__":
    args = sys.argv[1:]
    cmd = args[0] if args else ""
    if cmd == "provision":
        only = next((a for a in args[1:] if not a.startswith("--")), None)
        cmd_provision(dry="--dry-run" in args, only=only)
    elif cmd == "sync": cmd_sync(dry="--dry-run" in args)
    elif cmd == "init-pwd": cmd_init_passwords(dry="--dry-run" in args)
    elif cmd == "reset" and len(args) >= 2: cmd_reset(args[1])
    elif cmd == "admin" and len(args) >= 3: cmd_admin(args[1], args[2])
    elif cmd == "list": cmd_list()
    else:
        print(__doc__ or "")
        print("Comandos: provision [<legajo>] [--dry-run] | sync [--dry-run] | init-pwd [--dry-run] | reset <legajo> | admin <legajo> \"<nombre>\" | list")
        sys.exit(1)
