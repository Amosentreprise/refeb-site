"use client";

import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Target,
  ShieldCheck,
  Compass,
  Sparkles,
  Quote,
  CalendarDays,
  Milestone,
} from "lucide-react";

import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";


const timeline = [
  {
    year: "2013",
    title: "L'origine de la vision",
    description:
      "Une situation observée dans un établissement scolaire révèle l'immense pouvoir d'influence que possède un enseignant sur la vie des élèves.",
  },
  {
    year: "16 août 2016",
    title: "Première rencontre nationale",
    description:
      "Près de cinquante enseignants issus de différentes confessions chrétiennes se réunissent au Temple Universitaire des Assemblées de Dieu à Abomey-Calavi.",
  },
  {
    year: "2017 - 2020",
    title: "Structuration du mouvement",
    description:
      "Création progressive des sections communales, organisation des premières formations et développement du réseau sur le territoire national.",
  },
  {
    year: "Aujourd'hui",
    title: "Un réseau en pleine croissance",
    description:
      "Le REFEB poursuit sa mission de former des enseignants transformés afin d'impacter durablement l'école, l'Église et la société.",
  },
];

const objectives = [
  "Évangéliser les acteurs de l'école.",
  "Développer un discipolat christocentrique.",
  "Encourager le mentorat et le coaching.",
  "Créer des Clubs de Bonne Nouvelle.",
  "Promouvoir l'intégrité professionnelle.",
  "Former continuellement les enseignants.",
];

const actions = [
  "Conférences bibliques",
  "Conférences pédagogiques",
  "Séminaires de formation",
  "Universités de vacances",
  "Animations pédagogiques",
  "Camps pour apprenants",
  "Formation certificative",
  "Cours bibliques",
];

