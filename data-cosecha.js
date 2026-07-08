/* ============================================================
   DATA · KIT CULTIVA — APP MULTIÁREA (v5.1)
   Etapa 1: COSECHA (N1–N4) + Escaladas diarias.
   Generado desde "Kit Cultiva por Perfil v5.1.xlsx" (hojas Cosecha + Resumen).
   Estructura data-driven: contenido aquí, diseño en los .jsx.
   ============================================================ */

/* dimensiones (acento por ritual) — fuente: hoja Resumen */
window.DIMS = {
  lidera:  { label: "LIDERA",  color: "#C9651C", icon: "flag" },
  escucha: { label: "ESCUCHA", color: "#2F6E7A", icon: "ear" },
  valora:  { label: "VALORA",  color: "#D9A521", icon: "award" },
};
window.DIM_ORDER = ["lidera", "escucha", "valora"];

/* áreas (selector) — solo Cosecha activa en Etapa 1 */
window.AREAS = [
  { id: "cosecha",    label: "Cosecha",     icon: "wheat",         ready: true  },
  { id: "produccion", label: "Producción",  icon: "sprout",        ready: true  },
  { id: "packing",    label: "Packing",     icon: "factory",       ready: true  },
  { id: "calidad",    label: "Calidad",     icon: "flask-conical", ready: true  },
];

/* taxonomía de temas — ritual "Escucha antes de cosechar" (N4) */
window.TEMAS = {
  grupos: [
    { id: "operativos", label: "Operativos", color: "#2F6E7A", items: [
      { id: "paralizaciones",  label: "Paralizaciones",        icon: "circle-pause",   desc: "El equipo paró o amenaza con parar labores.", alerta: "paralizacion" },
      { id: "falta-agua",      label: "Falta de agua",         icon: "droplets",       desc: "No hay agua para consumo o para la labor." },
      { id: "tareos",          label: "Tareos",                icon: "clipboard-list", desc: "Problemas con el registro o conteo de tareo." },
      { id: "fotocheck",       label: "Problemas con fotocheck", icon: "id-card",      desc: "Fotocheck perdido, dañado o que no marca." },
      { id: "logistica",       label: "Logística de traslado", icon: "bus",            desc: "Movilidad, recojo o traslado del personal." },
    ]},
    { id: "culturales", label: "Culturales", color: "#C9651C", items: [
      { id: "justicia",     label: "Justicia y trato igualitario", icon: "scale",           desc: "Algo que sienten desigual: reparto de lotes, días o fruta, o presión que no se siente pareja." },
      { id: "respeto",      label: "Trato y respeto",              icon: "heart-handshake", desc: "La forma en que se les habló o trató les incomodó." },
      { id: "reconocimiento", label: "Reconocimiento al esfuerzo", icon: "award",          desc: "Sienten que lo que hacen no se está viendo ni valorando." },
      { id: "pedido",       label: "Pedido sin respuesta",         icon: "message-square-warning", desc: "Algo que ya habían pedido o reportado antes y siguen sin saber qué pasó." },
      { id: "crecimiento",  label: "Crecimiento y futuro",         icon: "trending-up",     desc: "Dudas o ganas sobre aprender, crecer o seguir en la empresa." },
      { id: "animo",        label: "Ánimo del equipo",             icon: "users",           desc: "El grupo está cansado, tenso, desanimado o desconfiado." },
      { id: "personal",     label: "Tema personal o familiar",     icon: "heart",           desc: "Una situación personal, de familia o de salud que los está afectando." },
      { id: "conflicto",    label: "Conflicto o situación delicada", icon: "alert-triangle", desc: "Un problema entre compañeros o algo serio que hay que manejar con cuidado." },
      { id: "otro-cultural", label: "Otro",                        icon: "circle-ellipsis", desc: "Algo importante que no encaja en las opciones anteriores." },
    ]},
  ],
  // aviso especial al registrar ciertos temas
  alertas: {
    paralizacion: "Se registra la problemática, pero es MUY IMPORTANTE que contactes a Atención al Trabajador (992 890 000).",
  },
};

/* estados posibles de un tema escalado (bandeja de Escaladas) */
window.ESCALADA_ESTADOS = [
  { id: "resuelvo", label: "Resuelvo yo", icon: "check-circle-2", color: "#18571F" },
  { id: "proceso",  label: "En proceso",  icon: "loader",         color: "#A8631A" },
  { id: "derivo",   label: "Derivo",      icon: "share-2",        color: "#4156A2" },
  { id: "escalo",   label: "Escalo",      icon: "arrow-up",       color: "#A81519" },
];


