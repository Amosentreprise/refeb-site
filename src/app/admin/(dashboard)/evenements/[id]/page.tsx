import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { EventStatusBadge, PaymentStatusBadge } from "../../../../components/ui/Badge";
import { demoEvents } from "@/lib/demo-data";
import { demoRegistrations } from "@/lib/demo-registrations";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminEventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = demoEvents.find((e) => e.id === id);
  if (!event) notFound();

  const registrations = demoRegistrations.filter((r) => r.eventId === id);
  const totalPaye = registrations
    .filter((r) => r.statutPaiement === "paye")
    .reduce((sum, r) => sum + r.montantTotal, 0);

  return (
    <div>
      <Link
        href="/admin/evenements"
        className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
      >
        <ArrowLeft size={16} /> Retour aux événements
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-primary">
              {event.titre}
            </h1>
            <EventStatusBadge status={event.statut} />
          </div>
          <p className="mt-1 text-sm text-muted">
            {format(event.dateDebut.toDate(), "d MMMM yyyy", { locale: fr })} — {event.lieu}
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
          <Download size={16} /> Exporter CSV
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-muted">Inscrits</p>
          <p className="mt-1 font-display text-2xl font-bold text-primary">
            {registrations.length}
            {event.placesTotal ? ` / ${event.placesTotal}` : ""}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-muted">Montant encaissé</p>
          <p className="mt-1 font-display text-2xl font-bold text-primary">
            {totalPaye.toLocaleString("fr-FR")} FCFA
          </p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-muted">En attente de paiement</p>
          <p className="mt-1 font-display text-2xl font-bold text-accent-dark">
            {registrations.filter((r) => r.statutPaiement === "en-attente").length}
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="border-b border-muted/10 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-primary">Liste des inscrits</h2>
        </div>
        {registrations.length === 0 ? (
          <p className="p-8 text-center text-muted">Aucune inscription pour le moment.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-muted/10 text-muted">
                <th className="px-6 py-3 font-medium">Nom</th>
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="px-6 py-3 font-medium">Places</th>
                <th className="px-6 py-3 font-medium">Montant</th>
                <th className="px-6 py-3 font-medium">Statut</th>
                <th className="px-6 py-3 font-medium">Inscrit le</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} className="border-b border-muted/5 last:border-0">
                  <td className="px-6 py-4 font-medium text-ink">
                    {r.prenom} {r.nom}
                  </td>
                  <td className="px-6 py-4 text-muted">
                    <div>{r.email}</div>
                    <div className="text-xs">{r.telephone}</div>
                  </td>
                  <td className="px-6 py-4 text-muted">{r.nombrePlaces}</td>
                  <td className="px-6 py-4 text-muted">
                    {r.montantTotal > 0 ? `${r.montantTotal.toLocaleString("fr-FR")} FCFA` : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <PaymentStatusBadge status={r.statutPaiement} />
                  </td>
                  <td className="px-6 py-4 text-muted">
                    {format(r.dateInscription.toDate(), "d MMM yyyy, HH:mm", { locale: fr })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}