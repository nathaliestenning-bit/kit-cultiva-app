#!/usr/bin/env python3
# ============================================================
#  Reconstruye private/padron.json desde private/jerarquia.csv
#  Úsalo DESPUÉS de corregir la columna `legajo_jefe` en Excel.
#  (padron.json es lo que consume scripts/cultiva_admin.py y la app)
# ============================================================
import os, csv, json
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV  = os.path.join(HERE, "private", "jerarquia.csv")
OUT  = os.path.join(HERE, "private", "padron.json")

rows = list(csv.DictReader(open(CSV, encoding="utf-8-sig")))
out = []
for r in rows:
    out.append({
        "legajo": r["legajo"].strip(),
        "nombre": r["nombre"].strip(),
        "cargo": r["cargo"].strip(),
        "gerencia": ("GERENCIA DE " + r["gerencia"].strip()) if not r["gerencia"].startswith("GERENCIA") else r["gerencia"].strip(),
        "area": r["area"].strip(),
        "sede": r["sede"].strip(),
        "nivel": r["nivel"].strip().upper(),
        "perfil": r["perfil"].strip(),
        "legajo_jefe": (r["legajo_jefe"].strip() or None),
    })
json.dump(out, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
faltan = [u["legajo"] for u in out if not u["legajo_jefe"] and not u["perfil"].endswith("-n1") and u["perfil"] not in ("cal-n2",)]
print(f"OK · {len(out)} usuarios → {OUT}")
if faltan:
    print(f"AVISO: {len(faltan)} sin legajo_jefe (revisa si es correcto): {', '.join(faltan)}")
