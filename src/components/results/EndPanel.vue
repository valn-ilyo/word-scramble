<template>
  <div class="end-panel">
    <div class="end-label">
      <v-icon size="13">mdi-account-multiple</v-icon>
      KEEP TEAMS FOR NEXT GAME?
    </div>
    <div class="end-actions">
      <button class="end-btn keep" @click="emit('keep')">
        <span class="end-btn-content">
          <v-icon size="18">mdi-refresh</v-icon>
          PLAY AGAIN
          <span class="end-btn-sub">same teams, reset scores</span>
        </span>
      </button>
      <button class="end-btn fresh" @click="emit('fresh')">
        <span class="end-btn-content">
          <v-icon size="18">mdi-home</v-icon>
          NEW GAME
          <span class="end-btn-sub">clear all teams</span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ keep: []; fresh: [] }>();
</script>

<style scoped>
.end-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 4px;
}
.end-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Orbitron", sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--text-dim);
}
.end-actions {
  display: flex;
  gap: 10px;
}
.end-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 16px 12px;
  border-radius: 8px;
  font-family: "Orbitron", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  cursor: pointer;
  transition: all 0.25s;
  border: 2px solid;
  background: transparent;
  position: relative;
  overflow: hidden;
}
.end-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
  z-index: 0;
}
.end-btn:hover::before {
  transform: scaleX(1);
}
.end-btn-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: inherit;
  transition: color 0.25s;
}
.end-btn-sub {
  font-family: "Share Tech Mono", monospace;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  opacity: 0.8;
  text-transform: lowercase;
}
.end-btn.keep {
  border-color: var(--primary);
  color: var(--primary);
}
.end-btn.keep::before {
  background: var(--primary);
}
.end-btn.keep:hover {
  color: var(--bg);
}
.end-btn.fresh {
  border-color: var(--secondary);
  color: var(--secondary);
}
.end-btn.fresh::before {
  background: var(--secondary);
}
.end-btn.fresh:hover {
  color: var(--bg);
}
.end-btn :deep(.v-icon) {
  color: inherit;
  transition: color 0.25s;
}
</style>
