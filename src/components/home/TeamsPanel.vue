<template>
  <div class="teams-panel">
    <div class="panel-header">
      <span class="panel-title">TEAMS</span>
      <span class="team-count">{{ store.teams.length }} team{{ store.teams.length !== 1 ? 's' : '' }}</span>
    </div>

    <div class="add-team-row">
      <input
        v-model="newTeamName"
        class="team-input"
        placeholder="Enter team name..."
        maxlength="20"
        @keyup.enter="addTeam"
      />
      <button class="add-btn" :disabled="!newTeamName.trim()" @click="addTeam">
        <v-icon size="18">mdi-plus</v-icon>ADD
      </button>
    </div>

    <div class="team-list">
      <transition-group name="team-item">
        <div
          v-for="(team, index) in store.teams"
          :key="team.id"
          class="team-row"
          :style="{ '--team-color': TEAM_COLORS[index % TEAM_COLORS.length] }"
        >
          <div class="team-dot" />
          <span class="team-name-display">{{ team.name }}</span>
          <button class="remove-btn" @click="store.removeTeam(team.id)">
            <v-icon size="15">mdi-close</v-icon>
          </button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '../../stores/gameStore'
import { TEAM_COLORS } from '../../data/constants'

const store = useGameStore()
const newTeamName = ref('')

function addTeam() {
  if (!newTeamName.value.trim()) return
  store.addTeam(newTeamName.value.trim())
  newTeamName.value = ''
}
</script>

<style scoped>
.teams-panel {
  width: 100%;
  background: var(--surface);
  border: 1px solid color-mix(in srgb, var(--text) 8%, transparent);
  border-radius: 12px;
  padding: 18px;
  display: flex; flex-direction: column; gap: 14px;
}
.panel-header { display: flex; justify-content: space-between; align-items: center; }
.panel-title {
  font-family: 'Orbitron', sans-serif; font-size: 0.8rem;
  letter-spacing: 0.2em; color: var(--secondary);
}
.team-count { font-size: 0.75rem; color: var(--text-dim); }
.add-team-row { display: flex; gap: 10px; }
.team-input {
  flex: 1; background: var(--surface2);
  border: 1px solid color-mix(in srgb, var(--text) 15%, transparent);
  border-radius: 6px; color: var(--text);
  font-family: 'Share Tech Mono', monospace; font-size: 0.9rem;
  padding: 9px 13px; outline: none; transition: border-color 0.2s;
}
.team-input:focus { border-color: var(--primary); }
.team-input::placeholder { color: var(--text-dim); }
.add-btn {
  display: flex; align-items: center; gap: 5px;
  background: var(--primary); color: var(--bg); border: none; border-radius: 6px;
  font-family: 'Orbitron', sans-serif; font-size: 0.72rem; font-weight: 700;
  letter-spacing: 0.1em; padding: 9px 14px; cursor: pointer; transition: all 0.2s;
}
.add-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}
.add-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.team-list { display: flex; flex-direction: column; gap: 7px; max-height: 220px; overflow-y: auto; }
.team-row {
  display: flex; align-items: center; gap: 11px;
  background: color-mix(in srgb, var(--text) 3%, transparent);
  border: 1px solid color-mix(in srgb, var(--text) 6%, transparent);
  border-left: 3px solid var(--team-color);
  border-radius: 6px; padding: 9px 13px;
}
.team-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--team-color); flex-shrink: 0;
}
.team-name-display { flex: 1; font-size: 0.9rem; color: var(--text); }
.remove-btn {
  background: transparent; border: none; color: var(--text-dim);
  cursor: pointer; padding: 2px; transition: color 0.2s;
}
.remove-btn:hover { color: #FF1744; }
.team-item-enter-active { animation: slide-up 0.25s ease; }
.team-item-leave-active { transition: all 0.2s ease; }
.team-item-leave-to { opacity: 0; transform: translateX(20px); }
</style>
