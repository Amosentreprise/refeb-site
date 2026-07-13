
 
import type { Metadata } from "next";
import { Sidebar } from "../../components/admin/Sidebar";
import { AuthGuard } from "../../components/admin/AuthGuard";
 
export const metadata: Metadata = {
  title: "Tableau de bord — REFEB",
  robots: { index: false, follow: false }, // Jamais indexé par Google
};
 
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      {/* Correction du fond : Utilisation de slate-100 et slate-200/60 en transition 
        pour créer un vrai contraste et faire flotter tes cartes blanches !
      */}
      <div className="flex min-h-screen flex-col bg-gradient-to-tr from-slate-100 via-slate-50 to-slate-200/60 lg:flex-row antialiased">
        
        {/* Barre latérale responsive (Flottante sur mobile / Fixe sur Desktop) */}
        <Sidebar />
        
        {/* Zone principale de contenu */}
        <main className="flex-1 overflow-x-hidden px-4 py-6 pt-20 sm:px-6 lg:px-8 lg:pt-8 max-w-7xl w-full mx-auto">
          <div className="animate-fade-in duration-300">
            {children}
          </div>
        </main>

      </div>
    </AuthGuard>
  );
}