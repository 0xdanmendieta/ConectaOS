// Service Blueprint — content VERBATIM from conecta-os/blueprint.html.

export const BP_STAGES = [
  "1 · DESCUBRE",
  "2 · EVALÚA",
  "3 · DECIDE Y COMPRA",
  "4 · ONBOARDING",
  "5 · OPERA",
  "6 · RENUEVA Y EXPANDE",
];

export type BpZone = { zone: string; tone: string; cells: string[] };

export const BP_ROWS: BpZone[] = [
  {
    zone: "Acciones del cliente",
    tone: "cliente",
    cells: [
      "Lee el Reporte H1, ve el LinkedIn Live, recibe un email con SU trigger regulatorio",
      "Toma la reunión discovery, involucra a su equipo técnico, define criterios de éxito, ve la demo/PoC",
      "Recibe y negocia la propuesta, valida con su comité, firma",
      "Asiste al kickoff, entrega prerrequisitos, valida el plan",
      "Usa el producto, reporta incidentes, recibe reportes y QBRs",
      "Recibe contacto proactivo a T-90, revisa el valor del año, renueva y considera el upsell",
    ],
  },
  {
    zone: "Frontstage (quién da la cara)",
    tone: "front",
    cells: [
      "Marketing: pieza con dato propio y CTA · Vendedor: primer contacto C01 en <24 h",
      "Vendedor: discovery con agenda C02 y minuta C03 · Preventa: demo contra criterios firmados",
      "Vendedor: propuesta presentada en reunión C04 · Si no compra: cierre digno C05",
      "Vendedor: bienvenida C06 · Head of Delivery + PM: kickoff ≤10 días · PM: único punto de contacto",
      "PM: reporte semanal C07 · Soporte: tickets con avances proactivos C08 · CSM: QBR trimestral",
      "Vendedor Renovaciones: aviso T-90 C09 y revisión anual de valor · CSM: propuesta de expansión con evidencia",
    ],
  },
  {
    zone: "Backstage (procesos internos)",
    tone: "back",
    cells: [
      "MK.P01 Contenido · MK.P02 Campañas · CM.P02 Prospección · CM.P01 certificación previa",
      "CM.P02 calificación BANT-F · DL.P01 Preventa · CM.P03 pipeline",
      "CM.P03 stages 4–6 · FI.P01 aprobación de cotización · CM.P05 battlecards",
      "DL.P02 handoff con acta · DL.P03 plan y prerrequisitos · WIP del PM verificado (la entrega con custodia es su Fase A)",
      "DL.P03 implementación · DL.P04 soporte y health score · DL.P05 ingenieros certificados",
      "CM.P04 renovaciones desde T-90 · DL.P04 H04 upsell/salud · FI.P01 facturación",
    ],
  },
  {
    zone: "Sistemas de soporte",
    tone: "sys",
    cells: [
      "HubSpot Marketing (forms, campañas) · LinkedIn",
      "HubSpot Deals + Sequences · Sandbox por línea",
      "HubSpot Quotes · matriz de aprobación FI",
      "HubSpot (acta H03) · plan de proyecto",
      "HubSpot Service Hub (SLAs, CSAT) · runbooks",
      "Workflow T-90 · AR aging · dashboard FI",
    ],
  },
  {
    zone: "Evidencia (lo que el cliente conserva)",
    tone: "evid",
    cells: [
      "Reporte/framework con datos citables",
      "Agenda, minuta, criterios de éxito por escrito, resultados de demo",
      "Propuesta formal, cotización clara, contrato",
      "Acta de kickoff, plan con hitos, calendario de reportes, registro de custodia del equipo (si hay hardware)",
      "Reportes semanales, tickets con causa raíz, as-built, actas de aceptación",
      "Revisión anual de valor con SUS datos, propuesta de renovación",
    ],
  },
  {
    zone: "Estándar de experiencia (compromiso medible)",
    tone: "std",
    cells: [
      "MQL contactado < 24 h · 0 claims sin evidencia",
      "Respuesta de preventa ≤ 48 h · demo ≤ 10 días · 0 PoCs sin criterios firmados",
      "Cotización aprobada en 24–48 h · propuesta = lo validado técnicamente, sin sorpresas",
      "Kickoff ≤ 10 días · el cliente NUNCA repite lo que ya dijo · satisfacción semana 1 ≥ 8/10",
      "SLA > 95% · S1 con avance cada 2 h · reporte semanal el mismo día · CSAT ≥ 4.5/5",
      "Contacto a T-90, nunca factura sorpresa · firma antes de T-30 · NPS > 50",
    ],
  },
];

export const MOMENTS = [
  { n: "1", moment: "Primer contacto", question: '"¿Esto es spam o alguien que entiende mi problema?"', standard: "Mensaje con SU trigger en la primera línea; nunca plantilla genérica fría", owner: "Vendedor", template: "C01" },
  { n: "2", moment: "La demo / PoC", question: '"¿Me están vendiendo humo?"', standard: "Criterios de éxito definidos por el cliente ANTES; resultados contra esos criterios; honestidad si algo no es viable", owner: "Preventa", template: "DL.P01.E01" },
  { n: "3", moment: "Después de firmar", question: '"¿Ya que pagué, me van a abandonar?"', standard: "Bienvenida en 24 h + kickoff ≤ 10 días + cero re-explicaciones", owner: "Vendedor → HoD", template: "C06" },
  { n: "4", moment: "El primer incidente grave (S1)", question: '"¿De qué lado están?"', standard: "Avance proactivo cada 2 h; Conecta persigue al fabricante, el cliente no persigue a nadie", owner: "Soporte + HoD", template: "C08" },
  { n: "5", moment: "Un error de Conecta", question: '"¿Lo van a esconder?"', standard: "Reconocerlo primero, plan de corrección con fechas, seguimiento hasta cerrar. Sin excusas", owner: "Head del área + CEO si es mayor", template: "Estándar" },
  { n: "6", moment: "La renovación", question: '"¿Solo me buscan para cobrar?"', standard: "Contacto a T-90 con revisión de valor del año usando SUS datos — la factura nunca es la primera noticia", owner: "Vendedor Renovaciones", template: "C09" },
];

export const BP_PRINCIPLE = {
  tag: "El principio rector",
  text: 'Cada proceso del OS tiene su lane de "Cliente" en el diagrama BPMN y su sección de touchpoints. Si al diseñar o cambiar un proceso no puedes decir qué mejora para el cliente, el cambio no pasa el gate de Gobierno.',
};
