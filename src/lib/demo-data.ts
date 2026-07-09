import { Timestamp } from "firebase/firestore";
import { BookOpen, Users, HeartHandshake, GraduationCap } from "lucide-react";
import type { EventDoc, ArticleDoc } from "@/types";

/**
 * DONNÉES DE DÉMONSTRATION — centralisées ici pour être réutilisées
 * sur plusieurs pages (home, /evenements, /actualites...).
 * À remplacer entièrement par lib/firebase/events.ts et articles.ts
 * quand Firestore sera branché. Les types restent identiques.
 */

export type DemoEvent = Pick<
  EventDoc,
  | "id"
  | "titre"
  | "slug"
  | "description"
  | "descriptionCourte"
  | "lieu"
  | "dateDebut"
  | "dateFin"
  | "statut"
  | "imageUrl"
  | "prix"
  | "placesTotal"
  | "placesRestantes"
  | "programme"
>;

export const demoEvents: DemoEvent[] = [
  {
    id: "1",
    titre: "Séminaire annuel de formation biblique",
    slug: "seminaire-annuel-formation-biblique",
    descriptionCourte:
      "Trois jours de formation biblique et pédagogique pour les frères enseignants du réseau.",
    description:
      "Le séminaire annuel réunit les frères enseignants autour de sessions de formation biblique, d'ateliers pédagogiques et de temps de communion fraternelle. Un rendez-vous incontournable pour se ressourcer spirituellement et renforcer les liens entre membres du réseau.",
    lieu: "Cotonou, Bénin",
    dateDebut: Timestamp.fromDate(new Date("2026-08-15T09:00:00")),
    dateFin: Timestamp.fromDate(new Date("2026-08-17T18:00:00")),
    statut: "a-venir",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200",
    prix: 5000,
    placesTotal: 200,
    placesRestantes: 87,
    programme:
      "Jour 1 : Accueil et culte d'ouverture. Jour 2 : Ateliers thématiques et étude biblique. Jour 3 : Table ronde et culte de clôture.",
  },
  {
    id: "2",
    titre: "Retraite spirituelle des frères enseignants",
    slug: "retraite-spirituelle-freres-enseignants",
    descriptionCourte:
      "Un temps de ressourcement spirituel loin du quotidien, dans un cadre paisible.",
    description:
      "Cette retraite offre un cadre calme et propice à la méditation, à la prière et au partage entre frères enseignants, loin des contraintes du quotidien scolaire.",
    lieu: "Abomey-Calavi, Bénin",
    dateDebut: Timestamp.fromDate(new Date("2026-09-05T08:00:00")),
    dateFin: Timestamp.fromDate(new Date("2026-09-06T17:00:00")),
    statut: "a-venir",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200",
    prix: 0,
    placesTotal: 80,
    placesRestantes: 34,
    programme:
      "Jour 1 : Arrivée, temps de silence et enseignement. Jour 2 : Partage en petits groupes et culte de clôture.",
  },
  {
    id: "3",
    titre: "Assemblée générale du réseau",
    slug: "assemblee-generale-reseau",
    descriptionCourte:
      "Bilan annuel des activités du REFEB et élection du bureau exécutif.",
    description:
      "L'assemblée générale annuelle est l'occasion de présenter le bilan des activités du réseau, de voter les orientations futures et, tous les deux ans, d'élire le nouveau bureau exécutif.",
    lieu: "Porto-Novo, Bénin",
    dateDebut: Timestamp.fromDate(new Date("2026-10-12T09:00:00")),
    dateFin: Timestamp.fromDate(new Date("2026-10-12T16:00:00")),
    statut: "a-venir",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200",
    prix: 0,
    placesTotal: null,
    placesRestantes: null,
    programme: "Bilan moral et financier, échanges, élections (si applicable).",
  },
  {
    id: "4",
    titre: "Formation pédagogique de rentrée 2025",
    slug: "formation-pedagogique-rentree-2025",
    descriptionCourte:
      "Session passée de préparation à la rentrée scolaire pour les membres du réseau.",
    description:
      "Cette session a permis aux enseignants membres de se préparer aux défis pédagogiques de l'année scolaire, avec des ateliers pratiques animés par des formateurs expérimentés.",
    lieu: "Cotonou, Bénin",
    dateDebut: Timestamp.fromDate(new Date("2025-09-10T09:00:00")),
    dateFin: Timestamp.fromDate(new Date("2025-09-11T17:00:00")),
    statut: "passe",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200",
    prix: 3000,
    placesTotal: 150,
    placesRestantes: 0,
    programme: "Ateliers pratiques, mise en situation, échanges entre pairs.",
  },
];

