import { CalendarDays, Users, Wallet, Newspaper, ArrowUpRight } from "lucide-react";
import { StatCard } from "../../components/admin/StatCard";
import { PaymentStatusBadge } from "../../components/ui/Badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { adminDb } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  const registrationsSnap = await adminDb
    .collection("registrations")
    .orderBy("dateInscription", "desc")
    .get();
    
  const registrations = registrationsSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as any[];

  const eventsSnap = await adminDb
    .collection("events")
    .where("statut", "==", "a-venir")
    .get();
  const evenementsAvenirCount = eventsSnap.size;

  const articlesSnap = await adminDb.collection("articles").get();
  const totalArticlesCount = articlesSnap.size;

  return {
    registrations,
    evenementsAvenirCount,
    totalArticlesCount
  };
}

export default async function AdminDashboardPage() {
  const { registrations, evenementsAvenirCount, totalArticlesCount } = await getDashboardData();

  const totalInscrits = registrations.length;
  
  const totalRevenu = registrations
    .filter((r) => r.statutPaiement === "paye" || r.statutPaiement === "success")
    .reduce((sum, r) => sum + (r.montantTotal || 0), 0);

  const dernieresInscriptions = registrations.slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER DE BIENVENUE */}
      <div className="flex flex-col gap-1.5 border-b border-slate-200/40 pb-5">
        <h1 className="font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          Vue d&apos;ensemble
        </h1>
        <p className="text-sm font-medium text-slate-500">
          Résumé en temps réel de l&apos;activité du réseau REFEB.
        </p>
      </div>

      {/* GRILLE DES CARTES STATISTIQUES (Totalement responsive : 1 col sur mobile, 2 sur tablette, 4 sur desktop) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-[6px_6px_20px_rgba(0,0,0,0.02),-6px_-6px_20px_rgba(255,255,255,0.8)] border border-slate-100/80 transition-all hover:scale-[1.01]">
          <StatCard icon={CalendarDays} label="Événements à venir" value={String(evenementsAvenirCount)} />
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-[6px_6px_20px_rgba(0,0,0,0.02),-6px_-6px_20px_rgba(255,255,255,0.8)] border border-slate-100/80 transition-all hover:scale-[1.01]">
          <StatCard icon={Users} label="Inscriptions totales" value={String(totalInscrits)} />
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-[6px_6px_20px_rgba(0,0,0,0.02),-6px_-6px_20px_rgba(255,255,255,0.8)] border border-slate-100/80 transition-all hover:scale-[1.01]">
          <StatCard icon={Wallet} label="Revenus encaissés" value={`${totalRevenu.toLocaleString("fr-FR")} FCFA`} />
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-[6px_6px_20px_rgba(0,0,0,0.02),-6px_-6px_20px_rgba(255,255,255,0.8)] border border-slate-100/80 transition-all hover:scale-[1.01]">
          <StatCard icon={Newspaper} label="Actualités publiées" value={String(totalArticlesCount)} />
        </div>
      </div>

      {/* SECTION DU TABLEAU DES DERNIÈRES INSCRIPTIONS */}
      <div className="rounded-3xl bg-white/70 border border-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="font-display text-lg font-extrabold text-slate-950">
              Dernières inscriptions
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Flux instantané des 5 derniers enregistrements</p>
          </div>
          
          <button className="inline-flex items-center gap-1.5 self-start sm:self-center text-xs font-bold text-primary hover:underline group">
            Voir le détail complet <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* CONTAINER DU TABLEAU (Gère le débordement horizontal sur les petits écrans sans casser le layout) */}
        <div className="mt-4 overflow-x-auto -mx-5 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-5 sm:px-0">
            {dernieresInscriptions.length === 0 ? (
              <div className="py-12 text-center text-sm font-medium text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                Aucune inscription enregistrée pour le moment.
              </div>
            ) : (
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/60 text-slate-400">
                    <th className="pb-3.5 font-bold text-[11px] uppercase tracking-wider">Auditeur / Participant</th>
                    <th className="pb-3.5 font-bold text-[11px] uppercase tracking-wider hidden md:table-cell">Événement ciblé</th>
                    <th className="pb-3.5 font-bold text-[11px] uppercase tracking-wider text-center">Tickets</th>
                    <th className="pb-3.5 font-bold text-[11px] uppercase tracking-wider">Montant Net</th>
                    <th className="pb-3.5 font-bold text-[11px] uppercase tracking-wider">Validation</th>
                    <th className="pb-3.5 font-bold text-[11px] uppercase tracking-wider text-right">Horodatage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dernieresInscriptions.map((r) => {
                    const dateJs = r.dateInscription?.toDate ? r.dateInscription.toDate() : new Date();

                    return (
                      <tr key={r.id} className="group transition-colors hover:bg-slate-50/50">
                        {/* Identité + Contact empilés */}
                        <td className="py-4 pr-3">
                          <div className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                            {r.prenom} {r.nom}
                          </div>
                          <div className="text-xs text-slate-400 font-medium mt-0.5">{r.email}</div>
                        </td>
                        
                        {/* Événement (Masqué sur mobile pour aérer la vue, visible sur tablette/desktop) */}
                        <td className="py-4 pr-3 text-slate-600 font-medium max-w-xs truncate hidden md:table-cell">
                          {r.eventTitre || "—"}
                        </td>
                        
                        {/* Places alignées au centre */}
                        <td className="py-4 px-3 text-center text-slate-800 font-bold bg-slate-50/40 rounded-lg group-hover:bg-white transition-colors">
                          {r.nombrePlaces}
                        </td>
                        
                        {/* Tarification */}
                        <td className="py-4 px-3 font-semibold text-slate-900">
                          {r.montantTotal > 0 ? (
                            <span className="font-mono">{r.montantTotal.toLocaleString("fr-FR")} F</span>
                          ) : (
                            <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-md">Offert</span>
                          )}
                        </td>
                        
                        {/* Statut d'acquisition */}
                        <td className="py-4 px-3">
                          <PaymentStatusBadge status={r.statutPaiement} />
                        </td>
                        
                        {/* Date de réservation */}
                        <td className="py-4 pl-3 text-right text-xs font-semibold text-slate-400">
                          {format(dateJs, "d MMM yyyy", { locale: fr })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}