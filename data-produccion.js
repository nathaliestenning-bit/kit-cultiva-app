/* ============================================================
   DATA · KIT CULTIVA — PRODUCCIÓN AGRÍCOLA (LABORES) · N1–N4
   Reconstruido (21/06/2026) desde "Kit Cultiva por Perfil v5.1.xlsx"
   — fichas por perfil (hojas 5–8) + hoja "Resumen rituales — multiárea".
   Se inyecta sobre las estructuras creadas en data-cosecha.js
   (window.PROFILES / PROFILES_BY_AREA / ESCALADAS_DEMO).
   Regla del área: premia PERMANENCIA, no desempeño puntual; el dolor
   cultural es la INVISIBILIDAD del trabajo silencioso.
   ============================================================ */

Object.assign(window.PROFILES, {

  /* ---------------------------------------------------------- N1 */
  "prod-n1": {
    "id": "prod-n1",
    "area": "produccion",
    "level": "N1",
    "role": "Gerente / Sub-gerente de Prod. Agrícola",
    "sub": "Nombra lo silencioso",
    "context": "Sponsors del piloto en Labores. El dolor de esta gerencia NO es de gestión sino de INVISIBILIDAD: que el riego no falle, que la sanidad cumpla, que la premezcla salga, son logros que nadie nota. El rol del sub-gerente es nombrar lo silencioso y cerrar el cascadeo de escucha que sube desde Riego, Sanidad y Producción.",
    "rituals": [
      {
        "id": "caminata-por-areas",
        "kind": "full",
        "dimension": "lidera",
        "icon": "footprints",
        "title": "Caminata por áreas",
        "freq": "Quincenal",
        "purpose": "Hacer visible que la Gerencia ve el trabajo que nadie nombra.",
        "context": {
          "freq": "1 visita a CADA área (Sanidad / Riego / Premezcla) en 2 semanas",
          "when": "",
          "place": "En el lote, almacén o caseta — no en oficina"
        },
        "steps": [
          { "k": "Programa", "t": "la visita en un momento real de trabajo del área (no en horario administrativo)." },
          { "k": "Llega", "t": "saluda por nombre y observa la labor SIN corregir ni dar instrucciones." },
          { "k": "Pregunta", "t": "1 cosa abierta: “¿Qué es lo que desde mi puesto no logro ver de tu trabajo?”" },
          { "k": "Nombra", "t": "en voz alta 1 cosa silenciosa que viste: “Que el riego no falle hoy ES un logro. Lo veo.”" },
          { "k": "Registra", "t": "1-2 temas levantados y a quién corresponde resolverlos." },
          { "k": "Cierra", "t": "agradeciendo por nombre." }
        ],
        "phrases": [
          "Vine porque quería ver de cerca lo que hacen acá, no a revisar nada.",
          "Que esto funcione sin que nadie lo note es justo lo que vengo a reconocer.",
          "Esto que me cuentas lo subo y te traigo respuesta esta semana."
        ],
        "no": [
          "Convertir la caminata en una inspección o auditoría.",
          "Proponer soluciones en el momento (primero escuchar).",
          "Visitar solo las áreas visibles y saltarse Riego o la caseta."
        ],
        "registro": {
          "soporte": "Registro de visita en terreno",
          "fields": [
            { "k": "area", "l": "Área visitada", "t": "text", "req": true },
            { "k": "jefe", "l": "Jefe visitado", "t": "person" },
            { "k": "temas", "l": "Temas levantados", "t": "area", "req": true },
            { "k": "acuerdos", "l": "Acuerdos", "t": "area" },
            { "k": "proxima", "l": "Próxima reunión", "t": "date" }
          ]
        }
      },
      {
        "id": "feedback-1-1-mensual",
        "kind": "full",
        "dimension": "lidera",
        "icon": "message-square-quote",
        "title": "Feedback 1:1 Mensual",
        "freq": "Mensual",
        "purpose": "Sesión de feedback con Jefaturas. Alinear sin imponer, reconocer conducta específica y acordar un ajuste concreto (método SCI).",
        "context": {
          "freq": "1 vez al mes",
          "when": "30-45 min",
          "place": "Oficina o caminata por campo"
        },
        "steps": [
          { "k": "Prepara", "t": "1 ejemplo de algo BIEN hecho y 1 de algo a MEJORAR (ambos observados, no oídos) con el método SCI." },
          { "k": "Abre", "t": "con la SITUACIÓN específica: “¿Recuerdas el martes pasado cuando [hecho]?”" },
          { "k": "Conecta la conducta", "t": "observable, sin juicios: “Vi que tú [hiciste X]”." },
          { "k": "Conecta el impacto", "t": "real: “Eso generó [efecto en el equipo / en la cosecha]”." },
          { "k": "Escucha", "t": "la versión del Jefe: “¿Cómo lo viste tú?” — 2 minutos sin interrumpir." },
          { "k": "Acuerda", "t": "algo concreto: “¿Qué harás distinto y a partir de cuándo?”" },
          { "k": "Cierra", "t": "con un mensaje positivo, destaca el compromiso y agenda la próxima conversación." },
          { "k": "Da seguimiento", "t": "después: “¿Cómo te funcionó lo que acordamos?”" }
        ],
        "phrases": [
          "Lo que mejor vi este mes fue cómo manejaste [situación] y que generó [impacto]. Quiero que sepas que lo registré.",
          "Necesito que el foco del mes esté en [X]. ¿Qué te bloquea para empujar eso?",
          "Si algo está estructuralmente roto y no depende de ti, dímelo ahora. Es mi trabajo destrabarlo.",
          "No vine a corregirte, vine a alinearnos. ¿Qué necesitas de mí?"
        ],
        "no": [
          "Convertirla en reunión operativa de números.",
          "Hacerla sin haberla agendado con anticipación.",
          "Cerrar sin acuerdo concreto.",
          "Convertirlo en monólogo de instrucciones."
        ],
        "registro": {
          "soporte": "Tarjeta SCI",
          "fields": [
            { "k": "persona", "l": "Jefe", "t": "person", "req": true },
            { "k": "situacion", "l": "Situación", "t": "area", "req": true },
            { "k": "conducta", "l": "Conducta", "t": "area" },
            { "k": "impacto", "l": "Impacto", "t": "area" },
            { "k": "acuerdo", "l": "Acuerdo", "t": "area" },
            { "k": "comentarios", "l": "Comentarios adicionales", "t": "area" }
          ]
        }
      },
      {
        "id": "revisar-escaladas-diarias",
        "kind": "escaladas",
        "dimension": "escucha",
        "icon": "inbox",
        "title": "Revisar escaladas diarias",
        "freq": "Diario · Cierre",
        "from": "Jefaturas",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por las Jefaturas.",
        "purpose": "Que el Jefe / Coordinador sienta tu respaldo y que escalar tiene sentido."
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "award",
        "title": "Reconocimiento",
        "freq": "Semanal",
        "purpose": "Modelar visiblemente que Cultiva es para todos los niveles y reconocer el cumplimiento.",
        "context": {
          "freq": "1 vez por semana",
          "when": "3 min",
          "place": "En espacio público (Comité, reunión de equipo, mensaje grupal)"
        },
        "steps": [
          { "k": null, "t": "Durante la semana observar conscientemente a los Jefes y conductas que destaquen (en comportamiento Cultiva o en rendimiento operativo)." },
          { "k": null, "t": "Anotar en la plantilla de registro la CONDUCTA destacada ESPECÍFICA y el IMPACTO que esa acción tuvo para la empresa y/o el grupo." },
          { "k": null, "t": "Elegir el espacio más adecuado para mencionarlo (reunión grupal es ideal)." },
          { "k": null, "t": "Nombrar la CONDUCTA específica y el IMPACTO que esta trajo: \"[Nombre], te agradezco por [conducta], esto nos ha ayudado en [impacto].\"" }
        ],
        "phrases": [
          "Quiero reconocer a [nombre]. Este mes lo vi [conducta específica] lo que nos está ayudando mucho en [impacto directo]. Eso es Cultiva modelado.",
          "Si tuviera que poner un ejemplo de cómo se hace Cultiva-Valora bien, sería [nombre] cuando [situación]."
        ],
        "no": [
          "Reconocimiento genérico ('todos lo hacen bien').",
          "Saltárselo una semana (rompe el ritmo).",
          "Reconocer solo a los mismos."
        ],
        "registro": {
          "soporte": "Registro de reconocimiento",
          "fields": [
            { "k": "persona", "l": "Jefe a reconocer", "t": "person", "req": true },
            { "k": "conducta", "l": "Conducta destacada", "t": "area", "req": true },
            { "k": "impacto", "l": "Impacto", "t": "area" }
          ]
        }
      }
    ]
  },

  /* ---------------------------------------------------------- N2 */
  "prod-n2": {
    "id": "prod-n2",
    "area": "produccion",
    "level": "N2",
    "role": "Jefaturas (Riego / Sanidad / Fertirriego)",
    "sub": "Bisagra de sponsorship",
    "context": "Nivel de jefaturas (Riego, Sanidad, Fertirriego, Producción). Bisagra de sponsorship directo. Su variación clave frente a Cosecha: NOMBRAR el trabajo invisible, no corregirlo. El cascadeo de escucha pasa por aquí: clasifica y responde de vuelta.",
    "rituals": [
      {
        "id": "feedback-1-1-mensual",
        "kind": "full",
        "dimension": "lidera",
        "icon": "message-square-quote",
        "title": "Feedback 1:1 Mensual",
        "freq": "Mensual",
        "purpose": "Sesión de feedback mensual con el líder a cargo. Alinear sin imponer, reconocer conducta específica y acordar un ajuste concreto.",
        "context": {
          "freq": "1 vez al mes",
          "when": "30 min",
          "place": "Oficina del fundo o caminata"
        },
        "steps": [
          { "k": "Prepara", "t": "1 ejemplo de algo BIEN hecho y 1 de algo a MEJORAR (ambos observados, no oídos) con el método SCI." },
          { "k": "Abre", "t": "con la SITUACIÓN específica: “¿Recuerdas el martes pasado cuando [hecho]?”" },
          { "k": "Conecta la conducta", "t": "observable, sin juicios: “Vi que tú [hiciste X]”." },
          { "k": "Conecta el impacto", "t": "real: “Eso generó [efecto en el equipo / en la cosecha]”." },
          { "k": "Escucha", "t": "la versión del Supervisor / Coordinador: “¿Cómo lo viste tú?” — 2 minutos sin interrumpir." },
          { "k": "Acuerda", "t": "algo concreto: “¿Qué harás distinto y a partir de cuándo?”" },
          { "k": "Cierra", "t": "con un mensaje positivo, destaca el compromiso y agenda la próxima conversación." },
          { "k": "Da seguimiento", "t": "después: “¿Cómo te funcionó lo que acordamos?”" }
        ],
        "phrases": [
          "Recuerdo el martes en el lote 4 cuando [situación]. Vi que tú [conducta]. Eso generó [impacto]. ¿Cómo lo ves tú?",
          "No vine a corregirte, vine a alinearnos. ¿Qué necesitas de mí?",
          "Antes de cerrar quiero reconocer que [conducta positiva]. Eso me da confianza."
        ],
        "no": [
          "Hablar de personas, no de hechos.",
          "Cerrar sin un acuerdo concreto.",
          "Saltarse el reconocimiento al final.",
          "Convertirlo en monólogo de instrucciones."
        ],
        "registro": {
          "soporte": "Tarjeta SCI",
          "fields": [
            { "k": "persona", "l": "Supervisor / Coordinador", "t": "person", "req": true },
            { "k": "situacion", "l": "Situación", "t": "area", "req": true },
            { "k": "conducta", "l": "Conducta", "t": "area" },
            { "k": "impacto", "l": "Impacto", "t": "area" },
            { "k": "acuerdo", "l": "Acuerdo", "t": "area" },
            { "k": "comentarios", "l": "Comentarios adicionales", "t": "area" }
          ]
        }
      },
      {
        "id": "revisar-escaladas-diarias",
        "kind": "escaladas",
        "dimension": "escucha",
        "icon": "inbox",
        "title": "Revisar escaladas diarias",
        "freq": "Diario · Cierre",
        "from": "Jefes de Producción de área",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Jefes de Producción de área.",
        "purpose": "Que el Jefe / Coordinador sienta tu respaldo y que escalar tiene sentido."
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "award",
        "title": "Reconocimiento",
        "freq": "Semanal",
        "purpose": "Hacer visible quién está modelando Cultiva de manera oportuna.",
        "context": {
          "freq": "1 vez por semana",
          "when": "3 min",
          "place": "En reunión de tu equipo"
        },
        "steps": [
          { "k": null, "t": "Durante la semana observar conscientemente personas que destaquen (en conducta o en rendimiento)." },
          { "k": null, "t": "Anotar en la plantilla de registro la CONDUCTA destacada ESPECÍFICA y el IMPACTO que esa acción tuvo para la empresa y/o el grupo." },
          { "k": null, "t": "Elegir el espacio más adecuado para mencionarlo (reunión grupal es ideal)." },
          { "k": null, "t": "Nombrar la CONDUCTA específica y el IMPACTO que esta trajo: \"[Nombre], te agradezco por [conducta], esto nos ha ayudado en [impacto].\"" }
        ],
        "phrases": [
          "Quiero reconocer a [nombre]. Este mes lo vi [conducta específica] lo que nos está ayudando mucho en [impacto directo]. Eso es Cultiva modelado.",
          "Si tuviera que poner un ejemplo de cómo se hace Cultiva-Valora bien, sería [nombre] cuando [situación]."
        ],
        "no": [
          "Reconocimiento genérico ('todos lo hacen bien').",
          "Saltárselo una semana (rompe el ritmo).",
          "Reconocer solo a los mismos."
        ],
        "registro": {
          "soporte": "App Cultiva — Plantilla de Reconocimiento (jefaturas)",
          "fields": [
            { "k": "persona", "l": "Persona a reconocer", "t": "person", "req": true },
            { "k": "conducta", "l": "Conducta reconocida", "t": "area", "req": true },
            { "k": "espacio", "l": "Espacio", "t": "text" }
          ]
        }
      }
    ]
  },

  /* ---------------------------------------------------------- N3 */
  "prod-n3": {
    "id": "prod-n3",
    "area": "produccion",
    "level": "N3",
    "role": "Jefe de Producción de Área",
    "sub": "La bisagra de Labores",
    "context": "La bisagra de Labores (Riego, Fertirriego, Sanidad, Producción). Equivale al Supervisor de Fundo en Cosecha, pero su foco es la CALIDAD del trabajo silencioso, no supervisar un equipo grande. Cierra escaladas <48 h y sostiene a quienes trabajan solos o expuestos.",
    "rituals": [
      {
        "id": "saludo-con-proposito",
        "kind": "light",
        "dimension": "lidera",
        "icon": "sunrise",
        "title": "Saludo con propósito",
        "freq": "Diario · Inicio",
        "reminder": "Al inicio del día no olvides saludar a tu equipo con energía para iniciar bien la jornada.",
        "hasDone": true
      },
      {
        "id": "coaching-de-terreno",
        "kind": "full",
        "dimension": "lidera",
        "icon": "compass",
        "title": "Coaching de Terreno",
        "freq": "2×/semana",
        "purpose": "Desarrollar al Supervisor en terreno, en tiempo real, sobre situaciones críticas.",
        "context": {
          "freq": "2 veces por semana",
          "when": "20 min",
          "place": "En el lote, caseta o almacén durante la labor"
        },
        "steps": [
          { "k": "Observa", "t": "cómo trabajan los supervisores e identifica quiénes requieren acompañamiento para mejorar su forma de actuar, decidir y liderar." },
          { "k": "Acércate", "t": "con una apertura neutra: “Oye, ¿cómo vas hoy? ¿Qué te está costando más estos días?” (en tono de ayuda, no de supervisión)." },
          { "k": "Pregunta", "t": "para hacer reflexionar: “¿Qué crees que está pasando? ¿Qué cambiarías tú?” (deja que proponga la solución)." },
          { "k": "Acuerda", "t": "una sola cosa: “¿Qué vas a hacer distinto entonces?”" },
          { "k": "Cierra", "t": "con un reconocimiento por el compromiso de cambio y su esfuerzo por mejorar." },
          { "k": "Vuelve", "t": "a preguntar después de unos días: “¿Cómo resultó lo que acordamos?”" }
        ],
        "phrases": [
          "Observé cómo hiciste _____. Cuéntame por qué lo hiciste así.",
          "¿Qué necesitas de mí para que esto salga aún mejor?",
          "Repíteme el acuerdo para asegurarnos de que quedamos igual."
        ],
        "no": [
          "Corregir antes de observar.",
          "Dar la solución (es desarrollo, no instrucción).",
          "Hacer coaching en grupo (recuerda, es 1:1).",
          "Irse sin un acuerdo concreto.",
          "Saltarse el reconocimiento al final."
        ],
        "registro": {
          "soporte": "Tarjeta de Coaching",
          "fields": [
            { "k": "persona", "l": "Supervisor", "t": "person", "req": true },
            { "k": "observo", "l": "Observo", "t": "area", "req": true },
            { "k": "pregunto", "l": "Pregunto", "t": "area" },
            { "k": "acordamos", "l": "Acordamos", "t": "area" },
            { "k": "reconocimiento", "l": "Reconocimiento", "t": "area" }
          ]
        }
      },
      {
        "id": "revisar-escaladas-diarias",
        "kind": "escaladas",
        "dimension": "escucha",
        "icon": "inbox",
        "title": "Revisar escaladas diarias",
        "freq": "Diario · Cierre",
        "from": "Supervisores",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Supervisores.",
        "purpose": "Que el Supervisor sienta tu respaldo y que escalar tiene sentido."
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "award",
        "title": "Reconocimiento",
        "freq": "Según amerite",
        "purpose": "Hacer visible que la conducta positiva se observa y se nombra de manera oportuna.",
        "context": {
          "freq": "Según lo amerite (mínimo 1 vez por semana)",
          "when": "En grupo",
          "place": ""
        },
        "steps": [
          { "k": null, "t": "Durante la semana observar conscientemente personas que destaquen (en conducta o en rendimiento)." },
          { "k": null, "t": "Anotar en la plantilla de registro la CONDUCTA destacada ESPECÍFICA y el IMPACTO que esa acción tuvo para la empresa y/o el grupo." },
          { "k": null, "t": "En la charla matinal, u otro espacio, nombrarlo en frente del grupo: \"[Nombre], te agradezco por [conducta], esto nos ha ayudado en [impacto].\"" }
        ],
        "phrases": [
          "Quiero reconocer a [nombre]. Esta semana vi [conducta específica]. Eso es Cultiva en acción.",
          "Antes de empezar el día, una mención: [nombre], la forma como manejaste [situación] ayer fue ejemplar."
        ],
        "no": [
          "Reconocimiento vago: 'buen trabajo' o 'todos lo hicieron bien'.",
          "Reconocer siempre a los mismos.",
          "Hacerlo en privado cuando merece ser público (o viceversa).",
          "Hacerlo con excesiva frecuencia."
        ],
        "registro": {
          "soporte": "Registro de reconocimiento",
          "fields": [
            { "k": "persona", "l": "Líder a reconocer", "t": "person", "req": true },
            { "k": "conducta", "l": "Conducta destacada", "t": "area", "req": true },
            { "k": "impacto", "l": "Impacto", "t": "area" }
          ]
        }
      }
    ]
  },

  /* ---------------------------------------------------------- N4 */
  "prod-n4": {
    "id": "prod-n4",
    "area": "produccion",
    "level": "N4",
    "role": "Supervisor de Producción",
    "sub": "Donde arranca el cascadeo",
    "context": "La capa donde la métrica se mueve (Riego, Fertirriego, Sanidad, Producción). Caso límite: RIEGO opera a distancia, sin equipo presencial. Aquí ARRANCA el cascadeo de escucha. El check-in y el reconocimiento cambian de verbo según la sub-área, pero el principio es el mismo.",
    "rituals": [
      {
        "id": "saludo-con-proposito",
        "kind": "light",
        "dimension": "lidera",
        "icon": "sunrise",
        "title": "Saludo con propósito",
        "freq": "Diario · Inicio",
        "reminder": "Al inicio del día no olvides saludar a tu equipo con energía para iniciar bien la jornada.",
        "hasDone": true
      },
      {
        "id": "escucha-antes-de-iniciar",
        "kind": "full",
        "dimension": "escucha",
        "icon": "ear",
        "title": "Escucha antes de iniciar",
        "freq": "Diario",
        "purpose": "Recoger inquietudes antes de que se conviertan en problemas.",
        "context": {
          "freq": "Diario",
          "when": "Después de la charla diaria",
          "place": "En el punto de reunión con el equipo, antes de iniciar labores"
        },
        "steps": [
          { "k": "Abro", "t": "tras la charla operativa: “¿Algo que necesiten que escuche antes de empezar?”." },
          { "k": "Espero", "t": "30–60 segundos en silencio. La gente no responde de inmediato." },
          { "k": "Escucho", "t": "sin interrumpir. Si nadie habla: “¿Cómo vienen hoy?”." },
          { "k": "Decido", "t": "para cada tema: ¿resuelvo yo o escalo?" },
          { "k": "Registro", "t": "los temas; si escalo, indico a quién (Jefe de Producción) y fecha de respuesta." }
        ],
        "note": "Este ritual también puedes aplicarlo en conversaciones individuales; en ese espacio privado tu equipo puede sentirse más cómodo para abrirse contigo.",
        "phrases": [
          "Antes de empezar, ¿algo que necesiten que sepa o que tenga que escalar?",
          "Ese tema lo resuelvo yo hoy. Te aviso al almuerzo.",
          "Ese tema no está en mis manos. Lo subo al Jefe de Producción hoy mismo y mañana te traigo respuesta."
        ],
        "no": [
          "Saltarse el espacio si nadie habla (a veces toma 2-3 días que empiecen a hablar).",
          "Prometer cosas que no se pueden cumplir.",
          "Resolver sin registrar."
        ],
        "registro": {
          "soporte": "Agenda Cultiva (temas levantados / escalados al Jefe de Producción)",
          "autoBroadcast": {"tema": "tema", "detalle": "accion", "resuelto": "resuelto"},
          "fields": [
            { "k": "tema", "l": "Tema", "t": "area", "req": true, "ph": "¿Qué dijeron exactamente?" },
            { "k": "resuelto", "l": "¿Lo resolviste tú?", "t": "bool" },
            { "k": "accion", "l": "Acción", "t": "area" }
          ]
        }
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "award",
        "title": "Reconocimiento",
        "freq": "Según amerite",
        "purpose": "Hacer visible que la conducta positiva se observa y se nombra de manera oportuna.",
        "context": {
          "freq": "Según lo amerite (mínimo 1 vez por semana)",
          "when": "En grupo",
          "place": ""
        },
        "steps": [
          { "k": null, "t": "Durante la semana observar conscientemente personas que destaquen (en conducta o en rendimiento)." },
          { "k": null, "t": "Anotar en la plantilla de registro la CONDUCTA destacada ESPECÍFICA y el IMPACTO que esa acción tuvo para la empresa y/o el grupo." },
          { "k": null, "t": "En el espacio matinal, post-almuerzo o al cierre, nombrarlo en frente del grupo: \"[Nombre], te agradezco por [conducta], esto nos ha ayudado en [impacto].\"" }
        ],
        "phrases": [
          "Antes de seguir, quiero mencionar a [nombre]. Hoy te vi [conducta específica]. Eso suma mucho en [impacto].",
          "Esta semana, [nombre] ha estado [conducta]. Quiero que el equipo lo escuche."
        ],
        "no": [
          "Reconocimiento vago: 'buen trabajo' o 'todos lo hicieron bien'.",
          "Reconocer siempre a los mismos.",
          "Hacerlo en privado cuando merece ser público (o viceversa).",
          "Saltárselo varios días seguidos."
        ],
        "registro": {
          "soporte": "Registro de reconocimiento",
          "fields": [
            { "k": "persona", "l": "Trabajador a reconocer", "t": "person", "req": true },
            { "k": "conducta", "l": "Conducta destacada", "t": "area", "req": true },
            { "k": "impacto", "l": "Impacto", "t": "area" }
          ]
        }
      },
      {
        "id": "cierre-con-agradecimiento",
        "kind": "light",
        "dimension": "lidera",
        "icon": "sunset",
        "title": "Cierre con agradecimiento",
        "freq": "Diario · Cierre",
        "reminder": "Al cierre de la jornada no olvides agradecer a tu equipo por el esfuerzo realizado.",
        "hasDone": true
      }
    ]
  }

});

