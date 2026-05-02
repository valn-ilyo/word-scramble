<template>
  <div class="section">
    <div class="section-label">
      <v-icon size="16" :color="color">{{ icon }}</v-icon>
      {{ title }}
    </div>
    <div class="rank-list">
      <div
        v-for="(team, i) in teams"
        :key="team.id"
        class="rank-row"
        :style="{ '--tc': teamColor(team.id), animationDelay: i * 0.08 + 's' }"
      >
        <div class="rank-name">{{ team.name }}</div>
        <div class="rank-score">
          {{ team.cups }}
          <v-icon size="14">mdi-hexagon-outline</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Team } from "../../stores/gameStore";
import { useGameStore } from "../../stores/gameStore";
import { TEAM_COLORS } from "../../data/constants";

defineProps<{
  teams: Team[];
  title: string;
  icon: string;
  color: string;
}>();

const store = useGameStore();

function teamColor(id: string): string {
  const idx = store.teams.findIndex((t) => t.id === id);
  return TEAM_COLORS[(idx === -1 ? 0 : idx) % TEAM_COLORS.length];
}
</script>

<style scoped>
.section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Orbitron", sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: var(--text-dim);
}
.rank-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.rank-row {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--surface);
  border: 1px solid color-mix(in srgb, var(--text) 8%, transparent);
  border-left: 3px solid var(--tc);
  border-radius: 8px;
  padding: 14px 18px;
  animation: slide-up 0.4s ease both;
}
.rank-name {
  flex: 1;
  font-size: 1rem;
  font-weight: bold;
  color: var(--text);
}
.rank-score {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Orbitron", sans-serif;
  font-size: 0.8rem;
  color: var(--text-dim);
}
</style>
