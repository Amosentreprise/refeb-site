import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EventForm } from "../../../../components/admin/EventForm";

export default function NouvelEvenementPage() {
  return (
    <div>
      <Link href="/admin/evenements" className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary">
        <ArrowLeft size={16} /> Retour aux événements
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-primary">Nouvel événement</h1>
      <p className="mt-1 mb-6 text-sm text-muted">
        Remplissez les informations ci-dessous. L&apos;événement sera immédiatement visible sur le site public une fois créé.
      </p>

      <EventForm />
    </div>
  );
}