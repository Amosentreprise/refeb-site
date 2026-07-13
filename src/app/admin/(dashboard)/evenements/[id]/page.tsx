import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Calendar, MapPin, Users, Wallet, Clock, Settings } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { EventStatusBadge, PaymentStatusBadge } from "../../../../components/ui/Badge";
import { getEventByIdAdmin } from "@/lib/firebase/admin-queries";
import { getRegistrationsByEventAdmin } from "@/lib/firebase/admin-queries";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminEventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventByIdAdmin(id);
  if (!event) notFound();

  const registrations = await getRegistrationsByEventAdmin(id);
  
  // Ta logique de calcul reste inchangée (s'adapte aussi aux 'success' grâce au Badge mis à jour)
  const totalPaye = registrations
    .filter((r) => r.statutPaiement === "paye" || r.statutPaiement === "success")
    .reduce((sum, r) => sum + r.montantTotal, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* BOUTON RETOUR SÉCURISÉ */}
      <div>
        <Link
          href="/admin/evenements"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-primary transition-colors group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" /> 
          Retour aux événements
        </Link>
      </div>

      {/* HEADER PRINCIPAL RESPONSIVE */}
      <div className="flex flex-col gap-5 border-b border-slate-200/40 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              {event.titre}
            </h1>
            <EventStatusBadge status={event.statut} />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-400" />
              {format(event.dateDebut.toDate(), "d MMMM yyyy", { locale: fr })}
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-slate-400" />
              {event.lieu}
            </span>
          </div>
        </div>

        {/* ACTIONS DE CONFIGURATION */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <Link
            href={`/admin/evenements/${event.id}/modifier`}
            className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
          >
            <Settings size={14} /> Modifier
          </Link>
          
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-md transition-all hover:scale-[1.01] active:scale-95">
            <Download size={14} /> Exporter CSV
          </button>
        </div>
      </div>

      {/* GRILLE DES COMPTEURS - Look Neumorphic Soft */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-[6px_6px_20px_rgba(0,0,0,0.02),-6px_-6px_20px_rgba(255,255,255,0.8)] border border-slate-100/80 flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
            <Users size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Inscrits</p>
            <p className="mt-0.5 font-display text-xl font-black text-slate-900">
              {registrations.length}
              {event.placesTotal ? <span className="text-xs text-slate-400 font-medium"> / {event.placesTotal}</span> : ""}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-[6px_6px_20px_rgba(0,0,0,0.02),-6px_-6px_20px_rgba(255,255,255,0.8)] border border-slate-100/80 flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Wallet size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Montant encaissé</p>
            <p className="mt-0.5 font-display text-xl font-black text-slate-900 font-mono">
              {totalPaye.toLocaleString("fr-FR")} F
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-[6px_6px_20px_rgba(0,0,0,0.02),-6px_-6px_20px_rgba(255,255,255,0.8)] border border-slate-100/80 flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Attente Paiement</p>
            <p className="mt-0.5 font-display text-xl font-black text-amber-600 bg-amber-50/50 px-2 rounded-md inline-block">
              {registrations.filter((r) => r.statutPaiement === "en-attente").length}
            </p>
          </div>
        </div>
      </div>

      {/* TABLEAU COMPACT DES PARTICIPANTS */}
      <div className="rounded-3xl bg-white/70 border border-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="font-display text-base font-extrabold text-slate-900">Liste complète des inscrits</h2>
        </div>
        
        <div className="overflow-x-auto -mx-5 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-5 sm:px-0">
            {registrations.length === 0 ? (
              <p className="py-12 text-center text-sm font-medium text-slate-400">Aucune inscription pour le moment.</p>
            ) : (
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/60 text-slate-400">
                    <th className="pb-3.5 pt-4 font-bold text-[11px] uppercase tracking-wider">Nom & Prénom</th>
                    <th className="pb-3.5 pt-4 font-bold text-[11px] uppercase tracking-wider">Coordonnées / Contact</th>
                    <th className="pb-3.5 pt-4 font-bold text-[11px] uppercase tracking-wider text-center">Places</th>
                    <th className="pb-3.5 pt-4 font-bold text-[11px] uppercase tracking-wider">Frais versés</th>
                    <th className="pb-3.5 pt-4 font-bold text-[11px] uppercase tracking-wider">Statut</th>
                    <th className="pb-3.5 pt-4 font-bold text-[11px] uppercase tracking-wider text-right">Date de validation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {registrations.map((r) => (
                    <tr key={r.id} className="group transition-colors hover:bg-slate-50/40">
                      <td className="py-4 font-semibold text-slate-900 group-hover:text-primary transition-colors">
                        {r.prenom} {r.nom}
                      </td>
                      <td className="py-4 text-slate-500 font-medium">
                        <div className="truncate max-w-[180px]">{r.email}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{r.telephone}</div>
                      </td>
                      <td className="py-4 text-center">
                        <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
                          {r.nombrePlaces}
                        </span>
                      </td>
                      <td className="py-4 font-semibold text-slate-900">
                        {r.montantTotal > 0 ? (
                          <span className="font-mono text-xs">{r.montantTotal.toLocaleString("fr-FR")} F</span>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-4">
                        <PaymentStatusBadge status={r.statutPaiement} />
                      </td>
                      <td className="py-4 text-right text-xs font-semibold text-slate-400">
                        {format(r.dateInscription.toDate(), "d MMM yyyy, HH:mm", { locale: fr })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}