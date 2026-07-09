"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Newspaper,
  Images,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { href: "/admin/evenements", label: "Événements", icon: CalendarDays },
  { href: "/admin/actualites", label: "Actualités", icon: Newspaper },
  { href: "/admin/galerie", label: "Galerie", icon: Images },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-muted/10 bg-white">
      <div className="flex items-center gap-2 border-b border-muted/10 px-6 py-5">
        <span className="font-display text-xl font-bold text-primary">REFEB</span>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-ink/70 hover:bg-bg-alt hover:text-ink"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-muted/10 p-3">
        {/* TODO : brancher sur signOut() de Firebase Auth */}
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-red-50 hover:text-red-600">
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}