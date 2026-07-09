export interface DemoGalleryImage {
  id: string;
  url: string;
  legende: string;
  album: string;
}

/** À remplacer par gallery/{albumId}/images depuis Firestore + Cloudinary */
export const demoGalleryImages: DemoGalleryImage[] = [
  { id: "1", url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800", legende: "Séminaire annuel 2026", album: "Séminaire 2026" },
  { id: "2", url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800", legende: "Temps de formation", album: "Séminaire 2026" },
  { id: "3", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800", legende: "Retraite spirituelle", album: "Retraite 2025" },
  { id: "4", url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800", legende: "Moment de prière", album: "Retraite 2025" },
  { id: "5", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800", legende: "Assemblée générale", album: "Assemblée générale" },
  { id: "6", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800", legende: "Atelier pédagogique", album: "Formation rentrée" },
  { id: "7", url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800", legende: "Nouvelles écoles partenaires", album: "Vie du réseau" },
  { id: "8", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800", legende: "Rencontre des membres", album: "Vie du réseau" },
];