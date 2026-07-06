import { notFound } from "next/navigation";
import { MessageSquareHeart } from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { ProcessHeader } from "@/components/process/ProcessHeader";
import { ProcessMetadata } from "@/components/process/ProcessMetadata";
import { SummaryCards } from "@/components/process/SummaryCards";
import { ProcessTabs } from "@/components/process/ProcessTabs";
import { ALL_PROCESSES, getProcess } from "@/lib/data";

export function generateStaticParams() {
  return ALL_PROCESSES.map((p) => ({ code: p.code }));
}

export default function ProcessPage({ params }: { params: { code: string } }) {
  const code = decodeURIComponent(params.code);
  const p = getProcess(code);
  if (!p) notFound();

  return (
    <AppShell activeCode={p.code}>
      <div className="mx-auto max-w-[1240px] px-4 pb-16 pt-7 sm:px-6 lg:px-10">
        <ProcessHeader p={p} />

        <div className="mt-6">
          <ProcessMetadata p={p} />
        </div>

        <div className="mt-6">
          <SummaryCards p={p} />
        </div>

        {p.touchpoints && (
          <div className="mt-4 flex gap-3 rounded-xl2 border border-lavender-light bg-lavender-bg/50 px-4 py-3">
            <MessageSquareHeart className="mt-0.5 h-[18px] w-[18px] shrink-0 text-purple" />
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-wide text-purple-deep">
                Touchpoints con el cliente · experiencia homogénea
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">{p.touchpoints}</p>
            </div>
          </div>
        )}

        <div className="mt-7">
          <ProcessTabs p={p} />
        </div>

        <footer className="mt-12 border-t border-line pt-5 text-[12px] text-muted">
          Conecta OS · Sistema Operativo de Procesos · Proceso {p.code} — {p.version}
        </footer>
      </div>
    </AppShell>
  );
}
