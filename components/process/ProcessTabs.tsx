"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  FolderOpen,
  History,
  LayoutGrid,
  LineChart,
  ListChecks,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BpmnViewer } from "@/components/bpmn/BpmnViewer";
import type { Process } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DeliverablesGrid } from "./DeliverablesGrid";
import { InfoPanel } from "./InfoPanel";
import {
  ChecklistSection,
  HistorySection,
  KpisSection,
  MaterialsSection,
  RisksSection,
  RolesSection,
  StepsTable,
  ToolsSection,
} from "./sections";

const TABS = [
  { key: "resumen", label: "Resumen", icon: LayoutGrid },
  { key: "flujo", label: "Flujo BPMN", icon: Workflow },
  { key: "roles", label: "Roles", icon: Users },
  { key: "herramientas", label: "Herramientas", icon: Wrench },
  { key: "checklist", label: "Checklist", icon: ListChecks },
  { key: "riesgos", label: "Riesgos", icon: AlertTriangle },
  { key: "materiales", label: "Materiales", icon: FolderOpen },
  { key: "kpis", label: "KPIs", icon: LineChart },
  { key: "historial", label: "Historial", icon: History },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function ProcessTabs({ p }: { p: Process }) {
  const [tab, setTab] = useState<TabKey>("resumen");
  const railRef = useRef<HTMLDivElement>(null);

  // Read ?tab= on mount (avoids Suspense requirement of useSearchParams).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("tab");
    if (q && TABS.some((t) => t.key === q)) setTab(q as TabKey);
  }, []);

  return (
    <div>
      {/* Tab rail */}
      <div
        ref={railRef}
        className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto border-b border-line px-1"
      >
        {TABS.map((t) => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "relative flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-[13px] font-medium transition-colors",
                active ? "text-purple-deep" : "text-muted hover:text-purple",
              )}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
              {active && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-purple"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="pt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {tab === "resumen" && (
              <div className="space-y-6">
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
                  <BpmnViewer def={p.bpmn} code={p.code} />
                  <InfoPanel p={p} />
                </div>
                <DeliverablesGrid p={p} />
              </div>
            )}

            {tab === "flujo" && (
              <div className="space-y-5">
                <BpmnViewer def={p.bpmn} code={p.code} />
                <StepsTable p={p} />
              </div>
            )}

            {tab === "roles" && <RolesSection p={p} />}
            {tab === "herramientas" && <ToolsSection p={p} />}
            {tab === "checklist" && <ChecklistSection p={p} />}
            {tab === "riesgos" && <RisksSection p={p} />}
            {tab === "materiales" && <MaterialsSection p={p} />}
            {tab === "kpis" && <KpisSection p={p} />}
            {tab === "historial" && <HistorySection p={p} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
