"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Loader2, LockKeyhole, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Connexion réussie");
      router.push("/admin");
    } catch {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    /* CONTENEUR GLOBAL : Centre parfaitement la carte et applique le fond d'écran moderne */
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-tr from-slate-100 via-slate-50 to-slate-200/80 p-4 antialiased">
      
      {/* LA CARTE LOGIN : Style Glass-Neumorphism épuré */}
      <div className="w-full max-w-md rounded-3xl bg-white/70 border border-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl animate-fade-in">
        
        {/* EN-TÊTE DE LA CARTE */}
        <div className="text-center space-y-2">
          {/* Badge Icône Neumorphic */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[4px_4px_10px_rgba(0,0,0,0.03),-4px_-4px_10px_rgba(255,255,255,0.9)] border border-slate-100 text-slate-900">
            <LockKeyhole size={20} className="text-primary animate-pulse" />
          </div>
          
          <div>
            <h1 className="font-display text-2xl font-black tracking-tight text-slate-900">
              REFEB
            </h1>
            <p className="inline-flex items-center gap-1.5 rounded-lg bg-primary/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary mt-1">
              <ShieldCheck size={12} /> Espace Administrateur
            </p>
          </div>
        </div>

        {/* FORMULAIRE DE CONNEXION */}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          
          <div className="space-y-4">
            <Input 
              label="Adresse Email" 
              type="email" 
              placeholder="admin@refeb-benin.org" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            
            <Input 
              label="Mot de passe" 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          {/* MESSAGE D'ERREUR INTERNE ÉLÉGANT */}
          {error && (
            <div className="rounded-xl bg-rose-50 border border-rose-100 p-3 text-center animate-shake">
              <p className="text-xs font-bold text-rose-600">{error}</p>
            </div>
          )}

          {/* BOUTON D'ACTION PRINCIPAL */}
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            disabled={submitting} 
            className="mt-2 w-full h-12 font-bold shadow-md rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            {submitting ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="animate-spin" size={16} /> Authentification...
              </span>
            ) : (
              "Se connecter"
            )}
          </Button>
          
        </form>

      </div>
    </div>
  );
}