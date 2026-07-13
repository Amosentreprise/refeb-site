import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "../../../components/ui/Button";
import { demoArticles } from "@/lib/demo-data";


export default function AdminActualitesPage() {
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

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-muted/10 bg-bg-alt/50 text-muted">
              <th className="px-6 py-4 font-medium">Titre</th>
              <th className="px-6 py-4 font-medium">Catégorie</th>
              <th className="px-6 py-4 font-medium">Publié le</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demoArticles.map((article) => (
              <tr key={article.id} className="border-b border-muted/5 last:border-0">
                <td className="px-6 py-4 font-medium text-ink">{article.titre}</td>
                <td className="px-6 py-4 text-muted">{article.categorie}</td>
                <td className="px-6 py-4 text-muted">
                  {format(article.datePublication.toDate(), "d MMM yyyy", { locale: fr })}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/actualites/${article.id}`}
                    className="flex w-fit items-center gap-1.5 text-primary hover:underline"
                  >
                    <Pencil size={14} /> Modifier
                  </Link>
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