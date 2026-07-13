"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import type { UserRole } from "@/types";

interface AuthState {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    role: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({ user: null, role: null, loading: false });
        return;
      }
      const tokenResult = await user.getIdTokenResult();
      const role = (tokenResult.claims.role as UserRole | undefined) ?? null;
      setState({ user, role, loading: false });
    }) ;

    return () => unsubscribe();
  }, []);

  return state;
}