import type { KpiGroup } from "@/lib/types";

// Dashboard de Negocio — content VERBATIM from conecta-os/metricas.html.
export const GOALS_2026 = {
  headers: ["Línea", "Recurrente (MXN)", "Nuevas (MXN)", "Total", "Estado Jun 2026"],
  rows: [
    ["Thales", "30,000,000", "3,000,000", "33,000,000", "~4,000,000"],
    ["Tesseract", "16,000,000", "4,000,000", "20,000,000", "—"],
    ["Hermes", "—", "—", "Preventa jul–dic (meta 18m: $150M)", "Arranca julio"],
    ["GCP", "—", "—", "Pendiente GO/NO-GO (CM.P01 F0)", "Sin iniciar"],
    ["Total", "46,000,000", "7,000,000", "53,000,000", "~7.5%"],
  ],
};

export const KPI_GROUPS: KpiGroup[] = [
  {
    title: "Métricas de revenue",
    cadence: "Revisión semanal",
    kpis: [
      { metric: "Revenue mensual por línea vs meta", benchmark: "Plan mensualizado de $53M", source: "HubSpot deals closed-won", owner: "Head of Sales" },
      { metric: "Pipeline coverage", benchmark: "≥ 3x meta trimestral", source: "HubSpot deals abiertos ponderados", owner: "Head of Sales" },
      { metric: "Win rate", benchmark: "> 25%", source: "HubSpot", owner: "Head of Sales" },
      { metric: "Sales cycle por línea", benchmark: "Baseline Q3, −15% en Q4", source: "HubSpot", owner: "Head of Sales" },
      { metric: "Forecast commit vs real", benchmark: "± 15%", source: "CM.P03.E03", owner: "Head of Sales" },
      { metric: "Tasa de renovación", benchmark: "> 90%", source: "HubSpot renewals", owner: "Vendedor Renovaciones" },
    ],
  },
  {
    title: "Economía del negocio",
    cadence: "Revisión mensual / trimestral",
    kpis: [
      { metric: "CAC (Customer Acquisition Cost)", benchmark: "< 30% del LTV", source: "Costos comerciales / clientes nuevos", owner: "CFO" },
      { metric: "LTV (Customer Lifetime Value)", benchmark: "> 3x CAC", source: "Revenue recurrente × vida promedio", owner: "CFO" },
      { metric: "NRR (Net Revenue Retention)", benchmark: "> 100%", source: "Expansión − churn", owner: "CFO" },
      { metric: "Burn Multiple", benchmark: "< 1.5", source: "Burn neto / net new ARR", owner: "CFO" },
      { metric: "Runway", benchmark: "≥ 24 meses (lección Tesseract: 14.3 es zona roja)", source: "Cash / burn mensual", owner: "CFO" },
      { metric: "Concentración de cliente máxima", benchmark: "< 25% (lección FIN COMUN: 38.5%)", source: "Revenue por cliente", owner: "CFO" },
      { metric: "DSO", benchmark: "< 45 días", source: "AR aging", owner: "CFO" },
    ],
  },
  {
    title: "Cliente y ejecución",
    cadence: "Revisión mensual",
    kpis: [
      { metric: "NPS", benchmark: "> 50", source: "Encuestas post-implementación", owner: "Customer Success" },
      { metric: "CSAT (por ticket / por proyecto)", benchmark: "≥ 4.5/5 · ≥ 8/10", source: "Service Hub / encuestas", owner: "Head of Delivery" },
      { metric: "Cumplimiento de SLA de soporte", benchmark: "> 95%", source: "Service Hub", owner: "Head of Delivery" },
      { metric: "Cuentas con health score al día", benchmark: "100%", source: "DL.P04.E01", owner: "Head of Delivery" },
      { metric: "MQLs / mes y conversión MQL→SQL", benchmark: "≥ 15 · ≥ 30%", source: "HubSpot Marketing", owner: "Head of Marketing" },
      { metric: "Higiene CRM (reuniones con nota mismo día)", benchmark: "100%", source: "Auditoría HubSpot semanal", owner: "Head of Sales" },
    ],
  },
];

export const DASHBOARDS = [
  { name: "Dashboard Comercial (HubSpot)", content: "Pipeline por línea y stage, coverage, win rate, actividad por vendedor, early warnings", audience: "Pipeline review semanal" },
  { name: "Dashboard Marketing (HubSpot)", content: "MQLs por campaña, conversión, costo por MQL", audience: "Review quincenal de campañas" },
  { name: "Dashboard Servicio (HubSpot Service Hub)", content: "Tickets, SLAs, CSAT, health scores", audience: "Revisión semanal de Delivery" },
  { name: "Hoja Financiera (CFO)", content: "Cash, runway, AR aging, revenue vs meta, CAC/LTV/NRR, concentración", audience: "Revisión Financiera de viernes (FI.P01.E01)" },
];
