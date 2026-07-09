import { Timestamp } from "firebase/firestore";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/home/Hero";
import { StatsCounter } from "./components/home/StatsCounter";
import { ActivitesCards } from "./components/home/ActivitesCards";
import { ProchainsEvenements } from "./components/home/ProchainsEvenements";
import { DernieresActus } from "./components/home/DernieresActus";


const demoEvents = [
  {
    id: "1",
    titre: "Séminaire annuel de formation biblique",
    slug: "seminaire-annuel-formation-biblique",
    lieu: "Cotonou, Bénin",
    dateDebut: Timestamp.fromDate(new Date("2026-08-15")),
    statut: "a-venir" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800",
    prix: 5000,
  },
  {
    id: "2",
    titre: "Retraite spirituelle des frères enseignants",
    slug: "retraite-spirituelle-freres-enseignants",
    lieu: "Abomey-Calavi, Bénin",
    dateDebut: Timestamp.fromDate(new Date("2026-09-05")),
    statut: "a-venir" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800",
    prix: 0,
  },
  {
    id: "3",
    titre: "Assemblée générale du réseau",
    slug: "assemblee-generale-reseau",
    lieu: "Porto-Novo, Bénin",
    dateDebut: Timestamp.fromDate(new Date("2026-10-12")),
    statut: "a-venir" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    prix: 0,
  },
];

const demoArticles = [
  {
    id: "1",
    titre: "Retour sur le séminaire de formation 2026",
    slug: "retour-seminaire-formation-2026",
    extrait:
      "Plus de 200 frères enseignants réunis à Cotonou pour trois jours de formation intense et de communion fraternelle.",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800",
    categorie: "Formation",
    datePublication: Timestamp.fromDate(new Date("2026-06-20")),
  },
  {
    id: "2",
    titre: "Le REFEB accueille de nouvelles écoles partenaires",
    slug: "nouvelles-ecoles-partenaires",
    extrait:
      "Le réseau continue son expansion avec l'arrivée de cinq nouvelles écoles évangéliques dans ses rangs.",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800",
    categorie: "Vie du réseau",
    datePublication: Timestamp.fromDate(new Date("2026-05-10")),
  },
  {
    id: "3",
    titre: "Ouverture des inscriptions pour la retraite de septembre",
    slug: "ouverture-inscriptions-retraite-septembre",
    extrait:
      "Les inscriptions pour la retraite spirituelle annuelle sont désormais ouvertes en ligne, places limitées.",
    imageUrl:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800",
    categorie: "Événement",
    datePublication: Timestamp.fromDate(new Date("2026-06-28")),
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsCounter />
        <ActivitesCards />
        <ProchainsEvenements events={demoEvents} />
        <DernieresActus articles={demoArticles} />
      </main>
      <Footer />
    </>
  );
}
