"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import type { DemoEvent } from "../../../lib/demo-data";

const schema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  prenom: z.string().min(2, "Le prénom est requis"),
  email: z.string().email("Adresse email invalide"),
  telephone: z
    .string()
    .min(8, "Numéro de téléphone invalide")
    .regex(/^[0-9+ ]+$/, "Numéro de téléphone invalide"),
  nombrePlaces: z.coerce.number().min(1).max(10),
});

type FormValues = z.input<typeof schema>;

export function InscriptionForm({ event }: { event: DemoEvent }) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: { nombrePlaces: 1 },
  });

  const nombrePlaces = watch("nombrePlaces") || 1;
  const montantTotal = event.prix * Number(nombrePlaces || 1);

  const placesEpuisees =
    event.placesTotal !== null && (event.placesRestantes ?? 0) <= 0;

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      // TODO : remplacer par l'appel réel à /api/inscription
      // qui créera la RegistrationDoc dans Firestore, puis :
      //  - si event.prix > 0 : ouvrir le widget KKiaPay avec montantTotal
      //  - si event.prix === 0 : confirmer directement + email de confirmation
      await new Promise((resolve) => setTimeout(resolve, 900));
      console.log("Inscription (démo) :", { ...values, eventId: event.id, montantTotal });

      toast.success(
        event.prix > 0
          ? "Inscription enregistrée — redirection vers le paiement..."
          : "Inscription confirmée ! Un email de confirmation vous sera envoyé."
      );
    } catch {
      toast.error("Une erreur est survenue. Merci de réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  if (placesEpuisees) {
    return (
      <div className="rounded-xl bg-bg-alt p-6 text-center text-muted">
        Toutes les places pour cet événement ont été réservées.
      </div>
    );
  }

  if (event.statut === "passe") {
    return (
      <div className="rounded-xl bg-bg-alt p-6 text-center text-muted">
        Cet événement est terminé, les inscriptions sont closes.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Nom" placeholder="Kouassi" {...register("nom")} error={errors.nom?.message} />
        <Input label="Prénom" placeholder="Jean" {...register("prenom")} error={errors.prenom?.message} />
      </div>
      <Input
        label="Email"
        type="email"
        placeholder="jean.kouassi@email.com"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="Téléphone"
        placeholder="+229 90 00 00 00"
        {...register("telephone")}
        error={errors.telephone?.message}
      />
      <Input
        label="Nombre de places"
        type="number"
        min={1}
        max={10}
        {...register("nombrePlaces")}
        error={errors.nombrePlaces?.message}
      />

      <div className="flex items-center justify-between rounded-xl bg-bg-alt px-5 py-4">
        <span className="text-sm font-medium text-ink">Total à payer</span>
        <span className="font-display text-xl font-bold text-primary">
          {montantTotal > 0 ? `${montantTotal.toLocaleString("fr-FR")} FCFA` : "Gratuit"}
        </span>
      </div>

      <Button type="submit" variant="accent" size="lg" disabled={submitting} className="w-full">
        {submitting
          ? "Traitement en cours..."
          : event.prix > 0
          ? "S'inscrire et payer"
          : "Confirmer mon inscription"}
      </Button>

      {event.prix > 0 && (
        <p className="text-center text-xs text-muted">
          Paiement sécurisé via Mobile Money (MTN, Moov) ou carte bancaire — propulsé par KKiaPay.
        </p>
      )}
    </form>
  );
}