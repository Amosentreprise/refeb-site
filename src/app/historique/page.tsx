"use client";

import { motion, useMotionValue, useTransform, type Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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

// --- COMPOSANT TYPEWRITER POUR LE TITRE HERO ---
function TypewriterEffect({ words }: { words: string[] }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const fullWord = words[currentWordIndex];
      
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText === fullWord) {
          setTypingSpeed(2000); // Pause quand le mot est complet
          setIsDeleting(true);
        } else {
          setTypingSpeed(100);
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(500); // Pause avant de retaper
        } else {
          setTypingSpeed(50);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed]);

  return (
    <span className="relative inline-block text-[#e1a924]">
      {currentText}
      <span className="absolute right-[-4px] top-0 bottom-0 w-[3px] bg-[#e1a924] animate-pulse" />
    </span>
  );
}

// --- COMPOSANT CARTE 3D AVEC BORDURE LUMINEUSE CIRCULANTE ---
function InteractiveCard({ children, isPremium = false }: { children: React.ReactNode; isPremium?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Variables de mouvement pour l'effet 3D
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Inclinaison de la carte (maximum 15 degrés)
  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  // Position de la lueur de bordure
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calcul pour l'effet 3D
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);

    // Calcul pour le flux lumineux sur la bordure
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative rounded-2xl p-8 border overflow-hidden transition-all duration-300 ${
        isPremium
          ? "bg-gradient-to-b from-[#e1a924] to-[#cfa01f] text-[#0b2240] border-none shadow-xl shadow-[#e1a924]/20"
          : "bg-white border-slate-200 text-slate-600 shadow-md"
      }`}
    >
      {/* COURANT LUMINEUX SUR LA BORDURE (S'active au survol) */}
      {isHovered && !isPremium && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(225,169,36,0.15), transparent 80%)`,
          }}
        />
      )}
      
      {isHovered && !isPremium && (
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl z-10"
          style={{
            background: `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, #e1a924, transparent 70%)`,
            maskImage: 'linear-gradient(white, white)',
            WebkitMaskImage: 'linear-gradient(white, white)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px'
          }}
        />
      )}

      {/* Contenu interne propulsé en avant sur l'axe Z pour accentuer la 3D */}
      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
}

