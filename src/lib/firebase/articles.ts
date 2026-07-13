
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { ArticleDoc, ArticleStatus } from "@/types";
import { slugify } from "@/lib/firebase/events";

const articlesCol = collection(db, "articles");

/** Catégories d'actualités proposées dans le formulaire admin */
export const ARTICLE_CATEGORIES = [
  "Formation",
  "Vie du réseau",
  "Événement",
  "Annonce",
] as const;

/** Lecture publique — uniquement les articles publiés, triés du plus récent au plus ancien */
export async function getPublishedArticles(): Promise<ArticleDoc[]> {
  const q = query(
    articlesCol,
    where("statut", "==", "publie"),
    orderBy("datePublication", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ArticleDoc);
}

export async function getArticleBySlug(slug: string): Promise<ArticleDoc | null> {
  const q = query(
    articlesCol,
    where("slug", "==", slug),
    where("statut", "==", "publie")
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as ArticleDoc;
}

export interface CreateArticleInput {
  titre: string;
  extrait: string;
  contenuHTML: string;
  imageUrl: string;
  imagePublicId: string;
  categorie: string;
  statut: ArticleStatus;
  createdBy: string;
}

export async function createArticle(input: CreateArticleInput): Promise<string> {
  const slug = slugify(input.titre);

  // Firestore rejette toute valeur `undefined` — on nettoie avant l'écriture
  const cleanInput = Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined)
  );

  const docRef = await addDoc(articlesCol, {
    ...cleanInput,
    slug,
    datePublication: Timestamp.now(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateArticle(
  id: string,
  input: Partial<CreateArticleInput>
): Promise<void> {
  const cleanInput = Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined)
  );
  await updateDoc(doc(db, "articles", id), {
    ...cleanInput,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteArticle(id: string): Promise<void> {
  await deleteDoc(doc(db, "articles", id));
}
