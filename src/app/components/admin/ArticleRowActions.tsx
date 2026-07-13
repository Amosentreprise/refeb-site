
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteArticle } from "@/lib/firebase/articles";

export function ArticleRowActions({ articleId }: { articleId: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Supprimer définitivement cette actualité ? Cette action est irréversible."
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      await deleteArticle(articleId);
      toast.success("Actualité supprimée.");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/admin/actualites/${articleId}`}
        className="flex items-center gap-1.5 text-primary hover:underline"
      >
        <Pencil size={14} /> Modifier
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="flex items-center gap-1.5 text-red-600 hover:underline disabled:opacity-50"
      >
        <Trash2 size={14} /> Supprimer
      </button>
    </div>
  );
}
