<template>
  <div class="setting-section">
    <div class="setting-label">
      <v-icon size="13" color="#D500F9">mdi-palette</v-icon>
      DISPLAY THEME
    </div>

    <div class="select-wrapper" :class="{ open: isOpen }">
      <button class="select-trigger" @click="isOpen = !isOpen">
        <span class="swatch" :style="{ background: currentTheme?.primary }" />
        <span class="selected-name">{{ currentTheme?.label ?? "—" }}</span>
        <v-spacer />
        <v-icon size="14" class="chevron">mdi-chevron-down</v-icon>
      </button>

      <Transition name="dropdown">
        <div v-if="isOpen" class="dropdown-menu">
          <button
            v-for="theme in themes"
            :key="theme.id"
            class="dropdown-item"
            :class="{ active: store.selectedTheme === theme.id }"
            @click="select(theme.id)"
          >
            <span class="swatch" :style="{ background: theme.primary }" />
            <div class="item-info">
              <span class="item-name">{{ theme.label }}</span>
              <span class="item-desc">{{ theme.description }}</span>
            </div>
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useGameStore } from "../../../stores/gameStore";
import { themes } from "../../../data/themes";

const store = useGameStore();
const isOpen = ref(false);

const currentTheme = computed(() =>
  themes.find((t) => t.id === store.selectedTheme),
);

function select(id: string) {
  store.setTheme(id);
  isOpen.value = false;
}

function onOutsideClick(e: MouseEvent) {
  const el = document.querySelector(".theme-select-wrapper");
  if (el && !el.contains(e.target as Node)) isOpen.value = false;
}

onMounted(() => document.addEventListener("click", onOutsideClick));
onUnmounted(() => document.removeEventListener("click", onOutsideClick));
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

.select-wrapper {
  position: relative;
}

.select-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border-radius: 7px;
  border: 1px solid color-mix(in srgb, var(--primary) 30%, transparent);
  background: color-mix(in srgb, var(--primary) 5%, transparent);
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
  text-align: left;
}
.select-trigger:hover {
  border-color: color-mix(in srgb, var(--primary) 55%, transparent);
  background: color-mix(in srgb, var(--primary) 8%, transparent);
}
.select-wrapper.open .select-trigger {
  border-color: color-mix(in srgb, var(--primary) 70%, transparent);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.swatch {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
}

.selected-name {
  font-size: 0.83rem;
  color: var(--text);
  font-weight: 600;
  flex-shrink: 0;
}
.selected-meta {
  flex: 1;
  font-size: 0.68rem;
  color: var(--text-dim);
  font-family: "Share Tech Mono", monospace;
}
.chevron {
  color: var(--primary);
  flex-shrink: 0;
  transition: transform 0.2s;
}
.select-wrapper.open .chevron {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 50;
  background: var(--surface, #1a1a2e);
  border: 1px solid color-mix(in srgb, var(--primary) 50%, transparent);
  border-top: none;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}
.dropdown-item:hover {
  background: color-mix(in srgb, var(--primary) 8%, transparent);
}
.dropdown-item.active {
  background: color-mix(in srgb, var(--primary) 12%, transparent);
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.item-name {
  font-size: 0.8rem;
  color: var(--text);
  font-weight: 600;
}
.item-desc {
  font-size: 0.68rem;
  color: var(--text-dim);
  font-family: "Share Tech Mono", monospace;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s,
    transform 0.15s;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
