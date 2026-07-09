import { Timestamp } from "firebase/firestore";
import type { RegistrationDoc } from "@/types";

export type DemoRegistration = Pick<
  RegistrationDoc,
  | "id"
  | "eventId"
  | "eventTitre"
  | "nom"
  | "prenom"
  | "email"
  | "telephone"
  | "nombrePlaces"
  | "montantTotal"
  | "statutPaiement"
  | "dateInscription"
>;

/** À remplacer par la collection Firestore `registrations` */
export const demoRegistrations: DemoRegistration[] = [
  {
    id: "r1",
    eventId: "1",
    eventTitre: "Séminaire annuel de formation biblique",
    nom: "Adjovi",
    prenom: "Marc",
    email: "marc.adjovi@email.com",
    telephone: "+229 90 11 22 33",
    nombrePlaces: 1,
    montantTotal: 5000,
    statutPaiement: "paye",
    dateInscription: Timestamp.fromDate(new Date("2026-07-01T10:15:00")),
  },
  {
    id: "r2",
    eventId: "1",
    eventTitre: "Séminaire annuel de formation biblique",
    nom: "Houngbo",
    prenom: "Esther",
    email: "esther.houngbo@email.com",
    telephone: "+229 91 22 33 44",
    nombrePlaces: 2,
    montantTotal: 10000,
    statutPaiement: "en-attente",
    dateInscription: Timestamp.fromDate(new Date("2026-07-02T14:40:00")),
  },
  {
    id: "r3",
    eventId: "2",
    eventTitre: "Retraite spirituelle des frères enseignants",
    nom: "Koffi",
    prenom: "Samuel",
    email: "samuel.koffi@email.com",
    telephone: "+229 92 33 44 55",
    nombrePlaces: 1,
    montantTotal: 0,
    statutPaiement: "gratuit",
    dateInscription: Timestamp.fromDate(new Date("2026-07-03T09:05:00")),
  },
  {
    id: "r4",
    eventId: "1",
    eventTitre: "Séminaire annuel de formation biblique",
    nom: "Dossou",
    prenom: "Ruth",
    email: "ruth.dossou@email.com",
    telephone: "+229 93 44 55 66",
    nombrePlaces: 1,
    montantTotal: 5000,
    statutPaiement: "annule",
    dateInscription: Timestamp.fromDate(new Date("2026-06-28T16:20:00")),
  },
];