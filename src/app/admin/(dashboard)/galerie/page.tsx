"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../../components/ui/Button";
import { demoGalleryImages } from "@/lib/demo-gallery";

export default function AdminGaleriePage() {
  const [images, setImages] = useState(demoGalleryImages);

  function supprimer(id: string) {
    // TODO : appeler lib/firebase/gallery.ts -> deleteImage(id)
    setImages((prev) => prev.filter((img) => img.id !== id));
    toast.success("Image supprimée.");
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
        <Button variant="accent" size="md">
          <Plus size={18} /> Ajouter des photos
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <div key={image.id} className="group relative aspect-square overflow-hidden rounded-xl">
            <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${image.url}')` }} />
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
    </div>
  );
}