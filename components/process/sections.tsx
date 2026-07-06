"use client";

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CircleDot,
  GitCommitHorizontal,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Card, Pill } from "@/components/ui/Primitives";
import type { Process } from "@/lib/types";

// ── Steps / procedure table ──────────────────────────────────────────────────
export function StepsTable({ p }: { p: Process }) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-line px-4 py-3">
        <h3 className="text-sm font-semibold text-graphite">Procedimiento paso a paso</h3>
      </div>
      <div className="overflow-x-auto scroll-slim">
        <table className="w-full min-w-[720px] border-collapse text-[13px]">
          <thead>
            <tr className="bg-porcelain text-left">
              {["Paso", "Quién", "Acción concreta", "Herramienta", "Criterio de salida", "Tiempo"].map(
                (h) => (
                  <th key={h} className="label-caps whitespace-nowrap px-4 py-2.5 font-semibold">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {p.steps.map((s) => (
              <tr key={s.paso} className="border-t border-line align-top hover:bg-lavender-bg/30">
                <td className="px-4 py-3">
                  <span className="mono grid h-6 w-6 place-items-center rounded-md bg-lavender-bg text-[12px] font-bold text-purple">
                    {s.paso}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-graphite">{s.quien}</td>
                <td className="px-4 py-3 text-muted">{s.accion}</td>
                <td className="px-4 py-3 text-muted">{s.herramienta}</td>
                <td className="px-4 py-3 text-muted">{s.criterio}</td>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-purple-deep">{s.tiempo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ── Roles ─────────────────────────────────────────────────────────────────────
export function RolesSection({ p }: { p: Process }) {
  const map = new Map<string, string[]>();
  p.steps.forEach((s) => {
    const list = map.get(s.quien) ?? [];
    list.push(s.accion);
    map.set(s.quien, list);
  });
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Array.from(map.entries()).map(([role, actions]) => (
        <Card key={role} className="p-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-purple to-lavender text-[12px] font-bold text-white">
              {role
                .split(/[+/]/)[0]
                .trim()
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
            <h4 className="text-sm font-semibold text-graphite">{role}</h4>
          </div>
          <ul className="mt-3 space-y-1.5">
            {actions.map((a, i) => (
              <li key={i} className="flex gap-2 text-[13px] text-muted">
                <CircleDot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lavender" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

// ── Tools ─────────────────────────────────────────────────────────────────────
export function ToolsSection({ p }: { p: Process }) {
  const tools = p.ficha.herramientas
    .split(/[,·]|\s\+\s/)
    .map((t) => t.trim())
    .filter(Boolean);
  return (
    <div className="space-y-3">
      <Card className="p-4">
        <h3 className="mb-3 text-sm font-semibold text-graphite">Herramientas y registros</h3>
        <div className="flex flex-wrap gap-2">
          {tools.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-[13px] font-medium text-graphite shadow-sm"
            >
              <Wrench className="h-3.5 w-3.5 text-purple" />
              {t}
            </span>
          ))}
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="mb-1.5 text-sm font-semibold text-graphite">Herramientas por paso</h3>
        <div className="divide-y divide-line/70">
          {p.steps.map((s) => (
            <div key={s.paso} className="flex items-center justify-between gap-4 py-2.5 text-[13px]">
              <span className="text-muted">
                <span className="mono mr-2 font-semibold text-purple">{s.paso}</span>
                {s.quien}
              </span>
              <span className="text-right font-medium text-graphite">{s.herramienta}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── Checklist ───────────────────────────────────────────────────────────────
export function ChecklistSection({ p }: { p: Process }) {
  return (
    <Card className="p-4">
      <h3 className="mb-3 text-sm font-semibold text-graphite">
        Checklist de ejecución · {p.steps.length} pasos
      </h3>
      <div className="space-y-2">
        {p.steps.map((s, i) => (
          <div
            key={s.paso}
            className="flex items-start gap-3 rounded-xl border border-line p-3 transition-colors hover:bg-lavender-bg/40"
          >
            <span
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                i < 3 ? "border-ok bg-ok text-white" : "border-lavender-light bg-white text-transparent"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-graphite">{s.accion}</p>
              <p className="mt-0.5 text-[12px] text-muted">
                <span className="font-medium text-purple-deep">Criterio:</span> {s.criterio} ·{" "}
                <span className="text-muted">{s.tiempo}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Risks / rules ─────────────────────────────────────────────────────────────
const CALLOUT_STYLE = {
  ok: { icon: CheckCircle2, ring: "border-ok/30 bg-[#F0FDF4]", tag: "text-ok" },
  rule: { icon: ShieldCheck, ring: "border-lavender-light bg-lavender-bg/60", tag: "text-purple-deep" },
  risk: { icon: AlertTriangle, ring: "border-nexo/30 bg-nexo-cream", tag: "text-[#9A4A0F]" },
  warn: { icon: AlertTriangle, ring: "border-nexo/30 bg-nexo-cream", tag: "text-[#9A4A0F]" },
} as const;

export function RisksSection({ p }: { p: Process }) {
  if (p.callouts.length === 0) {
    return (
      <Card className="p-6 text-center text-sm text-muted">
        Este proceso no tiene riesgos ni reglas destacadas documentadas.
      </Card>
    );
  }
  return (
    <div className="space-y-3">
      {p.callouts.map((c, i) => {
        const st = CALLOUT_STYLE[c.type];
        const Icon = st.icon;
        return (
          <div key={i} className={`flex gap-3 rounded-xl2 border p-4 ${st.ring}`}>
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${st.tag}`} />
            <div>
              <div className={`text-[13px] font-bold ${st.tag}`}>{c.tag}</div>
              <p className="mt-1 text-[13px] leading-relaxed text-graphite">{c.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Materials (deliverables + handoffs) ─────────────────────────────────────
export function MaterialsSection({ p }: { p: Process }) {
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="border-b border-line px-4 py-3">
          <h3 className="text-sm font-semibold text-graphite">Entregables</h3>
        </div>
        <div className="divide-y divide-line/70">
          {p.entregables.map((e) => (
            <div key={e.codigo} className="flex items-center gap-3 px-4 py-3 hover:bg-lavender-bg/30">
              <span className="mono rounded-md bg-lavender-bg px-2 py-1 text-[12px] font-semibold text-purple">
                {e.codigo}
              </span>
              <span className="flex-1 text-[13px] text-graphite">{e.entregable}</span>
              {e.fase && <Pill tone="neutral">{e.fase}</Pill>}
            </div>
          ))}
          {p.entregables.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-muted">Sin entregables listados.</div>
          )}
        </div>
      </Card>

      {p.handoffs.length > 0 && (
        <Card className="overflow-hidden">
          <div className="border-b border-line px-4 py-3">
            <h3 className="text-sm font-semibold text-graphite">Handoffs</h3>
          </div>
          <div className="overflow-x-auto scroll-slim">
            <table className="w-full min-w-[680px] border-collapse text-[13px]">
              <thead>
                <tr className="bg-porcelain text-left">
                  {["#", "Entrega", "Recibe", "Qué", "Cuándo", "Criterio de calidad"].map((h) => (
                    <th key={h} className="label-caps whitespace-nowrap px-4 py-2.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.handoffs.map((h) => (
                  <tr key={h.n} className="border-t border-line align-top hover:bg-lavender-bg/30">
                    <td className="px-4 py-3">
                      <span className="mono font-bold text-purple">{h.n}</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 font-medium text-graphite">
                        {h.entrega} <ArrowRight className="h-3 w-3 text-muted" />
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-graphite">{h.recibe}</td>
                    <td className="px-4 py-3 text-muted">{h.que}</td>
                    <td className="px-4 py-3 text-muted">{h.cuando}</td>
                    <td className="px-4 py-3 text-muted">{h.criterio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

// ── KPIs / metrics ────────────────────────────────────────────────────────────
export function KpisSection({ p }: { p: Process }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {p.metricas.map((m, i) => (
          <Card key={i} className="p-4">
            <div className="text-[13px] leading-snug text-muted">{m.metrica}</div>
            <div className="mt-2 text-[22px] font-bold tracking-tight text-purple-deep">{m.meta}</div>
            <div className="mt-1 text-[12px] text-muted">Fuente: {m.fuente}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── History ───────────────────────────────────────────────────────────────────
export function HistorySection({ p }: { p: Process }) {
  const events = [
    { v: p.version, date: p.ultimaActualizacion, text: "Versión vigente publicada", cur: true },
    { v: "v1.0", date: "Ene 2025", text: "Publicación inicial del proceso en Conecta OS" },
  ];
  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-graphite">Historial de versiones</h3>
      <div className="relative space-y-5 pl-6">
        <span className="absolute left-[7px] top-1 bottom-1 w-px bg-line" />
        {events.map((e, i) => (
          <div key={i} className="relative">
            <span
              className={`absolute -left-6 top-0.5 grid h-3.5 w-3.5 place-items-center rounded-full ${
                e.cur ? "bg-purple" : "bg-lavender-light"
              }`}
            >
              <GitCommitHorizontal className="h-2.5 w-2.5 text-white" />
            </span>
            <div className="flex items-center gap-2">
              <span className="mono text-[13px] font-bold text-purple">{e.v}</span>
              {e.cur && <Pill tone="success">actual</Pill>}
              <span className="text-[12px] text-muted">· {e.date}</span>
            </div>
            <p className="mt-0.5 text-[13px] text-muted">{e.text}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