/* perfiles de Cosecha (N1–N4) */
window.PROFILES = {
  "cos-n1": {
    "id": "cos-n1",
    "area": "cosecha",
    "level": "N1",
    "role": "Gerente / Subgerente de Cosecha",
    "sub": "Garante del sistema",
    "context": "1 persona en el piloto. Garante del sistema. Modela Cultiva hacia el Jefe y destraba temas estructurales. Si no lo hace visiblemente, los niveles abajo no lo van a hacer.",
    "rituals": [
      {
        "id": "feedback-1-1-mensual",
        "kind": "full",
        "dimension": "lidera",
        "icon": "message-square-quote",
        "title": "Acompañamiento 1:1",
        "freq": "1 vez al mes",
        "purpose": "Desarrollar al nivel de abajo mediante la observación, la reflexión y acuerdos concretos para potenciar sus fortalezas y mejorar su desempeño",
        "context": {
          "freq": "1 vez al mes",
          "when": "30-45 min",
          "place": "Oficina o caminata por campo con el Jefe de Cosecha"
        },
        "steps": [
          {
            "k": "Observo",
            "t": "Identifico una conducta observada para corregir o potenciar."
          },
          {
            "k": "Me acerco",
            "t": "Con tono neutro, sin señal de corrección."
          },
          {
            "k": "Comparto",
            "t": "\"Observé que [conducta] cuando [situación]. Esto generó [impacto]. ¿Cómo lo ves tú?\""
          },
          {
            "k": "Escucho",
            "t": "2 minutos sin interrumpir; leo qué necesita"
          },
          {
            "k": "Impulso",
            "t": "Pregunto qué podría hacer para mejorar o llevar esa fortaleza al siguiente nivel."
          },
          {
            "k": "Acordamos",
            "t": "Definimos una acción concreta para poner en práctica."
          },
          {
            "k": "Cierro",
            "t": "Con reconocimiento por el compromiso."
          },
          {
            "k": "Vuelvo",
            "t": "Cuando se haya cumplido la fecha de seguimiento: \"¿Cómo te resultó lo que acordamos?\""
          }
        ],
        "phrases": [
          "Vi que [conducta] cuando [situación]. Eso generó [impacto]. ¿Cómo lo ves tú?",
          "Lo que mejor vi este mes fue cómo manejaste [situación específica] y que generó [impacto]. Quiero que sepas que lo registré.",
          "No vine a corregirte, vine a alinearnos. ¿Qué necesitas de mí?",
          "¿Qué crees que pasó? ¿Qué cambiarías tú?",
          "Repíteme el acuerdo para asegurarnos de que quedamos igual.",
          "Antes de cerrar quiero reconocer que [conducta positiva]. Eso me da confianza."
        ],
        "no": [
          "Hablar de personas, no de hechos observados.",
          "Cerrar sin un acuerdo concreto.",
          "Saltarse el reconocimiento positivo al final.",
          "Convertirlo en monólogo de instrucciones.",
          "No volver a preguntar sobre el acuerdo en los días siguientes."
        ],
        "registro": {
          "soporte": "Tarjeta Acompañamiento 1 a 1",
          "fields": [
            {
              "k": "persona",
              "l": "Persona",
              "t": "person",
              "req": true
            },
            {
              "k": "situacion",
              "l": "Situación",
              "t": "area",
              "req": true,
              "ph": "¿Qué pasó? (hecho concreto observado)"
            },
            {
              "k": "conducta",
              "l": "Conducta observada",
              "t": "area",
              "req": true
            },
            {
              "k": "impacto",
              "l": "Impacto",
              "t": "area"
            },
            {
              "k": "acuerdo",
              "l": "Acuerdo",
              "t": "area",
              "req": true
            },
            {
              "k": "coment",
              "l": "Comentarios",
              "t": "area"
            }
          ]
        }
      },
      {
        "id": "caminata-de-liderazgo",
        "kind": "full",
        "dimension": "lidera",
        "icon": "footprints",
        "title": "Caminata de Liderazgo",
        "freq": "5 veces al año",
        "purpose": "Hacer visible que la gerencia llega al campo — el nivel más alto escucha directamente al frontline.",
        "context": {
          "freq": "5 veces al año",
          "when": "",
          "place": "Visitar Supervisores de Fundo, Líderes de Cosecha y/o Cosechadores"
        },
        "steps": [
          {
            "k": "Coordino",
            "t": "la visita con anticipación — llevo 2-3 temas para escuchar en campo."
          },
          {
            "k": "Llego",
            "t": ", saludo por nombre y observo la labor SIN corregir ni dar instrucciones."
          },
          {
            "k": "Pregunto",
            "t": "y ESCUCHO — el 70% del tiempo escucho."
          },
          {
            "k": "Cierro",
            "t": "con una promesa cumplible — nunca prometo lo que no controlo."
          },
          {
            "k": "Anuncio",
            "t": "que volveré."
          }
        ],
        "phrases": [
          "Vine porque quería ver de cerca lo que hacen acá, no a revisar nada.",
          "Que esto funcione sin que nadie lo note es justo lo que vengo a reconocer.",
          "Esto que me cuentas lo subo y te traigo respuesta esta semana."
        ],
        "no": [
          "Convertirla en inspección o auditoría.",
          "Proponer soluciones en el momento — primero escuchar.",
          "Visitar solo las áreas más visibles."
        ],
        "registro": {
          "soporte": "Registro de visita en terreno",
          "fields": [
            {
              "k": "jefe",
              "l": "Persona / equipo visitado",
              "t": "person",
              "req": true
            },
            {
              "k": "temas",
              "l": "Temas levantados",
              "t": "area",
              "req": true
            },
            {
              "k": "acuerdos",
              "l": "Acuerdos",
              "t": "area"
            },
            {
              "k": "proxima",
              "l": "Próxima reunión",
              "t": "date"
            }
          ]
        }
      },
      {
        "id": "revisar-escaladas-diarias",
        "kind": "escaladas",
        "dimension": "escucha",
        "icon": "inbox",
        "title": "Espacio de confianza",
        "freq": "Diario",
        "from": "Jefes de Cosecha",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Jefes.",
        "purpose": "Detectar lo que se repite — dar destino institucional a lo que el Jefe no puede resolver.",
        "steps": [
          {
            "k": "Reviso",
            "t": "el panel consolidado — busco patrones, no el detalle de cada tema."
          },
          {
            "k": "Identifico",
            "t": "qué temas estructurales requieren mi intervención o una decisión institucional."
          },
          {
            "k": "Doy destino",
            "t": "a lo estructural: resuelvo, derivo a RRLL/Ops o marco para seguimiento con fecha."
          },
          {
            "k": "Comunico",
            "t": "de vuelta al N2 mi decisión para que el loop cierre hacia abajo."
          }
        ],
        "phrases": [
          "Este patrón no es de fundo — es sistémico. Lo trabajo yo.",
          "Lo derivo a RRLL con instrucción clara y fecha.",
          "Comunico al N2 mi decisión para que llegue al equipo."
        ],
        "no": [
          "Revisar el panel como si fuera un reporte operativo.",
          "Dejar temas estructurales sin dueño ni fecha.",
          "No cerrar el loop hacia abajo con la decisión tomada."
        ]
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "award",
        "title": "Reconocimiento Sincero",
        "freq": "1 vez al mes",
        "purpose": "Modelar visiblemente que Cultiva es para todos los niveles.",
        "context": {
          "freq": "1 vez al mes",
          "when": "3 min",
          "place": "Comité, reunión de equipo o mensaje grupal"
        },
        "steps": [
          {
            "k": "Observo",
            "t": "conscientemente a los Jefes de Cosecha que destaquen en conducta o rendimiento durante el período."
          },
          {
            "k": "Anoto",
            "t": "la conducta específica y el impacto que tuvo para el equipo o la operación."
          },
          {
            "k": "Nombro",
            "t": "en el momento oportuno frente al grupo: \"[Nombre], te agradezco por [conducta] — eso nos ayudó en [impacto].\""
          }
        ],
        "phrases": [
          "Antes de seguir, quiero mencionar a [nombre]. Vi [conducta específica] cuando [situación]. Eso sumó mucho en [impacto].",
          "Si tuviera que poner un ejemplo de Cultiva en acción, sería [nombre] cuando [situación]."
        ],
        "no": [
          "Reconocimiento vago: \"buen trabajo\" o \"todos lo hicieron bien\".",
          "Reconocer siempre a los mismos.",
          "Hacerlo en privado cuando merece ser público (o viceversa).",
          "Hacerlo con excesiva frecuencia — pierde sinceridad."
        ],
        "registro": {
          "soporte": "Registro de reconocimiento",
          "fields": [
            {
              "k": "persona",
              "l": "Jefe a reconocer",
              "t": "person",
              "req": true
            },
            {
              "k": "conducta",
              "l": "Conducta destacada",
              "t": "area",
              "req": true
            },
            {
              "k": "impacto",
              "l": "Impacto",
              "t": "area"
            }
          ]
        },
        "note": "RECONOCIMIENTO SKIP-LEVEL (opcional): También puedo reconocer a Supervisores de Fundo (N3). Condición: Siempre coordinado con el Jefe de Cosecha — él aporta el contexto de qué hizo el SF y por qué merece ser nombrado."
      }
    ]
  },
  "cos-n2": {
    "id": "cos-n2",
    "area": "cosecha",
    "level": "N2",
    "role": "Jefe de Cosecha",
    "sub": "La bisagra del sistema",
    "context": "1 persona en el piloto. Es el bisagra del sistema. Traduce Cultiva del nivel estratégico al operativo. Si no sostiene, el SF se queda sin respaldo.",
    "rituals": [
      {
        "id": "feedback-1-1-mensual",
        "kind": "full",
        "dimension": "lidera",
        "icon": "message-square-quote",
        "title": "Acompañamiento 1:1",
        "freq": "1 vez al mes",
        "purpose": "Desarrollar al nivel de abajo mediante la observación, la reflexión y acuerdos concretos para potenciar sus fortalezas y mejorar su desempeño",
        "context": {
          "freq": "1 vez al mes",
          "when": "30 min",
          "place": "Caminata con el Supervisor de Fundo"
        },
        "steps": [
          {
            "k": "Observo",
            "t": "Identifico una conducta observada para corregir o potenciar."
          },
          {
            "k": "Me acerco",
            "t": "Con tono neutro, sin señal de corrección."
          },
          {
            "k": "Comparto",
            "t": "\"Observé que [conducta] cuando [situación]. Esto generó [impacto]. ¿Cómo lo ves tú?\""
          },
          {
            "k": "Escucho",
            "t": "2 minutos sin interrumpir; leo qué necesita"
          },
          {
            "k": "Impulso",
            "t": "Pregunto qué podría hacer para mejorar o llevar esa fortaleza al siguiente nivel."
          },
          {
            "k": "Acordamos",
            "t": "Definimos una acción concreta para poner en práctica."
          },
          {
            "k": "Cierro",
            "t": "Con reconocimiento por el compromiso."
          },
          {
            "k": "Vuelvo",
            "t": "Cuando se haya cumplido la fecha de seguimiento: \"¿Cómo te resultó lo que acordamos?\""
          }
        ],
        "phrases": [
          "Vi que [conducta] cuando [situación]. Eso generó [impacto]. ¿Cómo lo ves tú?",
          "Lo que mejor vi este mes fue cómo manejaste [situación específica] y que generó [impacto]. Quiero que sepas que lo registré.",
          "No vine a corregirte, vine a alinearnos. ¿Qué necesitas de mí?",
          "¿Qué crees que pasó? ¿Qué cambiarías tú?",
          "Repíteme el acuerdo para asegurarnos de que quedamos igual.",
          "Antes de cerrar quiero reconocer que [conducta positiva]. Eso me da confianza."
        ],
        "no": [
          "Hablar de personas, no de hechos observados.",
          "Cerrar sin un acuerdo concreto.",
          "Saltarse el reconocimiento positivo al final.",
          "Convertirlo en monólogo de instrucciones.",
          "No volver a preguntar sobre el acuerdo en los días siguientes."
        ],
        "registro": {
          "soporte": "Tarjeta Acompañamiento 1 a 1",
          "fields": [
            {
              "k": "persona",
              "l": "Persona",
              "t": "person",
              "req": true
            },
            {
              "k": "situacion",
              "l": "Situación",
              "t": "area",
              "req": true,
              "ph": "¿Qué pasó? (hecho concreto observado)"
            },
            {
              "k": "conducta",
              "l": "Conducta observada",
              "t": "area",
              "req": true
            },
            {
              "k": "impacto",
              "l": "Impacto",
              "t": "area"
            },
            {
              "k": "acuerdo",
              "l": "Acuerdo",
              "t": "area",
              "req": true
            },
            {
              "k": "coment",
              "l": "Comentarios",
              "t": "area"
            }
          ]
        }
      },
      {
        "id": "revisar-escaladas-diarias",
        "kind": "escaladas",
        "dimension": "escucha",
        "icon": "inbox",
        "title": "Espacio de confianza",
        "freq": "Diario",
        "from": "Supervisores de Fundo",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Supervisores de Fundo.",
        "purpose": "Primer nivel de visión consolidada — detectar patrones e intervenir lo que el Supervisor no puede resolver.",
        "steps": [
          {
            "k": "Reviso",
            "t": "el panel de escaladas — filtro por Urgencia (Hoy primero) y por Estado."
          },
          {
            "k": "Intervengo",
            "t": "temas sin respuesta en más de 48 horas directamente."
          },
          {
            "k": "Detecto",
            "t": "patrones: temas que se repiten semana a semana en varios sectores o áreas."
          },
          {
            "k": "Escalo",
            "t": "al N1 con mi análisis del patrón — no solo el listado de temas."
          }
        ],
        "phrases": [
          "Este tema lleva 3 días sin respuesta — lo tomo yo.",
          "Veo que el tema X aparece en varios sectores esta semana. Eso no es operativo — es estructural.",
          "Le comunico al N1 el patrón, no el incidente."
        ],
        "no": [
          "Revisar el panel solo cuando algo explota.",
          "Escalar al N1 sin haber identificado el patrón.",
          "Dejar que el panel se convierta en archivo muerto."
        ]
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "award",
        "title": "Reconocimiento Sincero",
        "freq": "1 vez cada 2 semanas",
        "purpose": "Hacer visible quién está modelando Cultiva de manera oportuna.",
        "context": {
          "freq": "1 vez cada 2 semanas",
          "when": "3 min",
          "place": "Reunión de Supervisores de Fundo"
        },
        "steps": [
          {
            "k": "Observo",
            "t": "conscientemente a los Supervisores de Fundo que destaquen en conducta o rendimiento durante el período."
          },
          {
            "k": "Anoto",
            "t": "la conducta específica y el impacto que tuvo para el equipo o la operación."
          },
          {
            "k": "Nombro",
            "t": "en el momento oportuno frente al grupo: \"[Nombre], te agradezco por [conducta] — eso nos ayudó en [impacto].\""
          }
        ],
        "phrases": [
          "Antes de seguir, quiero mencionar a [nombre]. Vi [conducta específica] cuando [situación]. Eso sumó mucho en [impacto].",
          "Si tuviera que poner un ejemplo de Cultiva en acción, sería [nombre] cuando [situación]."
        ],
        "no": [
          "Reconocimiento vago: \"buen trabajo\" o \"todos lo hicieron bien\".",
          "Reconocer siempre a los mismos.",
          "Hacerlo en privado cuando merece ser público (o viceversa).",
          "Hacerlo con excesiva frecuencia — pierde sinceridad."
        ],
        "registro": {
          "soporte": "Registro de reconocimiento",
          "fields": [
            {
              "k": "persona",
              "l": "Supervisor a reconocer",
              "t": "person",
              "req": true
            },
            {
              "k": "conducta",
              "l": "Conducta destacada",
              "t": "area",
              "req": true
            },
            {
              "k": "impacto",
              "l": "Impacto",
              "t": "area"
            }
          ]
        },
        "note": "RECONOCIMIENTO SKIP-LEVEL (opcional): También puedo reconocer a Líderes de Cosecha (N4). Condición: Siempre coordinado con el Supervisor de Fundo correspondiente."
      }
    ]
  },
  "cos-n3": {
    "id": "cos-n3",
    "area": "cosecha",
    "level": "N3",
    "role": "Supervisor de Fundo",
    "sub": "Sostiene Cultiva en campo",
    "context": "2 personas en el piloto. Es el rol con más responsabilidad operativa-humana del sistema. Coachea directamente al Supervisor de Cuadrilla. Su consistencia es lo que sostiene Cultiva en campo.",
    "rituals": [
      {
        "id": "saludo-con-proposito",
        "kind": "light",
        "dimension": "lidera",
        "icon": "sunrise",
        "title": "Saludo con propósito",
        "freq": "Diario",
        "reminder": "Al inicio del día no olvides saludar a tu equipo con energía para iniciar bien la jornada.",
        "hasDone": true
      },
      {
        "id": "coaching-de-terreno",
        "kind": "full",
        "dimension": "lidera",
        "icon": "compass",
        "title": "Acompañamiento 1:1",
        "freq": "A 2 Líderes de Cosecha por semana",
        "purpose": "Desarrollar al líder en terreno mediante la observación, la reflexión y acuerdos concretos para potenciar sus fortalezas y mejorar su desempeño",
        "context": {
          "freq": "2 Líderes de Cosecha por semana",
          "when": "15-25 min",
          "place": "En el terreno durante la jornada"
        },
        "steps": [
          {
            "k": "Observo",
            "t": "Noto en terreno cómo trabaja el líder: sus decisiones, su trato al equipo, su presencia."
          },
          {
            "k": null,
            "t": "Una conducta observada para corregir o potenciar."
          },
          {
            "k": "Pregunto",
            "t": "\"Observé que [conducta] cuando [situación]. Esto generó [impacto]. ¿Cómo lo ves tú?\""
          },
          {
            "k": "Acuerdo",
            "t": "2 minutos sin interrumpir."
          },
          {
            "k": "Cierro",
            "t": "Pregunto qué podría hacer para mejorar o llevar esa fortaleza al siguiente nivel."
          },
          {
            "k": "Vuelvo",
            "t": "Definimos una acción concreta para poner en práctica."
          },
          {
            "k": null,
            "t": "Con reconocimiento por el compromiso."
          },
          {
            "k": null,
            "t": "Cuando se haya cumplido la fecha de seguimiento: \"¿Cómo te resultó lo que acordamos?\""
          }
        ],
        "phrases": [
          "Vi que [conducta] cuando [situación]. Eso generó [impacto]. ¿Cómo lo ves tú?",
          "¿Qué necesitas de mí para que esto salga mejor?",
          "Repíteme el acuerdo para asegurarnos de que quedamos igual.",
          "Antes de irme quiero reconocer que [conducta positiva]. Eso marca la diferencia."
        ],
        "no": [
          "Corregir antes de observar.",
          "Dar la solución — es desarrollo, no instrucción.",
          "Hacer el acompañamiento en grupo — siempre es 1:1.",
          "Irse sin un acuerdo concreto.",
          "Saltarse el reconocimiento al cerrar.",
          "No volver a preguntar sobre el acuerdo."
        ],
        "registro": {
          "soporte": "Tarjeta Acompañamiento 1 a 1",
          "fields": [
            {
              "k": "lider",
              "l": "Persona acompañada",
              "t": "person",
              "req": true
            },
            {
              "k": "observo",
              "l": "Observo",
              "t": "area",
              "req": true
            },
            {
              "k": "pregunto",
              "l": "Pregunto",
              "t": "area"
            },
            {
              "k": "ajusto",
              "l": "Ajuste acordado",
              "t": "area",
              "req": true
            },
            {
              "k": "reconozco",
              "l": "Reconocimiento",
              "t": "area"
            }
          ]
        }
      },
      {
        "id": "revisar-escaladas-diarias",
        "kind": "escaladas",
        "dimension": "escucha",
        "icon": "inbox",
        "title": "Espacio de confianza",
        "freq": "Diario",
        "from": "Líderes de Cosecha",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Líderes de Cosecha",
        "purpose": "Que el Líder sepa que escalar tiene sentido — respuesta en menos de 48 horas.",
        "steps": [
          {
            "k": "Recibo",
            "t": "las escaladas del día — ya clasificadas por Tipo y Urgencia."
          },
          {
            "k": "Decido",
            "t": "con un toque para cada tema: Resuelvo yo · En proceso · Escalo al nivel superior."
          },
          {
            "k": "Respondo",
            "t": "si resuelvo, actúo y registro la respuesta (el N4 recibe notificación automática)."
          },
          {
            "k": "Escalo",
            "t": "con criterio: el tema sube con mi decisión y contexto adicional."
          },
          {
            "k": "Cierro",
            "t": "ningún tema queda sin destino más de 48 horas."
          }
        ],
        "phrases": [
          "Tu tema lo revisé. Lo resuelvo yo — te confirmo mañana.",
          "Lo escalé arriba. Tendrás respuesta el [día].",
          "Queda en proceso — necesito [dato]. Dame hasta [fecha]."
        ],
        "no": [
          "Dejar temas sin decisión más de 48 horas.",
          "Escalar sin agregar tu propio criterio.",
          "Silencio — destruye la confianza en el sistema."
        ]
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "award",
        "title": "Reconocimiento Sincero",
        "freq": "1 vez por semana",
        "purpose": "Hacer visible que la conducta positiva se observa y se nombra de manera oportuna.",
        "context": {
          "freq": "1 vez por semana",
          "when": "En grupo",
          "place": ""
        },
        "steps": [
          {
            "k": "Observo",
            "t": "conscientemente a los Líderes de Cosecha que destaquen en conducta o rendimiento durante el período."
          },
          {
            "k": "Anoto",
            "t": "la conducta específica y el impacto que tuvo para el equipo o la operación."
          },
          {
            "k": "Nombro",
            "t": "en el momento oportuno frente al grupo: \"[Nombre], te agradezco por [conducta] — eso nos ayudó en [impacto].\""
          }
        ],
        "phrases": [
          "Antes de seguir, quiero mencionar a [nombre]. Vi [conducta específica] cuando [situación]. Eso sumó mucho en [impacto].",
          "Si tuviera que poner un ejemplo de Cultiva en acción, sería [nombre] cuando [situación]."
        ],
        "no": [
          "Reconocimiento vago: \"buen trabajo\" o \"todos lo hicieron bien\".",
          "Reconocer siempre a los mismos.",
          "Hacerlo en privado cuando merece ser público (o viceversa).",
          "Hacerlo con excesiva frecuencia — pierde sinceridad."
        ],
        "registro": {
          "soporte": "Registro de reconocimiento",
          "fields": [
            {
              "k": "persona",
              "l": "Líder a reconocer",
              "t": "person",
              "req": true
            },
            {
              "k": "conducta",
              "l": "Conducta destacada",
              "t": "area",
              "req": true
            },
            {
              "k": "impacto",
              "l": "Impacto",
              "t": "area"
            }
          ]
        }
      }
    ]
  },
  "cos-n4": {
    "id": "cos-n4",
    "area": "cosecha",
    "level": "N4",
    "role": "Líder de Cosecha",
    "sub": "El más cercano al cosechador",
    "context": "10-15 personas en el piloto (de un total de ~500). Es el rol más numeroso y el más cercano al cosechador. La experiencia del trabajador depende directamente de él. La Agenda Cultiva existente (heredada del programa original) es excelente — solo se renombra y refuerza.",
    "rituals": [
      {
        "id": "saludo-con-proposito",
        "kind": "light",
        "dimension": "lidera",
        "icon": "sunrise",
        "title": "Saludo con propósito",
        "freq": "Diario",
        "reminder": "Al inicio del día no olvides saludar a tu equipo con energía para iniciar bien la jornada.",
        "hasDone": true
      },
      {
        "id": "escucha-antes-de-cosechar",
        "kind": "full",
        "dimension": "escucha",
        "icon": "ear",
        "title": "Espacio de confianza",
        "freq": "Diario",
        "purpose": "Recoger inquietudes antes de que se conviertan en problemas — y escalar con criterio.",
        "context": {
          "freq": "Diario",
          "when": "Post-charla diaria",
          "place": "Punto de reunión de la cuadrilla"
        },
        "steps": [
          {
            "k": "Abro",
            "t": "\"¿Algo que necesiten que escuche antes de empezar?\""
          },
          {
            "k": "Espero",
            "t": "20-30 seg en silencio — la gente no responde de inmediato."
          },
          {
            "k": "Escucho",
            "t": "sin interrumpir. Si nadie habla: \"¿Cómo vienen hoy?\""
          },
          {
            "k": "Decido",
            "t": "para cada tema: ¿resuelvo yo o escalo?"
          },
          {
            "k": "Escalo",
            "t": "vía app: 2 líneas de contexto + Tipo (Operativo / Cultural) + Urgencia (Hoy / Esta semana)."
          },
          {
            "k": "Cierro el loop",
            "t": "al día siguiente: \"Ayer [nombre] planteó [tema]. [Lo resolví / llega el día X].\" También puedes aplicarlo 1:1 — en privado el equipo se abre más."
          }
        ],
        "note": "Este ritual también puedes aplicarlo en conversaciones individuales, en ese espacio privado tu equipo puede sentirse más cómodo para abrirse contigo.  También puedes aplicarlo 1:1 — en privado el equipo se abre más.",
        "phrases": [
          "¿Algo que necesiten que sepa o que tenga que escalar?",
          "Ese tema lo resuelvo yo hoy. Te aviso al almuerzo.",
          "Ese tema no está en mis manos. Lo subo ahora — mañana te traigo respuesta.",
          "Ayer [nombre] planteó [tema]. Lo resolví / llega el [día]."
        ],
        "no": [
          "Prometer lo que no puedes cumplir.",
          "Escalar sin escribir contexto suficiente — el superior no puede actuar sobre algo que no entiende.",
          "No cerrar el loop al día siguiente con quien habló."
        ],
        "registro": {
          "soporte": "Escalada vía app",
          "escuchaTemas": true,
          "autoBroadcast": {
            "tema": "tema",
            "temaEsId": true,
            "detalle": "detalle",
            "resuelto": "resuelto"
          },
          "fields": [
            {
              "k": "tema",
              "l": "Tema",
              "t": "tema",
              "req": true
            },
            {
              "k": "detalle",
              "l": "Detalle",
              "t": "area",
              "req": true,
              "ph": "¿Qué dijeron exactamente?"
            },
            {
              "k": "resuelto",
              "l": "¿Lo resolviste tú?",
              "t": "bool"
            }
          ]
        }
      },
      {
        "id": "asegurando-la-calidad",
        "kind": "full",
        "dimension": "lidera",
        "icon": "shield-check",
        "title": "Acompañamiento 1:1",
        "freq": "Diario",
        "purpose": "Construir autoridad desde la relación — presencia visible que observa, conversa y da feedback en el momento.",
        "context": {
          "freq": "Diario",
          "when": "En el campo",
          "place": "En el campo"
        },
        "steps": [
          {
            "k": "Acércate con calma",
            "t": "Por todo el sector — no solo donde hay problemas."
          },
          {
            "k": "Revisa la cosecha",
            "t": "Quién se está esforzando, quién parece cansado."
          },
          {
            "k": "Da feedback en el momento",
            "t": "A 1-2 personas — una pregunta simple antes que cualquier instrucción."
          },
          {
            "k": "Escucha sus comentarios",
            "t": "Lo positivo ahí mismo con SCI: \"Vi que [conducta] cuando [situación]. Eso sumó en [impacto].\""
          },
          {
            "k": "Cierra en positivo",
            "t": "Lo que corresponda en privado, 1:1, nunca frente al grupo."
          }
        ],
        "phrases": [
          "¿Cómo te está yendo hoy? ¿Algo que te esté complicando?",
          "Vi que [conducta] cuando [situación]. Eso está bien hecho.",
          "¿Cómo ves el avance del trabajo hoy?",
          "Un momento — quiero decirte algo en privado."
        ],
        "no": [
          "Aparecer solo cuando hay un problema (eso lo convierte en ronda de control).",
          "Corregir en público frente al grupo.",
          "Recorrer siempre el mismo sector o las mismas personas.",
          "Esperar al cierre para dar feedback positivo — dilo en el momento."
        ],
        "registro": {
          "hidden": true,
          "soporte": "Registro de calidad en campo",
          "fields": []
        }
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "award",
        "title": "Reconocimiento Sincero",
        "freq": "1 vez por semana",
        "purpose": "Hacer visible que la conducta positiva se observa y se nombra de manera oportuna.",
        "context": {
          "freq": "1 vez por semana",
          "when": "En grupo",
          "place": ""
        },
        "steps": [
          {
            "k": "Observo",
            "t": "conscientemente a los cosechadores que destaquen en conducta o rendimiento durante el período."
          },
          {
            "k": "Anoto",
            "t": "la conducta específica y el impacto que tuvo para el equipo o la operación."
          },
          {
            "k": "Nombro",
            "t": "en el momento oportuno frente al grupo: \"[Nombre], te agradezco por [conducta] — eso nos ayudó en [impacto].\""
          }
        ],
        "phrases": [
          "Antes de seguir, quiero mencionar a [nombre]. Vi [conducta específica] cuando [situación]. Eso sumó mucho en [impacto].",
          "Si tuviera que poner un ejemplo de Cultiva en acción, sería [nombre] cuando [situación]."
        ],
        "no": [
          "Reconocimiento vago: \"buen trabajo\" o \"todos lo hicieron bien\".",
          "Reconocer siempre a los mismos.",
          "Hacerlo en privado cuando merece ser público (o viceversa).",
          "Hacerlo con excesiva frecuencia — pierde sinceridad."
        ],
        "registro": {
          "soporte": "Registro de reconocimiento",
          "fields": [
            {
              "k": "persona",
              "l": "Trabajador a reconocer",
              "t": "person",
              "req": true
            },
            {
              "k": "conducta",
              "l": "Conducta destacada",
              "t": "area",
              "req": true
            },
            {
              "k": "impacto",
              "l": "Impacto",
              "t": "area"
            }
          ]
        }
      },
      {
        "id": "cierre-con-agradecimiento",
        "kind": "light",
        "dimension": "lidera",
        "icon": "sunset",
        "title": "Cierre con agradecimiento",
        "freq": "Diario",
        "reminder": "Al cierre de la jornada no olvides agradecer a tu equipo por el esfuerzo realizado.",
        "hasDone": true
      }
    ]
  }
};

