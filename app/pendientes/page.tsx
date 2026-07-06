import {
  BadgeCheck,
  ClipboardList,
  FileText,
  Gamepad2,
  Search,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, Pill } from "@/components/ui/Primitives";
import { PENDIENTES } from "@/lib/data";

const TYPE_ICON: Record<string, LucideIcon> = {
  cert: BadgeCheck,
  quiz: Gamepad2,
  review: Search,
  material: FileText,
  task: ClipboardList,
};
const PRIORITY_TONE = { alta: "warn", media: "lavender", baja: "neutral" } as const;

export default function PendientesPage() {
  return (
    <AppShell>
      <PageContainer
        eyebrow="Mis pendientes"
        title="Mis pendientes"
        intro={`Tienes ${PENDIENTES.length} pendientes activos. Cada uno está ligado a un proceso y su entregable — da clic para ir directo al material.`}
        breadcrumb={[{ label: "Inicio", href: "/inicio" }, { label: "Mis pendientes" }]}
      >
        <div className="space-y-2.5">
          {PENDIENTES.map((p) => {
            const Icon = TYPE_ICON[p.type] ?? ClipboardList;
            return (
              <Link key={p.id} href={`/proceso/${p.process}`} className="block">
                <Card className="flex items-center gap-4 p-4 transition-all hover:-translate-y-0.5 hover:border-lavender hover:shadow-card-hover">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lavender-bg text-purple">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[14px] font-semibold text-graphite">{p.title}</h3>
                      <Pill tone={PRIORITY_TONE[p.priority]}>{p.priority}</Pill>
                    </div>
                    <p className="mt-0.5 text-[13px] text-muted">{p.detail}</p>
                  </div>
                  <div className="hidden shrink-0 text-right sm:block">
                    <div className="mono text-[12px] font-semibold text-purple">{p.process}</div>
                    <div className="mt-0.5 text-[12px] text-muted">{p.due}</div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </PageContainer>
    </AppShell>
  );
}
