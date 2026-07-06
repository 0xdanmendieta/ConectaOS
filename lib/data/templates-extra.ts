import type { TemplateDoc } from "@/lib/types";

// MK / DL / OP / FI document templates — content VERBATIM from conecta-os/
// (pl-mk.html, pl-dl.html, pl-op.html, pl-fi.html). Domain assigned by code prefix.
export const TEMPLATES_EXTRA: TemplateDoc[] = [
  {
    code: "MK.P02.E01", title: "Brief de Campaña", domain: "MK",
    blocks: [{ type: "fields", rows: [
      { label: "Campaña / Línea", value: "" },
      { label: "Objetivo numérico", value: "[MQLs / reuniones / registros — cantidad y plazo]" },
      { label: "ICP y cuentas tier 1 (≥ 20)", value: "[referencia a CM.P02.E01]" },
      { label: "Driver de urgencia", value: "[ej. deadline Banxico SPEI 2.0 — oct 2026]" },
      { label: "Mensaje central", value: "" },
      { label: "Diferenciadores validados (de CM.P01 F2)", value: "" },
      { label: "Oferta de conversión", value: "☐ Diagnóstico ☐ Assessment ☐ Demo ☐ Reporte ☐ Webinar" },
      { label: "Presupuesto / duración", value: "" },
      { label: "Aprobado por (Comercial + MK)", value: "" },
    ]}],
  },
  {
    code: "MK.P01.E02", title: "Matriz de Evidencia", domain: "MK",
    blocks: [
      { type: "callout", tag: "Gate de publicación", text: "Toda pieza pasa por esta matriz ANTES de publicarse. Claim sin evidencia = se reescribe o se corta." },
      { type: "table", headers: ["Claim (afirmación en la pieza)", "Tipo de evidencia", "Fuente exacta", "¿Publicable?"], rows: [
        ['[ej. "7 de 10 instituciones no están listas para SPEI 2.0"]', "☐ Data propia ☐ Fuente externa citable ☐ Caso real autorizado", "[encuesta H1, n=47, jun-2026]", "☐ Sí ☐ Reescribir ☐ Cortar"],
        ["", "", "", ""],
      ]},
    ],
  },
  {
    code: "MK.P01.E01", title: "Calendario Editorial Priorizado", domain: "MK",
    blocks: [
      { type: "table", headers: ["Pieza", "Tipo", "Prioridad", "Dueño", "Fecha", "Evidencia lista", "Estado"], rows: [
        ["[ej. Reporte H1]", "Pieza bandera", "☐ Must ship ☐ Ship if assets ☐ Hold", "", "", "☐", "☐ Idea ☐ Producción ☐ Gate ☐ Publicada"],
        ["", "", "", "", "", "", ""],
      ]},
      { type: "callout", tag: "Regla anti-sobrecarga", text: "Si el mes excede capacidad real, se recorta desde Hold hacia arriba. Must-ship nunca se sacrifica por volumen." },
    ],
  },
  {
    code: "DL.P02.E01", title: "Acta de Handoff Ventas → Delivery", domain: "DL",
    blocks: [{ type: "fields", rows: [
      { label: "Deal (link HubSpot) / Cliente / Línea", value: "" },
      { label: "Contrato y anexos (links)", value: "☐ Contrato firmado ☐ Anexo técnico ☐ Condiciones de pago" },
      { label: "Scope técnico (el validado en DL.P01 — sin ediciones)", value: "" },
      { label: "Expectativas explícitas del cliente", value: "[qué está en contrato]" },
      { label: "Expectativas implícitas / promesas de palabra", value: "[qué se dijo en reuniones — sé honesto, aquí se paga o se cobra después]" },
      { label: "Criterios de éxito del cliente", value: "" },
      { label: "Contactos clave (nombre, cargo, rol en el proyecto, actitud)", value: "[sponsor / campeón / escéptico]" },
      { label: "Riesgos conocidos", value: "" },
      { label: "Historia del deal (por qué compró, qué teme)", value: "" },
      { label: "Fechas", value: "Firma: ___ · Kickoff interno (≤5d): ___ · Kickoff cliente (≤10d): ___" },
      { label: "Aceptación de Delivery", value: "☐ Aceptada ☐ Rechazada — faltantes: ________ · Fecha/firma:" },
    ]}],
  },
  {
    code: "CM.P05.E02", title: "Post-Mortem de Deal", domain: "CM",
    blocks: [
      { type: "callout", tag: "Cuándo es obligatorio", text: "Deal perdido > $250K · cualquier renovación perdida · lighthouse de línea (ganado o perdido). 30–45 min, semana siguiente al cierre, sin culpables." },
      { type: "fields", rows: [
        { label: "Deal / Cliente / Línea / Monto", value: "" },
        { label: "Resultado", value: "☐ Ganado ☐ Perdido — motivo HubSpot: ☐ Precio ☐ Producto ☐ Timing ☐ Competencia ☐ No decisión" },
        { label: "Cronología breve (hitos del deal)", value: "" },
        { label: "Qué funcionó", value: "" },
        { label: "Qué falló / qué señales ignoramos", value: "" },
        { label: "Qué hizo la competencia", value: "" },
        { label: "Qué haremos distinto", value: "" },
        { label: "Cambios propuestos al playbook (CM.P05)", value: "[capítulo — cambio concreto]" },
        { label: "Asistentes / fecha", value: "" },
      ]},
    ],
  },
  {
    code: "CM.P05.E01", title: "Battlecard Competitivo", domain: "CM",
    blocks: [{ type: "fields", rows: [
      { label: "Competidor / Línea afectada", value: "[ej. STP — Hermes]" },
      { label: "Su propuesta de valor (como la cuenta el cliente)", value: "" },
      { label: "Fortalezas reales (no las subestimes)", value: "" },
      { label: "Debilidades verificadas", value: "[con evidencia — del sandbox, de clientes, de deals]" },
      { label: "Nuestro diferenciador contra ellos", value: "[ej. pricing 10–20% bajo STP, conexión directa Banxico]" },
      { label: "Preguntas que los exponen", value: "[preguntas que el cliente debería hacerles]" },
      { label: "Trampas a evitar", value: "[dónde nos ganan si jugamos su juego]" },
      { label: "Evidencia de deals contra ellos", value: "[won/lost + aprendizaje]" },
      { label: "Última actualización / fuente", value: "" },
    ]}],
  },
  {
    code: "DL.P03.E01", title: "Acta de Aceptación / Go-Live", domain: "DL",
    blocks: [{ type: "fields", rows: [
      { label: "Proyecto / Cliente / Línea", value: "" },
      { label: "Alcance implementado", value: "" },
      { label: "Pruebas de aceptación ejecutadas", value: "[criterio — resultado — evidencia]" },
      { label: "Criterios de éxito cumplidos (de DL.P01.E01)", value: "☐ Todos ☐ Con observaciones: ________" },
      { label: "Pendientes menores (con fecha)", value: "" },
      { label: "Hito facturable asociado", value: "[→ H08 a Finanzas]" },
      { label: "Firma del cliente (nombre, cargo, fecha)", value: "" },
    ]}],
  },
  {
    code: "DL.P03.E02", title: "Solicitud de Cambio (Change Request)", domain: "DL",
    blocks: [
      { type: "fields", rows: [
        { label: "Proyecto / Cliente / # de cambio", value: "" },
        { label: "Descripción del cambio solicitado", value: "" },
        { label: "Solicitado por / fecha", value: "" },
        { label: "Impacto en tiempo", value: "[+ días al plan]" },
        { label: "Impacto en costo", value: "[$ — ¿facturable? → avisar a Comercial si aumenta contrato]" },
        { label: "Impacto en riesgo/alcance", value: "" },
        { label: "Decisión", value: "☐ Aprobado por cliente (firma/correo adjunto) ☐ Rechazado ☐ Diferido" },
      ]},
      { type: "callout", tag: "Regla", text: 'Ningún cambio se ejecuta sin este documento aprobado. "Es un cambiecito" es como empiezan los proyectos que pierden dinero.' },
    ],
  },
  {
    code: "DL.P04.E01", title: "Customer Health Score (mensual por cuenta)", domain: "DL",
    blocks: [
      { type: "table", headers: ["Dimensión", "Peso", "Criterio 🟢 (2 pts)", "Criterio 🟡 (1 pt)", "Criterio 🔴 (0 pts)", "Score"], rows: [
        ["Incidentes", "25%", "Sin S1/S2 en 90 días", "1 S2 reciente", "S1 reciente o S2 recurrente", ""],
        ["Tendencia de tickets", "15%", "Estable/bajando", "Subiendo leve", "Subiendo sostenido", ""],
        ["CSAT", "15%", "≥ 4.5", "3.5–4.4", "< 3.5", ""],
        ["Uso del producto", "15%", "Alto/creciente", "Parcial", "Bajo/decreciente", ""],
        ["Relación", "15%", "Campeón activo, responde", "Contacto irregular", "Sin campeón / silencio", ""],
        ["Riesgo comercial", "15%", "Sin renovación próxima ni competencia", "Renovación < 6 meses", "Competencia activa en la cuenta", ""],
      ]},
      { type: "fields", rows: [
        { label: "Cuenta / Mes", value: "" },
        { label: "Score ponderado", value: "🟢 ≥ 1.6 · 🟡 1.0–1.59 · 🔴 < 1.0" },
        { label: "Si 🔴: plan de acción (48 h)", value: "[acción — dueño — fecha · alerta a Comercial (H04)]" },
        { label: "Si 🟢 con uso alto: upsell sugerido", value: "[oportunidad con evidencia → H04]" },
      ]},
    ],
  },
  {
    code: "DL.P05.E01", title: "Matriz de Certificaciones de Ingenieros", domain: "DL",
    blocks: [
      { type: "table", headers: ["Ingeniero", "Rol", "Thales", "Tesseract", "Hermes", "GCP", "Próximo vencimiento"], rows: [
        ["", "☐ Preventa ☐ Implementación", "☐ Vigente ☐ Vencida ☐ En curso", "☐ ☐ ☐", "☐ ☐ ☐", "☐ ☐ ☐", ""],
        ["", "", "", "", "", "", ""],
      ]},
      { type: "callout", tag: "Regla", text: "Sin certificación vigente en la línea, el ingeniero no ejecuta demos, PoCs ni deployments de esa línea (DL.P05)." },
    ],
  },
  {
    code: "DL.P03.E03", title: "Registro de Custodia y Trazabilidad de Equipo", domain: "DL",
    blocks: [
      { type: "fields", rows: [
        { label: "Cliente / Proyecto / Deal (link HubSpot)", value: "" },
        { label: "Equipo (modelo) y licencias", value: "[verificar coincidencia EXACTA vs propuesta y orden — FI.P01.E03]" },
        { label: "Número(s) de serie", value: "" },
        { label: "Fecha y lugar de recepción (fabricante)", value: "" },
        { label: "Formatos del fabricante procesados", value: "☐ Solicitud de acceso ☐ Responsabilidad de proveedores al interior del edificio" },
        { label: "Responsable de custodia (cada tramo)", value: "[nombre — desde/hasta — fecha y hora]" },
        { label: "Medio de transporte", value: "☐ Vehículo propio ☐ Paquetería asegurada ☐ Traslado del cliente · guía/referencia:" },
        { label: "Modalidad definida por el cliente", value: "☐ Resguardo temporal ☐ Entrega física ☐ Envío por paquetería" },
        { label: "Compuerta de pago", value: "☐ Pago confirmado por CFO el [fecha] (sin esto NO se entrega)" },
        { label: "Confirmación de entrega", value: "[nombre y firma de quien recibe — fecha y hora]" },
        { label: "Alta en base de activos", value: "☐ Registrado el [fecha] · vigencia de póliza de soporte: [fecha]" },
        { label: "Vo.Bo. control criptográfico", value: "[Líder técnico del equipo de fabricante — firma/correo]" },
      ]},
      { type: "callout", tag: "Regla", text: "La cadena de custodia no admite huecos: cada tramo tiene un responsable con nombre. Sin este registro completo no hay entrega, ni alta en activos, ni inicio de soporte (DL.P03)." },
    ],
  },
  {
    code: "OP.P01.E01", title: "Plan de Onboarding 30-60-90", domain: "OP",
    blocks: [
      { type: "table", headers: ["Período", "Metas verificables", "Responsable de apoyo", "Check"], rows: [
        ["Día 1–7", "Leer Conecta OS completo · accesos HubSpot configurados · shadowing de 3 reuniones · conocer a las 4 direcciones · leer el Estándar de Experiencia", "Administración + mentor", "☐"],
        ["Mes 1", "Certificación aprobada en su línea (CM.P01.E02) · 20 cuentas ICP investigadas · primeras secuencias supervisadas", "Head of Sales", "☐"],
        ["Mes 2", "Pipeline propio en construcción · ≥ 2 reuniones/semana solo · higiene CRM al 100%", "Head of Sales", "☐"],
        ["Mes 3", "Pipeline ≥ 3x su cuota mensual O primer deal cerrado · presenta en pipeline review sin apoyo", "Head of Sales", "☐"],
      ]},
      { type: "fields", rows: [
        { label: "Checkpoints quincenales (fecha + resultado)", value: "" },
        { label: "Decisión día 90", value: "☐ Confirmado ☐ Plan de apoyo 30 días ☐ No continúa" },
      ]},
    ],
  },
  {
    code: "FI.P01.E01", title: "Dashboard Financiero Semanal (viernes)", domain: "FI",
    blocks: [{ type: "fields", rows: [
      { label: "Semana / preparado por", value: "" },
      { label: "Cash disponible / runway (meses)", value: "[alerta si < 24 meses]" },
      { label: "AR aging", value: "[corriente / +15 / +30 / +45 — con cuentas nombradas en +30]" },
      { label: "Revenue del mes vs meta (por línea)", value: "[Thales / Tesseract / Hermes / GCP]" },
      { label: "Pipeline ponderado (de CM.P03.E03)", value: "[coverage vs 3x]" },
      { label: "Facturas emitidas / cobradas en la semana", value: "" },
      { label: "Concentración de cliente top 3", value: "[% — alerta si alguno > 25%]" },
      { label: "Trimestral (solo 1a semana del trimestre): CAC · LTV · NRR · Burn Multiple", value: "" },
      { label: "Decisiones requeridas", value: "" },
    ]}],
  },
  {
    code: "FI.P01.E02", title: "Esquema de Comisiones (acuerdo por vendedor)", domain: "FI",
    blocks: [{ type: "fields", rows: [
      { label: "Vendedor / rol / vigencia", value: "" },
      { label: "Cuota trimestral (MXN)", value: "" },
      { label: "Base de cálculo", value: "% sobre MARGEN de Conecta (no venta bruta)" },
      { label: "% venta nueva", value: "" },
      { label: "% renovación", value: "[menor que venta nueva]" },
      { label: "% upsell en renovación", value: "[igual a venta nueva — incentiva CM.P04.A03]" },
      { label: "Acelerador", value: "[ej. +25% del rate sobre el excedente al superar cuota]" },
      { label: "Momento de pago", value: "Al COBRO de la factura (no a la firma)" },
      { label: "Condiciones de elegibilidad", value: "Deal correctamente registrado en HubSpot (monto, stage, notas). Deal sin registro no comisiona." },
      { label: "Firmas (vendedor / CFO / Head of Sales)", value: "" },
    ]}],
  },
  {
    code: "FI.P01.E03", title: "Checklist de Liberación de Orden al Fabricante", domain: "FI",
    blocks: [
      { type: "fields", rows: [
        { label: "Deal / Cliente / Fabricante", value: "" },
        { label: "1. OC o carta de aceptación del cliente", value: "☐ Firmada, adjunta en el deal · fecha:" },
        { label: "2. Validación técnica documentada", value: "☐ Modelo, versión y licencias coinciden EXACTAMENTE con la propuesta · valida: líder técnico del equipo de fabricante" },
        { label: "3. Validación financiera documentada", value: "☐ Condiciones de pago ☐ Margen aprobado ☐ Tipo de cambio validado · valida: CFO" },
        { label: "4. Triple Vo.Bo. de la propuesta archivado", value: "☐ Técnico ☐ Financiero ☐ Negocio (correos adjuntos)" },
        { label: "Orden enviada al fabricante", value: "Fecha: ____ · con copia a CFO y Dirección de negocio" },
        { label: "Contrato (Legal, máx 48 h en paralelo)", value: "☐ Enviado · ☐ Firmado · fecha:" },
        { label: "Factura emitida (30 días)", value: "Folio: ____ · fecha:" },
        { label: "Firmas de liberación", value: "CFO: ________ · Autoridad técnica: ________" },
      ]},
      { type: "callout", tag: "Regla", text: "Sin los puntos 1–3 completos y documentados, no se libera ninguna orden al fabricante — Conecta pone el capital en riesgo (FI.P01)." },
    ],
  },
];
