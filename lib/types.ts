// Domain model for Conecta OS — mirrors the structure of the source process docs.

export type BpmnLane = {
  id: string;
  label: string;
  color: "orange" | "blue" | "teal" | "purple" | "yellow" | "gray";
  interaction?: boolean;
};

export type BpmnNodeType = "start" | "end" | "task" | "gateway" | "doc";

export type BpmnNode = {
  id: string;
  lane: string;
  col: number;
  type: BpmnNodeType;
  label: string[];
  href?: string;
};

export type BpmnFlow = {
  f: string;
  t: string;
  label?: string;
  dashed?: boolean;
  loop?: boolean;
};

export type BpmnDef = {
  lanes: BpmnLane[];
  nodes: BpmnNode[];
  flows: BpmnFlow[];
  caption?: string;
};

export type Ficha = {
  owner: string;
  trigger: string;
  inputs: string;
  outputs: string;
  duracion: string;
  herramientas: string;
  metricaExito: string;
};

export type Step = {
  paso: string;
  quien: string;
  accion: string;
  herramienta: string;
  criterio: string;
  tiempo: string;
};

export type Entregable = {
  codigo: string;
  entregable: string;
  fase?: string;
};

export type Handoff = {
  n: string;
  entrega: string;
  recibe: string;
  que: string;
  cuando: string;
  criterio: string;
};

export type Metrica = {
  metrica: string;
  meta: string;
  fuente: string;
};

export type Callout = {
  type: "ok" | "rule" | "risk" | "warn";
  tag: string;
  text: string;
};

export type Criticidad = "Alta" | "Media" | "Baja";
export type Estado = "Activo" | "En revisión" | "Borrador";

export type Process = {
  code: string;
  name: string;
  description: string;
  domainCode: string; // e.g. "CM"
  // Header meta (mockup metadata row)
  estado: Estado;
  version: string;
  ultimaActualizacion: string;
  criticidad: Criticidad;
  tipo: string; // Tipo de proceso, e.g. "Estratégico"
  clasificacion: string[];
  dependencias: string[];
  participantes: string;
  ficha: Ficha;
  bpmn: BpmnDef;
  steps: Step[];
  touchpoints: string;
  entregables: Entregable[];
  handoffs: Handoff[];
  metricas: Metrica[];
  callouts: Callout[];
};

export type Domain = {
  code: string; // "CM"
  name: string; // "Comercial"
  processes: { code: string; name: string }[];
};

// ── Document templates (plantillas) ─────────────────────────────────────────
export type TemplateBlock =
  | { type: "fields"; rows: { label: string; value: string }[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; tag: string; text: string }
  | { type: "note"; text: string };

export type TemplateDoc = {
  code: string;
  title: string;
  domain: string; // CM | MK | DL | OP | FI | CX
  usedIn?: string; // process code(s)
  blocks: TemplateBlock[];
};

// ── Quiz ────────────────────────────────────────────────────────────────────
export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  why: string;
  ref: string; // process code to review
};

// ── KPI dashboard ────────────────────────────────────────────────────────────
export type Kpi = {
  metric: string;
  benchmark: string;
  source: string;
  owner: string;
};
export type KpiGroup = { title: string; cadence: string; kpis: Kpi[] };

export type SearchDoc = {
  kind:
    | "Procesos"
    | "Playbooks"
    | "Blueprints"
    | "Roles"
    | "Documentos"
    | "Certificaciones";
  title: string;
  code?: string;
  domain?: string;
  href: string;
};
