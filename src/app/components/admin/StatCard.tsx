import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  accentClass?: string;
}

export function StatCard({ icon: Icon, label, value, trend, accentClass }: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted">{label}</span>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
            accentClass
          )}
        >
          <Icon size={20} />
        </div>
      </div>
      <p className="mt-4 font-display text-3xl font-bold text-primary">{value}</p>
      {trend && <p className="mt-1 text-xs text-muted">{trend}</p>}
    </div>
  );
}