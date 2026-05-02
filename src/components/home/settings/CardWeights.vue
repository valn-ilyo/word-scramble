<template>
  <div class="setting-section">
    <div class="setting-label-row">
      <div class="setting-label">
        <v-icon size="13" color="#00E5FF">mdi-cards</v-icon>
        CARD DRAW WEIGHTS
      </div>
      <div class="label-actions">
        <button class="reset-btn" @click="previewOpen = true">
          <v-icon size="11">mdi-eye-outline</v-icon>PREVIEW
        </button>
        <button class="reset-btn" @click="store.resetCardWeights()">
          <v-icon size="11">mdi-refresh</v-icon>RESET
        </button>
      </div>
    </div>

    <CardPreviewDialog v-model="previewOpen" />

    <div class="weight-hint">
      ×1 = equal chance · Higher = more likely · 0 = off
    </div>

    <div class="card-list">
      <div
        v-for="card in cards"
        :key="card.id"
        class="card-row"
        :class="{ excluded: currentWeight(card.id) === 0 }"
        :style="{ '--cc': card.color }"
      >
        <v-icon
          size="15"
          :color="
            currentWeight(card.id) === 0 ? 'rgba(255,255,255,0.2)' : card.color
          "
        >
          {{ card.icon }}
        </v-icon>
        <span class="card-name">{{ card.name }}</span>

        <div class="stepper">
          <button
            class="step-btn"
            :disabled="currentWeight(card.id) <= 0"
            @mousedown="longPress(card.id, -1).start"
            @touchstart.prevent="longPress(card.id, -1).start"
            @mouseup="stopPress"
            @touchend="stopPress"
            @mouseleave="stopPress"
          >
            <v-icon size="12">mdi-minus</v-icon>
          </button>

          <!-- Counter: shows ×N or OFF inline -->
          <div
            class="weight-display"
            :class="{ off: currentWeight(card.id) === 0 }"
          >
            <template v-if="currentWeight(card.id) === 0"> OFF </template>
            <template v-else>
              <span class="weight-x">×</span>{{ currentWeight(card.id) }}
            </template>
          </div>

          <button
            class="step-btn"
            @mousedown="longPress(card.id, 1).start"
            @touchstart.prevent="longPress(card.id, 1).start"
            @mouseup="stopPress"
            @touchend="stopPress"
            @mouseleave="stopPress"
          >
            <v-icon size="12">mdi-plus</v-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "../../../stores/gameStore";
import { cards } from "../../../data/cards";
import CardPreviewDialog from "./CardPreviewDialog.vue";

const store = useGameStore();
const previewOpen = ref(false);

function currentWeight(id: string): number {
  return store.cardWeights[id] ?? 0;
}

let pressDelay: ReturnType<typeof setTimeout> | null = null;
let pressInterval: ReturnType<typeof setInterval> | null = null;

function longPress(id: string, delta: number) {
  function fire() {
    store.setCardWeight(id, currentWeight(id) + delta);
  }
  return {
    start(e: Event) {
      e.preventDefault();
      fire();
      pressDelay = setTimeout(() => {
        pressInterval = setInterval(fire, 80);
      }, 420);
    },
  };
}

function stopPress() {
  if (pressDelay) {
    clearTimeout(pressDelay);
    pressDelay = null;
  }
  if (pressInterval) {
    clearInterval(pressInterval);
    pressInterval = null;
  }
}
</script>

<style scoped>
.setting-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
.setting-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.label-actions {
  display: flex;
  gap: 6px;
}
.reset-btn {
  display: flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--primary) 35%, transparent);
  color: var(--primary);
  font-family: "Orbitron", sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  padding: 9px 9px;
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.2s;
}
.reset-btn:hover {
  background: color-mix(in srgb, var(--primary) 12%, transparent);
}
.weight-hint {
  font-size: 0.75rem;
  color: var(--text-dim);
  line-height: 1.5;
  font-style: italic;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.card-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 7px;
  border: 1px solid color-mix(in srgb, var(--cc) 20%, transparent);
  background: color-mix(in srgb, var(--cc) 4%, transparent);
  transition:
    opacity 0.2s,
    border-color 0.2s,
    background 0.2s;
}
.card-row.excluded {
  border-color: color-mix(in srgb, var(--text) 7%, transparent);
  background: transparent;
  opacity: 0.5;
}
.card-name {
  flex: 1;
  font-size: 0.8rem;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-row.excluded .card-name {
  color: var(--text-dim);
}

.stepper {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}
.step-btn {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--text) 12%, transparent);
  background: color-mix(in srgb, var(--text) 5%, transparent);
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
.step-btn:hover:not(:disabled) {
  background: color-mix(in srgb, var(--cc) 20%, transparent);
  border-color: var(--cc);
}
.step-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

/* The merged ×N counter */
.weight-display {
  min-width: 42px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--cc) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--cc) 35%, transparent);
  border-radius: 4px;
  font-family: "Orbitron", sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--cc);
  letter-spacing: 0.02em;
  transition:
    color 0.2s,
    background 0.2s,
    border-color 0.2s;
  user-select: none;
}
.weight-display.off {
  color: color-mix(in srgb, var(--text) 25%, transparent);
  background: transparent;
  border-color: color-mix(in srgb, var(--text) 10%, transparent);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
}
.weight-x {
  font-size: 0.7rem;
  opacity: 0.75;
  margin-right: 1px;
}
</style>
