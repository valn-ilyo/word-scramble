<template>
  <div class="settings-panel">
    <button class="settings-toggle" @click="open = !open">
      <v-icon size="15">mdi-cog</v-icon>
      SETTINGS
      <v-icon size="13" class="chevron" :class="{ open }"
        >mdi-chevron-down</v-icon
      >
    </button>

    <transition name="settings-expand">
      <div v-if="open" class="settings-body">
        <ThemePicker />
        <WordPackPicker />
        <TargetScore />
        <CardWeights />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ThemePicker from "./settings/ThemePicker.vue";
import TargetScore from "./settings/TargetScore.vue";
import CardWeights from "./settings/CardWeights.vue";
import WordPackPicker from "./settings/WordPackPicker.vue";

const open = ref(false);
</script>

<style scoped>
.settings-panel {
  width: 100%;
  background: var(--surface);
  border: 1px solid color-mix(in srgb, var(--text) 8%, transparent);
  border-radius: 12px;
  overflow: hidden;
}
.settings-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  background: transparent;
  border: none;
  color: var(--text-dim);
  font-family: "Orbitron", sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  cursor: pointer;
  transition: color 0.2s;
}
.settings-toggle:hover {
  color: var(--text);
}
.settings-toggle .chevron {
  margin-left: auto;
  transition: transform 0.25s ease;
}
.settings-toggle .chevron.open {
  transform: rotate(180deg);
}
.settings-body {
  padding: 0 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: 1px solid color-mix(in srgb, var(--text) 6%, transparent);
}
.settings-expand-enter-active,
.settings-expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.settings-expand-enter-from,
.settings-expand-leave-to {
  opacity: 0;
  max-height: 0;
  padding-bottom: 0;
}
.settings-expand-enter-to,
.settings-expand-leave-from {
  opacity: 1;
  max-height: 1800px;
}
</style>
