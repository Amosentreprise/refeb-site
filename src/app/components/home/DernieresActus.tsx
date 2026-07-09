import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "../ui/Button";
import type { ArticleDoc } from "../../../types";

interface Props {
  articles: Pick<
    ArticleDoc,
    "id" | "titre" | "slug" | "extrait" | "imageUrl" | "categorie" | "datePublication"
  >[];
}

export function DernieresActus({ articles }: Props) {
  return (
    <section className="bg-bg py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-accent-dark uppercase">
              Actualités
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
              Dernières nouvelles du réseau
            </h2>
          </div>
          <Button href="/actualites" variant="ghost" size="sm">
            Toutes les actualités <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>

        {articles.length === 0 ? (
          <p className="mt-10 rounded-xl border border-dashed border-muted/30 bg-white p-10 text-center text-muted">
            Aucune actualité publiée pour le moment.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/actualites/${article.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div
                  className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${article.imageUrl}')` }}
                />
                <div className="p-6">
                  <span className="text-xs font-semibold tracking-wide text-accent-dark uppercase">
                    {article.categorie}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-primary line-clamp-2">
                    {article.titre}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted line-clamp-2">
                    {article.extrait}
                  </p>
                  <p className="mt-4 text-xs text-muted/70">
                    {format(article.datePublication.toDate(), "d MMMM yyyy", {
                      locale: fr,
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}