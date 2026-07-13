
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleForm } from "../../../../components/admin/ArticleForm";
import { getArticleByIdAdmin } from "@/lib/firebase/admin-queries";
import { toPlainObject } from "@/lib/firebase/serialize";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ModifierActualitePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticleByIdAdmin(id);

  if (!article) notFound();

  return (
    <div>
      <Link
        href="/admin/actualites"
        className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
      >
        <ArrowLeft size={16} /> Retour aux actualités
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-primary">
        Modifier l&apos;actualité
      </h1>
      <p className="mt-1 mb-6 text-sm text-muted">{article.titre}</p>

      <ArticleForm existingArticle={toPlainObject(article)} />
    </div>
  );
}
