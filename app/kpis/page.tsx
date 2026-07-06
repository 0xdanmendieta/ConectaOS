import { LayoutDashboard } from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, Pill } from "@/components/ui/Primitives";
import { DASHBOARDS, GOALS_2026, KPI_GROUPS } from "@/lib/data/kpis";

export default function KpisPage() {
  return (
    <AppShell>
      <PageContainer
        eyebrow="Gobierno · Métricas"
        title="Dashboard de Negocio"
        intro="Las métricas que la dirección revisa cada semana/mes, con benchmark, fuente y un solo dueño por métrica. Implementación: dashboards nativos de HubSpot + hoja financiera del CFO."
        breadcrumb={[{ label: "Inicio", href: "/inicio" }, { label: "KPIs y Métricas" }]}
      >
        {/* Goals 2026 */}
        <h2 className="mb-3 text-[18px] font-semibold text-graphite">Metas 2026 (contexto)</h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto scroll-slim">
            <table className="w-full min-w-[640px] border-collapse text-[13px]">
              <thead>
                <tr className="bg-porcelain text-left">
                  {GOALS_2026.headers.map((h) => (
                    <th key={h} className="label-caps whitespace-nowrap px-4 py-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GOALS_2026.rows.map((row, i) => {
                  const isTotal = row[0] === "Total";
                  return (
                    <tr key={i} className={`border-t border-line ${isTotal ? "bg-lavender-bg/50 font-semibold" : ""}`}>
                      {row.map((cell, j) => (
                        <td key={j} className={`px-4 py-3 ${j === 0 ? "font-medium text-graphite" : "text-muted"} ${isTotal ? "text-graphite" : ""}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* KPI groups */}
        {KPI_GROUPS.map((g) => (
          <section key={g.title} className="mt-8">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-[18px] font-semibold text-graphite">{g.title}</h2>
              <Pill tone="lavender">{g.cadence}</Pill>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.kpis.map((k, i) => (
                <Card key={i} className="flex flex-col p-4">
                  <div className="text-[13px] font-medium leading-snug text-graphite">{k.metric}</div>
                  <div className="mt-2 text-[19px] font-bold tracking-tight text-purple-deep">{k.benchmark}</div>
                  <div className="mt-auto pt-3 text-[12px] text-muted">
                    <div>Fuente: {k.source}</div>
                    <div className="mt-0.5">
                      Dueño: <span className="font-medium text-graphite">{k.owner}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}

        {/* Dashboards */}
        <section className="mt-10">
          <h2 className="mb-3 text-[18px] font-semibold text-graphite">
            Semáforo de implementación en HubSpot
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {DASHBOARDS.map((d) => (
              <Card key={d.name} className="p-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-lavender-bg text-purple">
                    <LayoutDashboard className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="text-[14px] font-semibold text-graphite">{d.name}</h3>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{d.content}</p>
                <div className="mt-2 text-[12px] text-purple">{d.audience}</div>
              </Card>
            ))}
          </div>
        </section>
      </PageContainer>
    </AppShell>
  );
}
