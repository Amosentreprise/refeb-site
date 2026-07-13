"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle, CreditCard, Loader2 } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import type { EventDoc } from "@/types";





const schema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  prenom: z.string().min(2, "Le prénom est requis"),
  email: z.string().email("Adresse email invalide"),
  telephone: z.string().min(8, "Numéro trop court").regex(/^[0-9+ ]+$/, "Numéro de téléphone invalide"),
  nombrePlaces: z.coerce.number().min(1, "Minimum 1 place").max(10, "Maximum 10 places"),
});

type FormValues = z.input<typeof schema>;

interface InscriptionFormProps {
  event: {
    id: string;
    prix: number;
    statut: string;
    placesTotal: number | null;
    placesRestantes: number | null;
  };
}

export function InscriptionForm({ event }: InscriptionFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
 const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: { nombrePlaces: 1 },
  });

  const nombrePlaces = watch("nombrePlaces") || 1;
  const montantTotal = event.prix * Number(nombrePlaces);
  const placesEpuisees = event.placesTotal !== null && (event.placesRestantes ?? 0) <= 0;

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          nom: values.nom,
          prenom: values.prenom,
          email: values.email,
          telephone: values.telephone,
          nombrePlaces: Number(values.nombrePlaces),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Une erreur est survenue.");
        return;
      }

      // Succès direct (KKiaPay désactivé)
      toast.success("Votre inscription a été validée avec succès !");
      setSuccess(true);
    } catch (error) {
      console.error(error);
      toast.error("Erreur réseau. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6 text-center space-y-2">
        <CheckCircle2 className="mx-auto text-emerald-500" size={32} />
        <h3 className="text-emerald-900 font-bold text-base">Félicitations !</h3>
        <p className="text-emerald-700 text-sm leading-relaxed">
          Votre place a été réservée. L'enregistrement Firestore fonctionne !
        </p>
      </div>
    );
  }

  if (placesEpuisees) {
    return (
      <div className="rounded-2xl bg-amber-50 border border-amber-100 p-6 text-center space-y-2">
        <AlertTriangle className="mx-auto text-amber-500" size={28} />
        <p className="text-amber-800 text-sm font-semibold">Événement Complet</p>
      </div>
    );
  }

  if (event.statut === "passe") {
    return (
      <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 text-center text-slate-500 text-sm">
        Les inscriptions pour cet événement sont terminées.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Nom" placeholder="Nom" {...register("nom")} error={errors.nom?.message} />
        <Input label="Prénom" placeholder="Prénom" {...register("prenom")} error={errors.prenom?.message} />
      </div>
      <Input label="Adresse Email" type="email" placeholder="email@exemple.com" {...register("email")} error={errors.email?.message} />
      <Input label="Téléphone / WhatsApp" placeholder="Ex: +229 90..." {...register("telephone")} error={errors.telephone?.message} />
      <Input label="Nombre de tickets" type="number" min={1} max={10} {...register("nombrePlaces")} error={errors.nombrePlaces?.message} />

      <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-100 px-4 py-3.5">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total (Mode Test)</span>
        <span className="font-display text-lg font-extrabold text-slate-900">
          {montantTotal > 0 ? `${montantTotal.toLocaleString("fr-FR")} FCFA` : "Gratuit"}
        </span>
      </div>

      <Button type="submit" variant="accent" size="lg" disabled={submitting} className="w-full h-12">
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={16} /> Enregistrement...
          </span>
        ) : (
          "Valider l'inscription (Sans Paiement)"
        )}
      </Button>
    </form>
  );
}

