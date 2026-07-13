
/**
 * Convertit un document Firestore Admin (qui contient des instances de la
 * classe Timestamp) en objet JSON pur, sérialisable, pour pouvoir le passer
 * en prop d'un Server Component vers un Client Component.
 *
 * Next.js interdit de transmettre des instances de classe à travers cette
 * frontière — seuls les objets "plats" sont acceptés. Les champs Timestamp
 * deviennent ici de simples { _seconds, _nanoseconds } (Admin SDK) ou des
 * chaînes, selon le SDK d'origine.
 *
 * ⚠️ Utilise ceci uniquement quand le composant client n'a pas besoin des
 * méthodes de Timestamp (.toDate()) sur les champs concernés.
 */
export function toPlainObject<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}
