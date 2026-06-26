/* ============================================================
   DATA · KIT CULTIVA — CALIDAD (+ TAC) · N2–N4 + TAC
   Reconstruido (21/06/2026) desde "Kit Cultiva por Perfil v5.1.xlsx"
   — fichas por perfil (hojas 13–17) + hoja "Resumen rituales — multiárea".
   Se inyecta sobre las estructuras creadas en data-cosecha.js.
   Regla del área: opera por TRANSMISIÓN CULTURAL (rotación 70-80%);
   los rituales premian al mentor/base que enseña, no al rotativo, y
   enmarcan el desarrollo en la FRICCIÓN con operaciones.
   ============================================================ */

Object.assign(window.PROFILES, {

  /* ---------------------------------------------------------- N2 */
  "cal-n2": {
    "id": "cal-n2",
    "area": "calidad",
    "level": "N2",
    "role": "Jefe de Calidad",
    "sub": "Sostiene la cultura por transmisión",
    "context": "Jefe de Calidad (Packing y Campo). Dos rasgos marcan el rol: la fricción permanente con operaciones y la rotación del 70-80%, que obliga a sostener la cultura por transmisión, no por antigüedad.",
    "rituals": [
      {
        "id": "feedback-1-1-friccion",
        "kind": "full",
        "dimension": "lidera",
        "icon": "message-square-quote",
        "title": "Feedback 1:1 Mensual",
        "freq": "Mensual",
        "purpose": "Sesión de feedback mensual con cada uno de tus reportes. Alinear sin imponer, reconocer conducta específica y acordar un ajuste concreto.",
        "context": {
          "freq": "Mensual (en el piloto, al menos 1)",
          "when": "Momento NO operativo",
          "place": ""
        },
        "steps": [
          { "k": "Prepara", "t": "1 ejemplo de algo BIEN hecho y 1 de algo a MEJORAR (ambos observados, no oídos) con el método SCI." },
          { "k": "Abre", "t": "con la SITUACIÓN específica: “¿Recuerdas el martes pasado cuando [hecho]?”" },
          { "k": "Conecta la conducta", "t": "observable, sin juicios: “Vi que tú [hiciste X]”." },
          { "k": "Conecta el impacto", "t": "real: “Eso generó [efecto en el equipo / en la relación con operaciones]”." },
          { "k": "Escucha", "t": "la perspectiva de la otra persona: “¿Cómo lo viste tú?” — 2 minutos sin interrumpir." },
          { "k": "Acuerda", "t": "algo concreto a 30 días: “¿Qué harás distinto y a partir de cuándo?”" },
          { "k": "Cierra", "t": "con un mensaje positivo, destaca el compromiso y agenda la próxima conversación." },
          { "k": "Da seguimiento", "t": "después: “¿Cómo te funcionó lo que acordamos?”" }
        ],
        "phrases": [
          "Observé cómo hiciste _____. Cuéntame por qué lo hiciste así.",
          "¿Qué necesitas de mí para que esto salga aún mejor?",
          "Sostener esa conversación sin escalar el conflicto fue clave. Lo vi.",
          "¿Cómo lo viviste tú?",
          "Lo que mejor vi este mes fue cómo manejaste [situación] y que generó [impacto]. Quiero que sepas que lo registré."
        ],
        "no": [
          "Enmarcar el feedback en lo técnico y evitar la fricción.",
          "Tomar partido sin escuchar su versión.",
          "Convertirlo en un reporte de hallazgos."
        ],
        "registro": {
          "soporte": "App Cultiva — Ficha SCI",
          "fields": [
            { "k": "persona", "l": "Persona", "t": "person", "req": true },
            { "k": "situacion", "l": "Hecho de fricción (situación)", "t": "area", "req": true },
            { "k": "conducta", "l": "Conducta", "t": "area" },
            { "k": "impacto", "l": "Impacto", "t": "area" },
            { "k": "acuerdo", "l": "Acuerdo a 30 días", "t": "area" },
            { "k": "fecha", "l": "Fecha", "t": "date" }
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
        "from": "Coordinador de Calidad",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por el Coordinador.",
        "purpose": "Que el Jefe sienta tu respaldo y que escalar tiene sentido."
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "graduation-cap",
        "title": "Reconocimiento",
        "freq": "Mensual",
        "purpose": "Hacer visible quién está modelando Cultiva de manera oportuna.",
        "context": {
          "freq": "1 vez al mes",
          "when": "3 min",
          "place": "En reunión de tu equipo"
        },
        "steps": [
          { "k": null, "t": "Durante el mes observar conscientemente personas que destaquen (en conducta o en rendimiento)." },
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
          "Saltárselo un mes (rompe el ritmo).",
          "Reconocer solo a los mismos cada mes."
        ],
        "registro": {
          "soporte": "Registro de reconocimiento",
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
  "cal-n3": {
    "id": "cal-n3",
    "area": "calidad",
    "level": "N3",
    "role": "Coordinador de Calidad",
    "sub": "Eslabón N3 del cascadeo",
    "context": "Nivel N3 de Calidad, entre el Jefe de Calidad y los Supervisores de Calidad (campo y planta). Tiene a su cargo a los Supervisores de Calidad. Hereda los dos rasgos de la gerencia: la fricción con operaciones y la rotación del 70-80%. Es el eslabón N3 del cascadeo: clasifica, cierra <48 h lo suyo y eleva al Jefe lo estructural.",
    "rituals": [
      {
        "id": "coaching-friccion",
        "kind": "full",
        "dimension": "lidera",
        "icon": "compass",
        "title": "Coaching",
        "freq": "Mensual",
        "purpose": "Sesión de feedback mensual con cada uno de tus reportes. Alinear sin imponer, reconocer conducta específica y acordar un ajuste concreto.",
        "context": {
          "freq": "Mensual (en el piloto, al menos 1 por supervisor)",
          "when": "15-25 min",
          "place": "En el terreno, durante la jornada"
        },
        "steps": [
          { "k": "Observa", "t": "cómo trabajan los Supervisores de Calidad e identifica quiénes requieren acompañamiento para actuar, decidir, liderar y relacionarse con operaciones/cosecha." },
          { "k": "Acércate", "t": "con una apertura neutra: “Oye, ¿cómo vas hoy? ¿Qué te está costando más estos días?” (en tono de ayuda, no de supervisión)." },
          { "k": "Pregunta", "t": "para hacer reflexionar: “¿Qué crees que está pasando? ¿Qué cambiarías tú?” (deja que proponga la solución)." },
          { "k": "Acuerda", "t": "una sola cosa: “¿Qué vas a hacer distinto entonces?”" },
          { "k": "Cierra", "t": "con un reconocimiento por el compromiso de cambio y su esfuerzo por mejorar." },
          { "k": "Vuelve", "t": "a preguntar después de unos días: “¿Cómo resultó lo que acordamos?”" }
        ],
        "phrases": [
          "Observé cómo hiciste _____. Cuéntame por qué lo hiciste así.",
          "¿Qué necesitas de mí para que esto salga aún mejor?",
          "Sostener esa conversación sin escalar el conflicto fue clave. Lo vi.",
          "¿Cómo lo viviste tú?",
          "Lo que mejor vi este mes fue cómo manejaste [situación] y que generó [impacto]. Quiero que sepas que lo registré."
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
            { "k": "situacion", "l": "Situación (fricción)", "t": "area", "req": true },
            { "k": "acuerdo", "l": "Acuerdo", "t": "area" },
            { "k": "fecha", "l": "Fecha de seguimiento", "t": "date" }
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
        "from": "Supervisores de Calidad",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Supervisores de Calidad.",
        "purpose": "Que el Supervisor / TAC sienta tu respaldo y que escalar tiene sentido."
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "graduation-cap",
        "title": "Reconocimiento",
        "freq": "Mensual",
        "purpose": "Hacer visible quién está modelando Cultiva de manera oportuna.",
        "context": {
          "freq": "1 vez al mes",
          "when": "3 min",
          "place": "En reunión de tu equipo"
        },
        "steps": [
          { "k": null, "t": "Durante el mes observar conscientemente personas que destaquen (en conducta o en rendimiento)." },
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
          "Saltárselo un mes (rompe el ritmo).",
          "Reconocer solo a los mismos cada mes."
        ],
        "registro": {
          "soporte": "Registro de reconocimiento",
          "fields": [
            { "k": "persona", "l": "Persona a reconocer", "t": "person", "req": true },
            { "k": "conducta", "l": "Conducta reconocida", "t": "area", "req": true }
          ]
        }
      }
    ]
  },

  /* ---------------------------------------------------------- N4 */
  "cal-n4": {
    "id": "cal-n4",
    "area": "calidad",
    "level": "N4",
    "role": "Supervisor de Calidad",
    "sub": "La bisagra de Calidad",
    "context": "La bisagra de Calidad (1 de Packing y 1 de Terreno). Equivale al Supervisor de Fundo en Cosecha, con dos variaciones: la rotación del 70-80% obliga a desarrollar a su gente y el técnico TAC está MÁS expuesto al conflicto con operaciones que un cosechador. Cierra <48 h la fricción a su alcance y eleva lo estructural al Jefe de Calidad.",
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
        "id": "coaching-en-terreno",
        "kind": "full",
        "dimension": "lidera",
        "icon": "compass",
        "title": "Coaching en Terreno",
        "freq": "Mensual",
        "purpose": "Desarrollar al TAC en diferentes habilidades y conocimiento que potencien su perfil.",
        "context": {
          "freq": "Mensual (en el piloto, al menos 1 por supervisor)",
          "when": "15-25 min",
          "place": "En el terreno, durante la jornada"
        },
        "steps": [
          { "k": "Observa", "t": "cómo trabajan los TAC e identifica quiénes requieren acompañamiento para actuar, decidir, liderar y relacionarse con operaciones/cosecha." },
          { "k": "Acércate", "t": "con una apertura neutra: “Oye, ¿cómo vas hoy? ¿Qué te está costando más estos días?” (en tono de ayuda, no de supervisión)." },
          { "k": "Pregunta", "t": "para hacer reflexionar: “¿Qué crees que está pasando? ¿Qué cambiarías tú?” (deja que el TAC proponga la solución)." },
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
            { "k": "persona", "l": "Persona (TAC)", "t": "person", "req": true },
            { "k": "situacion", "l": "Situación (fricción)", "t": "area", "req": true },
            { "k": "acuerdo", "l": "Acuerdo", "t": "area" },
            { "k": "fecha", "l": "Fecha de seguimiento", "t": "date" }
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
        "from": "Técnicos TAC",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Técnicos TAC.",
        "purpose": "Que el Técnico sienta tu respaldo y que escalar tiene sentido."
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "graduation-cap",
        "title": "Reconocimiento",
        "freq": "Mensual",
        "purpose": "Hacer visible quién está modelando Cultiva de manera oportuna — premiando la conducta (no el logro operativo) y la mejora en el relacionamiento con Cosecha.",
        "context": {
          "freq": "1 vez al mes",
          "when": "10 min",
          "place": "En reunión de tu equipo o por el canal del equipo"
        },
        "steps": [
          { "k": null, "t": "A fin de mes, identificar 1-2 personas de tu equipo que destacaron en conducta Cultiva y que mejoraron su relacionamiento con Cosecha (conducta, no logro operativo)." },
          { "k": null, "t": "Elegir el espacio más adecuado para mencionarlo (reunión grupal es ideal)." },
          { "k": null, "t": "Nombrar la CONDUCTA específica (no 'buen trabajo' sino 'la forma como manejaste el conflicto del jueves')." },
          { "k": null, "t": "Si es posible, dar un símbolo: pin Cultiva, mención en mural, comida en campo." }
        ],
        "phrases": [
          "Quiero reconocer a [nombre]. Este mes lo vi [conducta específica]. Eso es Cultiva modelado.",
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
            { "k": "persona", "l": "Persona a reconocer", "t": "person", "req": true },
            { "k": "conducta", "l": "Conducta reconocida", "t": "area", "req": true },
            { "k": "espacio", "l": "Espacio", "t": "text" }
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
        "reminder": "Al cierre del turno (ambos) no olvides agradecer a tu equipo por el esfuerzo realizado.",
        "hasDone": true
      }
    ]
  },

  /* ---------------------------------------------------------- TAC */
  "cal-tac": {
    "id": "cal-tac",
    "area": "calidad",
    "level": "TAC",
    "role": "Técnico TAC",
    "sub": "Donde arranca el cascadeo",
    "context": "La capa operativa de Calidad. El TAC fiscaliza y eso genera fricción permanente con el cosechador y con operaciones. El giro Cultiva: Calidad RECONOCE, no solo fiscaliza. Aquí ARRANCA el cascadeo de escucha de Calidad. Su microhábito clave es desactivar la fricción ANTES de fiscalizar.",
    "rituals": [
      {
        "id": "acercamiento-calido",
        "kind": "full",
        "dimension": "lidera",
        "icon": "handshake",
        "title": "Acercamiento cálido",
        "freq": "Diario · Inicio",
        "purpose": "Compartir con el equipo los aspectos técnicos más importantes del día para mantener altos estándares de calidad — y desactivar la fricción antes de fiscalizar.",
        "context": {
          "freq": "Diario",
          "when": "Durante el inicio de labores",
          "place": "Al llegar al área que va a fiscalizar"
        },
        "steps": [
          { "k": "Me presento", "t": "e inicio la charla saludando al equipo y pidiéndoles unos minutos de su atención." },
          { "k": "Comparto", "t": "el objetivo del día y los puntos importantes a considerar." },
          { "k": "Recuerdo", "t": "los criterios que requieren mayor atención y los errores que debemos evitar." },
          { "k": "Resuelvo", "t": "dudas, consultas o comentarios." },
          { "k": "Cierro", "t": "motivando al equipo y reforzando el trabajo de cada persona para lograr buenos resultados." }
        ],
        "phrases": [
          "Buenos días equipo, permítanme unos minutos para compartir los puntos clave de hoy.",
          "¿Hay algo del área que deba saber antes de empezar?",
          "No vengo a buscar errores, vengo a que salga bien entre los dos.",
          "¿Alguien tiene una consulta antes de comenzar?"
        ],
        "no": [
          "Empezar a fiscalizar sin presentarse (genera emboscada).",
          "Reportar al área antes de avisarle a la persona.",
          "Llegar con tono de inspector.",
          "Enfocarse únicamente en errores.",
          "Dar demasiada información en una sola charla."
        ],
        "registro": {
          "hidden": true,
          "soporte": "App Cultiva — bitácora",
          "fields": [
            { "k": "fecha", "l": "Fecha", "t": "date" },
            { "k": "hora", "l": "Hora", "t": "text" },
            { "k": "info", "l": "Información levantada / observada", "t": "area", "req": true }
          ]
        }
      },
      {
        "id": "escucho-para-ayudar",
        "kind": "full",
        "dimension": "escucha",
        "icon": "ear",
        "title": "Escucho para ayudar",
        "freq": "Diario",
        "purpose": "Escuchar al equipo para entender, apoyar y tomar decisiones que mejoren la calidad.",
        "context": {
          "freq": "Diario",
          "when": "Durante la jornada",
          "place": "En el área fiscalizada"
        },
        "steps": [
          { "k": "Monitoreo", "t": "la fruta de un grupo." },
          { "k": "Comunico", "t": "los % al líder en tono cercano, no confrontativo." },
          { "k": "Escucho", "t": "el descargo o comentarios." },
          { "k": "Ofrezco", "t": "recomendaciones para gestionar la problemática." },
          { "k": "Informo", "t": "al Supervisor de Fundo y Supervisor de Calidad sobre el %, evento u observación." }
        ],
        "phrases": [
          "Te comparto el resultado para que estemos alineados.",
          "Quiero apoyarte para que mejoremos este %.",
          "¿Qué crees que está afectando este resultado?",
          "¿Qué necesitas de mí para mejorar?"
        ],
        "no": [
          "Comunicar los resultados de forma acusatoria.",
          "No escuchar el descargo del líder.",
          "Registrar datos incompletos o incorrectos.",
          "Enfocarse solo en el % y no en cómo mejorar."
        ],
        "registro": {
          "soporte": "Registro de calidad en campo",
          "autoBroadcast": {"temaFijo": "Calidad en campo", "detalle": "problematica"},
          "fields": [
            { "k": "problematica", "l": "Problemática identificada", "t": "area", "req": true },
            { "k": "accion", "l": "Acción correctiva", "t": "area" }
          ]
        }
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "thumbs-up",
        "title": "Reconocimiento",
        "freq": "Diario",
        "purpose": "Reconocer y valorar las mejoras del equipo para reforzar buenas prácticas y motivar a seguir creciendo.",
        "context": {
          "freq": "Diario",
          "when": "Durante la jornada",
          "place": "En grupo o 1:1"
        },
        "steps": [
          { "k": "Identifico", "t": "conscientemente 1-2 personas que destaquen (en rendimiento)." },
          { "k": "Nombro", "t": "la mejora específica (no un 'rinde bien' sino 'mantuvo la calidad en jaba 5 del lote norte')." },
          { "k": "Reconozco", "t": "el resultado e informo al Líder de Cosecha y/o Supervisor de Fundo." },
          { "k": "Anoto", "t": "el reconocimiento otorgado." }
        ],
        "phrases": [
          "Buen trabajo equipo, hoy se notó la mejora en ____.",
          "Esta semana, [nombre] ha estado [conducta]. Quiero que el equipo lo escuche."
        ],
        "no": [
          "Reconocimiento vago: 'buen trabajo' o 'todos lo hicieron bien'.",
          "Reconocer siempre a los mismos.",
          "Reconocer solo cuando se logran grandes resultados.",
          "Olvidar informar el reconocimiento a sus superiores.",
          "Comparar con otros grupos."
        ],
        "registro": {
          "soporte": "Agenda Cultiva — Reconocimiento diario",
          "fields": [
            { "k": "cosechador", "l": "Cosechador", "t": "person", "req": true },
            { "k": "conducta", "l": "Conducta observable", "t": "area", "req": true },
            { "k": "colilla", "l": "¿Colilla entregada?", "t": "bool" }
          ]
        }
      }
    ]
  }

});

/* índice área → perfiles (extiende el de data-cosecha.js)
   Nota: N1 de Calidad NO se incluye (no participa del ejercicio). */
window.PROFILES_BY_AREA.calidad =
  ["cal-n2", "cal-n3", "cal-n4", "cal-tac"].map(function (id) { return window.PROFILES[id]; });

/* datos demo de la bandeja de escaladas (cascadeo de Calidad · fricción c/ operaciones) */
Object.assign(window.ESCALADAS_DEMO, {
  "cal-n2": [
    {
      "id": "e1", "from": "Equipo base de Calidad", "role": "Conversación quincenal",
      "tema": "Fricción con operaciones",
      "detalle": "El equipo base siente que el muestreo se cuestiona en campo y no hay respaldo claro frente al cosechador.",
      "requiere": "Un criterio común con operaciones sobre cómo se maneja una observación de calidad.",
      "date": 1781990110069, "status": null, "thread": []
    },
    {
      "id": "e2", "from": "Carlos Leyva", "role": "Coordinador de Calidad",
      "tema": "Rotación / inducción",
      "detalle": "Llegaron tres nuevos rotativos sin mentor base asignado; se pierde la transmisión cultural.",
      "requiere": "Confirmar duplas mentor–nuevo antes de que sigan operando solos.",
      "date": 1781949910069, "status": null, "thread": []
    }
  ],
  "cal-n3": [
    {
      "id": "e1", "from": "Marta Ríos", "role": "Supervisora de Calidad · Campo",
      "tema": "Roce con el cosechador",
      "detalle": "Un TAC tuvo un roce fuerte con una cuadrilla por una observación de calibre; quedó tenso.",
      "requiere": "Apoyo para mediar y un mensaje común con el Líder de Cosecha.",
      "date": 1782010110069, "status": null, "thread": []
    },
    {
      "id": "e2", "from": "Jorge Effio", "role": "Supervisor de Calidad · Packing",
      "tema": "Exposición del TAC",
      "detalle": "Un técnico TAC de planta acumula fricción con el supervisor de línea hace varios días.",
      "requiere": "Conversación de carga y, si sigue, elevar al Jefe de Calidad.",
      "date": 1781921110069, "status": null, "thread": []
    }
  ],
  "cal-n4": [
    {
      "id": "e1", "from": "Pedro Saldaña", "role": "Técnico TAC · Cosecha",
      "tema": "Fricción · protocolo",
      "detalle": "No hay protocolo claro para una casuística de calidad que apareció en el lote; la cuadrilla presiona por avanzar.",
      "requiere": "Definir el criterio con el Jefe de Calidad para responder al campo.",
      "date": 1782010110069, "status": null, "thread": []
    },
    {
      "id": "e2", "from": "Rosa Campos", "role": "Técnica TAC · Planta",
      "tema": "Exposición al conflicto",
      "detalle": "La presión por fiscalizar en plena campaña la está desgastando; lo conversó al cierre.",
      "requiere": "Conversación de carga y respaldo frente a operaciones.",
      "date": 1781990110069, "status": null, "thread": []
    }
  ]
});
