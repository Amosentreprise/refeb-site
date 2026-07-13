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
            "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
            // État ACTIF : Bleu foncé (#002D62) et texte blanc
            active === f.value
              ? "bg-[#002D62] text-white shadow-md"
              // État INACTIF : Fond très clair (#F3EFE4) et texte bleu foncé (#002D62)
              : "bg-[#F3EFE4] text-[#002D62] hover:bg-[#E2DCC9]"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}