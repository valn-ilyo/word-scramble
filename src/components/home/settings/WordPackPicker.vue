<template>
  <div class="setting-section">
    <div class="setting-label">
      <v-icon size="13" color="#00E5FF">mdi-book-open-variant</v-icon>
      WORD PACK
    </div>

    <div class="picker-row">
      <div ref="wrapperRef" class="select-wrapper" :class="{ open: isOpen }">
        <!-- Trigger bar -->
        <div class="select-trigger">
          <div class="pack-info">
            <span class="selected-name">{{ selectedPack?.name ?? "—" }}</span>
            <span class="selected-meta"
              >{{ remaining }} / {{ activePoolSize }} remaining</span
            >
          </div>

          <div class="trigger-actions">
            <!-- Sub-pack chip -->
            <v-menu
              v-if="hasSubPacks"
              v-model="subMenuOpen"
              :close-on-content-click="true"
              location="bottom end"
            >
              <template #activator="{ props }">
                <button class="subpack-chip" v-bind="props" @click.stop>
                  <span>{{ activeSubPackLabel }}</span>
                  <v-icon size="11">mdi-chevron-down</v-icon>
                </button>
              </template>

              <div class="subpack-menu">
                <button
                  class="subpack-item"
                  :class="{ active: store.selectedSubPackId === null }"
                  @click="selectSubPack(null)"
                >
                  <div class="item-dot" />
                  <div class="item-info">
                    <span class="item-name">All</span>
                    <span class="item-count"
                      >{{ packRemaining(selectedPack) }} /
                      {{ allWords(selectedPack).length }}</span
                    >
                  </div>
                </button>
                <button
                  v-for="sp in selectedPack?.subPacks"
                  :key="sp.id"
                  class="subpack-item"
                  :class="{ active: store.selectedSubPackId === sp.id }"
                  @click="selectSubPack(sp.id)"
                >
                  <div class="item-dot" />
                  <div class="item-info">
                    <span class="item-name">{{ sp.label }}</span>
                    <span class="item-count"
                      >{{ subPackRemaining(sp) }} / {{ subPackTotal(sp) }}</span
                    >
                  </div>
                </button>
              </div>
            </v-menu>

            <!-- Reset icon -->
            <button
              class="icon-btn"
              :disabled="!hasUsed"
              @click.stop="store.resetWords()"
              title="Reset used words"
            >
              <v-icon size="13">mdi-refresh</v-icon>
            </button>

            <!-- Chevron — opens pack dropdown -->
            <button class="icon-btn chevron-btn" @click="isOpen = !isOpen">
              <v-icon size="14" class="chevron">mdi-chevron-down</v-icon>
            </button>
          </div>
        </div>

        <!-- Pack dropdown -->
        <Transition name="dropdown">
          <div v-if="isOpen" class="dropdown-menu">
            <button
              v-for="pack in store.wordPacks"
              :key="pack.id"
              class="dropdown-item"
              :class="{ active: store.selectedPackId === pack.id }"
              @click="select(pack.id)"
            >
              <div class="item-dot" />
              <div class="item-info">
                <span class="item-name">{{ pack.name }}</span>
                <span class="item-count"
                  >{{ packRemaining(pack) }} /
                  {{ allWords(pack).length }} remaining</span
                >
              </div>
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useGameStore } from "../../../stores/gameStore";
import type { WordPack, SubPack } from "../../../data/words/index";
import { getAllWords, getSubPackWords } from "../../../data/words/index";

const store = useGameStore();
const isOpen = ref(false);
const subMenuOpen = ref(false);
const wrapperRef = ref<HTMLElement | null>(null);

const selectedPack = computed(
  () =>
    store.wordPacks.find((p) => p.id === store.selectedPackId) ??
    store.wordPacks[0],
);

const hasSubPacks = computed(
  () => (selectedPack.value?.subPacks.length ?? 0) > 1,
);

const activeSubPackLabel = computed(() => {
  if (store.selectedSubPackId === null) return "All";
  return (
    selectedPack.value?.subPacks.find((sp) => sp.id === store.selectedSubPackId)
      ?.label ?? "All"
  );
});

function allWords(pack: WordPack | undefined) {
  if (!pack) return [];
  return getAllWords(pack);
}

function usedSet(packId: string) {
  return new Set(store.usedWordIds[packId] ?? []);
}

function packRemaining(pack: WordPack | undefined): number {
  if (!pack) return 0;
  const used = usedSet(pack.id);
  return getAllWords(pack).filter((w) => !used.has(w.id)).length;
}

