"use client";

import {
  ChevronDown,
  CheckCircle2,
  Copy,
  Download,
  FileDown,
  Flag,
  Link2,
  Mail,
  Share2,
  Slack,
  Star,
  Upload,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CodeBadge } from "@/components/ui/Primitives";
import { Popover } from "@/components/ui/Popover";
import { useUi } from "@/components/shell/UiProvider";
import { DOMAIN_NAME } from "@/lib/data";
import type { Process } from "@/lib/types";
import { ClayScene } from "./ClayScene";

function MenuItem({
  icon: Icon,
  label,
  onClick,
  danger,
}: {
  icon: typeof Copy;
  label: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm hover:bg-lavender-bg ${
        danger ? "text-critical hover:bg-red-50" : "text-graphite"
      }`}
    >
      <Icon className={`h-4 w-4 ${danger ? "" : "text-muted"}`} />
      {label}
    </button>
  );
}

export function ProcessHeader({ p }: { p: Process }) {
  const { showToast } = useUi();
  const [following, setFollowing] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* ambient hero background */}
      <div className="hero-ambient pointer-events-none absolute inset-0 -z-10" />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-[13px]">
        <Link href="/" className="font-medium text-purple hover:text-purple-deep">
          Inicio
        </Link>
        <span className="text-muted/60">›</span>
        <Link
          href={`/proceso/${p.domainCode}.P01`}
          className="font-medium text-purple hover:text-purple-deep"
        >
          {DOMAIN_NAME[p.domainCode]}
        </Link>
        <span className="text-muted/60">›</span>
        <span className="mono text-muted">{p.code}</span>
      </nav>

      <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left: title + description */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <CodeBadge>{p.code}</CodeBadge>
          </div>
          <h1 className="mt-3 text-[32px] font-bold leading-[1.12] tracking-tight text-graphite lg:text-[38px]">
            {p.name}
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            {p.description}
          </p>
        </div>

        {/* Right: clay illustration */}
        <div className="w-full max-w-[380px] shrink-0 lg:w-[380px]">
          <ClayScene />
        </div>
      </div>

      {/* Actions row */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Button
          variant={following ? "subtle" : "secondary"}
          onClick={() => {
            setFollowing((v) => !v);
            showToast(following ? "Dejaste de seguir el proceso" : "Ahora sigues este proceso");
          }}
        >
          <Star className={`h-4 w-4 ${following ? "fill-purple text-purple" : ""}`} />
          {following ? "Siguiendo" : "Seguir"}
        </Button>

        <Popover
          width={220}
          trigger={({ toggle }) => (
            <Button variant="secondary" onClick={toggle}>
              <Share2 className="h-4 w-4" /> Compartir
            </Button>
          )}
        >
          {({ close }) => (
            <div className="p-1.5">
              <MenuItem
                icon={Link2}
                label="Copiar enlace"
                onClick={() => {
                  showToast("Enlace copiado");
                  close();
                }}
              />
              <MenuItem icon={Mail} label="Compartir por email" onClick={close} />
              <MenuItem icon={Upload} label="Exportar vista" onClick={close} />
              <MenuItem
                icon={Slack}
                label="Enviar a Slack"
                onClick={() => {
                  showToast("Enviado a Slack");
                  close();
                }}
              />
            </div>
          )}
        </Popover>

        <Popover
          width={240}
          trigger={({ toggle }) => (
            <Button variant="primary" onClick={toggle}>
              Acciones <ChevronDown className="h-4 w-4" />
            </Button>
          )}
        >
          {({ close }) => (
            <div className="p-1.5">
              <MenuItem
                icon={CheckCircle2}
                label="Marcar como completado"
                onClick={() => {
                  showToast("Proceso marcado como completado");
                  close();
                }}
              />
              <MenuItem icon={Download} label="Descargar ficha" onClick={close} />
              <MenuItem icon={FileDown} label="Exportar PDF" onClick={close} />
              <MenuItem
                icon={Copy}
                label="Copiar enlace"
                onClick={() => {
                  showToast("Enlace copiado");
                  close();
                }}
              />
              <MenuItem icon={Flag} label="Reportar actualización" onClick={close} />
              <div className="my-1 h-px bg-line" />
              <MenuItem
                icon={CheckCircle2}
                label="Iniciar certificación"
                onClick={() => {
                  showToast("Certificación iniciada");
                  close();
                }}
              />
            </div>
          )}
        </Popover>
      </div>
    </div>
  );
}
