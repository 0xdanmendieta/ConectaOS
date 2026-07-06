import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { TemplateBlocks } from "@/components/templates/TemplateBlocks";
import { Button } from "@/components/ui/Button";
import { ALL_TEMPLATES, getProcess, getTemplate, templateUsedIn } from "@/lib/data";

export function generateStaticParams() {
  return ALL_TEMPLATES.map((t) => ({ code: t.code }));
}

export default function TemplatePage({ params }: { params: { code: string } }) {
  const code = decodeURIComponent(params.code);
  const t = getTemplate(code);
  if (!t) notFound();

  const usedIn = templateUsedIn(t);
  const proc = getProcess(usedIn);

  return (
    <AppShell activeCode={proc?.code ?? ""}>
      <PageContainer
        eyebrow={`Plantilla · ${t.code}`}
        title={t.title}
        breadcrumb={[
          { label: "Inicio", href: "/inicio" },
          { label: "Plantillas", href: "/plantillas" },
          { label: t.code },
        ]}
        actions={
          proc ? (
            <Link href={`/proceso/${proc.code}`}>
              <Button variant="secondary">
                Ver proceso {proc.code} <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          ) : undefined
        }
      >
        <div className="mb-5 flex flex-wrap items-center gap-2 text-[13px] text-muted">
          <Link href="/plantillas" className="inline-flex items-center gap-1.5 font-medium text-purple hover:text-purple-deep">
            <ArrowLeft className="h-4 w-4" /> Todas las plantillas
          </Link>
          <span className="text-muted/50">·</span>
          <span>
            Se usa en{" "}
            {proc ? (
              <Link href={`/proceso/${proc.code}`} className="font-medium text-purple">
                {usedIn}
              </Link>
            ) : (
              <span className="font-medium text-purple">{usedIn}</span>
            )}
          </span>
        </div>

        <div className="max-w-3xl">
          <TemplateBlocks blocks={t.blocks} />
        </div>

        <p className="mt-6 max-w-3xl text-[12px] text-muted">
          Los [corchetes] se sustituyen siempre. Para imprimir o guardar como PDF: Ctrl/Cmd+P.
        </p>
      </PageContainer>
    </AppShell>
  );
}
