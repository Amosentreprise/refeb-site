"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import DOMPurify from "dompurify";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { TiptapEditor } from "../TiptapEditor";

const categories = ["Formation", "Vie du réseau", "Événement", "Annonce"];

export default function NouvelleActualitePage() {
  const router = useRouter();
  const [titre, setTitre] = useState("");
  const [extrait, setExtrait] = useState("");
  const [categorie, setCategorie] = useState(categories[0]);
  const [contenu, setContenu] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handlePublier(publier: boolean) {
    if (!titre.trim()) {
      toast.error("Le titre est requis.");
      return;
    }
    setSubmitting(true);
    try {
      const contenuSanitize = DOMPurify.sanitize(contenu);

      // TODO : appeler lib/firebase/articles.ts -> createArticle({...})
      await new Promise((resolve) => setTimeout(resolve, 700));
      console.log("Article (démo) :", {
        titre,
        extrait,
        categorie,
        contenuHTML: contenuSanitize,
        statut: publier ? "publie" : "brouillon",
      });

      toast.success(publier ? "Article publié !" : "Brouillon enregistré.");
      router.push("/admin/actualites");
    } catch {
      toast.error("Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Link href="/admin/actualites" className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary">
        <ArrowLeft size={16} /> Retour aux actualités
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-primary">Nouvelle actualité</h1>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <Input label="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Titre de l'actualité" />
              <div>
                <label className="text-sm font-medium text-ink">Contenu</label>
                <div className="mt-1.5">
                  <TiptapEditor content={contenu} onChange={setContenu} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
            <div>
              <label className="text-sm font-medium text-ink">Catégorie</label>
              <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-muted/30 bg-white px-4 py-2.5 text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-ink">Extrait (résumé court)</label>
              <textarea
                value={extrait}
                onChange={(e) => setExtrait(e.target.value)}
                rows={4}
                placeholder="Résumé affiché sur les cartes d'aperçu..."
                className="mt-1.5 w-full rounded-lg border border-muted/30 bg-white px-4 py-2.5 text-ink placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="rounded-lg border border-dashed border-muted/30 p-6 text-center text-sm text-muted">
              Zone d&apos;upload de l&apos;image de couverture (Cloudinary)
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button variant="accent" size="md" disabled={submitting} onClick={() => handlePublier(true)}>
                Publier
              </Button>
              <Button variant="outline" size="md" disabled={submitting} onClick={() => handlePublier(false)}>
                Enregistrer en brouillon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}