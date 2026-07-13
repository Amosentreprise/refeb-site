import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { Button } from "../../../components/ui/Button";
import { ArticleRowActions } from "../../../components/admin/ArticleRowActions";
import { getAllArticlesAdmin } from "@/lib/firebase/admin-queries";

export const dynamic = "force-dynamic";

export default async function AdminActualitesPage() {
  const articles = await getAllArticlesAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary">Actualités</h1>
          <p className="mt-1 text-sm text-muted">
            Publiez et gérez les actualités du réseau.
          </p>
        </div>
        <Button href="/admin/actualites/nouveau" variant="accent" size="md">
          <Plus size={18} /> Nouvelle actualité
        </Button>
      </div>

      {articles.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-muted/30 bg-white p-10 text-center text-muted">
          Aucune actualité pour le moment.{" "}
          <Link href="/admin/actualites/nouveau" className="font-semibold text-primary underline">
            Rédiger la première
          </Link>
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-muted/10 bg-bg-alt/50 text-muted">
                  <th className="px-6 py-4 font-medium">Titre</th>
                  <th className="px-6 py-4 font-medium">Catégorie</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b border-muted/5 last:border-0">
                    <td className="px-6 py-4 font-medium text-ink">{article.titre}</td>
                    <td className="px-6 py-4 text-muted">{article.categorie}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          article.statut === "publie"
                            ? "bg-green-100 text-green-700"
                            : "bg-muted/15 text-muted"
                        }`}
                      >
                        {article.statut === "publie" ? "Publié" : "Brouillon"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted">
                      {format(article.datePublication.toDate(), "d MMM yyyy", { locale: fr })}
                    </td>
                    <td className="px-6 py-4">
                      <ArticleRowActions articleId={article.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
