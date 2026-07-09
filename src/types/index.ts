import type { Timestamp } from "firebase/firestore";

/** Statut de cycle de vie d'un événement, dérivé des dates mais aussi forçable manuellement */
export type EventStatus = "a-venir" | "en-cours" | "passe";

/** Statut de paiement d'une inscription */
export type PaymentStatus = "en-attente" | "paye" | "gratuit" | "annule";

/** Statut de publication d'un article */
export type ArticleStatus = "brouillon" | "publie";

/** Rôles possibles dans le tableau de bord admin */
export type UserRole = "admin" | "gestionnaire";

export interface EventDoc {
  id: string;
  titre: string;
  slug: string;
  description: string;
  descriptionCourte: string;
  lieu: string;
  dateDebut: Timestamp;
  dateFin: Timestamp;
  statut: EventStatus;
  prix: number; // 0 = gratuit
  devise: "XOF";
  placesTotal: number | null; // null = illimité
  placesRestantes: number | null;
  imageUrl: string;
  imagePublicId: string; // référence Cloudinary
  lienInscriptionSlug: string; // slug unique utilisé dans l'URL d'inscription
  programme?: string; // contenu riche (HTML sanitizé)
  organisateurNom?: string;
  organisateurContact?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string; // uid de l'admin
}

export interface RegistrationDoc {
  id: string;
  eventId: string;
  eventTitre: string; // dénormalisé pour affichage rapide dans le dashboard
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  nombrePlaces: number;
  montantTotal: number;
  statutPaiement: PaymentStatus;
  referenceTransaction?: string; // référence KKiaPay
  dateInscription: Timestamp;
  notesAdmin?: string;
}

export interface PaymentDoc {
  id: string;
  registrationId: string;
  eventId: string;
  montant: number;
  devise: "XOF";
  provider: "kkiapay";
  statut: "pending" | "success" | "failed";
  referenceKkiapay: string;
  methodePaiement?: "mobile_money" | "carte";
  createdAt: Timestamp;
  confirmedAt?: Timestamp;
}

export interface ArticleDoc {
  id: string;
  titre: string;
  slug: string;
  extrait: string;
  contenuHTML: string; // sanitizé avant stockage et avant affichage
  imageUrl: string;
  imagePublicId: string;
  categorie: string;
  statut: ArticleStatus;
  datePublication: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}

export interface GalleryAlbumDoc {
  id: string;
  titre: string;
  eventId?: string; // lien optionnel vers un événement
  couvertureUrl: string;
  createdAt: Timestamp;
}

export interface GalleryImageDoc {
  id: string;
  albumId: string;
  url: string;
  publicId: string;
  legende?: string;
  ordre: number;
}

export interface AdminUserDoc {
  id: string; // = uid Firebase Auth
  nom: string;
  email: string;
  role: UserRole;
  createdAt: Timestamp;
}

/** Statistiques clés affichées sur la home (section "chiffres") */
export interface KeyStat {
  label: string;
  valeur: number;
  suffixe?: string; // ex: "+"
}