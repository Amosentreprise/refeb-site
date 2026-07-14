
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { GalleryGrid } from "../components/galerie/GalleryGrid";

import { getAllGalleryImages } from "@/lib/firebase/gallery";


export const dynamic = "force-dynamic";

export default async function GaleriePage() {
  const images = await getAllGalleryImages();

  // Le Timestamp Firestore (createdAt) est une instance de classe : on la
  // convertit en chaîne avant de transmettre les données au Client Component.
  const imagesForClient = images.map((image) => ({
    ...image,
    createdAt: image.createdAt?.toDate().toISOString() ?? null,
  }));

  return (
    <>
      <Header />
      <main>
        <section className="relative py-36 text-white overflow-hidden"
  style={{
    background: `
      linear-gradient(to right, rgba(11, 34, 64, 0.4), rgba(11, 34, 64, 0.4)), 
      radial-gradient(circle at center, rgba(17, 50, 93, 0.4) 0%, rgba(11, 34, 64, 1) 70%),
      linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      #0b2240
    `,
    backgroundSize: '100% 100%, 100% 100%, 42px 42px, 42px 42px'
  }}>
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">
              En images
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              Galerie
            </h1>
            <p className="mt-4 text-white/80">
              Revivez les moments forts des événements et rencontres du réseau.
            </p>
          </div>
        </section>

        <section className="bg-bg py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            {images.length === 0 ? (
              <p className="rounded-xl border border-dashed border-muted/30 bg-white p-10 text-center text-muted">
                Aucune photo dans la galerie pour le moment.
              </p>
            ) : (
              <GalleryGrid images={imagesForClient} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
