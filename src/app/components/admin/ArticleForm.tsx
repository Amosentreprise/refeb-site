"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash2 } from "lucide-react";
import DOMPurify from "dompurify";
import { Input, Textarea } from "../ui/Input";
import { Button } from "../ui/Button";
import { TiptapEditor } from "../actualites/TiptapEditor";
import { createArticle, updateArticle, ARTICLE_CATEGORIES } from "@/lib/firebase/articles";
import { useAuth } from "@/hooks/useAuth";
import type { ArticleDoc } from "@/types";

interface Props {
  /** Fourni uniquement en mode édition */
  existingArticle?: ArticleDoc;
}

export function ArticleForm({ existingArticle }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const [titre, setTitre] = useState(existingArticle?.titre ?? "");
  const [extrait, setExtrait] = useState(existingArticle?.extrait ?? "");
  const [categorie, setCategorie] = useState(existingArticle?.categorie ?? ARTICLE_CATEGORIES[0]);
  const [contenu, setContenu] = useState(existingArticle?.contenuHTML ?? "");
  const [imageUrl, setImageUrl] = useState(existingArticle?.imageUrl ?? "");
  const [imagePublicId, setImagePublicId] = useState(existingArticle?.imagePublicId ?? "");
  const [submitting, setSubmitting] = useState(false);

  async function handlePublier(publier: boolean) {
    if (!titre.trim()) {
      toast.error("Le titre est requis.");
      return;
    }
    if (!extrait.trim()) {
      toast.error("L'extrait (résumé court) est requis.");
      return;
    }
    if (!imageUrl) {
      toast.error("Merci d'ajouter une image de couverture.");
      return;
    }
    if (!user) {
      toast.error("Session expirée, merci de vous reconnecter.");
      return;
    }

    setSubmitting(true);
    try {
      // Sanitize AVANT stockage — jamais faire confiance au HTML sortant
      // de l'éditeur, même en tant qu'admin.
      const contenuSanitize = DOMPurify.sanitize(contenu);

      const payload = {
        titre,
        extrait,
        categorie,
        contenuHTML: contenuSanitize,
        imageUrl,
        imagePublicId,
        statut: publier ? ("publie" as const) : ("brouillon" as const),
        createdBy: user.uid,
      };

      if (existingArticle) {
        await updateArticle(existingArticle.id, payload);
        toast.success("Article mis à jour !");
      } else {
        await createArticle(payload);
        toast.success(publier ? "Article publié !" : "Brouillon enregistré.");
      }

      router.push("/admin/actualites");
      router.refresh();
    } catch (error) {
      console.error("Erreur enregistrement article :", error);
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <Input
              label="Titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Titre de l'actualité"
            />
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
              {ARTICLE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <Textarea
            label="Extrait (résumé court)"
            value={extrait}
            onChange={(e) => setExtrait(e.target.value)}
            rows={4}
            placeholder="Résumé affiché sur les cartes d'aperçu..."
          />

          {/* Image de couverture */}
          <div>
            <label className="text-sm font-medium text-ink">Image de couverture</label>
            {imageUrl ? (
              <div className="relative mt-2">
                <img src={imageUrl} alt="Aperçu" className="h-32 w-full rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setImageUrl("");
                    setImagePublicId("");
                  }}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 hover:bg-white"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result) => {
                  if (typeof result.info === "object" && result.info) {
                    setImageUrl(result.info.secure_url);
                    setImagePublicId(result.info.public_id);
                  }
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="mt-2 flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-muted/30 p-6 text-muted transition-colors hover:border-primary hover:text-primary"
                  >
                    <ImagePlus size={22} />
                    <span className="text-sm">Choisir une image</span>
                  </button>
                )}
              </CldUploadWidget>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button
              variant="accent"
              size="md"
              disabled={submitting}
              onClick={() => handlePublier(true)}
            >
              {submitting ? "Enregistrement..." : existingArticle ? "Enregistrer et publier" : "Publier"}
            </Button>
            <Button
              variant="outline"
              size="md"
              disabled={submitting}
              onClick={() => handlePublier(false)}
            >
              Enregistrer en brouillon
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
