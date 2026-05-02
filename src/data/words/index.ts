export interface WordEntry {
  id: number;
  hint: string;
  answer: string;
}

export interface SubPack {
  id: string;
  label: string;
  words: WordEntry[];
  /**
   * Optional list of sibling SubPack IDs whose words this SubPack merges.
   * When set, the effective word pool is the union of all referenced subpacks'
   * words (plus any own `words`, deduplicated by ID).
   * Composite subpacks are excluded from the "All" pool to avoid double-counting.
   */
  subPackRefs?: string[];
}

export interface WordPack {
  id: string;
  name: string;
  subPacks: SubPack[];
}

// ── Registry ──────────────────────────────────────────────────────────────────
import { pack as technology } from "./technology";
import { pack as animals } from "./animals";
import { pack as sports } from "./sports";
import { pack as science } from "./science";
import { pack as food } from "./food";

export const wordPacks: WordPack[] = [
  technology,
  animals,
  sports,
  science,
  food,
];

/**
 * Flatten all base (non-composite) words across all sub-packs, deduped by ID.
 * Composite subpacks (subPackRefs set) are skipped so "All" never double-counts.
 */
export function getAllWords(pack: WordPack): WordEntry[] {
  const seen = new Set<number>();
  const result: WordEntry[] = [];
  for (const sp of pack.subPacks) {
    if (sp.subPackRefs && sp.subPackRefs.length > 0) continue;
    for (const w of sp.words) {
      if (!seen.has(w.id)) {
        seen.add(w.id);
        result.push(w);
      }
    }
  }
  return result;
}

/**
 * Resolve the effective word pool for a SubPack.
 * Composite subpacks union their referenced subpacks' words (one level deep),
 * then append any words declared directly on themselves, deduped by ID.
 * Base subpacks just return their own words array.
 */
export function getSubPackWords(pack: WordPack, sp: SubPack): WordEntry[] {
  if (!sp.subPackRefs || sp.subPackRefs.length === 0) return sp.words;

  const seen = new Set<number>();
  const result: WordEntry[] = [];

  const push = (w: WordEntry) => {
    if (!seen.has(w.id)) {
      seen.add(w.id);
      result.push(w);
    }
  };

  for (const refId of sp.subPackRefs) {
    const ref = pack.subPacks.find((s) => s.id === refId);
    if (!ref) continue;
    for (const w of ref.words) push(w);
  }

  for (const w of sp.words) push(w);

  return result;
}
