import { AppShell } from "@/components/shell/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { PlantillasCatalog } from "@/components/templates/PlantillasCatalog";
import { ALL_TEMPLATES } from "@/lib/data";

export default function PlantillasPage() {
  return (
    <AppShell>
      <PageContainer
        eyebrow="Playbooks · Plantillas"
        title="Plantillas y documentos"
        intro={`Los ${ALL_TEMPLATES.length} formatos del sistema, listos para copiar al lugar donde se ejecutan (nota de HubSpot, documento, correo). Cada uno está vinculado desde su proceso.`}
        breadcrumb={[{ label: "Inicio", href: "/inicio" }, { label: "Plantillas" }]}
      >
        <PlantillasCatalog />
      </PageContainer>
    </AppShell>
  );
}
