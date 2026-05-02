import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  wordPacks,
  getAllWords,
  getSubPackWords,
  type WordEntry,
} from "../data/words/index";
import { cards, jokerJokes, drawCard, type Card } from "../data/cards";
import { themes } from "../data/themes";

export interface Team {
  id: string;
  name: string;
  cups: number;
  finishedAt: number | null;
}

export type GamePhase = "home" | "playing" | "results";
export type GameStep = "word" | "card";

const defaultWeights = Object.fromEntries(cards.map((c) => [c.id, c.weight]));

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Dynamically scramble the letters of an answer, preserving space positions.
 * Re-shuffles if the result happens to match the answer (too easy).
 */
function scrambleAnswer(answer: string): string[] {
  const wordLengths = answer.split(" ").map((w) => w.length);
  const letters = answer.replace(/ /g, "").split("");

  function shuffle(arr: string[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Shuffle until it differs from the answer (avoid trivially solved puzzles)
  const answerLetters = letters.slice();
  let attempts = 0;
  do {
    shuffle(letters);
    attempts++;
  } while (letters.join("") === answerLetters.join("") && attempts < 10);

  // Rebuild with spaces in correct positions
  const tiles: string[] = [];
  let li = 0;
  for (let wi = 0; wi < wordLengths.length; wi++) {
    if (wi > 0) tiles.push(" ");
    for (let k = 0; k < wordLengths[wi]; k++) {
      tiles.push(letters[li++] ?? "");
    }
  }
  return tiles;
}

/**
 * Apply hint: swap the first letter of the answer into its correct tile position.
 * Returns the index of the hinted tile, or null if no swap was needed.
 */
function applyHint(tiles: string[], answer: string): number | null {
  const answerChars = answer.split("");
  const correctTileIdx = answerChars.findIndex((c) => c !== " ");
  if (correctTileIdx === -1) return null;

  const correctChar = answerChars[correctTileIdx];
  if (tiles[correctTileIdx] === correctChar) return correctTileIdx;

  const swapIdx = tiles.findIndex(
    (c, i) => c === correctChar && i !== correctTileIdx,
  );
  if (swapIdx === -1) return null;
  [tiles[correctTileIdx], tiles[swapIdx]] = [
    tiles[swapIdx],
    tiles[correctTileIdx],
  ];
  return correctTileIdx;
}

/** Pick an unused joke, resetting the pool if exhausted. */
function pickJoke(usedIndices: number[]): { joke: string; index: number } {
  const available = jokerJokes
    .map((_, i) => i)
    .filter((i) => !usedIndices.includes(i));

  if (available.length === 0) {
    return { joke: "The joker showed up empty-handed.", index: -1 };
  }
  const index = available[Math.floor(Math.random() * available.length)];
  return { joke: jokerJokes[index], index };
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useGameStore = defineStore(
  "game",
  () => {
    const usedWordIds = ref<Record<string, number[]>>({});
    const usedJokeIndices = ref<number[]>([]);
    const phase = ref<GamePhase>("home");
    const gameStep = ref<GameStep>("word");
    const teams = ref<Team[]>([]);
    const currentWord = ref<WordEntry | null>(null);
    const currentTiles = ref<string[]>([]);
    const currentCard = ref<Card | null>(null);
    const jokerContent = ref<string>("");
    const showAnswer = ref(false);
    const pendingHint = ref(false);
    const roundNumber = ref(0);

    // ── Settings ──────────────────────────────────────────────────────────────
    const targetCups = ref(10);
    const selectedTheme = ref<string>(themes[0].id);
    const cardWeights = ref<Record<string, number>>({ ...defaultWeights });
    const selectedPackId = ref<string>(wordPacks[0].id);
    const selectedSubPackId = ref<string | null>(null); // null = All

    const cardWeightsTotal = computed(() =>
      Object.values(cardWeights.value).reduce((s, w) => s + w, 0),
    );

    const isInfinite = computed(() => targetCups.value === 0);

    function setTargetCups(v: number) {
      targetCups.value = Math.max(0, Math.floor(v));
    }
    function setTheme(id: string) {
      selectedTheme.value = id;
    }
    function setCardWeight(id: string, raw: number) {
      cardWeights.value = {
        ...cardWeights.value,
        [id]: Math.max(0, Math.floor(raw)),
      };
    }
    function resetCardWeights() {
      cardWeights.value = { ...defaultWeights };
    }
    function setWordPack(id: string) {
      selectedPackId.value = id;
      selectedSubPackId.value = null; // reset to All on pack change
    }
    function setSubPack(id: string | null) {
      selectedSubPackId.value = id;
    }

    // ── Derived word state ─────────────────────────────────────────────────────

    const usedWordIdSet = computed(
      () => new Set(usedWordIds.value[selectedPackId.value] ?? []),
    );

    const currentPack = computed(
      () =>
        wordPacks.find((p) => p.id === selectedPackId.value) ?? wordPacks[0],
    );

    // All words in the pack flattened across sub-packs
    const allPackWords = computed(() => getAllWords(currentPack.value));

    // Words eligible to draw from: filtered by sub-pack selection, minus used
    const availableWords = computed(() => {
      if (selectedSubPackId.value === null) {
        return allPackWords.value.filter((w) => !usedWordIdSet.value.has(w.id));
      }
      const sp = currentPack.value.subPacks.find(
        (s) => s.id === selectedSubPackId.value,
      );
      const pool = sp
        ? getSubPackWords(currentPack.value, sp)
        : allPackWords.value;
      return pool.filter((w) => !usedWordIdSet.value.has(w.id));
    });

    const scrambledTokens = computed(() => {
      if (!currentWord.value || currentTiles.value.length === 0) return [];
      const tiles = [...currentTiles.value];
      const hintIdx = pendingHint.value
        ? applyHint(tiles, currentWord.value.answer)
        : null;

      return tiles.map((char, idx) => ({
        char,
        isSpace: char === " ",
        isHint: idx === hintIdx,
      }));
    });

    const answerLetterCount = computed(() =>
      currentWord.value
        ? currentWord.value.answer.split("").filter((c) => c !== " ").length
        : 0,
    );

    const rankedTeams = computed(() =>
      [...teams.value]
        .filter((t) => t.finishedAt !== null)
        .sort((a, b) => (a.finishedAt ?? 0) - (b.finishedAt ?? 0)),
    );

    // ── Team actions ──────────────────────────────────────────────────────────

    function addTeam(name: string) {
      teams.value.push({
        id: crypto.randomUUID(),
        name,
        cups: 0,
        finishedAt: null,
      });
    }

    function removeTeam(id: string) {
      teams.value = teams.value.filter((t) => t.id !== id);
    }

    function adjustCups(id: string, delta: number) {
      const team = teams.value.find((t) => t.id === id);
      if (!team) return;
      const prev = team.cups;
      team.cups = Math.max(0, team.cups + delta);
      if (!isInfinite.value) {
        const target = targetCups.value;
        if (prev < target && team.cups >= target && team.finishedAt === null) {
          team.finishedAt = Date.now();
        }
        if (team.cups < target) team.finishedAt = null;
      }
    }

    // ── Game flow ─────────────────────────────────────────────────────────────

    function loadNextWord() {
      if (availableWords.value.length === 0) return;
      const pool = availableWords.value;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      const packId = selectedPackId.value;
      usedWordIds.value = {
        ...usedWordIds.value,
        [packId]: [...(usedWordIds.value[packId] ?? []), pick.id],
      };
      currentWord.value = pick;
      currentTiles.value = scrambleAnswer(pick.answer);
      gameStep.value = "word";
      showAnswer.value = false;
      currentCard.value = null;
      jokerContent.value = "";
      roundNumber.value++;
    }

    function startGame() {
      phase.value = "playing";
      pendingHint.value = false;
      currentCard.value = null;
      jokerContent.value = "";
      showAnswer.value = false;
      loadNextWord();
    }

    function nextWord() {
      loadNextWord();
    }

    function skipWord() {
      pendingHint.value = false;
      loadNextWord();
    }

    function revealAnswer() {
      showAnswer.value = true;
    }

    function goToCard() {
      const card = drawCard(cardWeights.value);
      currentCard.value = card;
      gameStep.value = "card";
      showAnswer.value = false;

      if (card.id === "joker") {
        if (Math.random() < 0.5) {
          const { joke, index } = pickJoke(usedJokeIndices.value);
          jokerContent.value = joke;
          if (index !== -1) usedJokeIndices.value.push(index);
        } else {
          jokerContent.value = "The joker showed up empty-handed.";
        }
      } else {
        jokerContent.value = "";
      }

      pendingHint.value = card.id === "hint";
    }

    function endGame() {
      phase.value = "results";
    }

    function resetSession(keepTeams = false) {
      phase.value = "home";
      gameStep.value = "word";
      teams.value = keepTeams
        ? teams.value.map((t) => ({ ...t, cups: 0, finishedAt: null }))
        : [];
      currentWord.value = null;
      currentCard.value = null;
      jokerContent.value = "";
      usedJokeIndices.value = [];
      showAnswer.value = false;
      pendingHint.value = false;
      roundNumber.value = 0;
    }

    function goHome() {
      resetSession(false);
    }
    function goHomeKeepTeams() {
      resetSession(true);
    }
    function resetWords() {
      const packId = selectedPackId.value;
      const subId = selectedSubPackId.value;

      if (subId === null) {
        usedWordIds.value = { ...usedWordIds.value, [packId]: [] };
        return;
      }

      const pack = wordPacks.find((p) => p.id === packId);
      if (!pack) return;

      const sub = pack.subPacks.find((sp) => sp.id === subId);
      if (!sub) return;

      const subWords = getSubPackWords(pack, sub);
      const subIds = new Set(subWords.map((w) => w.id));
      usedWordIds.value = {
        ...usedWordIds.value,
        [packId]: (usedWordIds.value[packId] ?? []).filter(
          (id) => !subIds.has(id),
        ),
      };
    }

    return {
      usedWordIds,
      usedJokeIndices,
      phase,
      gameStep,
      teams,
      currentWord,
      currentCard,
      jokerContent,
      showAnswer,
      roundNumber,
      targetCups,
      selectedTheme,
      isInfinite,
      cardWeights,
      cardWeightsTotal,
      setTargetCups,
      setTheme,
      setCardWeight,
      resetCardWeights,
      selectedPackId,
      selectedSubPackId,
      setWordPack,
      setSubPack,
      currentPack,
      allPackWords,
      wordPacks,
      availableWords,
      scrambledTokens,
      answerLetterCount,
      rankedTeams,
      addTeam,
      removeTeam,
      adjustCups,
      startGame,
      nextWord,
      skipWord,
      revealAnswer,
      goToCard,
      endGame,
      goHome,
      goHomeKeepTeams,
      resetWords,
    };
  },
  {
    persist: {
      paths: [
        "usedWordIds",
        "usedJokeIndices",
        "targetCups",
        "cardWeights",
        "selectedTheme",
        "selectedPackId",
        "selectedSubPackId",
      ],
      afterRestore(ctx) {
        const valid = themes.map((t) => t.id);
        if (!valid.includes(ctx.store.selectedTheme)) {
          ctx.store.selectedTheme = themes[0].id;
        }
        const validPacks = wordPacks.map((p) => p.id);
        if (!validPacks.includes(ctx.store.selectedPackId)) {
          ctx.store.selectedPackId = wordPacks[0].id;
          ctx.store.selectedSubPackId = null;
        } else {
          // Validate sub-pack still exists in the restored pack
          const pack = wordPacks.find((p) => p.id === ctx.store.selectedPackId);
          if (
            ctx.store.selectedSubPackId !== null &&
            !pack?.subPacks.some((sp) => sp.id === ctx.store.selectedSubPackId)
          ) {
            ctx.store.selectedSubPackId = null;
          }
        }
      },
    },
  },
);
