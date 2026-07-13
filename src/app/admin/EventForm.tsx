"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Coins, Users, Loader2, FileText, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

// Schéma de validation dynamique Zod avec superRefine (Stable & Sans dépréciations)
const schema = z.object({
  titre: z.string().min(3, "Le titre doit faire au moins 3 caractères"),
  slug: z.string().min(3, "Le slug est requis"),
  descriptionCourte: z.string().min(10, "La description courte est trop brève"),
  categorie: z.string().min(2, "La catégorie est requise"),
  lieu: z.string().min(2, "Le lieu est requis"),
  dateDebut: z.string().min(1, "La date de début est requise"),
  statut: z.enum(["a-venir", "en-cours", "passe"]),
  isPayant: z.boolean(),
  prix: z.coerce.number().optional(),
  isIllimite: z.boolean(),
  placesTotal: z.coerce.number().optional(),
}).superRefine((data, ctx) => {
  // Validation conditionnelle pour le prix
  if (data.isPayant && (!data.prix || data.prix <= 0)) {
    ctx.addIssue({
      code: "custom",
      message: "Le montant doit être supérieur à 0 pour un événement payant",
      path: ["prix"],
    });
  }
  
  // Validation conditionnelle pour le nombre de places
  if (!data.isIllimite && (!data.placesTotal || data.placesTotal <= 0)) {
    ctx.addIssue({
      code: "custom",
      message: "Veuillez spécifier un nombre de places supérieur à 0",
      path: ["placesTotal"],
    });
  }
});

type EventFormValues = z.infer<typeof schema>;

interface EventFormProps {
  initialData?: any;
  onSubmit: (values: any) => Promise<void>;
}

export function EventForm({ initialData, onSubmit }: EventFormProps) {
  const [loading, setLoading] = useState(false);

  // Tout est correctement destructuré ici, y compris handleSubmit !
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      titre: "",
      slug: "",
      descriptionCourte: "",
      categorie: "",
      lieu: "",
      dateDebut: "",
      statut: "a-venir",
      isPayant: false,
      prix: 0,
      isIllimite: true,
      placesTotal: 0,
    },
  });

  // Observation des états réactifs des toggles
  const isPayant = watch("isPayant");
  const isIllimite = watch("isIllimite");

  const handleFormSubmit = async (values: EventFormValues) => {
    setLoading(true);
    try {
      const finalData = {
        ...values,
        prix: values.isPayant ? Number(values.prix) : 0,
        placesTotal: values.isIllimite ? null : Number(values.placesTotal),
        placesRestantes: values.isIllimite ? null : Number(values.placesTotal),
      };
      await onSubmit(finalData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-8 rounded-3xl bg-white/70 border border-white p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl animate-fade-in"
    >
      {/* SECTION 1 : INFORMATIONS GÉNÉRALES */}
      <div className="space-y-5">
        <h3 className="flex items-center gap-2 font-display text-sm font-black uppercase tracking-wider text-slate-400">
          <FileText size={16} /> Informations de base
        </h3>
        
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Titre de l'événement"
            placeholder="Ex: Séminaire National de Cybersécurité"
            {...register("titre")}
            error={errors.titre?.message}
          />
          <Input
            label="Slug (URL unique)"
            placeholder="ex: seminaire-cyber-2026"
            {...register("slug")}
            error={errors.slug?.message}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Catégorie"
            placeholder="Ex: Conférence, Formation..."
            {...register("categorie")}
            error={errors.categorie?.message}
          />
          <Input
            label="Lieu ou Lien (Si virtuel)"
            placeholder="Ex: Cotonou, Bénin ou Zoom"
            {...register("lieu")}
            error={errors.lieu?.message}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Description courte</label>
          <textarea
            rows={3}
            placeholder="Présentation rapide de l'événement qui apparaîtra sur les cartes..."
            {...register("descriptionCourte")}
            className={cn(
              "w-full rounded-2xl border border-slate-200/80 bg-white/50 p-4 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.01)] transition-all focus:border-primary/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10",
              errors.descriptionCourte && "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
            )}
          />
          {errors.descriptionCourte && (
            <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.descriptionCourte.message}</p>
          )}
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* SECTION 2 : PLANIFICATION & LOGISTIQUE */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <h3 className="flex items-center gap-2 font-display text-sm font-black uppercase tracking-wider text-slate-400">
            <Calendar size={16} /> Planification
          </h3>
          <Input
            label="Date et Heure de début"
            type="datetime-local"
            {...register("dateDebut")}
            error={errors.dateDebut?.message}
          />
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Statut initial</label>
            <select
              {...register("statut")}
              className="w-full h-11 rounded-xl border border-slate-200 bg-white/50 px-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-primary/40"
            >
              <option value="a-venir">À venir</option>
              <option value="en-cours">En cours</option>
              <option value="passe">Terminé / Archivé</option>
            </select>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="flex items-center gap-2 font-display text-sm font-black uppercase tracking-wider text-slate-400">
            <Users size={16} /> Capacité d&apos;accueil
          </h3>

          <label className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 cursor-pointer transition-all hover:bg-slate-50 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.01)]">
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-slate-900">Places de réservation illimitées</span>
              <p className="text-xs text-slate-400 font-medium">Aucune jauge restrictive sur cet événement</p>
            </div>
            <input
              type="checkbox"
              {...register("isIllimite")}
              className="sr-only peer"
            />
            <div className="relative h-6 w-11 shrink-0 rounded-full bg-slate-200 transition-colors after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full" />
          </label>

          {!isIllimite && (
            <div className="animate-fade-in">
              <Input
                label="Nombre maximal de places disponibles"
                type="number"
                placeholder="Ex: 150"
                {...register("placesTotal")}
                error={errors.placesTotal?.message}
              />
            </div>
          )}
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* SECTION 3 : FINANCES */}
      <div className="space-y-5">
        <h3 className="flex items-center gap-2 font-display text-sm font-black uppercase tracking-wider text-slate-400">
          <Coins size={16} /> Configuration d&apos;accès financier
        </h3>

        <div className="p-1 rounded-2xl bg-slate-100/80 border border-slate-200/30 grid grid-cols-2 w-full sm:w-80 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)]">
          <button
            type="button"
            onClick={() => setValue("isPayant", false)}
            className={cn(
              "py-2.5 text-xs font-extrabold rounded-xl uppercase tracking-wider transition-all",
              !isPayant
                ? "bg-white text-slate-900 shadow-sm border border-slate-100"
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            Gratuit
          </button>
          <button
            type="button"
            onClick={() => setValue("isPayant", true)}
            className={cn(
              "py-2.5 text-xs font-extrabold rounded-xl uppercase tracking-wider transition-all",
              isPayant
                ? "bg-white text-primary shadow-sm border border-slate-100"
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            Accès Payant
          </button>
        </div>

        {isPayant && (
          <div className="w-full sm:w-80 animate-fade-in">
            <Input
              label="Montant du ticket (FCFA)"
              type="number"
              placeholder="Ex: 5000"
              {...register("prix")}
              error={errors.prix?.message}
            />
          </div>
        )}
      </div>

      {/* BOUTON DE TRANSMISSION */}
      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={loading}
          className="w-full sm:w-auto h-12 px-8 shadow-md rounded-xl transition-all hover:scale-[1.01]"
        >
          {loading ? (
            <span className="flex items-center gap-2 justify-center">
              <Loader2 className="animate-spin" size={16} /> Publication en cours...
            </span>
          ) : (
            <span className="flex items-center gap-2 justify-center">
              <Check size={16} /> {initialData ? "Sauvegarder les modifications" : "Publier l'événement"}
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}