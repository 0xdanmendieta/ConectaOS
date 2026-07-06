import {
  BadgeCheck,
  BookOpen,
  FileStack,
  LayoutTemplate,
  LineChart,
  MessageSquare,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Primitives";
import { ALL_PROCESSES, ALL_TEMPLATES } from "@/lib/data";
import { TEMPLATES_CX } from "@/lib/data/templates";

const RESOURCES: {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  meta: string;
}[] = [
  { icon: FileStack, title: "Plantillas y documentos", desc: "Todos los formatos de entregables listos para copiar a HubSpot, documento o correo.", href: "/plantillas", meta: `${ALL_TEMPLATES.length} plantillas` },
  { icon: MessageSquare, title: "Comunicación con clientes", desc: "Textos modelo C01–C10: primer contacto, minutas, propuestas, soporte, renovación, QBR.", href: "/plantillas?d=CX", meta: `${TEMPLATES_CX.length} plantillas` },
  { icon: LayoutTemplate, title: "Service Blueprint", desc: "El journey del cliente de prospecto a promotor + los 6 momentos de la verdad.", href: "/blueprints", meta: "Journey end-to-end" },
  { icon: Workflow, title: "Procesos", desc: "Las fichas operativas con BPMN, procedimiento, roles, entregables, handoffs y KPIs.", href: "/procesos", meta: `${ALL_PROCESSES.length} procesos` },
  { icon: LineChart, title: "KPIs y Métricas", desc: "Dashboard de negocio con metas 2026, benchmarks, fuentes y dueño por métrica.", href: "/kpis", meta: "Dashboard company-wide" },
  { icon: BadgeCheck, title: "Certificaciones y Reto", desc: "Ruta de certificación 'Listo para Vender', ingenieros y el quiz Reto Conecta.", href: "/certificaciones", meta: "Quiz + certificaciones" },
  { icon: BookOpen, title: "Metodología de Ventas", desc: "El playbook Conecta: cómo se vende tecnología financiera en México (CM.P05).", href: "/proceso/CM.P05", meta: "Playbook vivo" },
];

export default function RecursosPage() {
  return (
    <AppShell>
      <PageContainer
        eyebrow="Recursos"
        title="Biblioteca de recursos"
        intro="Todo el material del sistema operativo en un solo lugar: plantillas, blueprint, métricas, certificaciones y la metodología. Nada se pierde."
        breadcrumb={[{ label: "Inicio", href: "/inicio" }, { label: "Recursos" }]}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className="group flex flex-col rounded-xl2 border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:border-lavender hover:shadow-card-hover"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-lavender-bg text-purple transition-colors group-hover:bg-purple group-hover:text-white">
                <r.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-[16px] font-semibold text-graphite group-hover:text-purple-deep">
                {r.title}
              </h3>
              <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">{r.desc}</p>
              <span className="mt-4 text-[12px] font-medium text-purple">{r.meta} →</span>
            </Link>
          ))}
        </div>
      </PageContainer>
    </AppShell>
  );
}
