import { NextResponse } from "next/server";
import { z } from "zod";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

const schema = z.object({
  eventId: z.string().min(1),
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().min(8),
  nombrePlaces: z.number().min(1).max(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { eventId, nom, prenom, email, telephone, nombrePlaces } = parsed.data;

    const eventRef = adminDb.collection("events").doc(eventId);
    const registrationRef = adminDb.collection("registrations").doc();
    const registrationId = registrationRef.id;

    let requiresPayment = false;
    let montantTotal = 0;

    // Transaction atomique Firestore anti-concurrence
    await adminDb.runTransaction(async (transaction) => {
      const eventSnap = await transaction.get(eventRef);
      if (!eventSnap.exists) {
        throw new Error("Événement introuvable");
      }

      const event = eventSnap.data()!;
      if (event.statut === "passe") {
        throw new Error("Cet événement est archivé, les inscriptions sont closes.");
      }

      if (event.placesTotal !== null) {
        const placesRestantes = event.placesRestantes ?? 0;
        if (placesRestantes < nombrePlaces) {
          throw new Error(`Plus assez de places disponibles. Il ne reste que ${placesRestantes} place(s).`);
        }
      }

      montantTotal = (event.prix ?? 0) * nombrePlaces;
      requiresPayment = montantTotal > 0;
      const statutPaiement = requiresPayment ? "PENDING" : "SUCCESS";

      // Mise à jour de la jauge
      if (event.placesTotal !== null) {
        transaction.update(eventRef, {
          placesRestantes: FieldValue.increment(-nombrePlaces),
          updatedAt: FieldValue.serverTimestamp(),
        });
      }

      // Enregistrement de la ligne de participation
      // Enregistrement immédiat au statut "paye" pour correspondre à ton admin
transaction.set(registrationRef, {
  eventId,
  eventTitre: event.titre,
  nom: nom.trim(),
  prenom: prenom.trim(),
  email: email.toLowerCase().trim(),
  telephone: telephone.trim(),
  nombrePlaces,
  montantTotal,
  statutPaiement: "paye", // Modifié ici ("SUCCESS" -> "paye")
  dateInscription: FieldValue.serverTimestamp(),
  modeTest: true
});
    });

    return NextResponse.json({
      success: true,
      registrationId,
      montantTotal,
      requiresPayment,
    }, { status: 200 });

  } catch (error: any) {
    console.error("Erreur inscription:", error);
    
    if (error.message === "Événement introuvable") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error.message.includes("places") || error.message.includes("archivé")) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 });
  }
}