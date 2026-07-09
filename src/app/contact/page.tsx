"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send, Sparkles, ShieldCheck } from "lucide-react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Input, Textarea } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

const schema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Adresse email invalide"),
  sujet: z.string().min(3, "Le sujet est requis"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Message de contact :", values);
      toast.success("Votre message a bien été transmis au REFEB !");
      reset();
    } catch {
      toast.error("Une erreur est survenue. Merci de réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className="bg-[#F8FAFC] min-h-screen">
        
        
        {/* HERO SECTION IMMERSIF */}
<section className="relative bg-primary-dark py-36 text-white overflow-hidden">
  {/* Grille géométrique décorative subtile */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
  
  <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 backdrop-blur-sm">
      <Sparkles size={14} className="text-accent" />
      <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
        À votre écoute
      </p>
    </div>
    <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl text-white">
      Restons Connectés
    </h1>
    <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
      Une question, un projet de partenariat ou une suggestion ? L&apos;équipe du REFEB est à votre entière disposition pour avancer ensemble.
    </p>
  </div>
</section>

        {/* SECTION CONTENU ET FORMULAIRE */}
        <section className="relative py-24 px-6 lg:px-8 -mt-16 z-10">
          <div className="mx-auto max-w-6xl grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            
            {/* BLOC GAUCHE : COORDONNÉES STYLE EDITORIAL (4 colonnes) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-black text-[#0A192F]">
                    Secrétariat
                  </h2>
                  <p className="text-slate-400 text-xs font-semibold mt-1 uppercase tracking-wider">
                    Réseau REFEB Bénin
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Adresse */}
                  <div className="group flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-amber-500/5 hover:border-amber-500/20 border border-transparent">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#0A192F] shadow-sm group-hover:bg-amber-500 group-hover:text-[#0A192F] transition-all">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Siège social</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-0.5">Cotonou, Bénin</p>
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div className="group flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-amber-500/5 hover:border-amber-500/20 border border-transparent">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#0A192F] shadow-sm group-hover:bg-amber-500 group-hover:text-[#0A192F] transition-all">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Ligne directe</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-0.5">+229 00 00 00 00</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-amber-500/5 hover:border-amber-500/20 border border-transparent">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#0A192F] shadow-sm group-hover:bg-amber-500 group-hover:text-[#0A192F] transition-all">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Courrier électronique</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-0.5 break-all">contact@refeb-benin.org</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-400">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  Données protégées par protocole sécurisé.
                </div>
              </div>
            </div>

            {/* BLOC DROITE : LE FORMULAIRE DE PRESTIGE (8 colonnes) */}
            <div className="lg:col-span-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 rounded-3xl bg-white p-8 sm:p-10 border border-slate-200/80 shadow-md shadow-slate-200/40"
              >
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0A192F]">Formulaire de contact</h3>
                  <p className="text-slate-400 text-sm mt-1">Remplissez les informations ci-dessous, notre équipe traite les demandes sous 24h ouvrées.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Input 
                    label="Nom complet" 
                    placeholder="Ex: Jean Kouassi" 
                    {...register("nom")} 
                    error={errors.nom?.message}
                    className="focus:border-amber-500"
                  />
                  <Input 
                    label="Adresse Email" 
                    type="email" 
                    placeholder="Ex: jean@email.com" 
                    {...register("email")} 
                    error={errors.email?.message} 
                  />
                </div>
                
                <Input 
                  label="Sujet de la correspondance" 
                  placeholder="Ex: Demande de partenariat / Adhésion au réseau" 
                  {...register("sujet")} 
                  error={errors.sujet?.message} 
                />
                
                <Textarea 
                  label="Votre message éditorial" 
                  placeholder="Écrivez votre message de manière détaillée ici..." 
                  rows={5}
                  {...register("message")} 
                  error={errors.message?.message} 
                />
                
                <Button 
                  type="submit" 
                  disabled={submitting} 
                  className="mt-4 group rounded-full bg-[#0A192F] text-white hover:bg-slate-800 py-4 font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-md shadow-slate-900/10 disabled:opacity-50"
                >
                  {submitting ? (
                    "Transmission sécurisée..."
                  ) : (
                    <>
                      Transmettre le message 
                      <Send size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </Button>
              </form>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}