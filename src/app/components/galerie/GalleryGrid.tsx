"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { DemoGalleryImage } from "@/lib/demo-gallery";

export function GalleryGrid({ images }: { images: DemoGalleryImage[] }) {
  const [selected, setSelected] = useState<DemoGalleryImage | null>(null);

  return (
    <>
      {/* GRILLE MODERNE AVEC EFFET HOVER */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <motion.button
            key={image.id}
            layoutId={`card-${image.id}`}
            onClick={() => setSelected(image)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-white/5 bg-white/5"
          >
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${image.url}')` }}
            />
            {/* Overlay dégradé plus élégant */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2240]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
              <span className="text-xs font-bold uppercase tracking-widest text-white/90">{image.album}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* LIGHTBOX EN GLASSMORPHISM */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#07111f]/90 backdrop-blur-xl"
            onClick={() => setSelected(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-8 top-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelected(null)}
            >
              <X size={36} />
            </motion.button>
            
            <motion.div 
              layoutId={`card-${selected.id}`}
              className="max-w-5xl w-full flex flex-col items-center"
            >
              <img
                src={selected.url}
                alt={selected.legende}
                className="max-h-[75vh] w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white">{selected.legende}</h3>
                <p className="text-sm text-[#e1a924] uppercase tracking-[0.2em] mt-1">{selected.album}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}