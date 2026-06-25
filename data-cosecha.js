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
        "title": "Feedback 1:1 Mensual",
        "freq": "Mensual",
        "purpose": "Sesión de feedback con Jefes de Cosecha",
        "context": {
          "freq": "1 vez al mes",
          "when": "30-45 min",
          "place": "Oficina o caminata por campo"
        },
        "steps": [
          {
            "k": "Preparar",
            "t": "1 ejemplo concreto de algo BIEN hecho y 1 ejemplo de algo a MEJORAR (ambos observados, no oídos) con el método SCI."
          },
          {
            "k": "Abrir",
            "t": "con la SITUACIÓN específica: '¿Recuerdas el martes pasado cuando [hecho]?'"
          },
          {
            "k": "Conectar",
            "t": "la CONDUCTA observable (sin juicios): 'Vi que tú [hiciste X]'."
          },
          {
            "k": "Conectar",
            "t": "con el IMPACTO real: 'Eso generó [efecto en el equipo / en la cosecha]'."
          },
          {
            "k": "Escuchar",
            "t": "la versión del SF: '¿Cómo lo viste tú?' — escuchar 2 minutos sin interrumpir."
          },
          {
            "k": "Acordar",
            "t": "algo concreto: '¿Qué harás distinto a partir de cuándo?'"
          },
          {
            "k": "Cerrar",
            "t": "con un mensaje positivo, destacar el compromiso y agendar la próxima conversación."
          },
          {
            "k": "Hago",
            "t": "seguimiento posterior: ¿Cómo te funcionó lo que acordamos?"
          }
        ],
        "phrases": [
          "Lo que mejor vi este mes fue cómo manejaste [situación específica] y que generó [impacto]. Quiero que sepas que lo registré.",
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
          "soporte": "Tarjeta SCI · sesión 1:1",
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
        "freq": "5×/año",
        "purpose": "Modelar presencia y escucha directa en terreno",
        "context": {
          "freq": "5 veces al año",
          "when": "",
          "place": "Gerente/Sub Gerente + Supervisor de Fundo/Líder de Cosecha/Operarios"
        },
        "steps": [
          {
            "k": "Preséntate",
            "t": "“Hola, soy [nombre], el Gerente de Cosecha. Vine al campo a conocerlos y ver cómo está yendo la temporada.”"
          },
          {
            "k": "Únete",
            "t": "“¿Te parece si te acompaño cosechando un rato?” El gerente entra al ritmo del trabajador, no impone el suyo."
          },
          {
            "k": "Pregunta y escucha",
            "t": "“¿Cómo está el trabajo hoy? ¿Qué te facilita o complica la labor?” (Escucha al menos el 70% del tiempo)."
          },
          {
            "k": "Cierra",
            "t": "con una promesa cumplible. Si algo no puedes resolverlo ahí, di cuándo tendrás respuesta (nunca prometas lo que no controlas)."
          },
          {
            "k": "Anuncia que volverás",
            "t": "“Gracias por el tiempo. El próximo mes seguiré visitando a más compañeros.” (La consistencia convierte una visita en un ritual)."
          }
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
        "title": "Revisar escaladas diarias",
        "freq": "Diario · Cierre",
        "from": "Jefes de Cosecha",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Jefes.",
        "purpose": "Qué el Jefe sienta tu respaldo y que escalar tiene sentido"
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "award",
        "title": "Reconocimiento",
        "freq": "Mensual",
        "purpose": "Modelar visiblemente que Cultiva es para todos los niveles y reconocer el cumplimiento",
        "context": {
          "freq": "1 vez al mes",
          "when": "3 min",
          "place": "En espacio público (Comité, reunión de equipo, mensaje grupal)"
        },
        "steps": [
          {
            "k": null,
            "t": "Durante la semana observar conscientemente a los Jefes de Cosecha y conductas que destaquen (en comportamiento Cultiva o en rendimiento operativo)."
          },
          {
            "k": null,
            "t": "Anotar en la plantilla de registro la CONDUCTA destacada ESPECÍFICA y el IMPACTO que esa acción tuvo para la empresa y/o el grupo."
          },
          {
            "k": null,
            "t": "Elegir el espacio más adecuado para mencionarlo (Reunión grupal es ideal)."
          },
          {
            "k": null,
            "t": "Nombrar la CONDUCTA específica y el IMPACTO que esta trajo: \"[Nombre], te agradezco por [conducta], esto nos ha ayudado en [impacto].\""
          }
        ],
        "phrases": [
          "Quiero reconocer a [nombre]. Este mes lo vi [conducta específica] lo que nos está ayudando mucho en [impacto directo]. Eso es Cultiva-Escucha modelado.",
          "Si tuviera que poner un ejemplo de cómo se hace Cultiva-Valora bien, sería [nombre] cuando [situación]."
        ],
        "no": [
          "Reconocimiento genérico ('todos lo hacen bien').",
          "Saltárselo un mes (rompe el ritmo).",
          "Reconocer solo a los mismos cada mes."
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
        }
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
        "title": "Feedback 1:1 Mensual",
        "freq": "Mensual",
        "purpose": "Sesión de feedback mensual con el Supervisor de Fundo. Alinear sin imponer, reconocer conducta específica y acordar un ajuste concreto",
        "context": {
          "freq": "1 vez al mes",
          "when": "30 min",
          "place": "Oficina del fundo o caminata"
        },
        "steps": [
          {
            "k": "Preparar",
            "t": "1 ejemplo concreto de algo BIEN hecho y 1 ejemplo de algo a MEJORAR (ambos observados, no oídos) con el método SCI."
          },
          {
            "k": "Abrir",
            "t": "con la SITUACIÓN específica: '¿Recuerdas el martes pasado cuando [hecho]?'"
          },
          {
            "k": "Conectar",
            "t": "la CONDUCTA observable (sin juicios): 'Vi que tú [hiciste X]'."
          },
          {
            "k": "Conectar",
            "t": "con el IMPACTO real: 'Eso generó [efecto en el equipo / en la cosecha]'."
          },
          {
            "k": "Escuchar",
            "t": "la versión del SF: '¿Cómo lo viste tú?' — escuchar 2 minutos sin interrumpir."
          },
          {
            "k": "Acordar",
            "t": "algo concreto: '¿Qué harás distinto a partir de cuándo?'"
          },
          {
            "k": "Cerrar",
            "t": "con un mensaje positivo, destacar el compromiso y agendar la próxima conversación."
          },
          {
            "k": "Hago",
            "t": "seguimiento posterior: ¿Cómo te funcionó lo que acordamos?"
          }
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
          "soporte": "Tarjeta SCI · sesión 1:1",
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
        "title": "Revisar escaladas diarias",
        "freq": "Diario · Cierre",
        "from": "Supervisores de Fundo",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Supervisores de Fundo.",
        "purpose": "Qué el Supervisor de Fundo sienta tu respaldo y que escalar tiene sentido"
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "award",
        "title": "Reconocimiento",
        "freq": "Quincenal",
        "purpose": "Hacer visible quién está modelando Cultiva de manera oportuna",
        "context": {
          "freq": "1 vez cada quincena",
          "when": "3 min",
          "place": "En reunión de Supervisores de Fundo"
        },
        "steps": [
          {
            "k": null,
            "t": "Durante la semana observar conscientemente personas que destaquen (en conducta o en rendimiento)."
          },
          {
            "k": null,
            "t": "Anotar en la plantilla de registro la CONDUCTA destacada ESPECÍFICA y el IMPACTO que esa acción tuvo para la empresa y/o el grupo."
          },
          {
            "k": null,
            "t": "Elegir el espacio más adecuado para mencionarlo (Reunión grupal es ideal)."
          },
          {
            "k": null,
            "t": "Nombrar la CONDUCTA específica y el IMPACTO que esta trajo: \"[Nombre], te agradezco por [conducta], esto nos ha ayudado en [impacto].\""
          }
        ],
        "phrases": [
          "Quiero reconocer a [nombre]. Este mes lo vi [conducta específica] lo que nos está ayudando mucho en [impacto directo]. Eso es Cultiva-Escucha modelado.",
          "Si tuviera que poner un ejemplo de cómo se hace Cultiva-Valora bien, sería [nombre] cuando [situación]."
        ],
        "no": [
          "Reconocimiento genérico ('todos lo hacen bien').",
          "Saltárselo un mes (rompe el ritmo).",
          "Reconocer solo a los mismos cada mes."
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
        }
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
        "freq": "Semanal",
        "purpose": "Desarrollar al Líder de Cosecha en terreno, en tiempo real, sobre situaciones críticas",
        "context": {
          "freq": "2 Líderes de Cosecha  por semana",
          "when": "15-25 min",
          "place": "En el terreno, durante la jornada"
        },
        "steps": [
          {
            "k": "Observo",
            "t": "cómo trabajan los líderes de cosecha e IDENTIFICO quienes requieren acompañamiento para mejorar su forma de actuar, tomar decisiones y liderar."
          },
          {
            "k": null,
            "t": "Me ACERCO con una apertura neutra \"Oye, ¿Cómo vas hoy? ¿Qué te está costando más estos días? (En tono de ayuda, no de supervisión)"
          },
          {
            "k": "Pregunto",
            "t": "para hacer reflexionar Que crees que esta pasando, Que cambiarias tu (dejar que el Lider de Cosecha proponga la solucion)"
          },
          {
            "k": "Acuerdo",
            "t": "una sola cosa Que vas a haer de distinto entonces"
          },
          {
            "k": "Cierro",
            "t": "con un reconocimiento por el comprimiso de cambio y su esfuerzo por mejorar."
          },
          {
            "k": "Vuelvo",
            "t": "a preguntar despues de unos dias Como resulto lo que acordamo"
          }
        ],
        "phrases": [
          "Observé cómo dejaste la caseta. Cuéntame por qué lo hiciste así.",
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
          "soporte": "Tarjeta de coaching",
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
        "title": "Revisar escaladas diarias",
        "freq": "Diario · Cierre",
        "from": "Líderes de Cosecha",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Líderes de Cosecha",
        "purpose": "Qué el Líder de Cosecha sienta tu respaldo y que escalar tiene sentido"
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "award",
        "title": "Reconocimiento",
        "freq": "Semanal",
        "purpose": "Hacer visible que la conducta positiva se observa y se nombra de manera oportuna",
        "context": {
          "freq": "Según lo amerite (Mínimo 1 vez por semana)",
          "when": "En grupo",
          "place": ""
        },
        "steps": [
          {
            "k": null,
            "t": "Durante la semana observar conscientemente personas que destaquen (en conducta o en rendimiento)."
          },
          {
            "k": null,
            "t": "Anotar en la plantilla de registro la CONDUCTA destacada ESPECÍFICA y el IMPACTO que esa acción tuvo para la empresa y/o el grupo."
          },
          {
            "k": null,
            "t": "En la charla matinal, o algún otro espacio, nombrarlo en frente del grupo: '[Nombre], te agradezco por [conducta], esto nos ha ayudado en [impacto]."
          }
        ],
        "phrases": [
          "Quiero reconocer a [nombre]. Esta semana vi [conducta específica]. Eso es Cultiva en acción.",
          "Antes de empezar el día, una mención: [nombre], la forma como manejaste [situación] ayer fue ejemplar."
        ],
        "no": [
          "Reconocimiento vago: 'buen trabajo' o 'todos lo hicieron bien'.",
          "Reconocer siempre a los mismos.",
          "Hacerlo en privado cuando merece ser público (o viceversa).",
          "Hacerlo con excesiva frecuencia"
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
        "freq": "Diario · Inicio",
        "reminder": "Al inicio del día no olvides saludar a tu equipo con energía para iniciar bien la jornada.",
        "hasDone": true
      },
      {
        "id": "escucha-antes-de-cosechar",
        "kind": "full",
        "dimension": "escucha",
        "icon": "ear",
        "title": "Escucha antes de cosechar",
        "freq": "Diario",
        "purpose": "Recoger inquietudes antes de que se conviertan en problemas",
        "context": {
          "freq": "Diario",
          "when": "Después de la charla diaria",
          "place": "En el punto de reunión de la cuadrilla, antes de iniciar labores"
        },
        "steps": [
          {
            "k": "Abro",
            "t": "tras la charla operativa: “¿Algo que necesiten que escuche antes de empezar?”."
          },
          {
            "k": "Espero",
            "t": "30–60 segundos en silencio. La gente no responde de inmediato."
          },
          {
            "k": "Escucho",
            "t": "sin interrumpir. Si nadie habla: “¿Cómo vienen hoy?”."
          },
          {
            "k": "Decido",
            "t": "para cada tema: ¿resuelvo yo o escalo?"
          },
          {
            "k": "Registro",
            "t": "los temas; si escalo, indico a quién (SF) y fecha de respuesta."
          }
        ],
        "note": "Este ritual también puedes aplicarlo en conversaciones individuales, en ese espacio privado tu equipo puede sentirse más cómodo para abrirse contigo.",
        "phrases": [
          "Antes de empezar, ¿algo que necesiten que sepa o que tenga que escalar?",
          "Ese tema lo resuelvo yo hoy. Te aviso al almuerzo.",
          "Ese tema no está en mis manos. Lo subo al Supervisor de Fundo hoy mismo y mañana te traigo respuesta."
        ],
        "no": [
          "Saltarse el espacio si nadie habla (a veces toma 2-3 días que empiecen a hablar).",
          "Prometer cosas que no se pueden cumplir.",
          "Resolver sin registrar."
        ],
        "registro": {
          "soporte": "Temas recogidos del equipo",
          "escuchaTemas": true,
          "autoBroadcast": {"tema": "tema", "temaEsId": true, "detalle": "detalle", "resuelto": "resuelto"},
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
        "title": "Asegurando la calidad",
        "freq": "Diario · 2×",
        "purpose": "Acercamientos durante la jornada para monitorear un buen balance entre calidad y productividad.",
        "context": {
          "freq": "Diario",
          "when": "2 veces durante la jornada",
          "place": "En el campo"
        },
        "steps": [
          {
            "k": "Acércate con calma",
            "t": "“¿Cómo vamos, todo bien?”"
          },
          {
            "k": "Revisa la cosecha",
            "t": "mira la bandeja o caja, siempre. Con todos, sin excepción."
          },
          {
            "k": "Da feedback en el momento",
            "t": "“Esto está muy bien”, “Permíteme sugerirte algo que te puede ayudar____”."
          },
          {
            "k": "Escucha sus comentarios",
            "t": "“¿Qué opinas, te hace sentido?”"
          },
          {
            "k": "Cierra en positivo",
            "t": "“¡Así queda genial, continúa así!”"
          }
        ],
        "phrases": [
          "¿Cómo ves, la calidad de la fruta el día de hoy?",
          "¿Has observado algo con la fruta que no tengamos contemplado?"
        ],
        "no": [
          "Criticar la gestión del cosechador.",
          "Poner en evidencia al cosechador frente al grupo.",
          "Resolver sin registrar."
        ],
        "registro": {
          "hidden": true,
          "soporte": "Registro de calidad en campo",
          "fields": [
            {
              "k": "problematica",
              "l": "Problemática identificada",
              "t": "area",
              "req": true
            },
            {
              "k": "variedad",
              "l": "Variedad",
              "t": "text"
            },
            {
              "k": "problema",
              "l": "Detalle del problema",
              "t": "area"
            }
          ]
        }
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "award",
        "title": "Reconocimiento",
        "freq": "Semanal",
        "purpose": "Hacer visible que la conducta positiva se observa y se nombra de manera oportuna",
        "context": {
          "freq": "1 vez por semana (mínimo)",
          "when": "En grupo",
          "place": ""
        },
        "steps": [
          {
            "k": null,
            "t": "Durante la semana observar conscientemente personas que destaquen (en conducta o en rendimiento)."
          },
          {
            "k": null,
            "t": "Anotar en la plantilla de registro la CONDUCTA destacada ESPECÍFICA y el IMPACTO que esa acción tuvo para la empresa y/o el grupo."
          },
          {
            "k": null,
            "t": "En el espacio matinal, post-almuerzo o al cierre, nombrarlo en frente del grupo: '[Nombre], te agradezco por [conducta], esto nos ha ayudado en [impacto]."
          }
        ],
        "phrases": [
          "Antes de seguir, quiero mencionar a [nombre]. Hoy te vi [conducta específica]. Eso suma mucho en [impacto].",
          "Esta semana, [nombre] ha estado [conducta]. Quiero que el equipo lo escuche."
        ],
        "no": [
          "Reconocimiento vago: 'buen trabajo' o 'todos lo hicieron bien'.",
          "Reconocer siempre a los mismos.",
          "Hacerlo en privado cuando merece ser público (o viceversa).",
          "Hacerlo con excesiva frecuencia"
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
        "freq": "Diario · Cierre",
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
