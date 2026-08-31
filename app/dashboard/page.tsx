import { AppShell } from "@/components/layout/app-shell";
import { BackendStatus } from "@/components/backend-status";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <AppShell>
      <h1 className="font-display text-2xl text-ink">Your library</h1>
      <p className="mt-2 max-w-md text-sm text-muted">
        This is a preview of the app layout. Captured content, knowledge
        cards, and search land here in upcoming milestones.
      </p>

      <Card className="mt-8 max-w-md">
        <p className="mb-3 text-sm font-medium text-ink">Nothing captured yet</p>
        <p className="text-sm text-muted">
          Once Instagram and WhatsApp capture are connected, anything you
          send will show up here as a knowledge card.
        </p>
      </Card>

      <div className="mt-10">
        <BackendStatus />
      </div>
    </AppShell>
  );
}
