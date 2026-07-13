/**
 * Script à exécuter UNE FOIS en local pour créer le premier compte admin.
 * Usage : node scripts/create-admin.mjs email@example.com motdepasse "Nom complet"
 *
 * Nécessite les variables FIREBASE_ADMIN_* dans .env.local
 */
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { config } from "dotenv";
config({ path: ".env.local" });

const [, , email, password, nom] = process.argv;

if (!email || !password) {
  console.error("Usage: node scripts/create-admin.mjs email password \"Nom complet\"");
  process.exit(1);
}

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const auth = getAuth(app);
const db = getFirestore(app);

const user = await auth.createUser({ email, password, displayName: nom });
await auth.setCustomUserClaims(user.uid, { role: "admin" });
await db.collection("adminUsers").doc(user.uid).set({
  nom: nom ?? email,
  email,
  role: "admin",
  createdAt: new Date(),
});

console.log(`✅ Compte admin créé : ${email} (uid: ${user.uid})`);
process.exit(0);