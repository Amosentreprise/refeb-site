"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { CldUploadWidget } from "next-cloudinary";


import {
  getAllGalleryImages,
  addGalleryImage,
  deleteGalleryImage,
  type GalleryImageDoc,
} from "@/lib/firebase/gallery";

export default function AdminGaleriePage() {
  const [images, setImages] = useState<GalleryImageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("");
  const [pendingPublicId, setPendingPublicId] = useState("");
  const [album, setAlbum] = useState("");
  const [legende, setLegende] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    setLoading(true);
    getAllGalleryImages()
      .then(setImages)
      .catch(() => toast.error("Erreur lors du chargement de la galerie."))
      .finally(() => setLoading(false));
  }

  async function handleAjouter() {
    if (!pendingUrl) {
      toast.error("Choisis d'abord une image.");
      return;
    }
    if (!album.trim()) {
      toast.error("Indique un nom d'album (ex: nom de l'événement).");
      return;
    }
    setSaving(true);
    try {
      await addGalleryImage({
        url: pendingUrl,
        publicId: pendingPublicId,
        album: album.trim(),
        legende: legende.trim() || album.trim(),
      });
      toast.success("Image ajoutée à la galerie !");
      setShowUploadPanel(false);
      setPendingUrl("");
      setPendingPublicId("");
      setAlbum("");
      setLegende("");
      refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout de l'image.");
    } finally {
      setSaving(false);
    }
  }

  async function supprimer(id: string) {
    const confirmed = window.confirm("Supprimer définitivement cette photo de la galerie ?");
    if (!confirmed) return;
    try {
      await deleteGalleryImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
      toast.success("Image supprimée.");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary">Galerie</h1>
          <p className="mt-1 text-sm text-muted">
            Ajoutez et organisez les photos par album/événement.
          </p>
        </div>
        <Button variant="accent" size="md" onClick={() => setShowUploadPanel((v) => !v)}>
          <Plus size={18} /> Ajouter des photos
        </Button>
      </div>

      {/* Panneau d'ajout */}
      {showUploadPanel && (
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-ink">Image</label>
              {pendingUrl ? (
                <div className="relative mt-2">
                  <img
                    src={pendingUrl}
                    alt="Aperçu"
                    className="h-40 w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPendingUrl("");
                      setPendingPublicId("");
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
                      setPendingUrl(result.info.secure_url);
                      setPendingPublicId(result.info.public_id);
                    }
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="mt-2 flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-muted/30 p-8 text-muted transition-colors hover:border-primary hover:text-primary"
                    >
                      <ImagePlus size={24} />
                      <span className="text-sm">Choisir une image</span>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Input
                label="Album (ex: nom de l'événement)"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="Séminaire 2026"
              />
              <Input
                label="Légende (optionnel)"
                value={legende}
                onChange={(e) => setLegende(e.target.value)}
                placeholder="Description courte de la photo"
              />
              <Button variant="accent" size="md" disabled={saving} onClick={handleAjouter}>
                {saving ? "Ajout en cours..." : "Ajouter à la galerie"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Grille des images existantes */}
      {loading ? (
        <div className="mt-16 flex justify-center">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : images.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-muted/30 bg-white p-10 text-center text-muted">
          Aucune photo pour le moment.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <div key={image.id} className="group relative aspect-square overflow-hidden rounded-xl">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${image.url}')` }}
              />
              <div className="absolute inset-0 flex flex-col justify-between bg-black/0 p-3 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                <button
                  onClick={() => supprimer(image.id)}
                  className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 hover:bg-white"
                  aria-label="Supprimer"
                >
                  <Trash2 size={14} />
                </button>
                <p className="text-xs font-medium text-white">{image.album}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
