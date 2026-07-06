import type { Domain } from "@/lib/types";

// Real domain architecture, sourced verbatim from conecta-os/nav.js.
// The mockup's illustrative "CS / FL" labels are superseded by the authoritative
// process content (do not reinterpret): the domains are CM, MK, DL, OP, FI.
export const DOMAINS: Domain[] = [
  {
    code: "CM",
    name: "Comercial",
    processes: [
      { code: "CM.P01", name: "Onboarding de Fabricante" },
      { code: "CM.P02", name: "Prospección Outbound" },
      { code: "CM.P03", name: "Gestión de Pipeline" },
      { code: "CM.P04", name: "Renovaciones" },
      { code: "CM.P05", name: "Metodología de Ventas" },
    ],
  },
  {
    code: "MK",
    name: "Marketing",
    processes: [
      { code: "MK.P01", name: "Contenido y PR" },
      { code: "MK.P02", name: "Campañas por Línea" },
    ],
  },
  {
    code: "DL",
    name: "Delivery",
    processes: [
      { code: "DL.P01", name: "Preventa Técnica" },
      { code: "DL.P02", name: "Handoff Ventas → Delivery" },
      { code: "DL.P03", name: "Implementación y Entrega" },
      { code: "DL.P04", name: "Soporte Post-Venta" },
      { code: "DL.P05", name: "Certificación de Ingenieros" },
    ],
  },
  {
    code: "OP",
    name: "Operaciones",
    processes: [{ code: "OP.P01", name: "RRHH Comercial (Admón.)" }],
  },
  {
    code: "FI",
    name: "Finanzas",
    processes: [{ code: "FI.P01", name: "Gestión Financiera Comercial" }],
  },
];

export const DOMAIN_NAME: Record<string, string> = Object.fromEntries(
  DOMAINS.map((d) => [d.code, d.name]),
);
