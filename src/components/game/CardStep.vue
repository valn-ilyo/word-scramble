<template>
  <div class="step-block">
    <div
      v-if="store.currentCard"
      class="card-display"
      :style="{ '--card-color': store.currentCard.color }"
    >
      <div class="card-icon">
        <v-icon size="56">{{ store.currentCard.icon }}</v-icon>
      </div>
      <div class="card-name">{{ store.currentCard.name }}</div>
      <div class="card-desc">
        {{ store.currentCard.id === 'joker' ? store.jokerContent : store.currentCard.description }}
      </div>
    </div>

    <div class="action-row">
      <button class="action-btn next" @click="store.nextWord()">
        <v-icon size="16">mdi-arrow-right</v-icon>NEXT WORD
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../../stores/gameStore'
const store = useGameStore()
</script>

<style scoped>
.step-block { display: flex; flex-direction: column; align-items: center; gap: 36px; width: 100%; }
.card-display {
  background: var(--surface);
  border: 2px solid var(--card-color); border-radius: 16px; padding: 36px 56px;
  text-align: center; max-width: 500px; width: 100%; color: var(--card-color);

  animation: card-reveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.card-icon { margin-bottom: 16px; }
.card-name {
  font-family: 'Orbitron', sans-serif; font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900; letter-spacing: 0.05em; margin-bottom: 14px;
}
.card-desc { font-size: 1.05rem; color: color-mix(in srgb, var(--text) 75%, transparent); line-height: 1.6; }
.action-row { display: flex; gap: 12px; justify-content: center; }
.action-btn {
  display: flex; align-items: center; gap: 7px; border-radius: 8px;
  font-family: 'Orbitron', sans-serif; font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.12em; padding: 13px 24px; cursor: pointer; transition: all 0.2s;
  border: 2px solid; background: transparent; border-color: var(--secondary); color: var(--secondary);
}
.action-btn:hover {
  background: color-mix(in srgb, var(--secondary) 10%, transparent);
  transform: translateY(-2px);
}
</style>
