<template>
  <aside class="team-tracker">
    <div class="tracker-header">
      <v-icon size="14" color="#FFD600">mdi-trophy</v-icon>
      <span>TEAMS</span>
    </div>

    <div class="tracker-list">
      <div
        v-for="(team, index) in store.teams"
        :key="team.id"
        class="tracker-card"
        :style="{ '--tc': TEAM_COLORS[index % TEAM_COLORS.length] }"
        :class="{ finished: team.finishedAt !== null }"
      >
        <div class="tc-top">
          <div class="tc-name">{{ team.name }}</div>
          <div class="tc-cups">
            <span class="cups-count">{{ team.cups }}</span>
          </div>
        </div>
        <div class="tc-bar">
          <div
            class="tc-fill"
            :style="{
              width: store.isInfinite
                ? '0%'
                : Math.min((team.cups / store.targetCups) * 100, 100) + '%',
            }"
          />
        </div>
        <div class="tc-controls">
          <button class="ctrl-btn minus" @click="store.adjustCups(team.id, -1)">
            <v-icon size="14">mdi-minus</v-icon>
          </button>
          <button class="ctrl-btn plus" @click="store.adjustCups(team.id, 1)">
            <v-icon size="14">mdi-plus</v-icon>
          </button>
        </div>
        <div v-if="team.finishedAt !== null" class="finished-badge">✓</div>
      </div>
    </div>

    <button class="end-btn" @click="emit('end')">
      <v-icon size="13">mdi-flag-checkered</v-icon>END GAME
    </button>
  </aside>
</template>

<script setup lang="ts">
import { useGameStore } from "../../stores/gameStore";
import { TEAM_COLORS } from "../../data/constants";

const store = useGameStore();
const emit = defineEmits<{ end: [] }>();
</script>

<style scoped>
.team-tracker {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  background: var(--surface);
  border-left: 1px solid color-mix(in srgb, var(--text) 8%, transparent);
  display: flex;
  flex-direction: column;
  z-index: 10;
  padding: 12px 10px;
  gap: 8px;
}
.tracker-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Orbitron", sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  color: var(--secondary);
  padding-bottom: 8px;
  border-bottom: 1px solid color-mix(in srgb, var(--text) 8%, transparent);
  flex-shrink: 0;
}
.tracker-list {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 6px;
  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, var(--text) 10%, transparent) transparent;
}
.tracker-list::-webkit-scrollbar {
  width: 3px;
}
.tracker-list::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--text) 12%, transparent);
  border-radius: 3px;
}
.tracker-card {
  background: color-mix(in srgb, var(--text) 3%, transparent);
  border: 1px solid color-mix(in srgb, var(--text) 6%, transparent);
  border-left: 3px solid var(--tc);
  border-radius: 7px;
  padding: 7px 9px;
  position: relative;
  transition:
    background 0.3s,
    border-color 0.3s;
  flex-shrink: 0;
}
.tracker-card.finished {
  border-color: #76ff03;
  background: rgba(118, 255, 3, 0.05);
}
.tc-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 4px;
}
.tc-name {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}
.tc-cups {
  display: flex;
  align-items: baseline;
  gap: 2px;
  flex-shrink: 0;
}
.cups-count {
  font-family: "Orbitron", sans-serif;
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--tc);
  line-height: 1;
}
.cups-label {
  font-size: 0.68rem;
  color: var(--text-dim);
}
.tc-bar {
  height: 2px;
  background: color-mix(in srgb, var(--text) 7%, transparent);
  border-radius: 2px;
  margin-bottom: 5px;
  overflow: hidden;
}
.tc-fill {
  height: 100%;
  background: var(--tc);
  border-radius: 2px;
  transition: width 0.4s ease;
}
.tc-controls {
  display: flex;
  gap: 4px;
}
.ctrl-btn {
  flex: 1;
  background: color-mix(in srgb, var(--text) 4%, transparent);
  border: 1px solid color-mix(in srgb, var(--text) 7%, transparent);
  color: var(--text);
  border-radius: 4px;
  padding: 3px;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ctrl-btn.plus:hover {
  background: rgba(118, 255, 3, 0.18);
  border-color: #76ff03;
}
.ctrl-btn.minus:hover {
  background: rgba(255, 23, 68, 0.18);
  border-color: #ff1744;
}
.finished-badge {
  position: absolute;
  top: 4px;
  right: 6px;
  font-size: 0.7rem;
  color: #76ff03;
  font-weight: bold;
}
.end-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255, 23, 68, 0.35);
  color: #ff1744;
  font-family: "Orbitron", sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  padding: 9px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}
.end-btn:hover {
  background: rgba(255, 23, 68, 0.1);
}
</style>
