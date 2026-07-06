import {
  CalendarClock,
  CircleUser,
  GitBranch,
  LayoutGrid,
  ShieldAlert,
  Signal,
} from "lucide-react";
import { Pill } from "@/components/ui/Primitives";
import { DOMAIN_NAME } from "@/lib/data";
import type { Process } from "@/lib/types";

function Item({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof CircleUser;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lavender-bg text-purple">
        <Icon className="h-[17px] w-[17px]" />
      </span>
      <div className="min-w-0">
        <div className="label-caps">{label}</div>
        <div className="mt-0.5 text-[13px] font-semibold text-graphite">{children}</div>
      </div>
    </div>
  );
}

export function ProcessMetadata({ p }: { p: Process }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl2 border border-line bg-white/60 px-5 py-4 sm:grid-cols-3 lg:grid-cols-6">
      <Item icon={LayoutGrid} label="Dominio">
        {DOMAIN_NAME[p.domainCode]}
      </Item>
      <Item icon={CircleUser} label="Owner">
        <span className="line-clamp-1">{p.ficha.owner.split("(")[0].trim()}</span>
      </Item>
      <Item icon={Signal} label="Estado">
        <Pill tone="success">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" /> {p.estado}
        </Pill>
      </Item>
      <Item icon={CalendarClock} label="Última actualización">
        {p.ultimaActualizacion}
      </Item>
      <Item icon={GitBranch} label="Versión">
        <span className="mono">{p.version}</span>
      </Item>
      <Item icon={ShieldAlert} label="Criticidad">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-nexo" />
          {p.criticidad}
        </span>
      </Item>
    </div>
  );
}
