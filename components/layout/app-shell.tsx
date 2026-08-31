import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";

type AppShellProps = {
  children: ReactNode;
};

/**
 * Reusable layout foundation for authenticated app views (library, review,
 * search, settings). Not used by the public marketing page — only by
 * routes that represent the future in-app experience.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <Sidebar />
      <main className="flex-1 px-6 py-8 sm:px-10 sm:py-10">{children}</main>
    </div>
  );
}