/* índice área → perfiles (extiende el de data-cosecha.js) */
window.PROFILES_BY_AREA.produccion =
  ["prod-n1", "prod-n2", "prod-n3", "prod-n4"].map(function (id) { return window.PROFILES[id]; });

/* datos demo de la bandeja de escaladas (cascadeo de Labores) */
Object.assign(window.ESCALADAS_DEMO, {
  "prod-n1": [
    {
      "id": "e1", "from": "Víctor Pais", "role": "Jefe de Riego",
      "tema": "Estructural · turnos",
      "detalle": "El turno noche de riego queda con un solo operador en caseta; si falla algo, no hay relevo presencial en todo el sector.",
      "requiere": "Autorización para un segundo operador nocturno o un esquema de guardia compartida entre casetas.",
      "date": 1782007510069, "status": null, "thread": []
    },
    {
      "id": "e2", "from": "Takeda Herrera", "role": "Jefe de Sanidad",
      "tema": "Exposición / EPP",
      "detalle": "Parte del EPP de aplicación llegó al límite de vida útil; los aplicadores siguen saliendo igual.",
      "requiere": "Que se priorice la reposición de EPP con compras antes de la próxima ventana de aplicación.",
      "date": 1781949910069, "status": null, "thread": []
    }
  ],
  "prod-n2": [
    {
      "id": "e1", "from": "Percy Villegas", "role": "Jefe de Producción de Área",
      "tema": "Falta de relevo",
      "detalle": "Premezcla sostuvo la semana con una persona menos por descanso médico; el equipo está al límite.",
      "requiere": "Apoyo temporal o redistribución de carga mientras dura la baja.",
      "date": 1782011110069, "status": null, "thread": []
    },
    {
      "id": "e2", "from": "Alex Vásquez", "role": "Jefe de Fertirriego",
      "tema": "Señal débil · fatiga",
      "detalle": "Un operador de fertirriego acumula varios turnos seguidos; aún cumple, pero se le nota agotado.",
      "requiere": "Validar si corresponde un día de descanso antes de que escale a un problema mayor.",
      "date": 1781942710069, "status": null, "thread": []
    }
  ],
  "prod-n3": [
    {
      "id": "e1", "from": "Rosa Marín", "role": "Supervisora de Riego",
      "tema": "Soledad de turno",
      "detalle": "El operador de la caseta 4 lleva tres turnos solo y comentó que se siente aislado en la noche.",
      "requiere": "Una conversación de carga y, si se puede, rotarlo unos días con otra caseta.",
      "date": 1782010110069, "status": null, "thread": []
    },
    {
      "id": "e2", "from": "Hugo Pérez", "role": "Supervisor de Sanidad",
      "tema": "Exposición física",
      "detalle": "Dos aplicadores reportan que el horario de aplicación coincide con el pico de calor.",
      "requiere": "Evaluar mover la ventana de aplicación a primera hora.",
      "date": 1781990110069, "status": null, "thread": []
    },
    {
      "id": "e3", "from": "Lucía Ato", "role": "Supervisora de Producción",
      "tema": "Premezcla a tiempo",
      "detalle": "La premezcla salió justa dos días seguidos por un insumo que llega tarde del almacén.",
      "requiere": "Coordinar con almacén la entrega anticipada del insumo.",
      "date": 1781921110069, "status": null, "thread": []
    }
  ]
});
