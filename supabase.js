/* Notas en línea con Supabase (opcional).
   Con url y clave vacías, las notas funcionan como antes (se guardan en descripciones.js).
   Con url y clave puestas, cada visitante puede pegar su nota y todos la ven.

   Dónde encontrarlas: Supabase → tu proyecto → Project Settings → API Keys
   - url:   "Project URL", algo como https://abcdxyz.supabase.co
   - clave: la "publishable" (sb_publishable_...) o la "anon" antigua. NUNCA la "secret" / "service_role".
   Esta clave es pública a propósito: lo que protege la tabla son las reglas de supabase.sql. */
const SUPABASE = {
  url: "https://fybbpqzpaeagfaueueug.supabase.co",
  clave: "sb_publishable_KAfqRKOEF6W7TQ4INB52Lg_scoMP8sM",
};
