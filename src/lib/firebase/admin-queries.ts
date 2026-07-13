/**
 * Requêtes Firestore via le SDK ADMIN — réservées aux Server Components
 * et API routes du dashboard admin (contournent les Security Rules,
 * donc ce fichier ne doit JAMAIS être importé dans un composant "use client").
 */
import { adminDb } from "@/lib/firebase/admin";
import type { EventDoc, RegistrationDoc, ArticleDoc } from "@/types";

export async function getEventByIdAdmin(id: string): Promise<EventDoc | null> {
  const snap = await adminDb.collection("events").doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as EventDoc;
}

export async function getAllEventsAdmin(): Promise<EventDoc[]> {
  const snap = await adminDb.collection("events").orderBy("dateDebut", "desc").get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as EventDoc);
}

export async function getRegistrationsByEventAdmin(eventId: string): Promise<RegistrationDoc[]> {
  const snap = await adminDb
    .collection("registrations")
    .where("eventId", "==", eventId)
    .orderBy("dateInscription", "desc")
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as RegistrationDoc);
}

export async function getAllRegistrationsAdmin(): Promise<RegistrationDoc[]> {
  const snap = await adminDb.collection("registrations").orderBy("dateInscription", "desc").get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as RegistrationDoc);
}

export async function getAllArticlesAdmin(): Promise<ArticleDoc[]> {
  const snap = await adminDb.collection("articles").orderBy("datePublication", "desc").get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ArticleDoc);
}

export async function getArticleByIdAdmin(id: string): Promise<ArticleDoc | null> {
  const snap = await adminDb.collection("articles").doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as ArticleDoc;
}