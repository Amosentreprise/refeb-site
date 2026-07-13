"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Newspaper,
  Images,
  LogOut,
  Menu,
  X,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { toast } from "sonner";

const navItems = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { href: "/admin/evenements", label: "Événements", icon: CalendarDays },
  { href: "/admin/actualites", label: "Actualités", icon: Newspaper },
  { href: "/admin/galerie", label: "Galerie", icon: Images },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Déconnexion réussie");
      // Optionnel : Forcer une redirection propre si nécessaire, 
      // bien que ton hook useAuth s'en chargera automatiquement.
    } catch (error) {
      console.error("Erreur déconnexion:", error);
      toast.error("Impossible de vous déconnecter.");
    }
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* BOUTON FLOTTANT HAMBURGER (Visible uniquement sur mobile/tablette) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 border border-slate-200/50 shadow-lg backdrop-blur-md text-slate-800 transition-all hover:scale-105 active:scale-95 lg:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* OVERLAY SOMBRE SUR MOBILE (Ferme le menu si on clique à côté) */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* COMPOSANT ASIDE RECONSTRUIT */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-screen w-64 shrink-0 flex-col border-r border-slate-100 bg-slate-50/70 p-4 shadow-[inset_-10px_0_20px_-15px_rgba(0,0,0,0,05)] backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* LOGO BOX - Style Neumorphisme Soft */}
        <div className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-[4px_4px_10px_rgba(0,0,0,0.03),-4px_-4px_10px_rgba(255,255,255,0.9)] border border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md">
              <span className="font-display text-sm font-black tracking-wider">R</span>
            </div>
            <span className="font-display text-lg font-extrabold tracking-tight text-slate-900">REFEB</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-lg bg-primary/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            <UserCheck size={10} /> Admin
          </span>
        </div>

        {/* NAVIGATION LIENS - Effets d'enfoncement Soft Neumorphic */}
        <nav className="mt-8 flex-1 space-y-1.5 px-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)} // Ferme la sidebar sur mobile après clic
                className={cn(
                  "group flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-white text-slate-900 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),4px_4px_12px_rgba(0,0,0,0.03)] border-l-4 border-l-primary font-bold"
                    : "text-slate-500 hover:bg-white/60 hover:text-slate-800 hover:shadow-[4px_4px_10px_rgba(0,0,0,0.01)]"
                )}
              >
                <Icon 
                  size={18} 
                  className={cn(
                    "transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
                  )} 
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER ACTION - Déconnexion sécurisée */}
        <div className="mt-auto border-t border-slate-200/50 pt-4">
          <button
            onClick={handleSignOut}
            className="group flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition-all duration-200 hover:bg-rose-50/80 hover:text-rose-600 hover:shadow-[4px_4px_12px_rgba(225,29,72,0.05)]"
          >
            <LogOut size={18} className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-rose-500" />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}