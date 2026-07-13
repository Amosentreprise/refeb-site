"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash2 } from "lucide-react";
import { Input, Textarea } from "../ui/Input";
import { Button } from "../ui/Button";
import { createEvent, updateEvent } from "@/lib/firebase/events";
import { useAuth } from "@/hooks/useAuth";
import { EVENT_CATEGORIES, type EventDoc } from "@/types";


const schema = z
  .object({
    titre: z.string().min(3, "Le titre est requis"),
    categorie: z.enum(EVENT_CATEGORIES, { message: "Choisissez un type d'événement" }),
    descriptionCourte: z.string().min(10, "La description courte est requise"),
    description: z.string().min(20, "La description complète est requise"),
    lieu: z.string().min(2, "Le lieu est requis"),
    dateDebut: z.string().min(1, "La date de début est requise"),
    dateFin: z.string().min(1, "La date de fin est requise"),
    prix: z.coerce.number().min(0),
    placesIllimitees: z.boolean(),
    placesTotal: z.coerce.number().min(1).optional(),
    programme: z.string().optional(),
  })
  .refine(
    (data) => data.placesIllimitees || (data.placesTotal && data.placesTotal >= 1),
    {
      message: "Indique un nombre de places, ou coche \"illimité\".",
      path: ["placesTotal"],
    }
  );

type FormValues = z.input<typeof schema>;

interface Props {
  existingEvent?: EventDoc;
}

export function EventForm({ existingEvent }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState(existingEvent?.imageUrl ?? "");
  const [imagePublicId, setImagePublicId] = useState(existingEvent?.imagePublicId ?? "");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: existingEvent
      ? {
          titre: existingEvent.titre,
          categorie: existingEvent.categorie,
          descriptionCourte: existingEvent.descriptionCourte,
          description: existingEvent.description,
          lieu: existingEvent.lieu,
          dateDebut: existingEvent.dateDebut.toDate().toISOString().slice(0, 16),
          dateFin: existingEvent.dateFin.toDate().toISOString().slice(0, 16),
          prix: existingEvent.prix,
          placesIllimitees: existingEvent.placesTotal === null,
          placesTotal: existingEvent.placesTotal ?? undefined,
          programme: existingEvent.programme ?? "",
        }
      : { prix: 0, placesIllimitees: false },
  });

  const placesIllimitees = watch("placesIllimitees");

  async function onSubmit(values: FormValues) {
    if (!imageUrl) {
      toast.error("Merci d'ajouter une image de couverture.");
      return;
    }
    if (!user) {
      toast.error("Session expirée, merci de vous reconnecter.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        titre: values.titre!,
         categorie: values.categorie!,
        descriptionCourte: values.descriptionCourte!,
        description: values.description!,
        lieu: values.lieu!,
        dateDebut: new Date(values.dateDebut!),
        dateFin: new Date(values.dateFin!),
        prix: Number(values.prix),
        placesTotal: values.placesIllimitees ? null : Number(values.placesTotal),
        imageUrl,
        imagePublicId,
        programme: values.programme,
        createdBy: user.uid,
      };

      if (existingEvent) {
        await updateEvent(existingEvent.id, payload);
        toast.success("Événement mis à jour !");
      } else {
        await createEvent(payload);
        toast.success("Événement créé et publié !");
      }

      router.push("/admin/evenements");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
   <form
  onSubmit={handleSubmit(onSubmit, (formErrors) => {
    console.log("Erreurs de validation :", formErrors);
    toast.error("Certains champs sont invalides ou manquants. Vérifie le formulaire.");
  })}
  className="grid grid-cols-1 gap-8 lg:grid-cols-3"
>
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
        <Input label="Titre de l'événement" {...register("titre")} error={errors.titre?.message} />
        <div>
  <label className="text-sm font-medium text-ink">Type d&apos;événement</label>
  <select
    {...register("categorie")}
    className="mt-1.5 w-full rounded-lg border border-muted/30 bg-white px-4 py-2.5 text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
    defaultValue=""
  >
    <option value="" disabled>Choisir un type...</option>
    {EVENT_CATEGORIES.map((cat) => (
      <option key={cat} value={cat}>{cat}</option>
    ))}
  </select>
  {errors.categorie && (
    <p className="mt-1 text-sm text-red-600">{errors.categorie.message}</p>
  )}
</div>

        <Textarea label="Description courte (affichée sur les cartes)" {...register("descriptionCourte")} error={errors.descriptionCourte?.message} />
        <Textarea label="Description complète" rows={6} {...register("description")} error={errors.description?.message} />
        <Textarea label="Programme (optionnel)" rows={4} {...register("programme")} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <label className="text-sm font-medium text-ink">Image de couverture</label>
          {imageUrl ? (
            <div className="relative mt-2">
              <img src={imageUrl} alt="Aperçu" className="h-40 w-full rounded-lg object-cover" />
              <button
                type="button"
                onClick={() => { setImageUrl(""); setImagePublicId(""); }}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 hover:bg-white"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={(result) => {
                if (typeof result.info === "object" && result.info) {
                  setImageUrl(result.info.secure_url);
                  setImagePublicId(result.info.public_id);
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="mt-2 flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-muted/30 p-8 text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <ImagePlus size={24} />
                  <span className="text-sm">Choisir une image</span>
                </button>
              )}
            </CldUploadWidget>
          )}
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
          <Input label="Lieu" {...register("lieu")} error={errors.lieu?.message} />
          <Input label="Date et heure de début" type="datetime-local" {...register("dateDebut")} error={errors.dateDebut?.message} />
          <Input label="Date et heure de fin" type="datetime-local" {...register("dateFin")} error={errors.dateFin?.message} />
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
          <Input label="Prix par place (FCFA, 0 = gratuit)" type="number" min={0} {...register("prix")} error={errors.prix?.message} />

          <label className="flex items-center gap-2 text-sm text-ink">
            <Controller
              name="placesIllimitees"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="h-4 w-4 rounded border-muted/30 text-primary focus:ring-primary/30"
                /> 
              )}
            />
            Nombre de places illimité
          </label>

          {!placesIllimitees && (
            <Input label="Nombre total de places" type="number" min={1} {...register("placesTotal")} error={errors.placesTotal?.message} />
          )}
        </div>

        <Button type="submit" variant="accent" size="lg" disabled={submitting} className="w-full">
          {submitting ? "Enregistrement..." : existingEvent ? "Enregistrer les modifications" : "Créer et publier l'événement"}
        </Button>
      </div>
    </form>
  );
}