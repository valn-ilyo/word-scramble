<template>
  <div class="home-screen">
    <GridBg />
    <div class="home-content">
      <PageTitle> WORD<br /><span class="accent">SCRAMBLE</span> </PageTitle>
      <TeamsPanel />
      <SettingsPanel />
      <button
        class="start-btn"
        :disabled="store.teams.length < 2"
        @click="startGame"
      >
        <span v-if="store.teams.length < 2" class="start-btn-content">
          Add at least 2 teams to start
        </span>
        <span v-else class="start-btn-content">
          <v-icon size="22">mdi-play</v-icon>START GAME
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/gameStore";
import GridBg from "../components/GridBg.vue";
import PageTitle from "../components/PageTitle.vue";
import TeamsPanel from "../components/home/TeamsPanel.vue";
import SettingsPanel from "../components/home/SettingsPanel.vue";

const store = useGameStore();
const router = useRouter();

function startGame() {
  store.startGame();
  router.push("/game");
}
</script>

<style scoped>
.home-screen {
  min-height: 100vh;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.home-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 560px;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}
.accent {
  color: var(--primary);
}
.start-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: transparent;
  border: 2px solid var(--secondary);
  font-family: "Orbitron", sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  padding: 17px;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}
.start-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--secondary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
  z-index: 0;
}
.start-btn:hover:not(:disabled)::before {
  transform: scaleX(1);
}
.start-btn:hover:not(:disabled) {
  box-shadow: none;
}
.start-btn-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--secondary);
  transition: color 0.3s;
}
.start-btn:hover:not(:disabled) .start-btn-content {
  color: var(--bg);
}
.start-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
