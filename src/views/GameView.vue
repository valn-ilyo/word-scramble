<template>
  <div class="game-screen">
    <GridBg :fixed="true" />
    <TeamTracker @end="endGame" />

    <main class="game-main">
      <div class="round-badge">ROUND {{ store.roundNumber }}</div>
      <div class="game-content">
        <transition name="step-transition" mode="out-in">
          <WordStep v-if="store.gameStep === 'word'" key="word" />
          <CardStep v-else key="card" />
        </transition>
        <div v-if="store.availableWords.length === 0" class="no-words">
          Word pool exhausted — return home to reset.
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/gameStore";
import GridBg from "../components/GridBg.vue";
import TeamTracker from "../components/game/TeamTracker.vue";
import WordStep from "../components/game/WordStep.vue";
import CardStep from "../components/game/CardStep.vue";

const store = useGameStore();
const router = useRouter();

function endGame() {
  store.endGame();
  router.push("/results");
}
</script>

<style scoped>
.game-screen {
  min-height: 100vh;
  background: var(--game-bg);
  display: flex;
  position: relative;
  overflow: hidden;
}
.game-main {
  flex: 1;
  margin-right: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 0;
  position: relative;
  z-index: 1;
}
.game-content {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
}
.round-badge {
  font-family: "Orbitron", sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--text-dim);
  background: color-mix(in srgb, var(--text) 4%, transparent);
  border: 1px solid color-mix(in srgb, var(--text) 8%, transparent);
  padding: 6px 16px;
  border-radius: 20px;
}
.no-words {
  font-size: 0.8rem;
  color: rgba(255, 23, 68, 0.7);
}
.step-transition-enter-active {
  animation: slide-up 0.4s ease;
}
.step-transition-leave-active {
  transition: all 0.25s ease;
}
.step-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
