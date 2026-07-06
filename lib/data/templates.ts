import type { TemplateDoc } from "@/lib/types";

// Document templates — content VERBATIM from conecta-os/ (pl-cm.html, pl-cx.html).
// CM (entregables) + CX (client communication C01–C10).

export const TEMPLATES_CM: TemplateDoc[] = [
  {
    code: "CM.P01.E01",
    title: "Checklist de Entrada de Fabricante",
    domain: "CM",
    blocks: [
      {
        type: "fields",
        rows: [
          { label: "Fabricante / Producto", value: "" },
          { label: "Tipo", value: "☐ Externo   ☐ Interno (subsidiaria)" },
          { label: "Evaluación F0 — Fit", value: "☐ High-tech top   ☐ Blue ocean   ☐ Aplicable a sector financiero MX   ☐ Margen 15–30% viable   ☐ No canibaliza líneas existentes" },
          { label: "Decisión F0", value: "☐ GO   ☐ NO-GO · Aprobó (CEO): ________ · Fecha: ________ · Racional:" },
        ],
      },
      {
        type: "table",
        headers: ["Material exigido al fabricante", "Recibido", "Calidad OK", "Notas"],
        rows: [
          ["Ficha técnica completa (arquitectura, integraciones, limitaciones)", "☐", "☐", ""],
          ["Material de capacitación técnica + sandbox/demo + certificaciones", "☐", "☐", ""],
          ["Material de ventas: battlecards, positioning, casos de éxito, objeciones", "☐", "☐", ""],
          ["Pricing y licenciamiento (descuentos por volumen, margen Conecta)", "☐", "☐", ""],
          ["Proceso de soporte y escalación (SLAs, contactos, RMA)", "☐", "☐", ""],
          ["Requisitos regulatorios sector financiero MX (CNBV, Banxico, PCI, FIPS)", "☐", "☐", ""],
          ["Perfil de cliente ideal (ICP) y triggers de compra", "☐", "☐", ""],
          ["Lista de competidores y diferenciadores", "☐", "☐", ""],
        ],
      },
      { type: "callout", tag: "Gate", text: "8/8 recibidos y con calidad OK antes de pasar a Fase 2. Sin excepciones por ser subsidiaria." },
    ],
  },
  {
    code: "CM.P01.E02",
    title: 'Assessment de Certificación "Listo para Vender"',
    domain: "CM",
    blocks: [
      { type: "fields", rows: [
        { label: "Vendedor / Rol", value: "" },
        { label: "Línea / Producto / Versión", value: "" },
        { label: "Evaluador", value: "" },
      ]},
      { type: "table", headers: ["Prueba", "Criterio de aprobación", "Puntos", "Resultado"], rows: [
        ["Pitch de 2 minutos", "Explica qué es, para quién, y el diferenciador — sin leer", "25", ""],
        ["Manejo de objeciones", "Responde las 3 objeciones más comunes de la línea con la respuesta del playbook", "25", ""],
        ["Pricing básico", "Arma una cotización de escenario típico sin ayuda, dentro de la matriz de descuentos", "25", ""],
        ["Conocimiento técnico-regulatorio", "10 preguntas (arquitectura, límites, compliance CNBV/Banxico/FIPS aplicable)", "25", ""],
        ["Total (mínimo 80 para aprobar)", "", "100", ""],
      ]},
      { type: "note", text: "Resultado: ☐ Certificado (vigencia 6 meses o hasta versión mayor) · ☐ Re-capacitar y reevaluar en 2 semanas" },
    ],
  },
  {
    code: "CM.P01.E03",
    title: "Informe de Deployment en Sandbox",
    domain: "CM",
    blocks: [{ type: "fields", rows: [
      { label: "Producto / Versión", value: "" },
      { label: "Ingeniero", value: "" },
      { label: "Alcance desplegado", value: "" },
      { label: "Pasos ejecutados (adjuntar runbook)", value: "" },
      { label: "Lo que la ficha técnica dice vs lo que encontramos", value: "" },
      { label: "Limitaciones / riesgos detectados", value: "" },
      { label: "Esfuerzo real de deployment (horas)", value: "" },
      { label: "Insumos para battlecard (fortalezas/debilidades reales)", value: "" },
    ]}],
  },
  {
    code: "CM.P02.E01",
    title: "Ficha ICP por Línea",
    domain: "CM",
    blocks: [{ type: "fields", rows: [
      { label: "Línea", value: "☐ Thales ☐ Tesseract ☐ Hermes ☐ GCP" },
      { label: "Tipo de institución", value: "☐ Banco ☐ SOFOM ☐ SOFIPO ☐ Fintech ☐ Aseguradora ☐ Casa de bolsa ☐ Cooperativa" },
      { label: "Tamaño / criterios de fit", value: "" },
      { label: "Dolor que resolvemos", value: "" },
      { label: "Triggers de compra", value: "☐ Deadline regulatorio ☐ Renovación con competidor ☐ Proyecto nuevo ☐ Incidente de seguridad ☐ Presupuesto anual" },
      { label: "Personas compradoras (cargos)", value: "" },
      { label: "Competidores en la cuenta típica", value: "" },
      { label: "Cuentas tier 1 (nombradas, ≥ 20)", value: "" },
    ]}],
  },
  {
    code: "CM.P02.E02",
    title: "Secuencia de Contacto Outbound",
    domain: "CM",
    blocks: [{ type: "table", headers: ["Día", "Canal", "Mensaje (estructura)"], rows: [
      ["1", "Email", "Trigger de la cuenta en línea 1 + dolor + credencial de 1 línea + CTA de reunión de 20 min"],
      ["3", "LinkedIn", "Conexión con nota corta referenciando el email"],
      ["7", "Llamada + voicemail", "Guion: trigger, valor, propuesta de horario"],
      ["14", "Email de valor", "Contenido relevante de MK (reporte, framework) — sin pedir nada"],
      ["21", "Email de cierre", '"Cierro el tema por ahora" + puerta abierta + trigger futuro'],
      ["—", "Fin", "Sin respuesta → archivar con motivo, reciclar en 6 meses"],
    ]}],
  },
  {
    code: "CM.P03.E01",
    title: "Nota de Reunión CRM (formato mínimo)",
    domain: "CM",
    blocks: [{ type: "callout", tag: "Se captura en HubSpot el mismo día. 3 bullets bastan.", text: "QUÉ PASÓ: [resumen en 1–2 líneas: quiénes, tema, tono]\nQUÉ SE ACORDÓ: [decisiones, compromisos de cada parte]\nNEXT STEP: [acción concreta] — Dueño: [nombre] — Fecha: [dd/mm] → crear task en HubSpot\nRIESGOS/SEÑALES (opcional): [competencia mencionada, cambio de interlocutor, dudas de presupuesto]" }],
  },
  {
    code: "CM.P03.E02",
    title: "Acta de Pipeline Review Semanal",
    domain: "CM",
    blocks: [{ type: "fields", rows: [
      { label: "Fecha / Asistentes", value: "" },
      { label: "1. Cierres comprometidos del mes", value: "[deal — monto — fecha — % confianza — bloqueo]" },
      { label: "2. Cambios de stage de la semana", value: "[deal — de → a — evidencia del criterio de salida]" },
      { label: "3. Early warnings atendidos", value: "[deal — alerta — decisión: reactivar / reprogramar / matar]" },
      { label: "4. Deals nuevos (SQL)", value: "[deal — línea — monto — BANT-F]" },
      { label: "5. Bloqueos que se escalan", value: "[bloqueo — a quién — para cuándo]" },
      { label: "Next steps", value: "[acción — dueño — fecha]" },
    ]}],
  },
  {
    code: "CM.P03.E03",
    title: "Forecast Mensual",
    domain: "CM",
    blocks: [{ type: "table", headers: ["Categoría", "Deals", "Monto MXN", "Criterio"], rows: [
      ["Commit", "", "", "≥ 80% y fecha comprometida por el cliente"],
      ["Best case", "", "", "Upside con camino claro de cierre en el mes"],
      ["Ponderado total", "", "", "Σ (monto × probabilidad del stage)"],
      ["Meta del mes / gap", "", "", "Si coverage < 3x → plan de generación"],
      ["Mes anterior: commit vs real", "", "", "Precisión objetivo ± 15%"],
    ]}],
  },
  {
    code: "DL.P01.E01",
    title: "Solicitud de Preventa + Informe Demo/PoC",
    domain: "DL",
    blocks: [
      { type: "fields", rows: [
        { label: "Deal (link HubSpot) / Línea / Monto", value: "" },
        { label: "Dolor técnico del cliente", value: "" },
        { label: "Stack actual e integraciones requeridas", value: "" },
        { label: "Requisitos de compliance", value: "☐ PCI ☐ FIPS ☐ CNBV ☐ Banxico ☐ Otro:" },
        { label: "Decisor técnico (nombre/cargo)", value: "" },
        { label: "Fecha objetivo", value: "" },
      ]},
      { type: "fields", rows: [
        { label: "— SECCIÓN RESULTADO (llena preventa) —", value: "" },
        { label: "Criterios de éxito acordados con cliente", value: "" },
        { label: "Resultado demo/PoC vs criterios", value: "" },
        { label: "Veredicto", value: "☐ Viable ☐ Viable con condiciones: ________ ☐ No viable — alternativas:" },
        { label: "Arquitectura propuesta / esfuerzo estimado", value: "" },
        { label: "Supuestos y exclusiones", value: "" },
      ]},
    ],
  },
  {
    code: "CM.P04.E01",
    title: "Ficha de Revisión de Cuenta (Renovación)",
    domain: "CM",
    blocks: [{ type: "fields", rows: [
      { label: "Cuenta / Contrato / Vencimiento", value: "" },
      { label: "Health score actual (DL.P04)", value: "☐ 🟢 ☐ 🟡 ☐ 🔴" },
      { label: "Historial de tickets del período (H06)", value: "[S1: __ · S2: __ · SLA cumplido: __%]" },
      { label: "Uso real del producto", value: "" },
      { label: "Cambios en el cliente", value: "[nuevo CTO, fusión, proyecto, presupuesto]" },
      { label: "Señales de riesgo de fuga", value: "[competencia mencionada, silencio, quejas]" },
      { label: "Oportunidades de upsell/cross-sell", value: "[módulos, Tesseract HSM, CCKM, capacitación — con evidencia]" },
      { label: "Postura de pricing", value: "☐ Aumento ☐ Mantener ☐ Retención ☐ Bundle con upsell · Racional:" },
      { label: "Plan y fechas (T-75 propuesta / T-30 firma)", value: "" },
    ]}],
  },
];