export default function HistoriquePage() {
  return (
    <>
      <Header />

      <main className="bg-white">

        {/* HERO */}

        <section className="relative overflow-hidden bg-primary-dark text-white">

          <div className="absolute inset-0">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff15,transparent_60%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:42px_42px]" />

          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8">

            <div className="max-w-4xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">

                <Compass className="h-4 w-4 text-accent" />

                <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">

                  Notre Histoire

                </span>

              </div>

              <h1 className="mt-8 font-display text-5xl font-bold leading-tight lg:text-7xl">

                Une vision née au cœur du monde éducatif.

              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/80">

                Le Réseau Évangélique des Frères Enseignants du Bénin est né
                d'une conviction profonde : chaque enseignant possède un
                pouvoir d'influence capable de transformer durablement une
                génération.

              </p>

              <div className="mt-10 flex gap-4">

                <a
                  href="#vision"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-primary transition hover:scale-105"
                >
                  Découvrir notre vision
                  <ArrowRight size={18} />
                </a>

              </div>

            </div>

          </div>

        </section>

        {/* ORIGINE */}

        <section className="relative -mt-20 z-20 px-6">

          <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-2xl ring-1 ring-primary/5">

            <div className="grid gap-16 lg:grid-cols-2">

              <div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">

                  <BookOpen className="text-accent-dark" />

                </div>

                <h2 className="mt-8 font-display text-4xl font-bold text-primary">

                  Une histoire atypique

                </h2>

                <p className="mt-8 text-muted leading-8">

                  En 2013, une situation préoccupante observée dans un
                  établissement scolaire a profondément marqué plusieurs
                  enseignants chrétiens.

                </p>

                <p className="mt-6 text-muted leading-8">

                  Des élèves étaient progressivement influencés par des
                  pratiques présentées comme des moyens d'obtenir la réussite
                  scolaire, révélant combien l'école pouvait devenir un lieu
                  d'influence puissant, capable d'orienter toute une
                  génération.

                </p>

                <p className="mt-6 text-muted leading-8">

                  Cette réalité a suscité une réflexion profonde : si une
                  influence peut détourner des jeunes, une influence fondée sur
                  l'Évangile peut également conduire à la vérité, à l'intégrité
                  et à une transformation durable.

                </p>

              </div>

              <div className="rounded-3xl bg-primary-dark p-10 text-white">

                <Quote className="h-10 w-10 text-accent" />

                <blockquote className="mt-8 font-display text-3xl leading-relaxed">

                  L'école n'est pas seulement un lieu où l'on transmet des
                  connaissances.

                  <br />

                  <br />

                  C'est un véritable champ de mission où chaque enseignant
                  influence des vies, des consciences et des générations.

                </blockquote>

                <div className="mt-10 h-px bg-white/10" />

                <p className="mt-8 text-white/70 leading-8">

                  De cette conviction est née l'idée de rassembler des
                  enseignants chrétiens autour d'une même vision afin de les
                  former, les encourager et les équiper pour exercer une
                  influence positive, éthique et durable dans le système
                  éducatif béninois.

                </p>

              </div>

            </div>

          </div>

        </section>
                {/* NAISSANCE DE LA VISION */}

        <section
          id="vision"
          className="py-28 bg-gradient-to-b from-white to-bg-alt"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent-dark">
                <Sparkles size={16} />
                Une conviction devenue mission
              </span>

              <h2 className="mt-6 font-display text-5xl font-bold text-primary">
                La naissance d'une vision
              </h2>

              <p className="mt-8 text-lg leading-9 text-muted">
                Le REFEB est né de la conviction qu'un enseignant influence
                bien plus que les résultats scolaires. Chaque salle de classe
                est un espace où se construisent les consciences, les valeurs
                et l'avenir d'une génération.
              </p>

            </div>

            <div className="mt-20 grid gap-8 lg:grid-cols-3">

              <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-primary/5">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                  <GraduationCap />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-primary">
                  Former
                </h3>

                <p className="mt-4 leading-8 text-muted">
                  Développer des enseignants compétents, responsables et
                  profondément enracinés dans les valeurs de l'Évangile.
                </p>

              </div>

              <div className="rounded-3xl bg-primary-dark p-8 text-white shadow-xl">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary">
                  <Target />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Influencer
                </h3>

                <p className="mt-4 leading-8 text-white/80">
                  Faire de chaque enseignant un acteur de transformation,
                  capable d'impacter positivement les élèves, les collègues et
                  toute la communauté éducative.
                </p>

              </div>

              <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-primary/5">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark">
                  <ShieldCheck />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-primary">
                  Transformer
                </h3>

                <p className="mt-4 leading-8 text-muted">
                  Contribuer à bâtir une école où l'intégrité, l'excellence et
                  la solidarité deviennent des références durables.
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* TIMELINE */}

        <section className="py-28 bg-white">

          <div className="mx-auto max-w-6xl px-6">

            <div className="text-center">

              <span className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">

                <CalendarDays size={16} />

                Notre parcours

              </span>

              <h2 className="mt-6 font-display text-5xl font-bold text-primary">

                Une décennie de transformation

              </h2>

            </div>

            <div className="relative mt-24 border-l-2 border-accent/20 pl-12">

              {timeline.map((item) => (

                <div
                  key={item.year}
                  className="group relative mb-20 last:mb-0"
                >

                  <div className="absolute -left-[58px] flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary shadow-lg transition group-hover:scale-110">

                    <Milestone size={18} />

                  </div>

                  <span className="inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-bold text-accent-dark">

                    {item.year}

                  </span>

                  <h3 className="mt-5 text-2xl font-bold text-primary">

                    {item.title}

                  </h3>

                  <p className="mt-4 max-w-2xl leading-8 text-muted">

                    {item.description}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* VISION + CREDO */}

        <section className="py-28 bg-bg-alt">

          <div className="mx-auto max-w-7xl px-6">

            <div className="grid gap-10 lg:grid-cols-2">

              <div className="rounded-[32px] bg-primary-dark p-12 text-white">

                <span className="text-accent font-semibold uppercase tracking-[0.2em]">
                  Notre Vision
                </span>

                <h2 className="mt-6 font-display text-4xl font-bold">

                  Des enseignants transformés par l'Évangile.

                </h2>

                <p className="mt-8 leading-9 text-white/80">

                  Des enseignants transformés par l'Évangile, engagés pour le
                  salut des acteurs de l'école, pour la promotion de
                  l'intégrité, de la solidarité, de l'innovation et du
                  développement social.

                </p>

              </div>

              <div className="rounded-[32px] bg-white p-12 shadow-xl ring-1 ring-primary/5">

                <span className="text-accent-dark font-semibold uppercase tracking-[0.2em]">

                  Notre Crédo

                </span>

                <blockquote className="mt-8 font-display text-3xl leading-relaxed text-primary">

                  « Prêcher et vivre l'Évangile en milieu éducatif par les
                  professionnels du milieu. »

                </blockquote>

              </div>

            </div>

          </div>

        </section>

        {/* DEVISE */}

        <section className="py-28 bg-white">

          <div className="mx-auto max-w-7xl px-6">

            <div className="text-center">

              <h2 className="font-display text-5xl font-bold text-primary">

                Notre devise

              </h2>

            </div>

            <div className="mt-20 grid gap-8 md:grid-cols-3">

              {[
                {
                  title: "Intégrité",
                  text: "Agir avec droiture, transparence et fidélité aux valeurs chrétiennes.",
                },
                {
                  title: "Excellence",
                  text: "Rechercher la qualité dans l'enseignement et dans le service.",
                },
                {
                  title: "Solidarité",
                  text: "Grandir ensemble en développant l'entraide et la fraternité.",
                },
              ].map((item) => (

                <div
                  key={item.title}
                  className="rounded-[30px] border border-primary/5 bg-gradient-to-br from-white to-bg-alt p-10 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                >

                  <h3 className="font-display text-3xl font-bold text-primary">

                    {item.title}

                  </h3>

                  <p className="mt-6 leading-8 text-muted">

                    {item.text}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>
                {/* OBJECTIFS */}

        <section className="py-28 bg-gradient-to-b from-bg-alt to-white">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="text-center">

              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent-dark">
                <Target size={16} />
                Nos objectifs
              </span>

              <h2 className="mt-6 font-display text-5xl font-bold text-primary">
                Une mission concrète
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted">
                Le REFEB poursuit une mission claire : former, accompagner et
                mobiliser les enseignants chrétiens afin qu'ils deviennent des
                acteurs de transformation dans leurs établissements.
              </p>

            </div>

            <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {objectives.map((objective, index) => (

                <div
                  key={index}
                  className="group rounded-3xl border border-primary/5 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-xl"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white transition group-hover:bg-accent group-hover:text-primary">

                    {index + 1}

                  </div>

                  <p className="mt-6 text-lg leading-8 text-muted">

                    {objective}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* NOS ACTIONS */}

        <section className="py-28 bg-primary-dark text-white">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="text-center">

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-accent">

                <BookOpen size={16} />

                Nos actions

              </span>

              <h2 className="mt-6 font-display text-5xl font-bold">

                Comment nous agissons

              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70">

                Au fil des années, le REFEB a développé plusieurs activités
                destinées à former les enseignants, accompagner les élèves et
                renforcer l'impact chrétien dans les établissements scolaires.

              </p>

            </div>

            <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {actions.map((action) => (

                <div
                  key={action}
                  className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition duration-300 hover:-translate-y-2 hover:bg-white/10"
                >

                  <GraduationCap className="h-10 w-10 text-accent" />

                  <h3 className="mt-6 text-xl font-bold">

                    {action}

                  </h3>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="relative overflow-hidden py-32">

          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-primary" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative mx-auto max-w-5xl px-6 text-center text-white">

            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur">

              <Sparkles size={16} />

              Rejoindre le REFEB

            </span>

            <h2 className="mt-8 font-display text-5xl font-bold leading-tight">

              Ensemble, transformons durablement
              <br />
              l'école et la société.

            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/80">

              Rejoignez un réseau d'enseignants engagés pour promouvoir
              l'intégrité, l'excellence et la solidarité au service de
              l'éducation et des générations futures.

            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">

              <a
                href="/adhesion"
                className="inline-flex items-center gap-3 rounded-2xl bg-accent px-8 py-4 font-semibold text-primary transition hover:scale-105"
              >
                Devenir membre
                <ArrowRight size={18} />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center rounded-2xl border border-white/20 px-8 py-4 font-semibold transition hover:bg-white/10"
              >
                Nous contacter
              </a>

            </div>

          </div>

        </section>

      </main>
      
      <Footer />

    </>

  );

}