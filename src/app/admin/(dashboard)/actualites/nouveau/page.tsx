
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleForm } from "../../../../components/admin/ArticleForm";

export default function NouvelleActualitePage() {
  return (
    <div>
      <Link
        href="/admin/actualites"
        className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
      >
        <ArrowLeft size={16} /> Retour aux actualités
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-primary">
        Nouvelle actualité
      </h1>

      <div className="mt-6">
        <ArticleForm />
      </div>
    </div>
  );
}
