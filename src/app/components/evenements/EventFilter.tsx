"use client";

import { cn } from "@/lib/utils";
import type { EventStatus } from "@/types";

export type EventFilterValue = "tous" | EventStatus;

const filters: { value: EventFilterValue; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "a-venir", label: "À venir" },
  { value: "en-cours", label: "En cours" },
  { value: "passe", label: "Passés" },
];

interface Props {
  active: EventFilterValue;
  onChange: (value: EventFilterValue) => void;
}

export function EventFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
            active === f.value
              ? "bg-primary text-white"
              : "bg-white text-muted hover:bg-primary/10 hover:text-primary"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}