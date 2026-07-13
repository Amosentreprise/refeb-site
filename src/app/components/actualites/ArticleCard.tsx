import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { ArticleDoc } from "@/types";

export function ArticleCard({ article }: { article: ArticleDoc }) {
  return (
    <Link
      href={`/actualites/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div
        className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url('${article.imageUrl}')` }}
      />
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold tracking-wide text-accent-dark uppercase">
          {article.categorie}
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold text-primary line-clamp-2">
          {article.titre}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
          {article.extrait}
        </p>
        <p className="mt-4 text-xs text-muted/70">
          {format(article.datePublication.toDate(), "d MMMM yyyy", { locale: fr })}
        </p>
      </div>
    </Link>
  );
}