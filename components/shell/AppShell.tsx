"use client";

import { UiProvider } from "./UiProvider";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { CommandPalette } from "./CommandPalette";
import { NexoDrawer } from "./NexoDrawer";
import { Toast } from "./Toast";

export function AppShell({
  activeCode = "",
  children,
}: {
  activeCode?: string;
  children: React.ReactNode;
}) {
  return (
    <UiProvider>
      <div className="min-h-screen bg-porcelain">
        <TopBar />
        <Sidebar activeCode={activeCode} />
        <main className="pt-16 lg:pl-[280px]">{children}</main>
        <CommandPalette />
        <NexoDrawer />
        <Toast />
      </div>
    </UiProvider>
  );
}