// Client communication templates C01–C10 (pl-cx.html)
export const TEMPLATES_CX: TemplateDoc[] = [
  {
    code: "C01", title: "Primer contacto (outbound / MQL)", domain: "CX", usedIn: "CM.P02 · MK.P02",
    blocks: [{ type: "fields", rows: [
      { label: "Asunto", value: "[Trigger] — cómo lo están resolviendo instituciones como [su institución]" },
      { label: "Cuerpo", value: 'Hola [nombre]:\n\n[Trigger específico en 1 línea. Ej.: "Con el deadline de Banxico para SPEI 2.0 en octubre, quedan pocos meses para certificar un proveedor."]\n\nEn Conecta ayudamos a [tipo de institución] a [resultado concreto]. [1 dato propio o caso: "7 de 10 instituciones que entrevistamos aún no tienen plan."]\n\n¿Te haría sentido una llamada de 20 minutos el [día/hora] o [día/hora] para contarte cómo lo están resolviendo otros?\n\n[Firma estándar]' },
      { label: "Reglas", value: 'Máx 120 palabras · el trigger SIEMPRE en la primera línea · 2 horarios concretos · nada de "espero que te encuentres bien". MQL: referenciar la pieza que descargó.' },
    ]}],
  },
  {
    code: "C02", title: "Confirmación de reunión + agenda (24 h antes)", domain: "CX", usedIn: "Todas las reuniones con cliente",
    blocks: [{ type: "fields", rows: [
      { label: "Asunto", value: "Mañana [hora] — agenda de nuestra reunión" },
      { label: "Cuerpo", value: "Hola [nombre]:\n\nConfirmo nuestra reunión de mañana [día] a las [hora] ([liga/lugar]). Propongo esta agenda ([duración] min):\n1. [Tema 1 — ej. tu situación actual con X]\n2. [Tema 2 — ej. cómo lo resuelven instituciones similares]\n3. Siguientes pasos y tiempos\n\nPor Conecta participa[n]: [nombre, rol]. Si quieres sumar a alguien de tu equipo (p. ej. [rol sugerido]), es bienvenido.\n\n[Firma]" },
      { label: "Reglas", value: "Enviar 24 h antes, sin excepción · agenda de máximo 3 puntos · sugerir a quién invitar del lado del cliente." },
    ]}],
  },
  {
    code: "C03", title: "Minuta post-reunión (mismo día / 24 h)", domain: "CX", usedIn: "Todas las reuniones con cliente",
    blocks: [{ type: "fields", rows: [
      { label: "Asunto", value: "Resumen y acuerdos — reunión [tema] del [fecha]" },
      { label: "Cuerpo", value: "Hola [nombre]:\n\nGracias por el tiempo de hoy. Lo acordado:\n\nHablamos de: [2–3 bullets]\nAcordamos: [compromisos de cada parte]\nSiguientes pasos:\n• [Acción] — [dueño] — [fecha]\n• [Acción] — [dueño] — [fecha]\n\nSi algo no refleja lo que entendiste, dime y lo corregimos.\n\n[Firma]" },
      { label: "Reglas", value: "Mismo día (máx 24 h) · espeja la nota interna de HubSpot (CM.P03.E01) · todo next step con dueño y fecha." },
    ]}],
  },
  {
    code: "C04", title: "Envío / presentación de propuesta", domain: "CX", usedIn: "CM.P03 · FI.P01",
    blocks: [{ type: "fields", rows: [
      { label: "Asunto", value: "Propuesta Conecta — [solución] para [institución]" },
      { label: "Cuerpo", value: "Hola [nombre]:\n\nAdjunto la propuesta que revisamos hoy. Los 3 puntos clave:\n1. Qué resuelve: [dolor → resultado]\n2. Cómo: [alcance validado técnicamente en la demo/PoC del [fecha] — sin sorpresas después]\n3. Inversión y tiempos: [resumen + vigencia de la propuesta]\n\nQuedamos en [next step acordado] el [fecha]. Cualquier duda antes, estoy al [teléfono].\n\n[Firma]" },
      { label: "Reglas", value: "La propuesta SIEMPRE se presenta en reunión primero; este correo la formaliza · el alcance es EXACTAMENTE el del veredicto de preventa (DL.P01.E01)." },
    ]}],
  },
  {
    code: "C05", title: "Cierre digno (deal perdido o sin respuesta)", domain: "CX", usedIn: "CM.P03",
    blocks: [{ type: "fields", rows: [
      { label: "Asunto", value: "Cierro el tema por ahora — puerta abierta" },
      { label: "Cuerpo", value: 'Hola [nombre]:\n\nEntiendo que [decidieron otra opción / no es el momento]. Gracias por la apertura durante el proceso.\n\n[Si perdió contra competidor: "Les deseo éxito con la implementación."] Dos cosas quedan en pie:\n• Si [trigger futuro: renovación, cambio regulatorio, crecimiento] vuelve a poner el tema en la mesa, con gusto lo retomamos.\n• Seguirás recibiendo [reporte/contenido] nuestro si te es útil — si no, dime y te doy de baja.\n\nUn gusto, y quedo a una llamada de distancia.\n\n[Firma]' },
      { label: "Reglas", value: "Sin reproches ni última venta desesperada · registrar motivo en HubSpot (CM.P03 paso 7b) · programar task de reciclaje a 6 meses." },
    ]}],
  },
  {
    code: "C06", title: "Bienvenida post-firma (24 h)", domain: "CX", usedIn: "DL.P02",
    blocks: [{ type: "fields", rows: [
      { label: "Asunto", value: "Bienvenido a Conecta — esto es lo que sigue" },
      { label: "Cuerpo", value: "Hola [nombre]:\n\nGracias por la confianza. Para que sepas exactamente qué sigue:\n\n1. Esta semana: te contactará [nombre del PM], quien será tu punto de contacto durante la implementación (yo sigo presente como tu contacto comercial).\n2. Antes del [fecha ≤ 10 días]: reunión de kickoff — te llegará agenda previa.\n3. Lo que necesitaremos de tu equipo: [prerrequisitos resumidos].\n\nTodo lo que platicamos durante la venta ya está con el equipo de implementación: no tendrás que repetir nada.\n\n[Firma del vendedor]" },
      { label: "Reglas", value: 'Sale en ≤ 24 h de la firma · presenta al PM por nombre · promete (y cumple) el "no repetir nada".' },
    ]}],
  },
  {
    code: "C07", title: "Reporte semanal de proyecto", domain: "CX", usedIn: "DL.P03",
    blocks: [{ type: "fields", rows: [
      { label: "Asunto", value: "[Proyecto] — avance semana [n]: [🟢/🟡/🔴] [1 línea de estado]" },
      { label: "Cuerpo", value: "Hola [nombre]:\n\nEstado general: [🟢 en plan / 🟡 atención / 🔴 riesgo] — [1 línea]\nAvance esta semana: [2–3 bullets vs plan]\nPróxima semana: [2–3 bullets]\nRiesgos / bloqueos: [o \"ninguno\"]\nNecesitamos de tu equipo: [pendiente — dueño — fecha, o \"nada por ahora\"]\n\n[Firma del PM]" },
      { label: "Reglas", value: "MISMO día y hora cada semana, mismo formato para todos los clientes · el semáforo va en el asunto · un 🔴 nunca aparece aquí por primera vez: se avisó por teléfono antes." },
    ]}],
  },
  {
    code: "C08", title: "Ticket de soporte (confirmación / avance / cierre)", domain: "CX", usedIn: "DL.P04",
    blocks: [{ type: "fields", rows: [
      { label: "Confirmación (al abrir)", value: 'Hola [nombre]: recibimos tu reporte "[tema]" — ticket #[folio], severidad [S1–S4]. Próxima actualización: [según SLA del esquema contratado]. Lo atiende [nombre]. [Si S1: "Equipo activado; te actualizamos cada 2 horas hasta el workaround."]' },
      { label: "Avance", value: 'Ticket #[folio]: [qué se ha hecho] · [qué sigue] · próxima actualización: [hora/fecha]. [Si aplica: "Escalado al fabricante; nosotros lo perseguimos — no necesitas hacer nada."]' },
      { label: "Cierre", value: "Ticket #[folio] resuelto. Causa raíz: [1–2 líneas]. Solución: [qué se hizo]. Prevención: [si aplica]. ¿Cómo estuvo la atención? [liga CSAT 1 clic]" },
      { label: "Reglas", value: "El cliente SIEMPRE conoce folio, severidad, responsable y cuándo será la próxima actualización · el cierre siempre lleva causa raíz." },
    ]}],
  },
  {
    code: "C09", title: "Aviso de renovación (T-90)", domain: "CX", usedIn: "CM.P04",
    blocks: [{ type: "fields", rows: [
      { label: "Asunto", value: "Tu contrato [producto] vence el [fecha] — propongo revisar el año juntos" },
      { label: "Cuerpo", value: "Hola [nombre]:\n\nTu contrato de [producto/soporte] vence el [fecha]. Antes de hablar de renovación, me gustaría revisar contigo qué te dio este año:\n• [Dato de SU operación: tickets resueltos, disponibilidad, proyectos]\n• [Dato 2]\n\nPropongo una reunión de 30 min el [opción 1] o [opción 2] para revisar esto, escuchar qué necesitas del siguiente año y llevarte una propuesta clara con tiempo de sobra — sin prisas de último minuto.\n\n[Firma]" },
      { label: "Reglas", value: "Sale a T-90: la factura NUNCA es la primera noticia · lleva datos reales de la cuenta (de CM.P04.E01) · la propuesta llega antes de T-60." },
    ]}],
  },
  {
    code: "C10", title: "Invitación a QBR (revisión trimestral)", domain: "CX", usedIn: "Customer Success",
    blocks: [{ type: "fields", rows: [
      { label: "Asunto", value: "Revisión trimestral [institución] × Conecta — [trimestre]" },
      { label: "Cuerpo", value: "Hola [nombre]:\n\nToca nuestra revisión trimestral. En 45 min te presentamos:\n1. Salud del servicio: SLAs, tickets, disponibilidad del trimestre\n2. Lo que viene: roadmap de [producto] y cambios regulatorios relevantes\n3. Tus prioridades del siguiente trimestre y cómo podemos apoyar\n\n¿Te funciona el [opción 1] o [opción 2]?\n\n[Firma del CSM]" },
      { label: "Reglas", value: "1 QBR por trimestre por cuenta gestionada · siempre con datos del trimestre, nunca genérico · los hallazgos alimentan el health score y H04." },
    ]}],
  },
];
