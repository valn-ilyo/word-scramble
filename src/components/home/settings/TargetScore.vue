<template>
  <div class="setting-section">
    <div class="setting-label">
      <v-icon size="13" color="#FFD600">mdi-trophy</v-icon>
      TARGET SCORE
    </div>
    <div class="target-row">
      <button
        class="target-step"
        :disabled="store.targetCups <= 0"
        @mousedown="decrement.start"
        @touchstart.prevent="decrement.start"
        @mouseup="decrement.stop"
        @touchend="decrement.stop"
        @mouseleave="decrement.stop"
      >
        <v-icon size="14">mdi-minus</v-icon>
      </button>

      <input
        v-if="!store.isInfinite"
        class="target-display target-input"
        type="number"
        min="0"
        :value="store.targetCups"
        @change="onInputChange"
        @keydown.up.prevent="store.setTargetCups(store.targetCups + 1)"
        @keydown.down.prevent="store.setTargetCups(store.targetCups - 1)"
      />
      <div v-else class="target-display infinite">∞</div>

      <button
        class="target-step"
        @mousedown="increment.start"
        @touchstart.prevent="increment.start"
        @mouseup="increment.stop"
        @touchend="increment.stop"
        @mouseleave="increment.stop"
      >
        <v-icon size="14">mdi-plus</v-icon>
      </button>

      <span class="target-unit">{{
        store.isInfinite ? "infinite — no win condition" : " to win"
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "../../../stores/gameStore";

const store = useGameStore();

function useLongPress(fn: () => void) {
  let delay: ReturnType<typeof setTimeout> | null = null;
  let repeat: ReturnType<typeof setInterval> | null = null;

  function start(e: Event) {
    e.preventDefault();
    fn();
    delay = setTimeout(() => {
      repeat = setInterval(fn, 80);
    }, 420);
  }

  function stop() {
    if (delay) {
      clearTimeout(delay);
      delay = null;
    }
    if (repeat) {
      clearInterval(repeat);
      repeat = null;
    }
  }

  return { start, stop };
}

const decrement = useLongPress(() => store.setTargetCups(store.targetCups - 1));
const increment = useLongPress(() => store.setTargetCups(store.targetCups + 1));

function onInputChange(e: Event) {
  const v = parseInt((e.target as HTMLInputElement).value);
  if (!isNaN(v)) store.setTargetCups(v);
}
</script>

<style scoped>
.setting-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 14px;
}
.setting-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Orbitron", sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--text-dim);
}
.target-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.target-step {
  width: 32px;
  height: 32px;
  background: color-mix(in srgb, var(--text) 5%, transparent);
  border: 1px solid color-mix(in srgb, var(--text) 12%, transparent);
  border-radius: 6px;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}
.target-step:hover:not(:disabled) {
  background: color-mix(in srgb, var(--secondary) 15%, transparent);
  border-color: var(--secondary);
}
.target-step:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.target-display {
  width: 68px;
  height: 38px;
  background: color-mix(in srgb, var(--text) 6%, transparent);
  border: 1px solid color-mix(in srgb, var(--text) 18%, transparent);
  border-radius: 6px;
  color: var(--secondary);
  font-family: "Orbitron", sans-serif;
  font-size: 1.2rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.2s,
    color 0.2s;
}
.target-input {
  text-align: center;
  outline: none;
  -moz-appearance: textfield;
  padding: 0;
}
.target-input::-webkit-outer-spin-button,
.target-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.target-input:focus {
  border-color: color-mix(in srgb, var(--secondary) 60%, transparent);
}
.target-display.infinite {
  color: #d500f9;
  border-color: rgba(213, 0, 249, 0.4);
  font-size: 1.6rem;
}
.target-unit {
  font-size: 0.75rem;
  color: var(--text-dim);
  margin-left: 2px;
}
</style>