export type DemoArticle = Pick<
  ArticleDoc,
  | "id"
  | "titre"
  | "slug"
  | "extrait"
  | "contenuHTML"
  | "imageUrl"
  | "categorie"
  | "datePublication"
>;

export const demoArticles: DemoArticle[] = [
  {
    id: "1",
    titre: "Retour sur le séminaire de formation 2026",
    slug: "retour-seminaire-formation-2026",
    extrait:
      "Plus de 200 frères enseignants réunis à Cotonou pour trois jours de formation intense et de communion fraternelle.",
    contenuHTML:
      "<p>Le séminaire annuel de formation biblique s'est tenu à Cotonou du 15 au 17 août, réunissant plus de 200 frères enseignants venus de tout le Bénin.</p><p>Les participants ont pu suivre des ateliers pédagogiques, des études bibliques approfondies et des temps de communion fraternelle qui ont marqué cette édition 2026.</p><p>Le réseau remercie chaleureusement tous les organisateurs et intervenants pour la réussite de cet événement.</p>",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200",
    categorie: "Formation",
    datePublication: Timestamp.fromDate(new Date("2026-06-20")),
  },
  {
    id: "2",
    titre: "Le REFEB accueille de nouvelles écoles partenaires",
    slug: "nouvelles-ecoles-partenaires",
    extrait:
      "Le réseau continue son expansion avec l'arrivée de cinq nouvelles écoles évangéliques dans ses rangs.",
    contenuHTML:
      "<p>Le REFEB poursuit sa croissance avec l'intégration de cinq nouvelles écoles évangéliques partenaires réparties dans les départements du Littoral, de l'Atlantique et de l'Ouémé.</p><p>Cette expansion renforce la mission du réseau : accompagner un nombre toujours plus grand de frères enseignants dans leur vocation.</p>",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200",
    categorie: "Vie du réseau",
    datePublication: Timestamp.fromDate(new Date("2026-05-10")),
  },
  {
    id: "3",
    titre: "Ouverture des inscriptions pour la retraite de septembre",
    slug: "ouverture-inscriptions-retraite-septembre",
    extrait:
      "Les inscriptions pour la retraite spirituelle annuelle sont désormais ouvertes en ligne, places limitées.",
    contenuHTML:
      "<p>Les inscriptions pour la retraite spirituelle des frères enseignants, prévue les 5 et 6 septembre 2026 à Abomey-Calavi, sont désormais ouvertes.</p><p>L'événement est gratuit mais les places sont limitées à 80 participants. Inscrivez-vous dès maintenant depuis la page dédiée à l'événement.</p>",
    imageUrl:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200",
    categorie: "Événement",
    datePublication: Timestamp.fromDate(new Date("2026-06-28")),
  },
];

export const activites = [
  {
    icon: BookOpen,
    titre: "Formation biblique & pédagogique",
    description:
      "Cours bibliques par correspondance, conférences bibliques et pédagogiques, animations mensuelles.",
    detail:
      "Le REFEB assure la formation biblique et pédagogique continue de ses membres à travers des cours par correspondance, des conférences pédagogiques et bibliques, ainsi que des animations pédagogiques mensuelles dans les établissements.",
  },
  {
    icon: HeartHandshake,
    titre: "Évangélisation en milieu scolaire",
    description:
      "Semaines d'évangélisation des collègues et discipolat auprès des acteurs de l'école.",
    detail:
      "Chaque enseignant est appelé à devenir un canal d'évangélisation auprès des écoliers, des enseignants et du personnel administratif, à travers un discipolat discret, multiplicateur et christocentrique.",
  },
  {
    icon: Users,
    titre: "Camps & universités de vacances",
    description:
      "Séminaires de formation, camps pour apprenants et universités de vacances.",
    detail:
      "Des camps de formation ont progressivement évolué vers des universités de vacances : des espaces structurés d'enseignement intensif, de formation pédagogique, de ressourcement spirituel et de mobilisation missionnaire.",
  },
  {
    icon: GraduationCap,
    titre: "Formation certificative",
    description:
      "Formation certificative en éducation chrétienne pour les enseignants membres.",
    detail:
      "Le réseau propose une formation certificative en éducation chrétienne, ainsi que le mentorat, le monitoring et le coaching, pour libérer l'initiative au niveau des écoliers et élèves.",
  },
];

/** Liste complète des 9 activités concrètes du REFEB, telles que listées dans ses statuts */
export const activitesDetail = [
  "Cours bibliques par correspondance",
  "Conférences pédagogiques",
  "Conférences bibliques",
  "Animations pédagogiques mensuelles",
  "Semaine d'évangélisation des collègues",
  "Séminaires de formation",
  "Camps de formation pour apprenants",
  "Universités de vacances",
  "Formation certificative en éducation chrétienne",
];