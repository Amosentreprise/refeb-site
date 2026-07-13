"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Typewriter from "typewriter-effect";
import { Mail, MapPin, Phone } from "lucide-react";
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

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Header />
      
      {/* HERO SECTION BLEUE */}
      <section className="relative bg-[#0b2240] pt-40 pb-48 px-6 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1 mb-6">
            <span className="text-[#e1a924] text-xs font-bold uppercase tracking-widest">Contact</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black mb-8 h-[150px]">
            <Typewriter
              options={{
                strings: ['Restons connectés', 'Une question ?', 'Parlons ensemble'],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
        </div>
      </section>

      {/* SECTION BLANCHE QUI DÉBORDE (Comme l'historique) */}
      <section className="relative -mt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-slate-100">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Infos */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#0b2240]">Nos coordonnées</h2>
              <div className="space-y-6 text-slate-600">
                <div className="flex items-center gap-4"><MapPin className="text-[#e1a924]" /> Cotonou, Bénin</div>
                <div className="flex items-center gap-4"><Phone className="text-[#e1a924]" /> (+229) 0195206304</div>
                <div className="flex items-center gap-4"><Mail className="text-[#e1a924]" /> contact@refeb-benin.org</div>
              </div>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit((d) => { console.log(d); toast.success("Message envoyé !"); reset(); })} className="space-y-4">
              <Input label="Nom complet" {...register("nom")} error={errors.nom?.message} />
              <Input label="Email" {...register("email")} error={errors.email?.message} />
              <Input label="Sujet" {...register("sujet")} error={errors.sujet?.message} />
              <Textarea label="Message" {...register("message")} error={errors.message?.message} rows={4} />
              <Button type="submit" className="w-full bg-[#0b2240] text-white hover:bg-[#1a3a63]">Envoyer</Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}