import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, Pill } from "@/components/ui/Primitives";
import { ALL_PROCESSES, DOMAINS } from "@/lib/data";

export default function ProcesosPage() {
  return (
    <AppShell>
      <PageContainer
        eyebrow="Procesos"
        title="Todos los procesos"
        intro={`${ALL_PROCESSES.length} procesos operativos organizados en ${DOMAINS.length} dominios. Cada ficha incluye BPMN, procedimiento, roles, entregables, handoffs y KPIs.`}
        breadcrumb={[{ label: "Inicio", href: "/inicio" }, { label: "Procesos" }]}
      >
        <div className="space-y-8">
          {DOMAINS.map((d) => (
            <section key={d.code}>
              <div className="mb-3 flex items-center gap-2.5">
                <span className="mono grid h-8 w-10 place-items-center rounded-md bg-purple text-[13px] font-bold text-white">
                  {d.code}
                </span>
                <h2 className="text-[18px] font-semibold text-graphite">{d.name}</h2>
                <span className="text-[13px] text-muted">· {d.processes.length} procesos</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {d.processes.map((pref) => {
                  const p = ALL_PROCESSES.find((x) => x.code === pref.code)!;
                  return (
                    <Link
                      key={p.code}
                      href={`/proceso/${p.code}`}
                      className="group flex flex-col rounded-xl2 border border-line bg-white p-4 shadow-card transition-all hover:-translate-y-1 hover:border-lavender hover:shadow-card-hover"
                    >
                      <div className="flex items-center justify-between">
                        <span className="mono rounded-md bg-lavender-bg px-2 py-1 text-[12px] font-semibold text-purple">
                          {p.code}
                        </span>
                        <Pill tone={p.criticidad === "Alta" ? "warn" : "neutral"}>{p.criticidad}</Pill>
                      </div>
                      <h3 className="mt-3 text-[15px] font-semibold leading-snug text-graphite group-hover:text-purple-deep">
                        {p.name}
                      </h3>
                      <p className="mt-1.5 line-clamp-3 flex-1 text-[13px] leading-relaxed text-muted">
                        {p.description}
                      </p>
                      <div className="mt-3 text-[12px] text-muted">{p.tipo}</div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </PageContainer>
    </AppShell>
  );
}
