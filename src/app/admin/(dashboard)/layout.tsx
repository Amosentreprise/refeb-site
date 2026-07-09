import type { Metadata } from "next";
import { Sidebar } from "../../components/admin/Sidebar";

export const metadata: Metadata = {
  title: "Tableau de bord — REFEB",
  robots: { index: false, follow: false }, // jamais indexé par Google
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // TODO : vérifier ici la session Firebase Auth (Server Component) et
  // rediriger vers /admin/login si non authentifié.
  return (
    <div className="flex min-h-screen bg-bg-alt">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}