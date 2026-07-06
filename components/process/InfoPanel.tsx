"use client";

import {
  BookOpen,
  CheckSquare,
  Clock,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers,
  Network,
  Tag,
  Users,
} from "lucide-react";
import { Pill } from "@/components/ui/Primitives";
import { quickLinksFor } from "@/lib/data";
import type { Process } from "@/lib/types";

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Clock;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 py-2.5">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-lavender-bg text-purple">
        <Icon className="h-[15px] w-[15px]" />
      </span>
      <div className="min-w-0">
        <div className="text-[12px] text-muted">{label}</div>
        <div className="mt-0.5 text-[13px] font-medium leading-snug text-graphite">
          {children}
        </div>
      </div>
    </div>
  );
}

const QL_ICON = {
  playbook: BookOpen,
  template: FileText,
  checklist: CheckSquare,
  quiz: GraduationCap,
} as const;

export function InfoPanel({ p }: { p: Process }) {
  const links = quickLinksFor(p);
  return (
    <div className="space-y-4">
      {/* Información clave */}
      <div className="rounded-xl2 border border-line bg-white p-4 shadow-card">
        <h3 className="mb-1 text-sm font-semibold text-graphite">Información clave</h3>
        <div className="divide-y divide-line/70">
          <Row icon={Clock} label="Duración total">
            {p.ficha.duracion.replace(/^(Frecuencia|SLA|Tiempos|Duración objetivo):\s*/i, "")}
          </Row>
          <Row icon={Users} label="Participantes clave">
            {p.participantes}
          </Row>
          <Row icon={Network} label="Dependencias">
            <span className="flex flex-wrap gap-1">
              {p.dependencias.map((d) => (
                <span key={d} className="mono text-[12px] font-semibold text-purple">
                  {d}
                </span>
              ))}
            </span>
          </Row>
          <Row icon={Layers} label="Tipo de proceso">
            {p.tipo}
          </Row>
          <Row icon={Tag} label="Clasificación">
            <span className="flex flex-wrap gap-1.5">
              {p.clasificacion.map((c) => (
                <Pill key={c}>{c}</Pill>
              ))}
            </span>
          </Row>
        </div>
      </div>

      {/* Enlaces rápidos */}
      <div className="rounded-xl2 border border-line bg-white p-4 shadow-card">
        <h3 className="mb-2 text-sm font-semibold text-graphite">Enlaces rápidos</h3>
        <div className="space-y-0.5">
          {links.map((l) => {
            const Icon = QL_ICON[l.kind];
            return (
              <button
                key={l.label}
                className="group flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-lavender-bg"
              >
                <Icon className="h-4 w-4 shrink-0 text-purple" />
                <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-graphite">
                  {l.label}
                </span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
