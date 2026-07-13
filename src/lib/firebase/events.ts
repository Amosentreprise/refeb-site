import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { EventDoc, EventStatus, EventCategory } from "@/types";

const eventsCol = collection(db, "events");

/** Génère un slug à partir du titre (ex: "Séminaire 2026" -> "seminaire-2026") */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // retire les accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Calcule le statut réel d'un événement selon la date du jour (peut différer du statut stocké) */
export function computeEventStatus(dateDebut: Timestamp, dateFin: Timestamp): EventStatus {
  const now = Timestamp.now().toMillis();
  if (now < dateDebut.toMillis()) return "a-venir";
  if (now > dateFin.toMillis()) return "passe";
  return "en-cours";

}

export async function getAllEvents(): Promise<EventDoc[]> {
  const q = query(eventsCol, orderBy("dateDebut", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as EventDoc);
}

export async function getEventBySlug(slug: string): Promise<EventDoc | null> {
  const q = query(eventsCol, where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as EventDoc;
}

export async function getEventById(id: string): Promise<EventDoc | null> {
  const snap = await getDoc(doc(db, "events", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as EventDoc;
}

export interface CreateEventInput {
  titre: string;
  categorie: EventCategory;
  description: string;
  descriptionCourte: string;
  lieu: string;
  dateDebut: Date;
  dateFin: Date;
  prix: number;
  placesTotal: number | null;
  imageUrl: string;
  imagePublicId: string;
  programme?: string;
  createdBy: string;
}

export async function createEvent(input: CreateEventInput): Promise<string> {
  const slug = slugify(input.titre);

  // Firestore rejette toute valeur `undefined` (ex: programme laissé vide) —
  // on nettoie l'objet avant l'écriture pour éviter un échec silencieux.
  const cleanInput = Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined)
  );

  const docRef = await addDoc(eventsCol, {
    ...cleanInput,
    slug,
    devise: "XOF",
    statut: computeEventStatus(
      Timestamp.fromDate(input.dateDebut),
      Timestamp.fromDate(input.dateFin)
    ),
    dateDebut: Timestamp.fromDate(input.dateDebut),
    dateFin: Timestamp.fromDate(input.dateFin),
    placesRestantes: input.placesTotal,
    lienInscriptionSlug: slug,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    
  });
  return docRef.id;
}

export async function updateEvent(
  id: string,
  input: Partial<CreateEventInput>
): Promise<void> {
  const updateData: Record<string, unknown> = { ...input, updatedAt: serverTimestamp() };
  if (input.dateDebut) updateData.dateDebut = Timestamp.fromDate(input.dateDebut);
  if (input.dateFin) updateData.dateFin = Timestamp.fromDate(input.dateFin);
  await updateDoc(doc(db, "events", id), updateData);
}

export async function deleteEvent(id: string): Promise<void> {
  await deleteDoc(doc(db, "events", id));
}