import { cn } from "@/lib/utils";
import type { EventStatus, PaymentStatus } from "@/types";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}

const eventStatusConfig: Record<EventStatus, { label: string; classes: string }> = {
  "a-venir": { label: "À venir", classes: "bg-accent/15 text-accent-dark" },
  "en-cours": { label: "En cours", classes: "bg-green-100 text-green-700" },
  "passe": { label: "Terminé", classes: "bg-muted/15 text-muted" },
};

export function EventStatusBadge({ status }: { status: EventStatus }) {
  const config = eventStatusConfig[status];
  return <Badge className={config.classes}>{config.label}</Badge>;
}

const paymentStatusConfig: Record<PaymentStatus, { label: string; classes: string }> = {
  "paye": { label: "Payé", classes: "bg-green-100 text-green-700" },
  "en-attente": { label: "En attente", classes: "bg-accent/15 text-accent-dark" },
  "gratuit": { label: "Gratuit", classes: "bg-primary/10 text-primary" },
  "annule": { label: "Annulé", classes: "bg-red-100 text-red-700" },
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const config = paymentStatusConfig[status];
  return <Badge className={config.classes}>{config.label}</Badge>;
}