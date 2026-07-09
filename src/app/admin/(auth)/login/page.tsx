"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";

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
      // TODO : remplacer par signInWithEmailAndPassword(auth, email, password)
      // de Firebase Auth (lib/firebase/client.ts), puis vérifier le custom
      // claim de rôle (admin / gestionnaire) avant de rediriger.
      await new Promise((resolve) => setTimeout(resolve, 700));

      if (!email || !password) {
        setError("Veuillez renseigner votre email et votre mot de passe.");
        return;
      }

      toast.success("Connexion réussie (démo)");
      router.push("/admin");
    } catch {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-primary">REFEB</h1>
        <p className="mt-1 text-sm text-muted">Tableau de bord administrateur</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="admin@refeb-benin.org"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" variant="primary" size="lg" disabled={submitting} className="mt-2 w-full">
          {submitting ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
    </div>
  );
}