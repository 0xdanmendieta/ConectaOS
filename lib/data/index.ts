import type { Process, SearchDoc, TemplateDoc } from "@/lib/types";
import { PROCESSES } from "./processes";
import { PROCESSES_EXTRA } from "./processes-extra";
import { DOMAINS, DOMAIN_NAME } from "./domains";
import { TEMPLATES_CM, TEMPLATES_CX } from "./templates";
import { TEMPLATES_EXTRA } from "./templates-extra";

export { DOMAINS, DOMAIN_NAME };

export const ALL_PROCESSES: Process[] = [...PROCESSES, ...PROCESSES_EXTRA];

export function getProcess(code: string): Process | undefined {
  return ALL_PROCESSES.find(
    (p) => p.code.toLowerCase() === code.toLowerCase(),
  );
}

export const DEFAULT_PROCESS_CODE = "CM.P01";

// ── Templates catalog ────────────────────────────────────────────────────────
export const ALL_TEMPLATES: TemplateDoc[] = [
  ...TEMPLATES_CM,
  ...TEMPLATES_EXTRA,
  ...TEMPLATES_CX,
];

export function getTemplate(code: string): TemplateDoc | undefined {
  return ALL_TEMPLATES.find(
    (t) => t.code.toLowerCase() === code.toLowerCase(),
  );
}

// Which process a template is used in (from its code prefix, e.g. CM.P01.E01 → CM.P01).
export function templateUsedIn(t: TemplateDoc): string {
  if (t.usedIn) return t.usedIn;
  const m = t.code.match(/^([A-Z]{2}\.P\d{2})/);
  return m ? m[1] : t.domain;
}

export const TEMPLATE_DOMAINS: { code: string; name: string }[] = [
  { code: "CM", name: "Comerciales" },
  { code: "MK", name: "Marketing" },
  { code: "DL", name: "Delivery" },
  { code: "OP", name: "Operaciones" },
  { code: "FI", name: "Finanzas" },
  { code: "CX", name: "Comunicación con Clientes" },
];

// ── Mis pendientes (derived, tied to real processes) ─────────────────────────
export const PENDIENTES: {
  id: string;
  title: string;
  detail: string;
  type: "cert" | "quiz" | "review" | "material" | "task";
  process: string;
  due: string;
  priority: "alta" | "media" | "baja";
}[] = [
  { id: "p1", title: "Completar certificación 'Listo para Vender'", detail: "Assessment CM.P01.E02 — pitch, objeciones y pricing", type: "cert", process: "CM.P01", due: "Vence en 3 días", priority: "alta" },
  { id: "p2", title: "Reto Conecta — módulo Onboarding", detail: "Quiz de 14 preguntas del sistema operativo", type: "quiz", process: "CM.P01", due: "Sugerido esta semana", priority: "media" },
  { id: "p3", title: "Aprobar brief de campaña Hermes", detail: "MK.P02.E01 espera tu revisión (driver SPEI 2.0)", type: "review", process: "MK.P02", due: "Vence mañana", priority: "alta" },
  { id: "p4", title: "Actualizar acta de Pipeline Review", detail: "CM.P03.E02 — cierres comprometidos del mes", type: "material", process: "CM.P03", due: "Lunes 9:00", priority: "media" },
  { id: "p5", title: "Post-mortem del lighthouse Acreimex", detail: "CM.P05.E02 — sin culpables, la semana del cierre", type: "task", process: "CM.P05", due: "En 5 días", priority: "media" },
  { id: "p6", title: "Health score mensual de cuentas", detail: "DL.P04.E01 — marcar cuentas 🔴 con plan a 48 h", type: "material", process: "DL.P04", due: "Fin de mes", priority: "media" },
  { id: "p7", title: "Certificación de ingeniero — línea Hermes", detail: "DL.P05 — deployment en sandbox + evaluación ≥ 80%", type: "cert", process: "DL.P05", due: "≤ 30 días", priority: "baja" },
  { id: "p8", title: "Revisión de cuenta Thales (T-90)", detail: "CM.P04.E01 — detectar riesgo de fuga y upsell", type: "review", process: "CM.P04", due: "T-90 activo", priority: "alta" },
];

// ── Learning progress (sidebar widget) ─────────────────────────────────────
export const PROGRESS = {
  pct: 72,
  level: "Avanzado",
  points: 850,
  pointsTotal: 1200,
};

// ── Current user ────────────────────────────────────────────────────────────
export const USER = {
  name: "Mariana R.",
  role: "Product Owner",
  initials: "MR",
};

// ── Primary navigation (PROMPT §9) ──────────────────────────────────────────
export const NAV_ITEMS: {
  key: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}[] = [
  { key: "inicio", label: "Inicio", icon: "home", href: "/inicio" },
  { key: "pendientes", label: "Mis pendientes", icon: "inbox", href: "/pendientes", badge: 8 },
  { key: "procesos", label: "Procesos", icon: "workflow", href: "/procesos" },
  { key: "playbooks", label: "Playbooks", icon: "book-open", href: "/plantillas" },
  { key: "blueprints", label: "Blueprints", icon: "layout-template", href: "/blueprints" },
  { key: "kpis", label: "KPIs y Métricas", icon: "line-chart", href: "/kpis" },
  { key: "certificaciones", label: "Certificaciones", icon: "badge-check", href: "/certificaciones" },
  { key: "recursos", label: "Recursos", icon: "folder", href: "/recursos" },
];

