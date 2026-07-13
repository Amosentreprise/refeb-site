import { Timestamp } from "firebase/firestore";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/home/Hero";
import { StatsCounter } from "./components/home/StatsCounter";
import { ActivitesCards } from "./components/home/ActivitesCards";
import { ProchainsEvenements } from "./components/home/ProchainsEvenements";
import { DernieresActus } from "./components/home/DernieresActus";


import { getAllEvents } from "@/lib/firebase/events";
import { getPublishedArticles } from "@/lib/firebase/articles";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [allEvents, allArticles] = await Promise.all([
    getAllEvents().catch(() => []),
    getPublishedArticles().catch(() => []),
  ]);

  const evenementsAvenir = allEvents
    .filter((e) => e.statut !== "passe")
    .slice(0, 3);
  const dernieresActus = allArticles.slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsCounter />
        <ActivitesCards />
        <ProchainsEvenements events={evenementsAvenir} />
        <DernieresActus articles={dernieresActus} />
      </main>
      <Footer />
    </>
  );
}

