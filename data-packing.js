/* ============================================================
   DATA · KIT CULTIVA — OPERACIONES INDUSTRIALES (PACKING) · N1–N4
   Reconstruido (21/06/2026) desde "Kit Cultiva por Perfil v5.1.xlsx"
   — fichas por perfil (hojas 9–12) + hoja "Resumen rituales — multiárea".
   Se inyecta sobre las estructuras creadas en data-cosecha.js.
   Regla del área: LA NOCHE EXISTE Y TIENE AUTORIDAD EQUIVALENTE AL DÍA;
   todo ritual de día tiene su gemelo de noche.
   ============================================================ */

Object.assign(window.PROFILES, {

  /* ---------------------------------------------------------- N1 */
  "pack-n1": {
    "id": "pack-n1",
    "area": "packing",
    "level": "N1",
    "role": "Gerencia de Operaciones Industriales",
    "sub": "La noche tiene autoridad",
    "context": "Sponsor del piloto en Packing (plantas Chao y Salaverry, día y noche). La regla de oro: LA NOCHE EXISTE Y TIENE AUTORIDAD EQUIVALENTE AL DÍA. Si el sponsor solo aparece de día, el mensaje es que la noche no importa.",
    "rituals": [
      {
        "id": "caminata-dia-noche",
        "kind": "full",
        "dimension": "lidera",
        "icon": "footprints",
        "title": "Caminata día/noche",
        "freq": "Día y noche",
        "purpose": "Hacer presencia ejecutiva visible en ambos turnos.",
        "context": {
          "freq": "En el piloto, al menos 1 recorrido de día y 1 de noche por planta (luego 1 vez al mes)",
          "when": "Durante la operación",
          "place": "En la línea"
        },
        "steps": [
          { "k": "Programa", "t": "el recorrido nocturno en un horario real de operación de noche." },
          { "k": "Llega", "t": "saluda por nombre y observa la labor SIN corregir ni dar instrucciones." },
          { "k": "Observa", "t": "la línea sin interrumpir; pregunta: “¿Qué es lo que desde mi puesto no logro ver de tu trabajo?”" },
          { "k": "Nombra", "t": "1 cosa que solo pasa de noche y que normalmente nadie reconoce." },
          { "k": "Registra", "t": "1-2 temas levantados y a quién corresponde resolverlos." },
          { "k": "Cierra", "t": "agradeciendo por nombre." }
        ],
        "phrases": [
          "Vine de noche porque quería ver cómo es el turno de verdad.",
          "De día esto no se nota. Ustedes lo sostienen.",
          "Esto que me cuentan lo subo y vuelvo con respuesta."
        ],
        "no": [
          "Recorrer solo el turno día y reportar 'la planta'.",
          "Recorrer de noche solo para inspeccionar.",
          "No saludar por nombre.",
          "Convertir la caminata en una inspección o auditoría."
        ],
        "registro": {
          "soporte": "Registro de visita en planta",
          "fields": [
            { "k": "lugar", "l": "Lugar", "t": "text", "req": true },
            { "k": "turno", "l": "Turno (día/noche)", "t": "text", "req": true },
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
        "purpose": "Sesión de feedback mensual con el Jefe a cargo. Alinear sin imponer, reconocer conducta específica y acordar un ajuste concreto (método SCI).",
        "context": {
          "freq": "1 vez al mes",
          "when": "30-45 min",
          "place": "Oficina o caminata por la planta"
        },
        "steps": [
          { "k": "Prepara", "t": "1 ejemplo de algo BIEN hecho y 1 de algo a MEJORAR (ambos observados, no oídos) con el método SCI." },
          { "k": "Abre", "t": "con la SITUACIÓN específica: “¿Recuerdas el martes pasado cuando [hecho]?”" },
          { "k": "Conecta la conducta", "t": "observable, sin juicios: “Vi que tú [hiciste X]”." },
          { "k": "Conecta el impacto", "t": "real: “Eso generó [efecto en el equipo / en la línea]”." },
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
        "from": "Jefes de Planta",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Jefes de Planta (día y noche).",
        "purpose": "Que el Jefe sienta tu respaldo y que escalar tiene sentido."
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "moon-star",
        "title": "Reconocimiento (día/noche)",
        "freq": "Mensual",
        "purpose": "Modelar visiblemente que Cultiva es para todos los niveles y reconocer el cumplimiento — en ambos turnos.",
        "context": {
          "freq": "1 vez al mes",
          "when": "Durante las caminatas",
          "place": "Día y noche"
        },
        "steps": [
          { "k": null, "t": "Durante el mes observar conscientemente a los Jefes (de día y de noche) y conductas que destaquen (en comportamiento Cultiva o en rendimiento operativo)." },
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
          "Reconocer solo el turno día."
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
  "pack-n2": {
    "id": "pack-n2",
    "area": "packing",
    "level": "N2",
    "role": "Jefe de Planta",
    "sub": "Jefatura + bisagra",
    "context": "El Jefe de Planta opera como jefatura Y como bisagra en el piloto (Chao y Salaverry, + turnos de noche). Arriba recibe desarrollo del sub-gerente y desarrolla a sus líderes (SCI); abajo hace coaching en línea al Supervisor de Planta/Control. Todo ritual de día tiene su gemelo de noche.",
    "rituals": [
      {
        "id": "feedback-1-1-mensual",
        "kind": "full",
        "dimension": "lidera",
        "icon": "message-square-quote",
        "title": "Feedback 1:1 Mensual (día/noche)",
        "freq": "Mensual",
        "purpose": "Sesión de feedback mensual con el Jefe a cargo. Alinear sin imponer, reconocer conducta específica y acordar un ajuste concreto (método SCI). Aplica con la MISMA profundidad al líder nocturno.",
        "context": {
          "freq": "1 vez al mes (en el piloto, al menos 1 por persona, día y noche)",
          "when": "Momento NO operativo",
          "place": "Oficina o caminata por la planta"
        },
        "steps": [
          { "k": "Prepara", "t": "1 ejemplo de algo BIEN hecho y 1 de algo a MEJORAR (ambos observados, no oídos) con el método SCI." },
          { "k": "Abre", "t": "con la SITUACIÓN específica: “¿Recuerdas el martes pasado cuando [hecho]?”" },
          { "k": "Conecta la conducta", "t": "observable, sin juicios: “Vi que tú [hiciste X]”." },
          { "k": "Conecta el impacto", "t": "real: “Eso generó [efecto en el equipo / en la línea]”." },
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
        "freq": "Diario · Relevo",
        "from": "Jefes de Producción de Planta",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Jefes de Producción (día y noche).",
        "purpose": "Que el Jefe sienta tu respaldo y que escalar tiene sentido."
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "moon-star",
        "title": "Reconocimiento (por turno)",
        "freq": "Mensual",
        "purpose": "Hacer visible quién está modelando Cultiva de manera oportuna, reconociendo conductas distintas de día y de noche.",
        "context": {
          "freq": "1 vez al mes",
          "when": "3 min",
          "place": "En reunión de tu equipo"
        },
        "steps": [
          { "k": null, "t": "Durante el mes observar conscientemente personas de cada turno que destaquen (en conducta o en rendimiento)." },
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
          "Reconocer solo a los del turno día."
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
  "pack-n3": {
    "id": "pack-n3",
    "area": "packing",
    "level": "N3",
    "role": "Jefe de Producción de Planta",
    "sub": "Eslabón N3 del cascadeo",
    "context": "Nivel N3 de Operaciones Industriales (Packing). Reporta al Jefe de Planta (N2). Hay un Jefe de Producción por turno: uno de día y uno de noche. Su variación clave: el turno noche debe ESCALAR con la misma autoridad que el día (no solo reportar) y el relevo se sostiene con el cuaderno de relevo.",
    "rituals": [
      {
        "id": "coaching-en-terreno",
        "kind": "full",
        "dimension": "lidera",
        "icon": "compass",
        "title": "Coaching en Terreno",
        "freq": "2×/mes",
        "purpose": "Desarrollar al Supervisor en tiempo real sobre la calidad de su labor.",
        "context": {
          "freq": "2 veces por mes",
          "when": "20 min",
          "place": "En planta, en horario laboral · ambos turnos"
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
            { "k": "turno", "l": "Turno (día/noche)", "t": "text" },
            { "k": "observo", "l": "Observo", "t": "area", "req": true },
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
        "freq": "Diario · Relevo",
        "from": "Supervisores de Planta / Control",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Supervisores (día y noche).",
        "purpose": "Que el Supervisor sienta tu respaldo y que escalar tiene sentido."
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "moon-star",
        "title": "Reconocimiento",
        "freq": "Mensual",
        "purpose": "Hacer visible quién está modelando Cultiva de manera oportuna.",
        "context": {
          "freq": "1 vez al mes",
          "when": "3 min",
          "place": "En reunión de tu equipo"
        },
        "steps": [
          { "k": null, "t": "Durante el mes observar conscientemente personas de cada turno que destaquen (en conducta o en rendimiento)." },
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
          "Reconocer solo a los del turno día."
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

  /* ---------------------------------------------------------- N4 */
  "pack-n4": {
    "id": "pack-n4",
    "area": "packing",
    "level": "N4",
    "role": "Supervisor de Producción / Control",
    "sub": "Donde arranca el cascadeo",
    "context": "La capa donde la métrica se mueve en Packing (1 supervisor por planta + 1 control en planta Chao, día y noche). Los rituales se apalancan en momentos que YA existen (la charla de 5 min, la pausa del turno, el relevo). En noche, todo se hace con autoridad equivalente y el registro queda en el cuaderno de relevo.",
    "rituals": [
      {
        "id": "saludo-con-proposito",
        "kind": "light",
        "dimension": "lidera",
        "icon": "sunrise",
        "title": "Saludo con propósito",
        "freq": "Diario · Inicio",
        "reminder": "Al inicio del turno no olvides saludar a tu equipo con energía para iniciar bien la jornada.",
        "hasDone": true
      },
      {
        "id": "escucha-antes-de-iniciar",
        "kind": "full",
        "dimension": "escucha",
        "icon": "ear",
        "title": "Escucha antes de iniciar",
        "freq": "Diario",
        "purpose": "Recoger inquietudes antes de que se conviertan en problemas. Apalanca la charla de 5 min que ya existe para sumar el saludo presencial y el foco del turno: el microhábito de mayor retorno por menor esfuerzo.",
        "context": {
          "freq": "Diario · al inicio de cada turno (día y noche)",
          "when": "En la charla operativa",
          "place": "En el punto de charla"
        },
        "steps": [
          { "k": "Abro", "t": "tras la charla operativa: “¿Algo que necesiten que escuche antes de empezar?”." },
          { "k": "Espero", "t": "30–60 segundos en silencio. La gente no responde de inmediato." },
          { "k": "Escucho", "t": "sin interrumpir. Si nadie habla: “¿Cómo vienen hoy?”." },
          { "k": "Decido", "t": "para cada tema: ¿resuelvo yo o escalo?" },
          { "k": "Registro", "t": "los temas; si escalo, indico a quién y fecha de respuesta." },
          { "k": "En noche", "t": "hazlo igual: la autoridad del turno es equivalente." }
        ],
        "note": "Este ritual también puedes aplicarlo en conversaciones individuales; en ese espacio privado tu equipo puede sentirse más cómodo para abrirse contigo.",
        "phrases": [
          "Buenas noches, equipo. Hoy la línea va a [foco]. ¿Listos?",
          "Antes de arrancar, ¿alguien nuevo? [presentar]",
          "Cuento con cada uno este turno. Vamos."
        ],
        "no": [
          "Saltar la charla 'porque la línea apura'.",
          "Saludar sin mirar o solo a algunos.",
          "Tratar el turno noche como un turno de segunda."
        ],
        "registro": {
          "soporte": "Cuaderno de relevo / Agenda Cultiva",
          "fields": [
            { "k": "fecha", "l": "Fecha", "t": "date" },
            { "k": "temas", "l": "Temas levantados", "t": "area", "req": true },
            { "k": "turno", "l": "Turno (día/noche)", "t": "text" }
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
            { "k": "turno", "l": "Turno (día/noche)", "t": "text" },
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
        "reminder": "Al cierre del turno (ambos) no olvides agradecer a tu equipo por el esfuerzo realizado.",
        "hasDone": true
      }
    ]
  }

});

/* índice área → perfiles (extiende el de data-cosecha.js) */
window.PROFILES_BY_AREA.packing =
  ["pack-n1", "pack-n2", "pack-n3", "pack-n4"].map(function (id) { return window.PROFILES[id]; });

/* datos demo de la bandeja de escaladas (cascadeo de Packing · día/noche) */
Object.assign(window.ESCALADAS_DEMO, {
  "pack-n1": [
    {
      "id": "e1", "from": "Marco Ríos", "role": "Líder de Planta · Noche (Chao)",
      "tema": "Estructural · dotación noche",
      "detalle": "El turno noche sostuvo la línea con dos personas menos por inasistencias; aguantó, pero no es sostenible otra semana.",
      "requiere": "Decisión sobre refuerzo nocturno o reprogramación de la meta de la noche.",
      "date": 1782011110069, "status": null, "thread": []
    },
    {
      "id": "e2", "from": "Carla Ruiz", "role": "Líder de Planta · Día (Salaverry)",
      "tema": "Criticidad · cambio de formato",
      "detalle": "El cambio de formato entre líneas está tomando el doble de tiempo y arrastra a ambos turnos.",
      "requiere": "Definir un estándar de cambio de formato con dueño y plazo.",
      "date": 1781949910069, "status": null, "thread": []
    }
  ],
  "pack-n2": [
    {
      "id": "e1", "from": "Diego Salas", "role": "Jefe de Producción · Noche",
      "tema": "Relevo · información perdida",
      "detalle": "Una escalada de calidad de la noche no llegó al turno día porque no quedó en el cuaderno de relevo.",
      "requiere": "Reforzar el uso del cuaderno de relevo y cerrar el tema de calidad pendiente.",
      "date": 1782010110069, "status": null, "thread": []
    },
    {
      "id": "e2", "from": "Ana Cueva", "role": "Jefe de Producción · Día",
      "tema": "Carga del turno",
      "detalle": "Dos supervisores de día encadenaron turnos largos por la campaña; se nota el desgaste.",
      "requiere": "Validar descansos y posible rotación antes de que afecte la línea.",
      "date": 1781990110069, "status": null, "thread": []
    }
  ],
  "pack-n3": [
    {
      "id": "e1", "from": "Luis Tapia", "role": "Supervisor de Control · Noche",
      "tema": "Señal de línea",
      "detalle": "La selectora de la línea 2 da intermitencias en la madrugada; aún no para, pero baja el ritmo.",
      "requiere": "Coordinar mantenimiento antes del siguiente turno noche.",
      "date": 1782010110069, "status": null, "thread": []
    },
    {
      "id": "e2", "from": "Sofía Núñez", "role": "Supervisora de Planta · Día",
      "tema": "Persona nueva sin inducción",
      "detalle": "Llegaron dos personas nuevas a la línea sin la charla de inducción de seguridad.",
      "requiere": "Coordinar la inducción antes de que sigan operando.",
      "date": 1781921110069, "status": null, "thread": []
    }
  ]
});