// ── Notifications (§19.2) ────────────────────────────────────────────────────
export const NOTIFICATIONS: {
  id: string;
  title: string;
  detail: string;
  time: string;
  type: "cert" | "material" | "review" | "quiz";
  unread: boolean;
}[] = [
  { id: "n1", title: "Certificación pendiente en CM.P01", detail: "Assessment 'Listo para Vender' vence en 3 días", time: "hace 2 h", type: "cert", unread: true },
  { id: "n2", title: "Nuevo material agregado a CM.P03", detail: "Acta de Pipeline Review v2 disponible", time: "hace 5 h", type: "material", unread: true },
  { id: "n3", title: "Revisión requerida en MK.P02", detail: "Brief de campaña Hermes espera tu aprobación", time: "ayer", type: "review", unread: true },
  { id: "n4", title: "Quiz disponible", detail: "Reto Conecta — módulo Onboarding de Fabricante", time: "ayer", type: "quiz", unread: true },
];

// ── Quick links per process (§17) ────────────────────────────────────────────
export function quickLinksFor(p: Process) {
  return [
    { label: `Playbook: ${p.name}`, kind: "playbook" as const },
    { label: "Template: Business Case", kind: "template" as const },
    { label: `Checklist: Evaluación de ${p.domainCode === "CM" ? "Fabricante" : p.name}`, kind: "checklist" as const },
    { label: "Quiz de certificación", kind: "quiz" as const },
  ];
}

// ── Deliverable highlights (§18) ─────────────────────────────────────────────
// CM.P01 mirrors the approved mockup exactly; others derive from the process
// `outputs` string (verbatim source content, split into cards).
const HIGHLIGHTS: Record<string, { title: string; sub: string; done: boolean }[]> = {
  "CM.P01": [
    { title: "Acuerdo firmado", sub: "Documento legal", done: true },
    { title: "Equipo certificado", sub: "Certificaciones aprobadas", done: true },
    { title: "Playbook documentado", sub: "Guía de venta completa", done: true },
    { title: "Campaña activa", sub: "Go-to-market habilitado", done: true },
    { title: "Primer deal cerrado", sub: "Venta replicable validada", done: false },
  ],
};

export function deliverableHighlights(p: Process) {
  if (HIGHLIGHTS[p.code]) return HIGHLIGHTS[p.code];
  // Derive from the source `outputs`, capping to 5 cards.
  return p.ficha.outputs
    .split(/[·,]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 5)
    .map((title, i) => ({
      title: title.charAt(0).toUpperCase() + title.slice(1),
      sub: p.tipo,
      done: i < 2,
    }));
}

// ── Domains dropdown (§19.3) ─────────────────────────────────────────────────
export const DOMAIN_SUMMARY = DOMAINS.map((d) => ({
  code: d.code,
  name: d.name,
  count: d.processes.length,
}));

// ── Global search index (§8) ─────────────────────────────────────────────────
function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const p of ALL_PROCESSES) {
    docs.push({
      kind: "Procesos",
      title: p.name,
      code: p.code,
      domain: DOMAIN_NAME[p.domainCode],
      href: `/proceso/${p.code}`,
    });
  }

  // Documentos — real template catalog
  for (const t of ALL_TEMPLATES) {
    docs.push({
      kind: "Documentos",
      title: t.title,
      code: t.code,
      domain: DOMAIN_NAME[t.domain] ?? "Comunicación",
      href: `/plantillas/${encodeURIComponent(t.code)}`,
    });
  }

  // Playbooks / domain guides
  const playbooks = [
    { title: "Metodología de Ventas Conecta", code: "CM.P05", domain: "Comercial", href: "/proceso/CM.P05" },
    { title: "Plantillas Comerciales", code: "PL.CM", domain: "Comercial", href: "/plantillas?d=CM" },
    { title: "Plantillas Marketing", code: "PL.MK", domain: "Marketing", href: "/plantillas?d=MK" },
    { title: "Plantillas Delivery", code: "PL.DL", domain: "Delivery", href: "/plantillas?d=DL" },
  ];
  for (const pb of playbooks) docs.push({ kind: "Playbooks", ...pb });

  // Blueprints
  docs.push(
    { kind: "Blueprints", title: "Service Blueprint del Cliente", code: "BP.01", domain: "Global", href: "/blueprints" },
    { kind: "Blueprints", title: "Momentos de la Verdad", code: "BP.02", domain: "Global", href: "/blueprints" },
  );

  // Roles
  const roles = [
    "CEO", "Head of Sales / CRO", "Head of Delivery", "Head of Marketing",
    "Ingeniero de Preventa", "Account Manager", "CFO / Director de Finanzas",
    "Vendedor de línea", "Administración (RRHH)",
  ];
  for (const r of roles)
    docs.push({ kind: "Roles", title: r, domain: "Gobierno", href: "/inicio" });

  // Certificaciones
  docs.push(
    { kind: "Certificaciones", title: "Certificación 'Listo para Vender'", code: "CM.P01.E02", domain: "Comercial", href: "/certificaciones" },
    { kind: "Certificaciones", title: "Reto Conecta (quiz)", code: "QUIZ", domain: "Global", href: "/certificaciones" },
    { kind: "Certificaciones", title: "Certificación de Ingenieros", code: "DL.P05", domain: "Delivery", href: "/proceso/DL.P05" },
  );

  return docs;
}

export const SEARCH_INDEX: SearchDoc[] = buildSearchIndex();
