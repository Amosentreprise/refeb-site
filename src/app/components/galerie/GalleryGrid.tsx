"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { DemoGalleryImage } from "@/lib/demo-gallery";

export function GalleryGrid({ images }: { images: DemoGalleryImage[] }) {
  const [selected, setSelected] = useState<DemoGalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelected(image)}
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url('${image.url}')` }}
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-xs font-medium text-white">{image.album}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox simple */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute right-6 top-6 text-white/80 hover:text-white"
            onClick={() => setSelected(null)}
            aria-label="Fermer"
          >
            <X size={28} />
          </button>
          <div className="max-w-4xl">
            <img
              src={selected.url}
              alt={selected.legende}
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />
            <p className="mt-4 text-center text-sm text-white/80">
              {selected.legende} — {selected.album}
            </p>
          </div>
        </div>
      )}
    </>
  );
}