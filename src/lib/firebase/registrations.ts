import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { RegistrationDoc } from "@/types";

const registrationsCol = collection(db, "registrations");

/**
 * Lecture des inscriptions — utilisée UNIQUEMENT dans le dashboard admin
 * (l'utilisateur doit être authentifié avec le rôle admin/gestionnaire,
 * les Firestore Security Rules bloquent sinon la lecture).
 */
export async function getRegistrationsByEvent(eventId: string): Promise<RegistrationDoc[]> {
  const q = query(
    registrationsCol,
    where("eventId", "==", eventId),
    orderBy("dateInscription", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as RegistrationDoc);
}

export async function getAllRegistrations(): Promise<RegistrationDoc[]> {
  const q = query(registrationsCol, orderBy("dateInscription", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as RegistrationDoc);
}

// NOTE : il n'y a volontairement AUCUNE fonction "createRegistration" ici.
// La création d'une inscription passe uniquement par l'API route
// /api/inscription (Firebase Admin SDK), jamais directement depuis le
// navigateur — voir firestore.rules : `allow write: if false`.