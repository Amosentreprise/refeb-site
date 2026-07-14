import {
  collection,
  doc,
  getDocs,
  query,
  orderBy,
  addDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

const galleryCol = collection(db, "galleryImages");

export interface GalleryImageDoc {
  id: string;
  url: string;
  publicId: string; // référence Cloudinary (utile si suppression du fichier source un jour)
  legende: string;
  album: string;
  eventId?: string; // lien optionnel vers un événement
  createdAt: Timestamp;
}

/** Lecture publique — toutes les images, triées de la plus récente à la plus ancienne */
export async function getAllGalleryImages(): Promise<GalleryImageDoc[]> {
  const q = query(galleryCol, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as GalleryImageDoc);
}

export interface AddGalleryImageInput {
  url: string;
  publicId: string;
  legende: string;
  album: string;
  eventId?: string;
}

export async function addGalleryImage(input: AddGalleryImageInput): Promise<string> {
  const cleanInput = Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined)
  );
  const docRef = await addDoc(galleryCol, {
    ...cleanInput,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function deleteGalleryImage(id: string): Promise<void> {
  await deleteDoc(doc(db, "galleryImages", id));
}