function subPackRemaining(sp: SubPack): number {
  const used = usedSet(store.selectedPackId);
  const pack = store.wordPacks.find((p) => p.id === store.selectedPackId);
  if (!pack) return 0;
  return getSubPackWords(pack, sp).filter((w) => !used.has(w.id)).length;
}

function subPackTotal(sp: SubPack): number {
  const pack = store.wordPacks.find((p) => p.id === store.selectedPackId);
  if (!pack) return sp.words.length;
  return getSubPackWords(pack, sp).length;
}

const activePoolSize = computed(() => {
  if (!selectedPack.value) return 0;
  if (store.selectedSubPackId === null)
    return getAllWords(selectedPack.value).length;
  const sp = selectedPack.value.subPacks.find(
    (s) => s.id === store.selectedSubPackId,
  );
  if (!sp) return getAllWords(selectedPack.value).length;
  return getSubPackWords(selectedPack.value, sp).length;
});

const remaining = computed(() => {
  if (!selectedPack.value) return 0;
  if (store.selectedSubPackId === null)
    return packRemaining(selectedPack.value);
  const sp = selectedPack.value.subPacks.find(
    (s) => s.id === store.selectedSubPackId,
  );
  return sp ? subPackRemaining(sp) : packRemaining(selectedPack.value);
});

const hasUsed = computed(() => remaining.value < activePoolSize.value);

function select(id: string) {
  store.setWordPack(id);
  isOpen.value = false;
}

function selectSubPack(id: string | null) {
  store.setSubPack(id);
}

function onOutsideClick(e: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
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

.picker-row {
  display: flex;
}

.select-wrapper {
  position: relative;
  flex: 1;
}

.select-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 7px;
  border: 1px solid color-mix(in srgb, var(--primary) 30%, transparent);
  background: color-mix(in srgb, var(--primary) 5%, transparent);
  transition:
    border-color 0.2s,
    background 0.2s;
  overflow: hidden;
}
.select-wrapper.open .select-trigger {
  border-color: color-mix(in srgb, var(--primary) 70%, transparent);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

/* Left: pack name + remaining — non-interactive display */
.pack-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  min-width: 0;
}

.selected-name {
  font-size: 0.83rem;
  color: var(--text);
  font-weight: 600;
  flex-shrink: 0;
}
.selected-meta {
  font-size: 0.68rem;
  color: var(--text-dim);
  font-family: "Share Tech Mono", monospace;
  white-space: nowrap;
}

/* Right: sub-pack chip + reset + chevron */
.trigger-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  padding-right: 6px;
  flex-shrink: 0;
}

/* Shared icon button base */
.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--primary);
  cursor: pointer;
  padding: 6px;
  border-radius: 5px;
  transition:
    background 0.15s,
    color 0.15s;
}
.icon-btn:hover {
  background: color-mix(in srgb, var(--primary) 12%, transparent);
}
.icon-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.chevron {
  transition: transform 0.2s;
}
.select-wrapper.open .chevron {
  transform: rotate(180deg);
}

/* Sub-pack chip */
.subpack-chip {
  display: flex;
  align-items: center;
  gap: 3px;
  background: color-mix(in srgb, var(--primary) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--primary) 35%, transparent);
  color: var(--primary);
  font-family: "Orbitron", sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.06em;
  padding: 4px 7px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.subpack-chip:hover {
  background: color-mix(in srgb, var(--primary) 18%, transparent);
  border-color: color-mix(in srgb, var(--primary) 60%, transparent);
}

/* Pack dropdown */
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

.item-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 2px solid color-mix(in srgb, var(--text) 20%, transparent);
  transition:
    background 0.15s,
    border-color 0.15s;
}
.dropdown-item.active .item-dot,
.subpack-item.active .item-dot {
  background: var(--primary);
  border-color: var(--primary);
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
.item-count {
  font-size: 0.68rem;
  color: var(--text-dim);
  font-family: "Share Tech Mono", monospace;
}

/* Sub-pack dropdown menu */
.subpack-menu {
  background: var(--surface, #1a1a2e);
  border: 1px solid color-mix(in srgb, var(--primary) 50%, transparent);
  border-radius: 7px;
  overflow: hidden;
  min-width: 160px;
}

.subpack-item {
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
.subpack-item:hover {
  background: color-mix(in srgb, var(--primary) 8%, transparent);
}
.subpack-item.active {
  background: color-mix(in srgb, var(--primary) 12%, transparent);
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
