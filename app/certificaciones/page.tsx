import { Award, GraduationCap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, Pill } from "@/components/ui/Primitives";
import { Quiz } from "@/components/quiz/Quiz";
import { QUIZ } from "@/lib/data/quiz";

const CERTS = [
  {
    icon: ShieldCheck,
    title: "Listo para Vender",
    code: "CM.P01.E02",
    desc: "Pitch de 2 min, manejo de 3 objeciones y pricing sin ayuda. Mínimo 80% · vigencia 6 meses.",
    href: "/plantillas/CM.P01.E02",
    status: "Pendiente",
    tone: "warn" as const,
  },
  {
    icon: GraduationCap,
    title: "Certificación de Ingenieros",
    code: "DL.P05",
    desc: "Deployment completo en sandbox + evaluación práctica ≥ 80%. Sin ella no se ejecutan demos ni deployments de la línea.",
    href: "/proceso/DL.P05",
    status: "Vigente",
    tone: "success" as const,
  },
  {
    icon: Award,
    title: "Reto Conecta",
    code: "QUIZ",
    desc: `${QUIZ.length} preguntas sobre todo el sistema operativo. Respuesta inmediata y repaso guiado.`,
    href: "#reto",
    status: "Disponible",
    tone: "lavender" as const,
  },
];

export default function CertificacionesPage() {
  return (
    <AppShell>
      <PageContainer
        eyebrow="Certificaciones"
        title="Certificaciones y Reto Conecta"
        intro="La misma vara para todos: nadie ejecuta sin certificación vigente. Aquí está tu ruta de certificación y el reto para probar qué tanto te sabes el sistema operativo."
        breadcrumb={[{ label: "Inicio", href: "/inicio" }, { label: "Certificaciones" }]}
      >
        <div className="grid gap-3 md:grid-cols-3">
          {CERTS.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group flex flex-col rounded-xl2 border border-line bg-white p-4 shadow-card transition-all hover:-translate-y-1 hover:border-lavender hover:shadow-card-hover"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-lavender-bg text-purple">
                  <c.icon className="h-5 w-5" />
                </span>
                <Pill tone={c.tone}>{c.status}</Pill>
              </div>
              <h3 className="mt-3 text-[15px] font-semibold text-graphite group-hover:text-purple-deep">
                {c.title}
              </h3>
              <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">{c.desc}</p>
              <span className="mono mt-3 text-[11px] font-semibold text-purple">{c.code}</span>
            </Link>
          ))}
        </div>

        <div id="reto" className="mt-10 scroll-mt-24">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-2xl">🎮</span>
            <h2 className="text-[20px] font-semibold text-graphite">Reto Conecta</h2>
          </div>
          <p className="mb-4 max-w-2xl text-[14px] text-muted">
            {QUIZ.length} preguntas para probar qué tanto te sabes el sistema — incluye los deals con
            hardware de fabricante. Respuesta inmediata, link para repasar y tu score al final.
            Nadie te está calificando… pero tu racha sí cuenta. 😏
          </p>
          <div className="max-w-2xl">
            <Quiz />
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}