/* datos demo de la bandeja de escaladas (lo que sube de los subordinados) */
window.ESCALADAS_DEMO = {
  "cos-n1": [
    {
      "id": "e1",
      "from": "Neiser Flores",
      "role": "Jefe de Cosecha",
      "tema": "Estructural · turnos",
      "detalle": "Los Supervisores de Fundo reportan que el cuadre de turnos en pico de cosecha deja cuadrillas sin líder los domingos.",
      "requiere": "Necesito autorización para contratar 2 líderes temporales o redistribuir el presupuesto de horas extra.",
      "date": 1782000310069,
      "status": null,
      "thread": []
    },
    {
      "id": "e2",
      "from": "Juan Jáuregui",
      "role": "Jefe de Cosecha",
      "tema": "Logística de traslado",
      "detalle": "Buses llegan tarde al fundo 3 días seguidos; la cuadrilla pierde la primera hora de fresco.",
      "requiere": "Que se hable con el proveedor de transporte a nivel gerencia.",
      "date": 1781949910069,
      "status": null,
      "thread": []
    }
  ],
  "cos-n2": [
    {
      "id": "e1",
      "from": "Tomás Castillo",
      "role": "Supervisor de Fundo",
      "tema": "Falta de agua",
      "detalle": "Punto de hidratación del lote 7 sin agua desde ayer al mediodía.",
      "requiere": "Coordinar reposición de bidones con logística hoy mismo.",
      "date": 1782007510069,
      "status": null,
      "thread": []
    },
    {
      "id": "e2",
      "from": "Percy Trujillo",
      "role": "Supervisor de Fundo",
      "tema": "Conflicto o situación delicada",
      "detalle": "Roce entre dos cuadrilleros por reparto de lotes; aún manejable pero subiendo de tono.",
      "requiere": "Necesito respaldo para mediar y, si escala, apoyo de RR.HH.",
      "date": 1781928310069,
      "status": null,
      "thread": []
    },
    {
      "id": "e3",
      "from": "Rildo Valdez",
      "role": "Supervisor de Fundo",
      "tema": "Problemas con fotocheck",
      "detalle": "5 cosechadores nuevos sin fotocheck; no pueden marcar tareo.",
      "requiere": "Acelerar emisión con el área de personal.",
      "date": 1781913910069,
      "status": null,
      "thread": []
    }
  ],
  "cos-n3": [
    {
      "id": "e1",
      "from": "Romel Zamudio",
      "role": "Líder de Cosecha",
      "tema": "Paralizaciones",
      "detalle": "La cuadrilla amenazó con parar por el pago de la quincena que no figura.",
      "requiere": "Que confirmes con planillas si el pago salió y me des un mensaje claro para el equipo.",
      "date": 1782011110069,
      "status": null,
      "thread": []
    },
    {
      "id": "e2",
      "from": "Alexandra Ríos",
      "role": "Líder de Cosecha",
      "tema": "Justicia y trato igualitario",
      "detalle": "El equipo siente que los mejores lotes siempre van a la misma cuadrilla.",
      "requiere": "Revisar el criterio de asignación de lotes y bajar una explicación.",
      "date": 1781942710069,
      "status": null,
      "thread": []
    },
    {
      "id": "e3",
      "from": "Cristhian Miranda",
      "role": "Líder de Cosecha",
      "tema": "Tema personal o familiar",
      "detalle": "Cosechadora con tema de salud familiar pide permisos seguidos; no sé hasta dónde puedo flexibilizar.",
      "requiere": "Orientación sobre permisos y si aplica apoyo de bienestar.",
      "date": 1781921110069,
      "status": null,
      "thread": []
    }
  ]
};

/* índice área → perfiles (para el selector) */
window.PROFILES_BY_AREA = {
  cosecha: ["cos-n1", "cos-n2", "cos-n3", "cos-n4"].map(function (id) { return window.PROFILES[id]; }),
};
