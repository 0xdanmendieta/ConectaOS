import type { Process } from "@/lib/types";

/**
 * Process content sourced VERBATIM from the read-only conecta-os/ docs.
 * Do not reword, simplify, or reinterpret the process content.
 *
 * Header presentation fields (estado, version, ultimaActualizacion, criticidad,
 * tipo, clasificacion, dependencias, participantes) are UI chrome for the mockup
 * layout — they are not part of the source prose and are set here for display.
 */
export const PROCESSES: Process[] = [
  // ───────────────────────────────── CM.P01 ─────────────────────────────────
  {
    code: "CM.P01",
    name: "Onboarding de Fabricante",
    description:
      "De la evaluación de un fabricante a la primera venta replicable. Aplica la misma vara a fabricantes externos (Thales, Google Cloud, nuevos vendors) e internos (Tesseract, Hermes): nadie sale a vender un producto sin materiales completos y certificación aprobada.",
    domainCode: "CM",
    estado: "Activo",
    version: "v1.3",
    ultimaActualizacion: "28 abr 2025",
    criticidad: "Alta",
    tipo: "Estratégico",
    clasificacion: ["Onboarding", "Fabricantes", "Estrategia"],
    dependencias: ["CM.P02", "CM.P03", "FI.P01"],
    participantes: "Comercial, Fabricante, CRO, Operaciones, Marketing",
    ficha: {
      owner: "Head of Sales / CRO (Fase 0 aprueba el CEO)",
      trigger:
        "Decisión de evaluar un nuevo fabricante, lanzamiento de línea interna (ej. Hermes), o reactivación de línea dormida (ej. GCP)",
      inputs:
        "Propuesta de representación, materiales del fabricante, criterio de selección Conecta (high-tech, blue ocean, sector financiero mexicano)",
      outputs:
        "Acuerdo firmado, equipo certificado, campaña de prospección activa, lighthouse customer cerrado, playbook documentado",
      duracion: "Fase 0–2: 30 días · Firma → primer deal: ≤ 120 días",
      herramientas:
        "HubSpot (pipeline por línea), repositorio de materiales, sandbox del fabricante",
      metricaExito:
        "Tiempo firma → primer deal cerrado · Tasa de aprobación de certificación · Win rate primeros 3 meses",
    },
    bpmn: {
      lanes: [
        { id: "cli", label: "Cliente lighthouse", color: "yellow", interaction: true },
        { id: "dir", label: "CEO + Head of Sales", color: "orange" },
        { id: "eq", label: "Vendedor + Preventa", color: "blue" },
        { id: "fab", label: "Fabricante", color: "gray" },
      ],
      nodes: [
        { id: "s", lane: "dir", col: 0, type: "start", label: ["Candidato a", "fabricante"] },
        { id: "t1", lane: "dir", col: 1, type: "task", label: ["F0 Evaluar fit:", "blue ocean, margen,", "sector financiero"] },
        { id: "g1", lane: "dir", col: 2, type: "gateway", label: ["¿GO?"] },
        { id: "e0", lane: "fab", col: 2, type: "end", label: ["NO-GO documentado", "y archivado"] },
        { id: "t2", lane: "fab", col: 3, type: "task", label: ["F1 Firma + entrega", "checklist de entrada"] },
        { id: "d1", lane: "dir", col: 3, type: "doc", label: ["CM.P01.E01"] },
        { id: "g2", lane: "dir", col: 4, type: "gateway", label: ["¿Checklist 8/8", "con calidad?"] },
        { id: "t3", lane: "eq", col: 5, type: "task", label: ["F2 Certificación:", "assessment ventas +", "sandbox preventa"] },
        { id: "t4", lane: "eq", col: 6, type: "task", label: ["F3-F4 Campaña (H01)", "y detección de", "oportunidades"] },
        { id: "t5", lane: "eq", col: 7, type: "task", label: ["F5 Cerrar lighthouse", "y documentar todo"] },
        { id: "m1", lane: "cli", col: 7, type: "task", label: ["Cliente valida valor", "y acepta ser referencia"] },
        { id: "e1", lane: "dir", col: 8, type: "end", label: ["F6 Escala: playbook", "replicable"] },
      ],
      flows: [
        { f: "s", t: "t1" },
        { f: "t1", t: "g1" },
        { f: "g1", t: "e0", label: "No" },
        { f: "g1", t: "t2", label: "Sí: firmar" },
        { f: "t2", t: "d1", dashed: true, label: "entrega" },
        { f: "d1", t: "g2" },
        { f: "g2", t: "t2", label: "Incompleto: no avanza", loop: true },
        { f: "g2", t: "t3", label: "Sí" },
        { f: "t3", t: "t4" },
        { f: "t4", t: "t5" },
        { f: "t5", t: "m1", dashed: true, label: "experiencia estándar" },
        { f: "m1", t: "t5", dashed: true, label: "feedback" },
        { f: "t5", t: "e1" },
      ],
      caption:
        "CM.P01 — la certificación (F2) y el checklist (F1) son compuertas: sin 8/8 y sin assessment aprobado, nadie sale a vender.",
    },
    steps: [
      { paso: "1", quien: "CEO + HoS", accion: "Evaluar el fabricante contra el criterio Conecta: high-tech top, blue ocean, sector financiero MX, margen 15–30%, no canibaliza líneas", herramienta: "Sección F0 de CM.P01.E01", criterio: "GO / NO-GO firmado por CEO (NO-GO también se archiva)", tiempo: "Semana 1" },
      { paso: "2", quien: "Head of Sales + Legal", accion: "Firmar acuerdo de representación (margen, territorio, SLAs del fabricante) y exigir el checklist de entrada completo", herramienta: "Contrato + CM.P01.E01", criterio: "Los 8 materiales recibidos y con calidad OK", tiempo: "Semanas 2–3" },
      { paso: "3", quien: "Vendedores asignados", accion: "Capacitarse con el material de F1 y presentar el assessment: pitch de 2 min, 3 objeciones, pricing sin ayuda", herramienta: "CM.P01.E02", criterio: "Calificación ≥ 80% (reprobar = reevaluar en 2 semanas)", tiempo: "Semana 4" },
      { paso: "4", quien: "Preventa", accion: "Completar deployment de punta a punta en sandbox y documentar la realidad técnica vs la ficha del fabricante", herramienta: "CM.P01.E03 · DL.P05", criterio: "Informe entregado; deployment reproducible por otro ingeniero", tiempo: "Semana 4" },
      { paso: "5", quien: "HoS + Marketing", accion: "Construir ICP con ≥ 20 cuentas nombradas, mensajería con diferenciadores validados y brief de campaña (handoff H01)", herramienta: "CM.P02.E01 + MK.P02.E01", criterio: "Brief aceptado por Marketing; pipeline de la línea creado en HubSpot", tiempo: "Semanas 5–6" },
      { paso: "6", quien: "Vendedor de la línea", accion: "Activar triggers de compra (regulatorio, renovación de competidor, proyecto nuevo) y ejecutar CM.P02 contra el ICP", herramienta: "HubSpot sequences", criterio: "≥ 3 reuniones/semana con cuentas del ICP", tiempo: "Continuo" },
      { paso: "7", quien: "Vendedor + HoS", accion: "Seleccionar y cerrar el lighthouse: cliente con urgencia real, alcance controlado, dispuesto a ser referencia. Documentar ciclo, objeciones, pricing y esfuerzo", herramienta: "HubSpot + CM.P05.E02", criterio: "Primer deal closed-won + post-mortem del lighthouse", tiempo: "≤ 120 días desde firma" },
      { paso: "8", quien: "Head of Sales", accion: "Incorporar aprendizajes al playbook (CM.P05), replicar en más cuentas y revisar la línea trimestralmente: invertir, mantener o descontinuar", herramienta: "Playbook + dashboard", criterio: "Conversión por etapa medida y cuello de botella identificado", tiempo: "Trimestral" },
    ],
    touchpoints:
      "El lighthouse recibe el trato estándar del Estándar de Experiencia: agenda 24 h antes de cada reunión (plantilla C02), minuta en 24 h (C03) y un único punto de contacto. Al cliente lighthouse se le dice explícitamente que es el primero — la transparencia se compensa con condiciones preferentes y atención directa del CEO.",
    entregables: [
      { codigo: "CM.P01.E01", entregable: "Checklist de Entrada de Fabricante (incluye evaluación GO/NO-GO)", fase: "F0–F1" },
      { codigo: "CM.P01.E02", entregable: 'Assessment de Certificación "Listo para Vender"', fase: "F2" },
      { codigo: "CM.P01.E03", entregable: "Informe de Deployment en Sandbox (preventa)", fase: "F2" },
      { codigo: "MK.P02.E01", entregable: "Brief de Campaña por línea", fase: "F3" },
      { codigo: "CM.P05.E02", entregable: "Post-mortem del Lighthouse", fase: "F5" },
    ],
    handoffs: [
      { n: "H01", entrega: "Comercial", recibe: "Marketing", que: "Brief de campaña + ICP + diferenciadores validados", cuando: "Fin de F2", criterio: "ICP con ≥ 20 cuentas nombradas; 3 objeciones con respuesta; pricing de referencia" },
      { n: "H06", entrega: "Comercial", recibe: "Delivery (Implementación)", que: "Ficha técnica + informe sandbox", cuando: "Fin de F2", criterio: "Deployment reproducible por otro ingeniero sin ayuda" },
      { n: "H07", entrega: "Finanzas", recibe: "Comercial", que: "Estructura de pricing aprobada y esquema de comisión de la línea", cuando: "Fin de F1", criterio: "Márgenes y niveles de descuento definidos por escrito" },
    ],
    metricas: [
      { metrica: "Tiempo firma → primer deal cerrado", meta: "≤ 120 días", fuente: "HubSpot + fechas del acta" },
      { metrica: "Tasa de aprobación de certificación (1er intento)", meta: "70–90% (si es 100%, el examen es demasiado fácil)", fuente: "Registros de assessment" },
      { metrica: "Win rate primeros 3 meses de la línea", meta: "> 20%", fuente: "HubSpot" },
      { metrica: "Checklist de entrada completo antes de F2", meta: "100%", fuente: "Acta CM.P01.E01" },
    ],
    callouts: [
      { type: "ok", tag: "Hermes", text: "Arranca preventa en julio. Ejecutar F1→F3 en 4 semanas: checklist de entrada (Erika Baez tiene value proposition y competitive analysis en curso), certificación del vendedor estratégico y preventa, campaña con el driver regulatorio SPEI 2.0 (deadline Banxico octubre 2026). El lighthouse natural sale del pipeline existente (Acreimex)." },
      { type: "ok", tag: "GCP", text: "Está en cero: correr F0 formalmente. Si no hay GO claro con owner y meta, mejor NO-GO explícito que línea zombie." },
      { type: "ok", tag: "Tesseract y Thales", text: "Ya venden, pero el equipo no está estandarizado: correr F2 (certificación) retroactiva en agosto. Nadie queda exento del assessment." },
    ],
  },

  // ───────────────────────────────── CM.P02 ─────────────────────────────────
  {
    code: "CM.P02",
    name: "Prospección Outbound",
    description:
      "Genera pipeline nuevo de forma predecible: investigación de cuentas contra el ICP, secuencia de contacto multicanal con cadencia fija, calificación BANT-F y handoff limpio a preventa.",
    domainCode: "CM",
    estado: "Activo",
    version: "v1.1",
    ultimaActualizacion: "14 abr 2025",
    criticidad: "Media",
    tipo: "Operativo",
    clasificacion: ["Prospección", "Outbound", "Pipeline"],
    dependencias: ["CM.P01", "CM.P03", "DL.P01"],
    participantes: "Vendedor, Prospecto, Marketing, Preventa",
    ficha: {
      owner: "Vendedor de cada línea (supervisa Head of Sales)",
      trigger:
        "Campaña activa de una línea (salida de CM.P01 F3) · gap de pipeline coverage < 3x · trigger de compra detectado",
      inputs:
        "ICP de la línea (CM.P02.E01), lista de cuentas objetivo, mensajería de campaña (MK), battlecards",
      outputs:
        'Leads calificados (SQL) creados como deals en HubSpot stage "Calificado", con nota de calificación',
      duracion:
        "Frecuencia: Continua; bloques de prospección agendados mínimo 3 h/semana por vendedor",
      herramientas:
        "HubSpot (sequences, tasks, deals), LinkedIn Sales Navigator, correo/teléfono",
      metricaExito:
        "Reuniones agendadas/semana · tasa de conversión a oportunidad · tiempo promedio de calificación",
    },
    bpmn: {
      lanes: [
        { id: "pro", label: "Prospecto", color: "yellow", interaction: true },
        { id: "ven", label: "Vendedor", color: "orange" },
        { id: "hub", label: "HubSpot (sistema)", color: "gray" },
      ],
      nodes: [
        { id: "s", lane: "ven", col: 0, type: "start", label: ["Campaña activa o", "coverage < 3x"] },
        { id: "t1", lane: "ven", col: 1, type: "task", label: ["Investigar cuenta", "vs ICP (máx 15 min)"] },
        { id: "t2", lane: "hub", col: 2, type: "task", label: ["Registrar cuenta y", "2-3 contactos ANTES", "del primer toque"] },
        { id: "t3", lane: "ven", col: 3, type: "task", label: ["Ejecutar secuencia", "D1-D3-D7-D14-D21"] },
        { id: "m1", lane: "pro", col: 3, type: "task", label: ["Prospecto recibe email,", "LinkedIn y llamada", "(tono estándar C01)"] },
        { id: "g1", lane: "ven", col: 4, type: "gateway", label: ["¿Responde?"] },
        { id: "t9", lane: "hub", col: 5, type: "task", label: ["Archivar con motivo,", "reciclar en 6 meses"] },
        { id: "m2", lane: "pro", col: 5, type: "task", label: ["Reunión discovery", "(agenda previa 24 h)"] },
        { id: "t5", lane: "ven", col: 6, type: "task", label: ["Nota el mismo día +", "calificar BANT-F"] },
        { id: "g2", lane: "ven", col: 7, type: "gateway", label: ["¿BANT-F ≥ 4/5?"] },
        { id: "t6", lane: "hub", col: 8, type: "task", label: ["3/5: nurturing MK", "<3: descarte con motivo"] },
        { id: "e1", lane: "ven", col: 8, type: "end", label: ["SQL: deal creado", "→ CM.P03"] },
      ],
      flows: [
        { f: "s", t: "t1" },
        { f: "t1", t: "t2" },
        { f: "t2", t: "t3" },
        { f: "t3", t: "m1", dashed: true, label: "5 toques" },
        { f: "m1", t: "g1", dashed: true, label: "respuesta" },
        { f: "t3", t: "g1" },
        { f: "g1", t: "t9", label: "No (secuencia completa)" },
        { f: "g1", t: "m2", label: "Sí: agendar" },
        { f: "m2", t: "t5", dashed: true, label: "minuta en 24 h (C03)" },
        { f: "t5", t: "g2" },
        { f: "g2", t: "e1", label: "Sí" },
        { f: "g2", t: "t6", label: "No" },
      ],
      caption:
        "CM.P02 — todo toque al prospecto usa las plantillas de comunicación estándar (C01-C03) para una experiencia homogénea desde el primer contacto.",
    },
    steps: [
      { paso: "1", quien: "Vendedor", accion: "Tomar la siguiente cuenta tier 1 del ICP (CM.P02.E01) e investigar: trigger de compra, stack, 2–3 contactos (decisor, campeón, usuario)", herramienta: "LinkedIn SN + sitio del prospecto", criterio: "Trigger identificado y escrito en 1 línea", tiempo: "Máx 15 min/cuenta" },
      { paso: "2", quien: "Vendedor", accion: 'Crear la empresa y los contactos en HubSpot ANTES del primer toque, con propiedad "línea de producto" y "trigger"', herramienta: "HubSpot → Contacts → Create", criterio: "Cuenta visible en el dashboard de prospección", tiempo: "5 min" },
      { paso: "3", quien: "Vendedor", accion: "Inscribir al contacto en la secuencia estándar de la línea: D1 email personalizado con el trigger en la primera línea (plantilla C01) · D3 LinkedIn · D7 llamada + voicemail · D14 email de valor con contenido MK · D21 email de cierre", herramienta: "HubSpot Sequences + CM.P02.E02", criterio: "Secuencia activa; cada toque queda registrado automático", tiempo: "21 días máx" },
      { paso: "4", quien: "Vendedor", accion: "Si no hay respuesta al terminar la secuencia: archivar con motivo y programar reciclaje a 6 meses. Si hay respuesta: agendar discovery enviando confirmación con agenda 24 h antes (C02)", herramienta: "HubSpot Meetings", criterio: "Reunión confirmada con agenda enviada, o cuenta archivada", tiempo: "< 24 h desde la respuesta" },
      { paso: "5", quien: "Vendedor", accion: "Ejecutar discovery con guion del playbook: situación, dolor, impacto, proceso de decisión, siguiente paso con fecha", herramienta: "Guion de discovery", criterio: "Los 5 temas cubiertos", tiempo: "30–45 min" },
      { paso: "6", quien: "Vendedor", accion: "El mismo día: nota en HubSpot (CM.P03.E01) + minuta al prospecto (C03) + task del next step con fecha", herramienta: "HubSpot Notes/Tasks", criterio: "Nota + minuta + task creadas", tiempo: "Mismo día" },
      { paso: "7", quien: "Vendedor", accion: 'Calificar BANT-F: Budget, Authority, Need, Timing, Fit. ≥ 4/5 → crear deal en stage "Calificado" con monto, línea y fecha. 3/5 → nurturing de Marketing. < 3 → descartar con motivo', herramienta: "HubSpot Deals", criterio: "Deal SQL creado o disposición registrada", tiempo: "< 48 h post-reunión" },
      { paso: "8", quien: "Vendedor", accion: "Si el deal requiere validación técnica (criterios en DL.P01): levantar solicitud de preventa (DL.P01.E01)", herramienta: "Handoff H05", criterio: "Solicitud completa aceptada por preventa", tiempo: "Al calificar" },
    ],
    touchpoints:
      "Desde el primer email el prospecto vive el estándar Conecta: mensajes personalizados con su trigger (nunca plantillas genéricas frías — C01), confirmación con agenda 24 h antes (C02), minuta con acuerdos en 24 h después (C03) y cierre digno de secuencia si no hay interés — nunca ghosting. SLAs de respuesta en el Estándar de Experiencia. WIP: máx 15 cuentas en secuencia activa por vendedor",
    entregables: [
      { codigo: "CM.P02.E01", entregable: "Ficha ICP por línea de producto" },
      { codigo: "CM.P02.E02", entregable: "Secuencia de contacto estándar (cadencia + mensajes)" },
      { codigo: "CM.P03.E01", entregable: "Nota de reunión CRM (formato mínimo)" },
    ],
    handoffs: [
      { n: "H02", entrega: "Marketing", recibe: "Comercial", que: "Leads inbound calificados (MQL) + contenido para secuencias", cuando: "Continuo", criterio: "MQL con empresa, cargo, trigger y fuente; contacto en < 24 h" },
      { n: "H05", entrega: "Comercial", recibe: "Preventa", que: "Solicitud de preventa con contexto del deal", cuando: "Al calificar deal técnico", criterio: "Solicitud completa: dolor, stack, fecha, decisor identificado" },
      { n: "H01", entrega: "Comercial", recibe: "Marketing", que: "Feedback de campo: objeciones nuevas, mensajes que funcionan, competitive intel", cuando: "Quincenal", criterio: "Mínimo 3 datos accionables por línea activa" },
    ],
    metricas: [
      { metrica: "Reuniones nuevas agendadas / semana / vendedor", meta: "≥ 3", fuente: "HubSpot meetings" },
      { metrica: "Tasa secuencia → reunión", meta: "≥ 10% de cuentas contactadas", fuente: "HubSpot sequences" },
      { metrica: "Tasa reunión → SQL", meta: "≥ 40%", fuente: "HubSpot deals" },
      { metrica: "Tiempo promedio de calificación (1er toque → SQL)", meta: "≤ 21 días", fuente: "HubSpot" },
      { metrica: "Cuentas ICP con secuencia activa", meta: "100% del tier 1", fuente: "HubSpot" },
    ],
    callouts: [
      { type: "rule", tag: "Regla de oro", text: "Prospectar es una cita con el pipeline, no el tiempo que sobra. Los bloques de prospección son sagrados: se agendan en calendario y se reportan en el pipeline review semanal." },
    ],
  },

  // ───────────────────────────────── CM.P03 ─────────────────────────────────
  {
    code: "CM.P03",
    name: "Gestión de Pipeline (Deal Management)",
    description:
      "Convierte el pipeline en un activo de la organización, no en la memoria personal de cada vendedor. Stages con criterios de salida, review semanal obligatorio, forecast mensual y alertas tempranas.",
    domainCode: "CM",
    estado: "Activo",
    version: "v1.2",
    ultimaActualizacion: "22 abr 2025",
    criticidad: "Alta",
    tipo: "Estratégico",
    clasificacion: ["Pipeline", "Forecast", "Deal Management"],
    dependencias: ["CM.P02", "CM.P04", "DL.P02", "FI.P01"],
    participantes: "Vendedor, Head of Sales, Cliente, HubSpot",
    ficha: {
      owner: "Head of Sales / CRO",
      trigger: 'Deal creado en stage "Calificado" (salida de CM.P02 o CM.P04)',
      inputs: "Deals en HubSpot con monto, línea, fecha de cierre y nota de calificación",
      outputs: "Deals closed-won con handoff a Delivery · forecast mensual · acta de pipeline review semanal",
      duracion: "Frecuencia: Review semanal (lunes 9:00) · forecast mensual (día hábil 1)",
      herramientas: "HubSpot (pipeline, forecast, dashboards, workflows de alerta)",
      metricaExito: "Win rate > 25% · pipeline coverage ≥ 3x · 0 deals sin actividad > 7 días · precisión de forecast ± 15%",
    },
    bpmn: {
      lanes: [
        { id: "cli", label: "Cliente", color: "yellow", interaction: true },
        { id: "ven", label: "Vendedor", color: "orange" },
        { id: "hos", label: "Head of Sales", color: "teal" },
        { id: "hub", label: "HubSpot (sistema)", color: "gray" },
      ],
      nodes: [
        { id: "s", lane: "ven", col: 0, type: "start", label: ["Deal SQL creado", "(de CM.P02 / CM.P04)"] },
        { id: "t1", lane: "ven", col: 1, type: "task", label: ["Higiene diaria: nota", "mismo día + task futura"] },
        { id: "w1", lane: "hub", col: 1, type: "task", label: ["Workflows: alerta 7 días", "sin actividad / estancado"] },
        { id: "t2", lane: "hos", col: 2, type: "task", label: ["Pipeline review", "lunes 9:00 - acta", "CM.P03.E02"] },
        { id: "g1", lane: "ven", col: 3, type: "gateway", label: ["¿Cumple criterio", "de salida del stage?"] },
        { id: "t3", lane: "ven", col: 4, type: "task", label: ["Avanzar stage", "con evidencia"] },
        { id: "m1", lane: "cli", col: 4, type: "task", label: ["Cliente recibe propuesta", "y negocia (C04)"] },
        { id: "g2", lane: "hos", col: 5, type: "gateway", label: ["¿Won / Lost?"] },
        { id: "t4", lane: "hub", col: 6, type: "task", label: ["Lost: motivo obligatorio", "post-mortem si > $250K"] },
        { id: "e1", lane: "ven", col: 6, type: "end", label: ["Won: acta de handoff", "→ DL.P02 (H03)"] },
        { id: "f1", lane: "hos", col: 0, type: "task", label: ["Forecast mensual", "commit / best case", "CM.P03.E03"] },
      ],
      flows: [
        { f: "s", t: "t1" },
        { f: "w1", t: "t1", dashed: true, label: "early warnings" },
        { f: "t1", t: "t2" },
        { f: "f1", t: "t2", dashed: true, label: "alimenta" },
        { f: "t2", t: "g1" },
        { f: "g1", t: "t1", label: "No: next step con fecha", loop: true },
        { f: "g1", t: "t3", label: "Sí" },
        { f: "t3", t: "m1", dashed: true, label: "propuesta presentada" },
        { f: "t3", t: "g2" },
        { f: "g2", t: "e1", label: "Won" },
        { f: "g2", t: "t4", label: "Lost" },
      ],
      caption:
        "CM.P03 — el pipeline avanza solo con evidencia de criterio de salida; el review semanal y las alertas automáticas mantienen el sistema honesto.",
    },
    steps: [
      { paso: "1", quien: "Vendedor", accion: "Después de CADA interacción con el cliente: nota de 3 bullets (qué pasó, qué se acordó, next step con dueño y fecha) y task futura. Deal sin task futura = deal huérfano", herramienta: "CM.P03.E01 en HubSpot", criterio: "Nota + task el mismo día", tiempo: "≤ 10 min por reunión" },
      { paso: "2", quien: "Vendedor", accion: "Mantener el deal al día: monto, fecha de cierre estimada y stage correcto según la tabla de criterios de salida (arriba)", herramienta: "HubSpot Deals", criterio: "0 campos vacíos, 0 fechas vencidas", tiempo: "Continuo" },
      { paso: "3", quien: "Todos + HoS", accion: "Pipeline review cada lunes 9:00 (60 min, agenda fija): 1) cierres del mes, 2) cambios de stage con evidencia, 3) early warnings, 4) deals nuevos, 5) bloqueos a escalar. Cada quien presenta desde HubSpot en vivo", herramienta: "CM.P03.E02", criterio: "Acta con decisiones y next steps publicada en HubSpot", tiempo: "Lunes 9:00–10:00" },
      { paso: "4", quien: "Vendedor del deal", accion: "Atender cada early warning en 48 h con una de tres decisiones: reactivar (next step real con el cliente), reprogramar (nueva fecha justificada) o matar (closed-lost con motivo)", herramienta: "Workflows HubSpot", criterio: "0 deals sin actividad > 7 días", tiempo: "48 h por alerta" },
      { paso: "5", quien: "Vendedor", accion: 'Avanzar el stage SOLO cuando el criterio de salida se cumple con evidencia (demo completada, propuesta presentada — no "se siente cerca")', herramienta: "HubSpot + tabla de stages", criterio: "Evidencia en la nota del cambio", tiempo: "Al ocurrir" },
      { paso: "6", quien: "Head of Sales", accion: "Primer día hábil del mes: forecast con Commit (≥80% + fecha comprometida), Best case y Ponderado; comparar coverage vs 3x y disparar plan de generación si falta", herramienta: "CM.P03.E03 → H08 a Finanzas", criterio: "Forecast entregado a CEO/CFO; precisión ±15% vs mes anterior", tiempo: "Día hábil 1" },
      { paso: "7a", quien: "Vendedor", accion: "Won: completar acta de handoff (DL.P02.E01) y agendar kickoff interno en ≤ 5 días (handoff H03)", herramienta: "DL.P02", criterio: "Acta aceptada por Delivery", tiempo: "≤ 3 días post-firma" },
      { paso: "7b", quien: "Vendedor", accion: "Lost: registrar motivo (precio/producto/timing/competencia/no decisión); si > $250K, post-mortem la semana siguiente. Enviar mensaje de cierre digno al cliente (C05 — perder bien)", herramienta: "CM.P05.E02", criterio: "Motivo + post-mortem + cliente cerrado con puerta abierta", tiempo: "Semana siguiente" },
    ],
    touchpoints:
      "El cliente nunca percibe el pipeline interno — percibe consistencia: propuestas presentadas en reunión con la plantilla estándar (C04), seguimiento sin silencios > 5 días hábiles y, si no compra, un cierre profesional que deja la puerta abierta (C05). Un deal perdido con buena experiencia es pipeline futuro. WIP: máx 25 deals abiertos por vendedor",
    entregables: [
      { codigo: "CM.P03.E01", entregable: "Nota de reunión CRM (formato mínimo)", fase: "Cada reunión" },
      { codigo: "CM.P03.E02", entregable: "Acta de Pipeline Review semanal", fase: "Semanal" },
      { codigo: "CM.P03.E03", entregable: "Forecast mensual (commit / best case / ponderado)", fase: "Mensual" },
    ],
    handoffs: [
      { n: "H03", entrega: "Comercial", recibe: "Delivery", que: "Deal ganado: contrato, scope, expectativas, contactos", cuando: "≤ 5 días post-firma", criterio: "Acta DL.P02.E01 completa; kickoff interno agendado" },
      { n: "H08", entrega: "Comercial", recibe: "Finanzas", que: "Forecast mensual + deals won para facturación", cuando: "Día hábil 1 / al cierre", criterio: "Montos y condiciones de pago verificados contra contrato" },
      { n: "H01", entrega: "Comercial", recibe: "Marketing", que: "Motivos de pérdida y competitive intel del review", cuando: "Mensual", criterio: "Tabla de lost reasons por línea" },
    ],
    metricas: [
      { metrica: "Pipeline coverage (ponderado vs meta trimestral)", meta: "≥ 3x", fuente: "HubSpot dashboard" },
      { metrica: "Win rate", meta: "> 25%", fuente: "HubSpot" },
      { metrica: "Sales cycle por línea", meta: "Baseline Q3 → reducir 15% en Q4", fuente: "HubSpot" },
      { metrica: "Deals sin actividad > 7 días", meta: "0", fuente: "Workflow HubSpot" },
      { metrica: "Precisión de forecast (commit vs real)", meta: "± 15%", fuente: "CM.P03.E03 histórico" },
      { metrica: "Reuniones con nota el mismo día", meta: "100%", fuente: "HubSpot (auditoría semanal)" },
    ],
    callouts: [
      { type: "risk", tag: "Por qué existe este proceso", text: "Los deals más grandes de Conecta (Fincomun $160K, Kapital, Acreimex $567K) han vivido sin una sola nota en el CRM: invisibles para forecast, soporte y continuidad. Este proceso hace imposible ese escenario." },
      { type: "rule", tag: "Regla de oro", text: "El pipeline review no es un interrogatorio: es el mecanismo para que la organización pueda ayudar a cerrar. Un deal invisible es un deal al que nadie puede ayudar — y un forecast que nadie puede creer." },
    ],
  },

  // ───────────────────────────────── CM.P04 ─────────────────────────────────
  {
    code: "CM.P04",
    name: "Renovaciones",
    description:
      "Protege el revenue recurrente ($46M de los $53M de la meta 2026 son recurrentes) y convierte cada renovación en una oportunidad de upsell. Aplica sobre todo a Thales, y progresivamente a Tesseract y Hermes.",
    domainCode: "CM",
    estado: "Activo",
    version: "v1.0",
    ultimaActualizacion: "18 abr 2025",
    criticidad: "Alta",
    tipo: "Estratégico",
    clasificacion: ["Renovaciones", "Retención", "Upsell"],
    dependencias: ["CM.P03", "DL.P04", "FI.P01"],
    participantes: "Vendedor Renovaciones, Delivery, Cliente, HubSpot",
    ficha: {
      owner: "Vendedor de renovaciones (línea Thales) · supervisa Head of Sales",
      trigger: "T-90: workflow de HubSpot crea el deal de renovación 90 días antes del vencimiento del contrato/soporte",
      inputs: "Contrato vigente, historial de tickets (DL.P04), customer health score, pricing del fabricante, oportunidades de upsell detectadas por Delivery",
      outputs: "Renovación firmada (idealmente con upsell), o plan de retención activado",
      duracion: "Frecuencia: Por contrato; revisión del libro de renovaciones en cada pipeline review",
      herramientas: "HubSpot (pipeline de renovaciones separado, propiedades de fecha de vencimiento)",
      metricaExito: "Tasa de renovación > 90% · % de renovaciones con upsell · renovaciones cerradas antes del vencimiento",
    },
    bpmn: {
      lanes: [
        { id: "cli", label: "Cliente", color: "yellow", interaction: true },
        { id: "ven", label: "Vendedor Renovaciones", color: "orange" },
        { id: "dl", label: "Delivery (Soporte/CX)", color: "teal" },
        { id: "hub", label: "HubSpot (sistema)", color: "gray" },
      ],
      nodes: [
        { id: "s", lane: "hub", col: 0, type: "start", label: ["T-90: workflow crea", "deal de renovación"] },
        { id: "t1", lane: "dl", col: 1, type: "task", label: ["Entregar health score", "+ historial de tickets", "(H04 / H06)"] },
        { id: "t2", lane: "ven", col: 2, type: "task", label: ["Revisión de cuenta", "CM.P04.E01 + detectar", "upsell"] },
        { id: "g1", lane: "ven", col: 3, type: "gateway", label: ["¿Riesgo de fuga?"] },
        { id: "t3", lane: "ven", col: 4, type: "task", label: ["Plan de retención 48 h", "+ escalar a HoS/CEO"] },
        { id: "t4", lane: "ven", col: 5, type: "task", label: ["Pricing + propuesta", "antes de T-60"] },
        { id: "m1", lane: "cli", col: 5, type: "task", label: ["Cliente recibe propuesta", "en reunión, anclada en", "resultados del año"] },
        { id: "t5", lane: "ven", col: 6, type: "task", label: ["Negociar con upsell", "cerrar antes de T-30"] },
        { id: "g2", lane: "ven", col: 7, type: "gateway", label: ["¿Renueva?"] },
        { id: "e1", lane: "hub", col: 8, type: "end", label: ["Firmada → H08", "a Finanzas"] },
        { id: "t6", lane: "dl", col: 8, type: "task", label: ["Perdida: post-mortem", "+ plan de reemplazo"] },
      ],
      flows: [
        { f: "s", t: "t1" },
        { f: "t1", t: "t2" },
        { f: "t2", t: "g1" },
        { f: "g1", t: "t3", label: "Sí" },
        { f: "t3", t: "t4" },
        { f: "g1", t: "t4", label: "No" },
        { f: "t4", t: "m1", dashed: true, label: "reunión (C09)" },
        { f: "m1", t: "t5", dashed: true, label: "respuesta" },
        { f: "t4", t: "t5" },
        { f: "t5", t: "g2" },
        { f: "g2", t: "e1", label: "Sí" },
        { f: "g2", t: "t6", label: "No" },
      ],
      caption:
        "CM.P04 — el reloj corre desde T-90; la propuesta sale antes de T-60 y se firma antes de T-30. Una propuesta tardía es una invitación a cotizar con otros.",
    },
    steps: [
      { paso: "1", quien: "HubSpot (auto)", accion: "Workflow crea el deal de renovación 90 días antes del vencimiento y notifica al vendedor y a Delivery", herramienta: "Workflow T-90", criterio: "Deal en pipeline de renovaciones", tiempo: "T-90" },
      { paso: "2", quien: "Delivery", accion: "Entregar health score actualizado (<30 días) e historial de tickets/SLA del período (handoffs H04/H06)", herramienta: "DL.P04.E01", criterio: "Insumos completos en el deal", tiempo: "T-90 a T-85" },
      { paso: "3", quien: "Vendedor", accion: "Completar la revisión de cuenta: uso real, cambios en el cliente, señales de riesgo, oportunidades de upsell con evidencia", herramienta: "CM.P04.E01", criterio: "Ficha completa + postura de pricing decidida", tiempo: "T-85 a T-75" },
      { paso: "4", quien: "Vendedor (+HoS si riesgo)", accion: 'Si hay riesgo de fuga: marcar deal "en riesgo", activar plan de retención en 48 h (reunión ejecutiva, análisis de gap, involucrar al fabricante)', herramienta: "HubSpot + acta", criterio: "Plan activo con dueño y fecha", tiempo: "48 h desde la señal" },
      { paso: "5", quien: "Vendedor", accion: "Preparar propuesta según matriz: sano+precio bajo → aumento; en riesgo → retención; estratégico → bundle con upsell. Aprobar descuentos según FI.P01", herramienta: "HubSpot Quotes", criterio: "Propuesta aprobada internamente", tiempo: "Antes de T-60" },
      { paso: "6", quien: "Vendedor", accion: "Presentar la propuesta EN REUNIÓN (no solo email), anclada en resultados del año: tickets resueltos, disponibilidad, roadmap. Aviso previo con plantilla C09", herramienta: "C09 + C02", criterio: "Propuesta presentada y minuta enviada (C03)", tiempo: "T-60 a T-50" },
      { paso: "7", quien: "Vendedor", accion: "Negociar incluyendo el upsell detectado en el paso 3 (meta: ≥1 upsell/mes en el libro). Cerrar y firmar", herramienta: "HubSpot", criterio: "Renovación firmada", tiempo: "Antes de T-30" },
      { paso: "8", quien: "Vendedor", accion: "Firmada → verificar condiciones en HubSpot para facturación (H08). Perdida → post-mortem obligatorio y plan de recuperación/reemplazo en el forecast", herramienta: "CM.P05.E02", criterio: "Revenue asegurado o reemplazo planeado", tiempo: "Al cierre" },
    ],
    touchpoints:
      "El cliente de renovación recibe: contacto proactivo a T-90 — nunca una factura sorpresa (C09), una revisión anual de valor con datos de su propia operación, propuesta presentada en persona y decisión sin presión de último minuto porque el proceso empezó 3 meses antes. Estándar completo en Experiencia. WIP: máx 8 renovaciones simultáneas en ventana activa por vendedor",
    entregables: [
      { codigo: "CM.P04.E01", entregable: "Ficha de Revisión de Cuenta (pre-renovación)" },
      { codigo: "CM.P05.E02", entregable: "Post-mortem (renovación perdida)" },
    ],
    handoffs: [
      { n: "H04", entrega: "Delivery/CX", recibe: "Comercial", que: "Health score + oportunidades de upsell de la cuenta", cuando: "T-90 (al abrirse el deal)", criterio: "Score actualizado < 30 días; upsells con evidencia de necesidad" },
      { n: "H06", entrega: "Delivery (Soporte)", recibe: "Comercial", que: "Historial de tickets y cumplimiento de SLA", cuando: "T-90", criterio: "Reporte completo del período del contrato" },
      { n: "H08", entrega: "Comercial", recibe: "Finanzas", que: "Renovación firmada para facturación", cuando: "Al cierre", criterio: "Condiciones de pago y vigencia correctas en HubSpot" },
    ],
    metricas: [
      { metrica: "Tasa de renovación (por monto)", meta: "> 90%", fuente: "HubSpot renewals" },
      { metrica: "% de renovaciones con upsell", meta: "≥ 30% (≥ 1/mes en el libro Thales)", fuente: "HubSpot" },
      { metrica: "Renovaciones firmadas antes de T-30", meta: "100%", fuente: "HubSpot" },
      { metrica: "Cuentas en riesgo con plan de retención activo", meta: "100% en < 48 h", fuente: "HubSpot + acta" },
      { metrica: "NRR (Net Revenue Retention)", meta: "> 100%", fuente: "Expansión − churn (FI.P01)" },
    ],
    callouts: [
      { type: "risk", tag: "La lección PROSA", text: "PROSA compró con otro partner y Conecta se enteró tarde. Con este proceso, una cuenta cotizando con la competencia se detecta en la revisión de cuenta a T-90, no después de perderla." },
      { type: "rule", tag: "Regla de oro", text: "Una renovación no es un trámite administrativo: es un deal que la competencia quiere robarte. Se trabaja con la misma disciplina de pipeline que un deal nuevo." },
    ],
  },

  // ───────────────────────────────── CM.P05 ─────────────────────────────────
  {
    code: "CM.P05",
    name: "Metodología de Ventas Conecta",
    description:
      "Objetivo estratégico #1 de la empresa: crear, probar y mejorar la metodología de ventas Conecta. No un playbook genérico — el manual específico de cómo se vende tecnología financiera en México, alimentado por cada deal ganado y perdido.",
    domainCode: "CM",
    estado: "Activo",
    version: "v1.0",
    ultimaActualizacion: "30 abr 2025",
    criticidad: "Alta",
    tipo: "Estratégico",
    clasificacion: ["Metodología", "Playbook", "Mejora continua"],
    dependencias: ["CM.P01", "CM.P03", "CM.P04"],
    participantes: "Equipo comercial, Head of Sales, Delivery",
    ficha: {
      owner: "Head of Sales — la responsabilidad de ventas es de Comercial",
      trigger: "Deal perdido > $250K o renovación perdida (post-mortem) · lighthouse cerrado (CM.P01 F5) · revisión mensual programada",
      inputs: "Post-mortems, notas de HubSpot, feedback de campo, resultados de campañas, informes de preventa",
      outputs: "Playbook versionado por línea: perfil de comprador, discovery, objeciones, battlecards, pricing guidelines, guiones de demo",
      duracion: "Frecuencia: Post-mortems por evento · consolidación mensual · revisión trimestral completa",
      herramientas: "Repositorio del playbook (versionado) + HubSpot (fuente de evidencia)",
      metricaExito: "Win rate creciente · ciclo de venta decreciente · 100% de pérdidas grandes con post-mortem",
    },
    bpmn: {
      lanes: [
        { id: "campo", label: "Equipo comercial (campo)", color: "orange" },
        { id: "gob", label: "Head of Sales + Delivery", color: "teal" },
        { id: "pb", label: "Playbook (repositorio)", color: "gray" },
      ],
      nodes: [
        { id: "s", lane: "campo", col: 0, type: "start", label: ["Deal won/lost >$250K,", "lighthouse o ciclo mensual"] },
        { id: "t1", lane: "campo", col: 1, type: "task", label: ["Post-mortem 30-45 min,", "sin culpables, semana", "siguiente al cierre"] },
        { id: "d1", lane: "pb", col: 1, type: "doc", label: ["CM.P05.E02"] },
        { id: "t2", lane: "gob", col: 2, type: "task", label: ["Consolidación mensual:", "decidir cambios al", "playbook"] },
        { id: "t3", lane: "pb", col: 3, type: "task", label: ["Publicar vN+1", "con changelog"] },
        { id: "t4", lane: "gob", col: 4, type: "task", label: ["Micro-entrenamiento", "20 min + actualizar", "assessment CM.P01.E02"] },
        { id: "e1", lane: "campo", col: 5, type: "end", label: ["Equipo vende con la", "versión vigente"] },
      ],
      flows: [
        { f: "s", t: "t1" },
        { f: "t1", t: "d1", dashed: true, label: "genera" },
        { f: "t1", t: "t2" },
        { f: "t2", t: "t3" },
        { f: "t3", t: "t4" },
        { f: "t4", t: "e1" },
        { f: "e1", t: "s", label: "cada deal alimenta el ciclo", loop: true },
      ],
      caption:
        "CM.P05 — cada deal (ganado o perdido) alimenta el playbook; el playbook mejora cada venta siguiente.",
    },
    steps: [
      { paso: "1", quien: "HoS + HoD", accion: "Construir el playbook v1 por línea con lo que ya existe: materiales de fabricantes (CM.P01 F1), notas de renovaciones, competitive analysis de Hermes. v1 imperfecto en 4 semanas > v-perfecto en 6 meses", herramienta: "Repositorio versionado", criterio: "v1 publicado con los 6 capítulos", tiempo: "4 semanas" },
      { paso: "2", quien: "Vendedor del deal + HoS", accion: "Ejecutar post-mortem obligatorio (lost > $250K, toda renovación perdida, lighthouse): qué pasó, qué señales ignoramos, qué haremos distinto, qué cambia en el playbook", herramienta: "CM.P05.E02", criterio: "Post-mortem con ≥ 1 cambio propuesto", tiempo: "Semana siguiente al cierre" },
      { paso: "3", quien: "HoS + HoD", accion: "Consolidación mensual (30 min al cierre del pipeline review de fin de mes): revisar post-mortems y feedback, decidir cambios", herramienta: "Acta de consolidación", criterio: "Cambios aprobados", tiempo: "Mensual" },
      { paso: "4", quien: "HoD", accion: "Publicar la versión nueva con changelog: qué cambió, por qué, con qué evidencia", herramienta: "Repositorio del playbook", criterio: "vN+1 publicada", tiempo: "≤ 3 días post-consolidación" },
      { paso: "5", quien: "HoS", accion: "Micro-entrenamiento de 20 min sobre los cambios mayores + actualizar el assessment de certificación (CM.P01.E02)", herramienta: "Sesión registrada", criterio: "100% del equipo entrenado en la versión vigente", tiempo: "Semana de publicación" },
    ],
    touchpoints: "",
    entregables: [
      { codigo: "CM.P05.E01", entregable: "Battlecard competitivo (por competidor/línea)" },
      { codigo: "CM.P05.E02", entregable: "Post-mortem de deal (ganado o perdido)" },
    ],
    handoffs: [],
    metricas: [
      { metrica: "Win rate (tendencia trimestral)", meta: "Creciente hacia > 25%", fuente: "HubSpot" },
      { metrica: "Pérdidas > $250K con post-mortem", meta: "100%", fuente: "Registro CM.P05.E02" },
      { metrica: "Versiones de playbook publicadas", meta: "≥ 1/mes", fuente: "Changelog" },
      { metrica: "Vendedores certificados en versión vigente", meta: "100%", fuente: "CM.P01.E02" },
    ],
    callouts: [],
  },
];
