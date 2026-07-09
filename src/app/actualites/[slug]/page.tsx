import { notFound } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { demoArticles } from "@/lib/demo-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return demoArticles.map((article) => ({ slug: article.slug }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = demoArticles.find((a) => a.slug === slug);

  if (!article) notFound();

  return (
    <>
      <Header />
      <main>
        <section
          className="h-72 bg-cover bg-center sm:h-96"
          style={{ backgroundImage: `url('${article.imageUrl}')` }}
        />

        <article className="bg-bg py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <span className="text-xs font-semibold tracking-wide text-accent-dark uppercase">
              {article.categorie}
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
              {article.titre}
            </h1>
            <p className="mt-3 text-sm text-muted">
              Publié le{" "}
              {format(article.datePublication.toDate(), "d MMMM yyyy", { locale: fr })}
            </p>

            {/*
              NOTE SÉCURITÉ : contenuHTML doit TOUJOURS être sanitizé (DOMPurify)
              avant d'être stocké en base ET avant d'être injecté ici, pour
              éviter toute injection XSS via l'éditeur Tiptap du dashboard admin.
            */}
            <div
              className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: article.contenuHTML }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}