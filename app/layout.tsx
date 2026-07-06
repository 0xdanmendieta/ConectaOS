import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conecta OS · Sistema Operativo de Procesos",
  description:
    "Process Intelligence Workspace — documenta, navega, consulta y certifica los procesos de Conecta.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
