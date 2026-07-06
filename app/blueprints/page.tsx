import { Sparkles } from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Primitives";
import { BP_PRINCIPLE, BP_ROWS, BP_STAGES, MOMENTS } from "@/lib/data/blueprint";

const TONE: Record<string, string> = {
  cliente: "bg-[#FFFBEB]",
  front: "bg-[#FFF6EF]",
  back: "bg-[#F5F1FB]",
  sys: "bg-[#F4F6FA]",
  evid: "bg-[#F0FDF4]",
  std: "bg-[#FDEEF0]",
};

export default function BlueprintsPage() {
  return (
    <AppShell>
      <PageContainer
        eyebrow="Blueprints"
        title="Service Blueprint del Cliente"
        intro="La metodología Conecta es customer-human centric: se diseña desde lo que el cliente vive. Este blueprint recorre el journey completo — de prospecto a promotor — mostrando en cada etapa qué hace el cliente, qué ve, qué pasa detrás, qué sistemas lo soportan y el estándar de experiencia comprometido."
        breadcrumb={[{ label: "Inicio", href: "/inicio" }, { label: "Service Blueprint" }]}
      >
        <Card className="overflow-hidden">
          <div className="overflow-x-auto scroll-slim">
            <table className="w-full min-w-[1100px] border-collapse text-[12.5px]">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 w-[150px] border-b border-r border-line bg-porcelain px-3 py-3 text-left label-caps">
                    Etapa →
                  </th>
                  {BP_STAGES.map((s) => (
                    <th key={s} className="border-b border-l border-line bg-porcelain px-3 py-3 text-left text-[12px] font-bold text-purple-deep">
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BP_ROWS.map((row) => (
                  <tr key={row.zone}>
                    <td className="sticky left-0 z-10 border-b border-r border-line bg-[#F3F0FA] px-3 py-3 align-top text-[11px] font-bold uppercase tracking-wide text-graphite">
                      {row.zone}
                    </td>
                    {row.cells.map((cell, i) => (
                      <td key={i} className={`border-b border-l border-line px-3 py-3 align-top text-graphite ${TONE[row.tone]}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="mt-4 flex gap-3 rounded-xl2 border border-ok/30 bg-[#F0FDF4] p-4">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-ok" />
          <div>
            <div className="text-[13px] font-bold text-ok">{BP_PRINCIPLE.tag}</div>
            <p className="mt-1 text-[13px] leading-relaxed text-graphite">{BP_PRINCIPLE.text}</p>
          </div>
        </div>

        {/* Momentos de la verdad */}
        <h2 className="mb-3 mt-10 text-[20px] font-semibold text-graphite">Momentos de la verdad</h2>
        <p className="mb-4 max-w-2xl text-[14px] text-muted">
          Seis momentos donde la confianza se gana o se pierde de forma desproporcionada. Cada uno tiene dueño, estándar y plantilla.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {MOMENTS.map((m) => (
            <Card key={m.n} className="p-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-purple to-lavender text-[13px] font-bold text-white">
                  {m.n}
                </span>
                <h3 className="text-[15px] font-semibold text-graphite">{m.moment}</h3>
                <span className="mono ml-auto rounded-md bg-lavender-bg px-2 py-0.5 text-[11px] font-semibold text-purple">
                  {m.template}
                </span>
              </div>
              <p className="mt-3 rounded-lg bg-porcelain px-3 py-2 text-[13px] italic text-muted">
                {m.question}
              </p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-graphite">{m.standard}</p>
              <div className="mt-2 text-[12px] text-muted">
                Dueño: <span className="font-medium text-graphite">{m.owner}</span>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </AppShell>
  );
}
