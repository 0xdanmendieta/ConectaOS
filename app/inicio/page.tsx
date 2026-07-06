import {
  ArrowRight,
  BadgeCheck,
  FileStack,
  LayoutTemplate,
  LineChart,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, Pill } from "@/components/ui/Primitives";
import { NexoMascot } from "@/components/brand/NexoMascot";
import {
  ALL_PROCESSES,
  ALL_TEMPLATES,
  DOMAINS,
  PENDIENTES,
  PROGRESS,
  USER,
} from "@/lib/data";

const QUICK = [
  { icon: Workflow, label: "Procesos", meta: `${ALL_PROCESSES.length}`, href: "/procesos" },
  { icon: FileStack, label: "Plantillas", meta: `${ALL_TEMPLATES.length}`, href: "/plantillas" },
  { icon: LayoutTemplate, label: "Blueprint", meta: "Journey", href: "/blueprints" },
  { icon: LineChart, label: "KPIs", meta: "Dashboard", href: "/kpis" },
  { icon: BadgeCheck, label: "Certificaciones", meta: "Quiz", href: "/certificaciones" },
];

export default function InicioPage() {
  return (
    <AppShell>
      <PageContainer
        title={`Hola, ${USER.name.split(" ")[0]} 👋`}
        intro="Este es el sistema operativo de procesos de Conecta: navega, consulta y certifica cómo trabajamos. Empieza por tus pendientes o explora un dominio."
      >
        {/* Progress + Nexo banner */}
        <Card className="mb-6 flex flex-col items-start gap-4 overflow-hidden p-5 sm:flex-row sm:items-center" style={{ background: "linear-gradient(120deg, #FFF6EF 0%, #F5EEFF 60%, #FFFFFF 100%)" }}>
          <NexoMascot size={56} className="nexo-float" />
          <div className="flex-1">
            <div className="text-[15px] font-semibold text-graphite">
              Vas al {PROGRESS.pct}% · Nivel {PROGRESS.level}
            </div>
            <div className="mt-1 text-[13px] text-muted">
              {PROGRESS.points} / {PROGRESS.pointsTotal} pts — completa tus certificaciones para subir de nivel.
            </div>
            <div className="mt-2.5 h-2 max-w-md overflow-hidden rounded-full bg-lavender-light">
              <div className="h-full rounded-full bg-gradient-to-r from-purple to-nexo" style={{ width: `${PROGRESS.pct}%` }} />
            </div>
          </div>
          <Link href="/certificaciones" className="shrink-0">
            <span className="focus-ring inline-flex items-center gap-1.5 rounded-[10px] bg-gradient-to-b from-purple to-purple-deep px-4 py-2 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(109,30,212,0.28)]">
              Ir al Reto <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </Card>

        {/* Quick access */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {QUICK.map((q) => (
            <Link
              key={q.label}
              href={q.href}
              className="group flex flex-col items-start gap-3 rounded-xl2 border border-line bg-white p-4 shadow-card transition-all hover:-translate-y-1 hover:border-lavender hover:shadow-card-hover"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-lavender-bg text-purple group-hover:bg-purple group-hover:text-white">
                <q.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[14px] font-semibold text-graphite">{q.label}</div>
                <div className="text-[12px] text-muted">{q.meta}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Process map by domain */}
          <section>
            <h2 className="mb-3 text-[18px] font-semibold text-graphite">Mapa de procesos</h2>
            <div className="space-y-3">
              {DOMAINS.map((d) => (
                <Card key={d.code} className="p-4">
                  <div className="mb-2.5 flex items-center gap-2.5">
                    <span className="mono grid h-7 w-9 place-items-center rounded-md bg-purple text-[12px] font-bold text-white">
                      {d.code}
                    </span>
                    <h3 className="text-[15px] font-semibold text-graphite">{d.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {d.processes.map((p) => (
                      <Link
                        key={p.code}
                        href={`/proceso/${p.code}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[12px] text-graphite transition-colors hover:border-lavender hover:bg-lavender-bg"
                      >
                        <span className="mono font-semibold text-purple">{p.code}</span>
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Pendientes preview */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[18px] font-semibold text-graphite">Tus pendientes</h2>
              <Link href="/pendientes" className="text-[13px] font-medium text-purple hover:text-purple-deep">
                Ver todos
              </Link>
            </div>
            <div className="space-y-2.5">
              {PENDIENTES.slice(0, 5).map((p) => (
                <Link key={p.id} href={`/proceso/${p.process}`}>
                  <Card className="p-3.5 transition-all hover:border-lavender hover:shadow-card-hover">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-[13px] font-semibold leading-snug text-graphite">{p.title}</h3>
                      <Pill tone={p.priority === "alta" ? "warn" : "neutral"}>{p.priority}</Pill>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[12px] text-muted">
                      <span className="mono font-semibold text-purple">{p.process}</span>
                      <span>{p.due}</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </PageContainer>
    </AppShell>
  );
}
