<template>
  <div class="step-block">
    <transition name="word-transition" mode="out-in">
      <div class="word-block" :key="store.currentWord?.id">
        <div class="word-meta">
          <span class="word-number">#{{ store.currentWord?.id }}</span>
        </div>

        <div class="word-row" :style="tileStyle">
          <template v-if="!store.showAnswer">
            <div
              v-for="(group, wi) in scrambledGroups"
              :key="wi"
              class="word-unit"
            >
              <span
                v-for="(token, li) in group"
                :key="li"
                class="letter-tile"
                :class="{ 'hint-letter': token.isHint }"
                >{{ token.char }}</span
              >
              <div v-if="wi < scrambledGroups.length - 1" class="word-gap" />
            </div>
          </template>
          <template v-else>
            <div v-for="(word, wi) in answerGroups" :key="wi" class="word-unit">
              <span
                v-for="(char, li) in word"
                :key="li"
                class="letter-tile answer-tile"
                >{{ char }}</span
              >
              <div v-if="wi < answerGroups.length - 1" class="word-gap" />
            </div>
          </template>
        </div>

        <div class="word-hint-text">{{ store.currentWord?.hint }}</div>
      </div>
    </transition>

    <div class="action-row">
      <button
        v-if="store.showAnswer"
        class="action-btn skip"
        @click="store.skipWord()"
      >
        <v-icon size="16">mdi-skip-next</v-icon>SKIP
      </button>
      <button
        v-if="!store.showAnswer"
        class="action-btn reveal"
        @click="store.revealAnswer()"
      >
        <v-icon size="16">mdi-eye</v-icon>REVEAL
      </button>
      <button
        v-if="store.showAnswer"
        class="action-btn next"
        @click="store.goToCard()"
      >
        <v-icon size="16">mdi-cards</v-icon>NEXT
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGameStore } from "../../stores/gameStore";
const store = useGameStore();

const scrambledGroups = computed(() => {
  const groups: (typeof store.scrambledTokens)[number][][] = [];
  let current: (typeof store.scrambledTokens)[number][] = [];
  for (const token of store.scrambledTokens) {
    if (token.isSpace) {
      if (current.length) groups.push(current);
      current = [];
    } else {
      current.push(token);
    }
  }
  if (current.length) groups.push(current);
  return groups;
});

const answerGroups = computed(() =>
  (store.currentWord?.answer ?? "").split(" ").map((w) => w.split("")),
);

const totalLetterCount = computed(
  () => store.scrambledTokens.filter((t) => !t.isSpace).length,
);

const tileStyle = computed(() => {
  const n = totalLetterCount.value;
  if (n > 16)
    return { "--tile-w": "48px", "--tile-h": "56px", "--tile-fs": "1.0rem" };
  if (n > 14)
    return { "--tile-w": "52px", "--tile-h": "60px", "--tile-fs": "1.2rem" };
  if (n > 12)
    return { "--tile-w": "58px", "--tile-h": "66px", "--tile-fs": "1.6rem" };
  return { "--tile-w": "68px", "--tile-h": "76px", "--tile-fs": "2rem" };
});
</script>

<style scoped>
.step-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  width: 100%;
}
.word-block {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.word-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}
.word-number {
  font-family: "Share Tech Mono", monospace;
  font-size: 0.85rem;
  color: color-mix(in srgb, var(--text) 25%, transparent);
  letter-spacing: 0.2em;
}
.word-row {
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 20px;
  justify-content: center;
  align-items: flex-start;
}
.word-unit {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
}
.word-gap {
  width: 20px;
}
.letter-tile {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--tile-w, clamp(44px, 6vw, 68px));
  height: var(--tile-h, clamp(52px, 7.5vw, 76px));
  background: var(--tile-bg);
  border: 2px solid var(--tile-border-color);
  border-radius: 8px;
  font-family: "Orbitron", sans-serif;
  font-size: var(--tile-fs, clamp(1.2rem, 2.5vw, 2rem));
  font-weight: 900;
  color: var(--tile-text-color);
  text-transform: uppercase;
  animation: letter-pop 0.35s ease both;
  transition:
    width 0.2s ease,
    height 0.2s ease,
    font-size 0.2s ease;
}
.letter-tile.hint-letter {
  border-color: var(--tile-hint-border);
  color: var(--tile-hint-text);
  background: var(--tile-hint-bg);
  box-shadow: var(--tile-hint-shadow);
}
.answer-tile {
  border-color: var(--tile-answer-border);
  color: var(--tile-answer-text);
  background: var(--tile-answer-bg);
  box-shadow: var(--tile-answer-shadow);
}
.word-hint-text {
  font-size: var(--hint-size, 1.55rem);
  color: var(--hint-color, rgba(255, 255, 255, 0.72));
  font-style: var(--hint-style, italic);
  font-weight: var(--hint-weight, 500);
  max-width: 600px;
  line-height: 1.45;
  text-align: center;
}
.action-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.action-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  border-radius: 8px;
  font-family: "Orbitron", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  padding: 13px 24px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid;
}
.action-btn.skip {
  background: transparent;
  border-color: color-mix(in srgb, var(--text) 20%, transparent);
  color: color-mix(in srgb, var(--text) 45%, transparent);
}
.action-btn.skip:hover {
  border-color: color-mix(in srgb, var(--text) 50%, transparent);
  color: var(--text);
}
.action-btn.reveal {
  background: transparent;
  border-color: color-mix(in srgb, var(--text) 30%, transparent);
  color: color-mix(in srgb, var(--text) 60%, transparent);
}
.action-btn.reveal:hover {
  border-color: var(--text);
  color: var(--text);
}
.action-btn.next {
  background: transparent;
  border-color: var(--secondary);
  color: var(--secondary);
}
.action-btn.next:hover {
  background: color-mix(in srgb, var(--secondary) 10%, transparent);
  transform: translateY(-2px);
}
.word-transition-enter-active {
  animation: slide-up 0.35s ease;
}
.word-transition-leave-active {
  transition: all 0.2s ease;
}
.word-transition-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
