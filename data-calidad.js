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

  /* ---------------------------------------------------------- N1 (clonado de Cosecha) */
  "cal-n1":   {
    "id": "cal-n1",
    "area": "calidad",
    "level": "N1",
    "role": "Gerente de Calidad",
    "sub": "Garante del sistema",
    "context": "1 persona en el piloto. Garante del sistema. Modela Cultiva hacia el Jefe y destraba temas estructurales. Si no lo hace visiblemente, los niveles abajo no lo van a hacer.",
    "rituals": [
      {
        "id": "acompanamiento-1-1",
        "kind": "full",
        "dimension": "lidera",
        "icon": "message-square-quote",
        "title": "Acompañamiento 1 a 1",
        "freq": "1 vez al mes",
        "purpose": "Desarrollar al nivel de abajo mediante observación, pregunta y acuerdo concreto — SCI integrado. Recomendación: Desarrollar al nivel de abajo mediante la observación, la reflexión y acuerdos concretos para potenciar sus fortalezas y mejorar su desempeño",
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
            "t": "2 minutos sin interrumpir."
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
            "t": "con reconocimiento por el compromiso."
          },
          {
            "k": "Vuelvo",
            "t": "cuando se haya cumplido la fecha de seguimiento: \"¿Cómo te resultó lo que acordamos?\""
          }
        ],
        "phrases": [
          "\"Vi que [conducta] cuando [situación]. Eso generó [impacto]. ¿Cómo lo ves tú?\"",
          "“Lo que mejor vi este mes fue cómo manejaste [situación específica] y que generó [impacto]. Quiero que sepas que lo registré.”",
          "\"No vine a corregirte, vine a alinearnos. ¿Qué necesitas de mí?\"",
          "\"¿Qué crees que pasó? ¿Qué cambiarías tú?\"",
          "\"Repíteme el acuerdo para asegurarnos de que quedamos igual.\"",
          "\"Antes de cerrar quiero reconocer que [conducta positiva]. Eso me da confianza.\""
        ],
        "no": [
          "Hablar de personas, no de hechos observados.",
          "Cerrar sin un acuerdo concreto.",
          "Saltarse el reconocimiento positivo al final.",
          "Convertirlo en monólogo de instrucciones.",
          "No volver a preguntar sobre el acuerdo en los días siguientes."
        ],
        "context": {
          "freq": "1 vez al mes",
          "when": "30-45 min",
          "place": "Momento no operativo con el Jefe de Calidad"
        },
        "registro": {
          "soporte": "Tarjeta Acompañamiento 1 a 1",
          "fields": [
            {
              "k": "persona",
              "l": "Persona",
              "t": "person"
            },
            {
              "k": "situacion",
              "l": "Situación observada",
              "t": "area"
            },
            {
              "k": "conducta",
              "l": "Conducta",
              "t": "area"
            },
            {
              "k": "impacto",
              "l": "Impacto",
              "t": "area"
            },
            {
              "k": "pregunta",
              "l": "Pregunta clave",
              "t": "area"
            },
            {
              "k": "acuerdo",
              "l": "Acuerdo",
              "t": "area"
            },
            {
              "k": "fecha",
              "l": "Fecha de seguimiento",
              "t": "date"
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
        "freq": "1 visita a campo y planta trimestralmente",
        "purpose": "Hacer visible a la sub-gerencia en terreno",
        "context": {
          "freq": "1 visita a campo y planta trimestralmente",
          "when": "En el lote o en la línea — nunca en oficina",
          "place": "Gerente/Sub Gerente + Supervisor de Fundo/Líder de Cosecha/Operarios"
        },
        "steps": [
          {
            "k": "Coordino",
            "t": "la visita y llevo 2-3 temas de fricción con operaciones para escuchar."
          },
          {
            "k": "Llego",
            "t": ", saludo por nombre y observo SIN tomar partido en el momento."
          },
          {
            "k": "Pregunto",
            "t": "sobre la fricción concreta con operaciones."
          },
          {
            "k": "Escucho",
            "t": "sin resolver en el momento."
          },
          {
            "k": "Cierro",
            "t": "con una promesa cumplible y anuncio que volveré."
          }
        ],
        "phrases": [
          "\"Vine a ver de cómo va todo, cómo se sienten, no a revisar muestreos.\"",
          "\"Que sostengan la calidad sin escalar el conflicto es justo lo que vengo a reconocer.\"",
          "\"Esto que me cuentas lo reviso y te traigo respuesta esta semana.\""
        ],
        "no": [
          "Convertirla en inspección de calidad o auditoría.",
          "Tomar partido en la fricción con operaciones en el momento.",
          "Visitar solo planta y saltarse el campo (o viceversa)."
        ],
        "registro": {
          "soporte": "Registro de visita en terreno",
          "fields": [
            {
              "k": "lugar",
              "l": "Lugar",
              "t": "text"
            },
            {
              "k": "conductas",
              "l": "Conductas observadas",
              "t": "area"
            },
            {
              "k": "temas",
              "l": "Temas levantados",
              "t": "area"
            },
            {
              "k": "responsables",
              "l": "Responsables",
              "t": "area"
            }
          ]
        }
      },
      {
        "id": "espacio-de-confianza",
        "kind": "full",
        "dimension": "escucha",
        "icon": "ear",
        "title": "Espacio de confianza",
        "freq": "Semanal",
        "purpose": "Recoger inquietudes antes de que se conviertan en problemas, fomentar la comunicación, cercanía y espacios seguros.",
        "steps": [
          {
            "k": "Abro",
            "t": "\"¿Algo que necesiten que escuche antes de empezar?\""
          },
          {
            "k": "Espero",
            "t": "20-30 segundos en silencio; la gente no responde de inmediato."
          },
          {
            "k": "Escucho",
            "t": "Sin interrumpir. Si nadie habla: \"¿Cómo vienen hoy?\""
          },
          {
            "k": "Registro",
            "t": "(vía app): Registro el tema y su contexto. ( 5. ACTÚO: Para cada tema, elijo una opción: • Si puedo resolverlo: defino la acción y establezco la urgencia (Hoy / Esta semana). • Si no puedo resolverlo: marco \"No resuelvo yo\", agradezco que lo haya compartido, reconozco la importancia del tema y le brindo una orientación sobre qué podría hacer."
          },
          {
            "k": "Doy cierre",
            "t": "Al día siquiente: \"Ayer [nombre] planteó [tema]. [Lo resolví / esta es la actualización].\""
          }
        ],
        "phrases": [
          "\"¿Algo que quieran conversar antes de empezar?\"",
          "\"Ese tema lo veo yo esta semana. Vuelvo con respuesta.\"",
          "\"Eso es estructural — lo llevo a la mesa que corresponde. Te confirmo el jueves.\"",
          "\"La semana pasada [nombre] planteó [tema]. Esto es lo que se decidió.\""
        ],
        "no": [
          "Escuchar sin dejar rastro — si no lo registras, se pierde el patrón.",
          "Prometer respuesta sin fecha.",
          "No cerrar el loop la siguiente semana con quien lo trajo."
        ],
        "context": {
          "freq": "Semanal",
          "when": "en espacios ya programados o existentes con tus reportes directos"
        }
      },
      {
        "id": "revisar-escaladas-diarias",
        "kind": "escaladas",
        "dimension": "escucha",
        "icon": "inbox",
        "title": "Revisión de escaladas",
        "freq": "Diario",
        "purpose": "Detectar lo que se repite — dar destino institucional a lo que el Jefe de Calidad no puede resolver.",
        "from": "tu equipo",
        "reminder": "Revisa y dale destino a lo que tu equipo escaló."
      },
      {
        "id": "reconocimiento-sincero",
        "kind": "full",
        "dimension": "valora",
        "icon": "award",
        "title": "Reconocimiento Sincero",
        "freq": "1 vez al mes",
        "purpose": "Hacer visible quién está modelando Cultiva de manera oportuna.",
        "steps": [
          {
            "k": "Observo",
            "t": "conscientemente a los Jefes de Calidad que destaquen en conducta o rendimiento durante el período."
          },
          {
            "k": "Anoto",
            "t": "la conducta específica y el impacto que tuvo para el equipo o la operación."
          },
          {
            "k": "Nombro",
            "t": "en el momento oportuno frente al grupo: \"[Nombre], te agradezco por [conducta] — eso nos ayudó en [impacto].\" RECONOCIMIENTO SKIP-LEVEL (opcional): También puedo reconocer a Coordinadores de Calidad (N3). Condición: Coordinado con el Jefe de Calidad antes de nombrar."
          }
        ],
        "phrases": [
          "\"Antes de seguir, quiero mencionar a [nombre]. Vi [conducta específica] cuando [situación]. Eso sumó mucho en [impacto].\"",
          "\"Si tuviera que poner un ejemplo de Cultiva en acción, sería [nombre] cuando [situación].\""
        ],
        "no": [
          "Reconocimiento vago: \"buen trabajo\" o \"todos lo hicieron bien\".",
          "Reconocer siempre a los mismos.",
          "Hacerlo en privado cuando merece ser público (o viceversa).",
          "Hacerlo con excesiva frecuencia — pierde sinceridad."
        ],
        "note": "RECONOCIMIENTO SKIP-LEVEL (opcional): También puedo reconocer a Coordinadores de Calidad (N3). Condición: Coordinado con el Jefe de Calidad antes de nombrar.",
        "context": {
          "freq": "1 vez al mes",
          "when": "3 min",
          "place": "Reunión de equipo o mensaje grupal"
        },
        "registro": {
          "soporte": "Registro",
          "fields": [
            {
              "k": "persona",
              "l": "Persona reconocida",
              "t": "person"
            },
            {
              "k": "conducta",
              "l": "Conducta",
              "t": "area"
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
        "title": "Acompañamiento 1 a 1",
        "freq": "1 vez al mes",
        "purpose": "Desarrollar al Coordinador sobre el conflicto real del rol: fiscalizar sin generar conflicto innecesario con operaciones. Recomendación: Desarrollar al Coordinador sobre el conflicto real del rol: fiscalizar sin generar conflicto innecesario con operaciones.",
        "context": {
          "freq": "1 vez al mes",
          "when": "Momento no operativo con el Coordinador de Calidad",
          "place": ""
        },
        "steps": [
          {
            "k": "Observo",
            "t": "cómo el colaborador maneja la fricción con operaciones, no solo el resultado técnico."
          },
          {
            "k": "Identifico",
            "t": "una conducta observada para corregir o potenciar."
          },
          {
            "k": "Me acerco",
            "t": "con apertura neutra: \"Oye, ¿cómo fue ese momento con el supervisor de campo?\""
          },
          {
            "k": "Abro",
            "t": "con SCI — \"Vi que [conducta] cuando [situación de fricción]. Eso generó [impacto]. ¿Cómo lo ves tú?\" IMPULSO — Pregunto qué podría hacer para mejorar o llevar esa fortaleza al siguiente nivel. ACORDAMOS — Definimos una acción concreta para poner en práctica."
          },
          {
            "k": "Cierro",
            "t": "con reconocimiento por el compromiso."
          },
          {
            "k": "Vuelvo",
            "t": "cuando se haya cumplido la fecha de seguimiento: \"¿Cómo te resultó lo que acordamos?\""
          }
        ],
        "phrases": [
          "\"Vi que [conducta] cuando [situación de fricción]. Eso generó [impacto]. ¿Cómo lo ves tú?\"",
          "“Lo que mejor vi este mes fue cómo manejaste [situación específica] y que generó [impacto]. Quiero que sepas que lo registré.”",
          "\"Hablemos de cómo manejaste el roce con operaciones, no del resultado del muestreo.\"",
          "\"Sostener esa conversación sin escalar el conflicto fue clave. Lo vi.\"",
          "\"¿Qué necesitas de mí para que esa fricción no te consuma?\""
        ],
        "no": [
          "Enmarcar el acompañamiento solo en el resultado técnico.",
          "Dar la solución — es desarrollo, no instrucción.",
          "Irse sin un acuerdo concreto.",
          "No volver a preguntar sobre el acuerdo."
        ],
        "registro": {
          "soporte": "Tarjeta Acompañamiento 1 a 1",
          "fields": [
            {
              "k": "persona",
              "l": "Persona",
              "t": "person"
            },
            {
              "k": "situacion",
              "l": "Situación de fricción",
              "t": "area"
            },
            {
              "k": "acuerdo",
              "l": "Acuerdo",
              "t": "area"
            },
            {
              "k": "fecha",
              "l": "Fecha de seguimiento",
              "t": "date"
            }
          ]
        }
      },
      {
        "id": "espacio-de-confianza",
        "kind": "full",
        "dimension": "escucha",
        "icon": "ear",
        "title": "Espacio de confianza",
        "freq": "Semanal",
        "purpose": "Recoger inquietudes antes de que se conviertan en problemas, fomentar la comunicación, cercanía y espacios seguros.",
        "context": {
          "when": "en espacios ya programados o existentes con tus reportes directos"
        },
        "steps": [
          {
            "k": "Abro",
            "t": "\"¿Algo que necesiten que escuche antes de empezar?\""
          },
          {
            "k": "Espero",
            "t": "20-30 segundos en silencio; la gente no responde de inmediato."
          },
          {
            "k": "Escucho",
            "t": "Sin interrumpir. Si nadie habla: \"¿Cómo vienen hoy?\""
          },
          {
            "k": "Registro",
            "t": "(vía app): Registro el tema y su contexto. ( 5. ACTÚO: Para cada tema, elijo una opción: • Si puedo resolverlo: defino la acción y establezco la urgencia (Hoy / Esta semana). • Si no puedo resolverlo: marco \"No resuelvo yo\", agradezco que lo haya compartido, reconozco la importancia del tema y le brindo una orientación sobre qué podría hacer."
          },
          {
            "k": "Doy cierre",
            "t": "Al día siquiente: \"Ayer [nombre] planteó [tema]. [Lo resolví / esta es la actualización].\""
          }
        ],
        "phrases": [
          "\"¿Cómo viene la semana? ¿Algo antes de arrancar?\"",
          "\"Ese tema lo resuelvo yo. Te confirmo el viernes.\"",
          "\"Eso no está en mis manos. Lo escalo a mi jefe — vuelvo con respuesta.\"",
          "\"La semana pasada [nombre] planteó [tema]. Así quedó.\""
        ],
        "no": [
          "Convertir el espacio en un reporte técnico del día.",
          "Escalar a mi jefe sin haber intentado resolverlo primero.",
          "No devolver la respuesta a quien lo trajo."
        ],
        "registro": {
          "soporte": "Registro vía app",
          "fields": [
            {
              "k": "contexto",
              "l": "Contexto del tema",
              "t": "area"
            },
            {
              "k": "tipo",
              "l": "Tipo",
              "t": "sel",
              "o": [
                "Operativo",
                "Cultural"
              ]
            },
            {
              "k": "urgencia",
              "l": "Urgencia",
              "t": "sel",
              "o": [
                "Hoy",
                "Esta semana"
              ]
            },
            {
              "k": "mi",
              "l": "Mi jefe recibe el tema con mi contexto — no tiene que pedirlo.",
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
        "title": "Revisión de escaladas",
        "freq": "Diario",
        "from": "Coordinador de Calidad",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por el Coordinador.",
        "purpose": "Primer nivel de visión consolidada — detectar patrones e intervenir lo que N3 no puede resolver.",
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
            "t": "a mi jefe con mi análisis del patrón — no solo el listado de temas."
          }
        ],
        "phrases": [
          "\"Este tema lleva 3 días sin respuesta — lo tomo yo.\"",
          "\"Veo que el tema X aparece en varios sectores esta semana. Eso no es operativo — es estructural.\"",
          "\"Le comunico al N1 el patrón, no el incidente.\""
        ],
        "no": [
          "Revisar el panel solo cuando algo explota.",
          "Escalar al N1 sin haber identificado el patrón.",
          "Dejar que el panel se convierta en archivo muerto."
        ],
        "context": {
          "freq": "Diario",
          "when": "Al cierre del día"
        }
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "graduation-cap",
        "title": "Reconocimiento Sincero",
        "freq": "1 vez al mes",
        "purpose": "Hacer visible quién está modelando Cultiva de manera oportuna.",
        "context": {
          "freq": "1 vez al mes",
          "when": "3 min",
          "place": "Reunión de equipo"
        },
        "steps": [
          {
            "k": "Observo",
            "t": "conscientemente a los Coordinadores de Calidad que destaquen en conducta o rendimiento durante el período."
          },
          {
            "k": "Anoto",
            "t": "la conducta específica y el impacto que tuvo para el equipo o la operación."
          },
          {
            "k": "Nombro",
            "t": "en el momento oportuno frente al grupo: \"[Nombre], te agradezco por [conducta] — eso nos ayudó en [impacto].\" RECONOCIMIENTO SKIP-LEVEL (opcional): También puedo reconocer a Supervisores de Calidad (N4). Condición: Coordinado con el Coordinador de Calidad correspondiente."
          }
        ],
        "phrases": [
          "\"Antes de seguir, quiero mencionar a [nombre]. Vi [conducta específica] cuando [situación]. Eso sumó mucho en [impacto].\"",
          "\"Si tuviera que poner un ejemplo de Cultiva en acción, sería [nombre] cuando [situación].\""
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
              "l": "Persona reconocida",
              "t": "person"
            },
            {
              "k": "conducta",
              "l": "Conducta",
              "t": "area"
            },
            {
              "k": "impacto",
              "l": "Impacto",
              "t": "area"
            }
          ]
        },
        "note": "RECONOCIMIENTO SKIP-LEVEL (opcional): También puedo reconocer a Supervisores de Calidad (N4). Condición: Coordinado con el Coordinador de Calidad correspondiente."
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
        "title": "Acompañamiento 1 a 1",
        "freq": "1 vez al mes por Supervisor",
        "purpose": "Desarrollar al Supervisor sobre cómo manejar la fricción con operaciones sin perder el estándar.",
        "context": {
          "freq": "1 vez al mes por Supervisor",
          "when": "15-25 min",
          "place": "En terreno durante la jornada"
        },
        "steps": [
          {
            "k": "Observo",
            "t": "cómo el colaborador maneja la fricción con operaciones/cosecha, no solo el resultado técnico."
          },
          {
            "k": "Identifico",
            "t": "una conducta observada para corregir o potenciar."
          },
          {
            "k": "Comparto",
            "t": "\"Observé que [conducta] cuando [situación]. Esto generó [impacto]. ¿Cómo lo ves tú?\""
          },
          {
            "k": "Escucho",
            "t": "2 minutos sin interrumpir."
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
            "t": "con reconocimiento por el compromiso."
          },
          {
            "k": "Vuelvo",
            "t": "cuando se haya cumplido la fecha de seguimiento: \"¿Cómo te resultó lo que acordamos?\""
          }
        ],
        "phrases": [
          "\"Vi que [conducta] cuando [situación de fricción]. Eso generó [impacto]. ¿Cómo lo ves tú?\"",
          "“Lo que mejor vi este mes fue cómo manejaste [situación específica] y que generó [impacto]. Quiero que sepas que lo registré.”",
          "\"Hablemos de cómo manejaste el roce con operaciones, no del resultado del muestreo.\"",
          "\"Sostener esa conversación sin escalar el conflicto fue clave. Lo vi.\"",
          "\"¿Qué necesitas de mí para que esa fricción no te consuma?\""
        ],
        "no": [
          "Enmarcar el acompañamiento solo en el resultado técnico.",
          "Dar la solución — es desarrollo, no instrucción.",
          "Irse sin un acuerdo concreto.",
          "No volver a preguntar sobre el acuerdo."
        ],
        "registro": {
          "soporte": "Tarjeta Acompañamiento 1 a 1",
          "fields": [
            {
              "k": "persona",
              "l": "Persona",
              "t": "person"
            },
            {
              "k": "situacion",
              "l": "Situación de fricción",
              "t": "area"
            },
            {
              "k": "acuerdo",
              "l": "Acuerdo",
              "t": "area"
            },
            {
              "k": "fecha",
              "l": "Fecha de seguimiento",
              "t": "date"
            }
          ]
        }
      },
      {
        "id": "espacio-de-confianza",
        "kind": "full",
        "dimension": "escucha",
        "icon": "ear",
        "title": "Espacio de confianza",
        "freq": "Semanal",
        "purpose": "Recoger inquietudes antes de que se conviertan en problemas, fomentar la comunicación, cercanía y espacios seguros.",
        "context": {
          "when": "en espacios ya programados o existentes con tus reportes directos"
        },
        "steps": [
          {
            "k": "Abro",
            "t": "\"Cómo están?\" \"¿Algo que necesiten conversar antes de empezar?\""
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
            "k": "Resuelvo",
            "t": "fomentando confianza y apertura"
          },
          {
            "k": "Registro",
            "t": "vía app: escribo contexto +  establenzco Urgencia (Hoy / Esta semana)."
          },
          {
            "k": "Doy cierre",
            "t": "al día siguiente: \"Ayer [nombre] planteó [tema]. [Lo resolví / llega el día X].\" También puedes aplicarlo 1:1 — en privado la persona se abre más."
          }
        ],
        "phrases": [
          "\"¿Cómo viene la semana? ¿Algo que necesite saber?\"",
          "\"Ese tema lo veo yo — te aviso mañana.\"",
          "\"Eso no está en mis manos. Lo escalo a mi jefe — vuelvo esta semana.\"",
          "\"El lunes [nombre] planteó [tema]. Así quedó.\""
        ],
        "no": [
          "Prometer a tu equipo lo que no puedes cumplir.",
          "Escalar a mi jefe sin contexto — no puede actuar sobre algo que no entiende.",
          "No cerrar el loop con quien lo trajo."
        ],
        "registro": {
          "soporte": "Registro vía app",
          "fields": [
            {
              "k": "contexto",
              "l": "Contexto del tema",
              "t": "area"
            },
            {
              "k": "tipo",
              "l": "Tipo",
              "t": "sel",
              "o": [
                "Operativo",
                "Cultural"
              ]
            },
            {
              "k": "urgencia",
              "l": "Urgencia",
              "t": "sel",
              "o": [
                "Hoy",
                "Esta semana"
              ]
            },
            {
              "k": "mi",
              "l": "Mi jefe recibe el tema con mi criterio ya agregado.",
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
        "title": "Revisión de escaladas",
        "freq": "Diario",
        "from": "Supervisores de Calidad",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Supervisores de Calidad.",
        "purpose": "Que el Supervisor/TAC sepa que escalar tiene sentido — respuesta en menos de 48 horas.",
        "steps": [
          {
            "k": "Recibo",
            "t": "las escaladas del día — ya clasificadas por Tipo y Urgencia."
          },
          {
            "k": "Decido",
            "t": "con un toque para cada tema: Resuelvo yo · En proceso · Escalo a mi jefe."
          },
          {
            "k": "Respondo",
            "t": "si resuelvo, actúo y registro la respuesta (el N4 recibe notificación automática)."
          },
          {
            "k": "Escalo",
            "t": "a mi jefe con criterio: el tema sube con mi decisión y contexto adicional."
          },
          {
            "k": "Cierro",
            "t": "ningún tema queda sin destino más de 48 horas."
          }
        ],
        "phrases": [
          "\"Tu tema lo revisé. Lo resuelvo yo — te confirmo mañana.\"",
          "\"Lo escalé arriba. Tendrás respuesta el [día].\"",
          "\"Queda en proceso — necesito [dato]. Dame hasta [fecha].\""
        ],
        "no": [
          "Dejar temas sin decisión más de 48 horas.",
          "Escalar sin agregar tu propio criterio.",
          "Silencio — destruye la confianza en el sistema."
        ],
        "context": {
          "freq": "Diario",
          "when": "Al cierre del día"
        }
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "graduation-cap",
        "title": "Reconocimiento Sincero",
        "freq": "1 vez al mes",
        "purpose": "Hacer visible quién está modelando Cultiva de manera oportuna.",
        "context": {
          "freq": "1 vez al mes",
          "when": "3 min",
          "place": "Reunión de equipo"
        },
        "steps": [
          {
            "k": "Observo",
            "t": "conscientemente a los Supervisores de Calidad que destaquen en conducta o rendimiento durante el período."
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
          "\"Antes de seguir, quiero mencionar a [nombre]. Vi [conducta específica] cuando [situación]. Eso sumó mucho en [impacto].\"",
          "\"Si tuviera que poner un ejemplo de Cultiva en acción, sería [nombre] cuando [situación].\""
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
              "l": "Supervisor reconocido",
              "t": "person"
            },
            {
              "k": "conducta",
              "l": "Conducta",
              "t": "area"
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
        "freq": "Diario",
        "reminder": "Al inicio del día no olvides saludar a tu equipo con energía para iniciar bien la jornada.",
        "hasDone": true,
        "purpose": "Al inicio del día no olvides saludar a tu equipo con energía para iniciar bien la jornada.",
        "context": {
          "freq": "Diario",
          "when": "Inicio de jornada"
        },
        "registro": {
          "hidden": true
        }
      },
      {
        "id": "coaching-en-terreno",
        "kind": "full",
        "dimension": "lidera",
        "icon": "compass",
        "title": "Acompañamiento 1 a 1",
        "freq": "2 veces por semana",
        "purpose": "Desarrollar al TAC sobre cómo llegar al área como aliado — no como inspector.",
        "context": {
          "freq": "2 veces por semana",
          "when": "15-25 min",
          "place": "En terreno durante la jornada"
        },
        "steps": [
          {
            "k": "Observo",
            "t": "cómo el colaborador maneja la fricción con operaciones/cosecha, no solo el resultado técnico."
          },
          {
            "k": "Me acerco",
            "t": "con apertura neutra: \"Oye, ¿cómo fue ese momento con el supervisor de campo/planta?\""
          },
          {
            "k": "Abro",
            "t": "con SCI — \"Vi que [conducta] cuando [situación de fricción]. Eso generó [impacto]. ¿Cómo lo ves tú?\""
          },
          {
            "k": "Pregunto",
            "t": "¿qué haría distinto en una próxima situación similar?"
          },
          {
            "k": "Acordamos",
            "t": "una sola cosa concreta para la próxima vez."
          },
          {
            "k": "Cierro",
            "t": "con reconocimiento por el compromiso."
          },
          {
            "k": "Vuelvo",
            "t": "después de la próxima situación de fricción."
          }
        ],
        "phrases": [
          "\"Vi que [conducta] cuando llegaste al área. Eso generó [impacto]. ¿Cómo lo ves tú?\"",
          "“Lo que mejor vi este mes fue cómo manejaste [situación específica] y que generó [impacto]. Quiero que sepas que lo registré.”",
          "\"Hablemos de cómo llegaste al área, no del resultado del muestreo.\"",
          "\"La forma como abriste esa conversación marcó la diferencia. Lo vi.\""
        ],
        "no": [
          "Enmarcar el acompañamiento solo en el resultado técnico.",
          "Dar la solución — es desarrollo, no instrucción.",
          "Irse sin un acuerdo concreto.",
          "No volver a preguntar sobre el acuerdo."
        ],
        "registro": {
          "soporte": "Tarjeta Acompañamiento 1 a 1",
          "fields": [
            {
              "k": "persona",
              "l": "Persona",
              "t": "person"
            },
            {
              "k": "situacion",
              "l": "Situación de fricción",
              "t": "area"
            },
            {
              "k": "acuerdo",
              "l": "Acuerdo",
              "t": "area"
            },
            {
              "k": "fecha",
              "l": "Fecha de seguimiento",
              "t": "date"
            }
          ]
        }
      },
      {
        "id": "espacio-de-confianza",
        "kind": "full",
        "dimension": "escucha",
        "icon": "ear",
        "title": "Espacio de confianza",
        "freq": "Diario (ambos turnos)",
        "purpose": "Recoger inquietudes antes de que se conviertan en problemas — y escalar con criterio.",
        "context": {
          "when": "Al inicio de turno",
          "place": "Post-charla operativa"
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
            "k": "Registro",
            "t": "vía app: escribo contexto +  establenzco Urgencia (Hoy / Esta semana)."
          },
          {
            "k": "Doy cierre",
            "t": "al día siguiente: \"Ayer [nombre] planteó [tema]. [Lo resolví / llega el día X].\" También puedes aplicarlo 1:1 — en privado la persona se abre más."
          }
        ],
        "phrases": [
          "\"Antes de arrancar, ¿algo que necesiten que sepa o que tenga que escalar?\"",
          "\"Ese tema lo resuelvo yo en este turno. Te aviso antes del cierre.\"",
          "\"No está en mis manos. Lo subo ahora — mañana te traigo respuesta.\"",
          "\"Ayer [nombre] planteó [tema]. Lo resolví / llega el [día].\""
        ],
        "no": [
          "Prometer lo que no puedes cumplir.",
          "Escalar sin escribir contexto suficiente — el superior no puede actuar sobre algo que no entiende.",
          "No cerrar el loop al día siguiente con quien habló."
        ],
        "registro": {
          "soporte": "Escalada vía app",
          "fields": [
            {
              "k": "2",
              "l": "2 líneas de contexto",
              "t": "area"
            },
            {
              "k": "tipo",
              "l": "Tipo",
              "t": "sel",
              "o": [
                "Operativo",
                "Cultural"
              ]
            },
            {
              "k": "urgencia",
              "l": "Urgencia",
              "t": "sel",
              "o": [
                "Hoy",
                "Esta semana"
              ]
            }
          ]
        }
      },
      {
        "id": "revisar-escaladas-diarias",
        "kind": "escaladas",
        "dimension": "escucha",
        "icon": "inbox",
        "title": "Revisión de escaladas",
        "freq": "Diario",
        "from": "Técnicos TAC",
        "reminder": "Al cierre del día, sentarse a revisar los temas escalados por los Técnicos TAC.",
        "purpose": "Que el TAC sepa que escalar tiene sentido — respuesta en menos de 48 horas.",
        "steps": [
          {
            "k": "Recibo",
            "t": "las escaladas del día — ya clasificadas por Tipo y Urgencia."
          },
          {
            "k": "Decido",
            "t": "con un toque para cada tema: Resuelvo yo · En proceso · Escalo a mi jefe."
          },
          {
            "k": "Respondo",
            "t": "si resuelvo, actúo y registro la respuesta"
          },
          {
            "k": "Escalo",
            "t": "a mi jefe con criterio: el tema sube con mi decisión y contexto adicional."
          },
          {
            "k": "Cierro",
            "t": "ningún tema queda sin destino más de 48 horas."
          }
        ],
        "phrases": [
          "\"Tu tema lo revisé. Lo resuelvo yo — te confirmo mañana.\"",
          "\"Lo escalé arriba. Tendrás respuesta el [día].\"",
          "\"Queda en proceso — necesito [dato]. Dame hasta [fecha].\""
        ],
        "no": [
          "Dejar temas sin decisión más de 48 horas.",
          "Escalar sin agregar tu propio criterio.",
          "Silencio — destruye la confianza en el sistema."
        ],
        "context": {
          "freq": "Diario",
          "when": "Al cierre del día"
        }
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "graduation-cap",
        "title": "Reconocimiento Sincero",
        "freq": "1 vez por semana",
        "purpose": "Hacer visible quién mejoró su relacionamiento con operaciones — la conducta, no el logro técnico.",
        "context": {
          "freq": "1 vez por semana",
          "when": "10 min",
          "place": "Reunión de equipo o canal del equipo"
        },
        "steps": [
          {
            "k": "Identifico",
            "t": "a fin de mes 1-2 personas que destacaron en su forma de relacionarse con operaciones (conducta, no resultado técnico)."
          },
          {
            "k": "Elijo",
            "t": "el espacio más adecuado para mencionarlo."
          },
          {
            "k": "Nombro",
            "t": "la conducta y el impacto: \"[Nombre], vi cómo llegaste al área [día]. Eso cambia el ambiente y hace que el trabajo sea mejor para todos.\""
          }
        ],
        "phrases": [
          "\"Quiero reconocer a [nombre]. Vi cómo manejaste ese momento con operaciones. Eso es Cultiva en acción.\"",
          "\"Si tuviera que poner un ejemplo de cómo se llega como aliado, sería [nombre] cuando [situación].\""
        ],
        "no": [
          "Reconocer solo por el % de calidad — eso es resultado, no conducta Cultiva.",
          "Reconocimiento genérico.",
          "Saltárselo un mes."
        ],
        "registro": {
          "soporte": "Registro de reconocimiento",
          "fields": [
            {
              "k": "persona",
              "l": "TAC reconocido",
              "t": "person"
            },
            {
              "k": "conducta",
              "l": "Conducta en relación con operaciones",
              "t": "area"
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
        "reminder": "Al cierre del turno (ambos) no olvides agradecer a tu equipo por el esfuerzo realizado.",
        "hasDone": true,
        "purpose": "Al cierre de la jornada no olvides agradecer a tu equipo por el esfuerzo realizado.",
        "context": {
          "freq": "Diario",
          "when": "Cierre de jornada"
        },
        "registro": {
          "hidden": true
        }
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
        "freq": "Diario",
        "purpose": "Llegar al área como aliado — compartir los criterios del día antes de fiscalizar.",
        "context": {
          "freq": "Diario",
          "when": "Al llegar al área a evaluar"
        },
        "steps": [
          {
            "k": "Me presento",
            "t": "saludando al equipo y pidiendo unos minutos de atención."
          },
          {
            "k": "Comparto",
            "t": "el objetivo del día y los criterios clave — máximo 2-3 puntos, en tono de apoyo."
          },
          {
            "k": "Pregunto",
            "t": "si hay algo del área que deba saber antes de empezar."
          },
          {
            "k": "Inicio",
            "t": "la fiscalización con presencia, no con distancia."
          }
        ],
        "phrases": [
          "\"Buenos días equipo, permítanme unos minutos para compartir los puntos clave de hoy.\"",
          "\"¿Hay algo del área que deba saber antes de empezar?\"",
          "\"No vengo a buscar errores, vengo a que salgamos bien juntos.\""
        ],
        "no": [
          "Empezar a evaluar sin presentarse — genera emboscada.",
          "Reportar al área antes de avisarle a la persona directamente.",
          "Llegar con tono de inspector.",
          "Dar más de 3 criterios de golpe."
        ],
        "registro": {
          "hidden": true
        }
      },
      {
        "id": "escucho-para-ayudar",
        "kind": "full",
        "dimension": "escucha",
        "icon": "ear",
        "title": "Espacio de confianza",
        "freq": "Diario",
        "purpose": "Escuchar al equipo para entender y apoyar — no para reportar.",
        "context": {
          "freq": "Diario",
          "when": "Durante la jornada"
        },
        "steps": [
          {
            "k": "Monitoreo",
            "t": "el proceso del grupo asignado."
          },
          {
            "k": "Comunico",
            "t": "los resultados al líder en tono cercano, no confrontativo."
          },
          {
            "k": "Escucho",
            "t": "el descargo o comentarios sin interrumpir."
          },
          {
            "k": "Ofrezco",
            "t": "recomendaciones — dejo que el líder decida."
          }
        ],
        "phrases": [
          "\"Te comparto el resultado para que estemos alineados.\"",
          "\"Quiero apoyarte para que mejoremos esto juntos.\"",
          "\"¿Qué crees que está afectando este resultado?\"",
          "\"¿Qué necesitas de mí para mejorar?\""
        ],
        "no": [
          "Comunicar los resultados de forma acusatoria.",
          "No escuchar el descargo del líder.",
          "Enfocarse solo en el % sin pensar en cómo mejorar.",
          "Registrar datos incompletos."
        ],
        "registro": {
          "soporte": "Registro de calidad en campo",
          "autoBroadcast": {
            "temaFijo": "Calidad en campo",
            "detalle": "problematica"
          },
          "fields": [
            {
              "k": "problematica",
              "l": "Problemática identificada",
              "t": "area",
              "req": true
            },
            {
              "k": "accion",
              "l": "Acción correctiva",
              "t": "area"
            }
          ]
        }
      },
      {
        "id": "reconocimiento",
        "kind": "full",
        "dimension": "valora",
        "icon": "thumbs-up",
        "title": "Reconocimiento Sincero",
        "freq": "Según lo amerite · mín. 1 vez/semana · Opción diferida al día siguiente",
        "purpose": "Reconocer las mejoras del equipo para reforzar buenas prácticas — lo que se nombra se repite.",
        "context": {
          "freq": "Según lo amerite · mín. 1 vez/semana · Opción diferida al día siguiente",
          "when": "En grupo o 1:1",
          "place": "Al inicio o al cierre"
        },
        "steps": [
          {
            "k": "Observo",
            "t": "durante la jornada 1-2 personas que destaquen."
          },
          {
            "k": "Anoto",
            "t": "la conducta específica (no 'rinde bien' sino 'mantuvo calidad en jaba 5 del lote')."
          },
          {
            "k": "Digo",
            "t": "en el momento si es oportuno; si no, al día siguiente: \"Ayer [nombre] [conducta]. Eso es lo que necesitamos.\""
          }
        ],
        "phrases": [
          "\"Hoy [nombre] [conducta específica]. Gracias. Mañana lo cuento al equipo.\"",
          "\"Buenos días. Antes de empezar, ayer [nombre] [conducta]. Eso es lo que necesitamos.\""
        ],
        "no": [
          "Reconocimiento vago: \"buen trabajo\".",
          "Reconocer solo cuando hay grandes resultados.",
          "Olvidar el reconocimiento diferido — rompe la promesa."
        ],
        "registro": {
          "soporte": "Agenda Cultiva — Reconocimiento diario",
          "fields": [
            {
              "k": "persona",
              "l": "Trabajador",
              "t": "person"
            },
            {
              "k": "conducta",
              "l": "Conducta observable",
              "t": "area"
            },
            {
              "k": "flag",
              "l": "Colilla entregada",
              "t": "bool"
            }
          ]
        }
      }
    ]
  }

});

/* índice área → perfiles (extiende el de data-cosecha.js)
   Nota: N1 de Calidad NO se incluye (no participa del ejercicio). */
window.PROFILES_BY_AREA.calidad =
  ["cal-n1", "cal-n2", "cal-n3", "cal-n4", "cal-tac"].map(function (id) { return window.PROFILES[id]; });

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
