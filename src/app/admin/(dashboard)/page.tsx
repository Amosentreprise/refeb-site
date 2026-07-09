import { CalendarDays, Users, Wallet, Newspaper } from "lucide-react";
import { StatCard } from "../../components/admin/StatCard";
import { PaymentStatusBadge } from "../../components/ui/Badge";
import { demoEvents, demoArticles } from "@/lib/demo-data";
import { demoRegistrations } from "@/lib/demo-registrations";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function AdminDashboardPage() {
  const totalInscrits = demoRegistrations.length;
  const totalRevenu = demoRegistrations
    .filter((r) => r.statutPaiement === "paye")
    .reduce((sum, r) => sum + r.montantTotal, 0);
  const evenementsAvenir = demoEvents.filter((e) => e.statut === "a-venir").length;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-primary">
        Vue d&apos;ensemble
      </h1>
      <p className="mt-1 text-sm text-muted">
        Résumé de l&apos;activité du réseau.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={CalendarDays} label="Événements à venir" value={String(evenementsAvenir)} />
        <StatCard icon={Users} label="Inscriptions totales" value={String(totalInscrits)} />
        <StatCard
          icon={Wallet}
          label="Revenus encaissés"
          value={`${totalRevenu.toLocaleString("fr-FR")} FCFA`}
        />
        <StatCard icon={Newspaper} label="Actualités publiées" value={String(demoArticles.length)} />
      </div>

      <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-primary">
          Dernières inscriptions
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-muted/10 text-muted">
                <th className="pb-3 font-medium">Nom</th>
                <th className="pb-3 font-medium">Événement</th>
                <th className="pb-3 font-medium">Places</th>
                <th className="pb-3 font-medium">Montant</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {demoRegistrations.map((r) => (
                <tr key={r.id} className="border-b border-muted/5 last:border-0">
                  <td className="py-3 font-medium text-ink">
                    {r.prenom} {r.nom}
                  </td>
                  <td className="py-3 text-muted">{r.eventTitre}</td>
                  <td className="py-3 text-muted">{r.nombrePlaces}</td>
                  <td className="py-3 text-muted">
                    {r.montantTotal > 0 ? `${r.montantTotal.toLocaleString("fr-FR")} FCFA` : "—"}
                  </td>
                  <td className="py-3">
                    <PaymentStatusBadge status={r.statutPaiement} />
                  </td>
                  <td className="py-3 text-muted">
                    {format(r.dateInscription.toDate(), "d MMM yyyy", { locale: fr })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}