const timeline = [
  { year: "2013", title: "L'origine de la vision", description: "Une situation observée dans un établissement scolaire révèle l'immense pouvoir d'influence que possède un enseignant sur la vie des élèves." },
  { year: "16 août 2016", title: "Première rencontre nationale", description: "Près de cinquante enseignants issus de différentes confessions chrétiennes se réunissent au Temple Universitaire des Assemblées de Dieu à Abomey-Calavi." },
  { year: "2017 - 2020", title: "Structuration du mouvement", description: "Création progressive des sections communales, organisation des premières formations et développement du réseau sur le territoire national." },
  { year: "Aujourd'hui", title: "Un réseau en pleine croissance", description: "Le REFEB poursuit sa mission de former des enseignants transformés afin d'impacter durablement l'école, l'Église et la société." },
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
  "Conférences bibliques", "Conférences pédagogiques", "Séminaires de formation", "Universités de vacances",
  "Animations pédagogiques", "Camps pour apprenants", "Formation certificative", "Cours bibliques"
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function HistoriquePage() {
  return (
    <>
      <Header />

      <main className="bg-[#f4f7fa] overflow-hidden text-slate-800 perspective-1000">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0b2240] via-[#11325d] to-[#1a457a] text-white pt-24">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-[#e1a924]/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-[#3b82f6]/30 blur-[100px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                <Compass className="h-4 w-4 text-[#e1a924]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#e1a924] font-bold">Notre Histoire</span>
              </div>

              {/* ANIMATION TYPEWRITER APPLIQUÉE ICI */}
              <h1 className="mt-6 font-display text-4xl font-black leading-[1.2] tracking-tight sm:text-6xl lg:text-7xl text-white min-h-[3.5em] sm:min-h-[2.5em] lg:min-h-[auto]">
                Une vision née au cœur du{" "}
                <br className="hidden sm:inline" />
                <TypewriterEffect words={["monde éducatif.", "changement social.", "Réseau REFEB."]} />
              </h1>

              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200">
                Le Réseau Évangélique des Frères Enseignants du Bénin est né d'une conviction profonde : chaque enseignant possède un pouvoir d'influence capable de transformer durablement une génération.
              </p>

              <div className="mt-8 flex gap-4">
                <a href="#vision" className="group inline-flex items-center gap-2 rounded-full bg-[#e1a924] px-7 py-3.5 font-bold text-[#0b2240] shadow-lg shadow-[#e1a924]/20 transition duration-300 hover:bg-[#fcdb8a] hover:translate-y-[-2px]">
                  Découvrir notre vision
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION ORIGINE / UNE HISTOIRE ATYPIQUE */}
        <section className="relative -mt-12 z-20 px-6 max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="rounded-3xl bg-white border border-slate-200/80 p-8 lg:p-12 shadow-xl shadow-slate-200/50">
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-slate-600">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e1a924]/10 text-[#e1a924]">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-3xl lg:text-4xl font-black font-display text-[#0b2240] tracking-tight">Une histoire atypique</h2>
                <p className="leading-relaxed">En 2013, une situation préoccupante observée dans un établissement scolaire a profondément marqué plusieurs enseignants chrétiens.</p>
                <p className="leading-relaxed">Des élèves étaient progressivement influencés par des pratiques présentées comme des moyens d'obtenir la réussite scolaire, révélant combien l'école pouvait devenir un lieu d'influence puissant, capable d'orienter toute une génération.</p>
                <p className="leading-relaxed text-[#11325d] font-semibold bg-[#f0f4f8] p-4 rounded-xl border-l-4 border-[#e1a924]">
                  Cette réalité a suscité une réflexion profonde : si une influence peut détourner des jeunes, une influence fondée sur l'Évangile peut également conduire à la vérité, à l'intégrité et à une transformation durable.
                </p>
              </div>

              <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#11325d] to-[#0b2240] p-8 text-white relative overflow-hidden shadow-lg">
                <Quote className="h-10 w-10 text-[#e1a924] opacity-20 absolute top-6 right-6" />
                <blockquote className="font-display text-xl sm:text-2xl font-bold leading-relaxed text-white">
                  "L'école n'est pas seulement un lieu où l'on transmet des connaissances. C'est un véritable champ de mission."
                </blockquote>
                <div className="my-6 h-px bg-white/20" />
                <p className="text-sm text-slate-300 leading-relaxed">De cette conviction est née l'idée de rassembler des enseignants chrétiens autour d'une même vision afin de les former, les encourager et les équiper pour exercer une influence positive.</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* NAISSANCE DE LA VISION (INTEGRATION DES CARTES INTERACTIVES 3D / FLUX LUMINEUX) */}
        <section id="vision" className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#11325d]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#11325d]">
              <Sparkles size={14} className="text-[#e1a924]" /> Une conviction devenue mission
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-[#0b2240] tracking-tight">La naissance d'une vision</h2>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-14 grid gap-8 lg:grid-cols-3">
            {[
              { icon: GraduationCap, title: "Former", desc: "Développer des enseignants compétents, responsables et profondément enracinés dans les valeurs de l'Évangile.", premium: false },
              { icon: Target, title: "Influencer", desc: "Faire de chaque enseignant un actor de transformation, capable d'impacter positivement les élèves, les collègues et toute la communauté.", premium: true },
              { icon: ShieldCheck, title: "Transformer", desc: "Contribuer à bâtir une école où l'intégrité, l'excellence et la solidarité deviennent des références durables.", premium: false }
            ].map((card, i) => (
              <InteractiveCard key={i} isPremium={card.premium}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl font-bold ${card.premium ? "bg-[#0b2240] text-[#e1a924]" : "bg-[#11325d]/10 text-[#11325d]"}`}>
                  <card.icon size={22} />
                </div>
                <h3 className="mt-6 text-xl font-extrabold text-[#0b2240]">{card.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${card.premium ? "text-[#0b2240]/90" : "text-slate-500"}`}>{card.desc}</p>
              </InteractiveCard>
            ))}
          </motion.div>
        </section>

        {/* TIMELINE */}
        <section className="py-20 bg-white border-y border-slate-200 shadow-inner">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center space-y-4 mb-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 border border-slate-200">
                <CalendarDays size={14} className="text-[#e1a924]" /> Notre parcours
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-[#0b2240] tracking-tight">Une décennie de transformation</h2>
            </div>

            <div className="relative border-l-2 border-slate-200 pl-8 ml-4 sm:ml-6 space-y-12">
              {timeline.map((item, index) => (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} key={index} className="group relative">
                  <div className="absolute -left-[43px] top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white border-2 border-[#11325d] text-[#11325d] shadow-sm transition group-hover:bg-[#e1a924] group-hover:border-[#e1a924] group-hover:text-white">
                    <Milestone size={12} />
                  </div>
                  <span className="inline-block rounded-full bg-[#11325d]/10 border border-[#11325d]/20 px-3 py-1 text-xs font-bold text-[#11325d]">{item.year}</span>
                  <h3 className="mt-3 text-xl font-extrabold text-[#0b2240] group-hover:text-[#e1a924] transition-colors">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-2xl">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* VISION & CREDO */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="rounded-3xl bg-gradient-to-br from-[#1a457a] to-[#11325d] p-10 flex flex-col justify-between text-white shadow-xl">
              <div>
                <span className="text-[#e1a924] text-xs font-bold uppercase tracking-widest">Notre Vision</span>
                <h3 className="mt-4 font-display text-2xl lg:text-3xl font-black text-white leading-snug">Des enseignants transformés par l'Évangile.</h3>
              </div>
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-200">Des enseignants transformés par l'Évangile, engagés pour le salut des acteurs de l'école, pour la promotion de l'intégrité, de la solidarité, de l'innovation et du développement social.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="rounded-3xl bg-white border border-slate-200 p-10 flex flex-col justify-center shadow-lg">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Notre Crédo</span>
              <blockquote className="mt-6 font-display text-2xl lg:text-3xl font-black text-[#11325d] leading-relaxed">« Prêcher et vivre l'Évangile en milieu éducatif par les professionnels du milieu. »</blockquote>
            </motion.div>
          </div>
        </section>

        {/* OBJECTIFS */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#11325d]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#11325d]">Nos Objectifs</span>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-[#0b2240] tracking-tight">Une mission concrète</h2>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {objectives.map((objective, index) => (
                <motion.div key={index} variants={fadeInUp} className="group rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 transition-all duration-300 hover:border-[#e1a924] hover:bg-white hover:shadow-xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#11325d]/10 text-[#11325d] font-black text-sm transition-colors group-hover:bg-[#e1a924] group-hover:text-white">{index + 1}</div>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-700 group-hover:text-[#0b2240] transition-colors">{objective}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* STRATÉGIE */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">Stratégie opérationnelle</span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-[#0b2240] tracking-tight">Comment nous agissons</h2>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {actions.map((action, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#11325d] hover:shadow-md">
                <div className="h-2 w-2 rounded-full bg-[#e1a924] mb-4" />
                <h3 className="text-sm font-bold text-slate-700 group-hover:text-[#11325d]">{action}</h3>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA SECTION */}
        <section className="relative overflow-hidden py-20 border-t border-slate-200">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b2240] to-[#11325d]" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e1a924]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#e1a924] border border-[#e1a924]/30"><Sparkles size={14} /> Rejoindre le REFEB</span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight">Ensemble, transformons durablement <br /> l'école et la société.</h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300">Rejoignez un réseau d'enseignants engagés pour promouvoir l'intégrité, l'excellence et la solidarité au service de l'éducation et des générations futures.</p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a href="/adhesion" className="inline-flex items-center gap-2 rounded-full bg-[#e1a924] px-8 py-4 font-black uppercase tracking-wider text-xs text-[#0b2240] shadow-xl shadow-[#e1a924]/10 transition duration-300 hover:bg-[#fcdb8a] hover:translate-y-[-2px]">Devenir membre <ArrowRight size={16} /></a>
              <a href="/contact" className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-8 py-4 font-black uppercase tracking-wider text-xs text-white backdrop-blur-md transition duration-300 hover:bg-white/20 hover:translate-y-[-2px]">Nous contacter</a>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </>
  );
}