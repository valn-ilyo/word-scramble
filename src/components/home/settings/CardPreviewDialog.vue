<template>
  <v-dialog v-model="open" fullscreen transition="dialog-bottom-transition">
    <div class="preview-shell">

      <!-- Header -->
      <div class="preview-header">
        <span class="preview-label">
          <v-icon size="13" color="#00E5FF">mdi-cards</v-icon>
          CARD PREVIEW
        </span>
        <span class="preview-counter">{{ index + 1 }} / {{ activeCards.length }}</span>
        <button class="close-btn" @click="open = false">
          <v-icon size="16">mdi-close</v-icon>CLOSE
        </button>
      </div>

      <!-- Card display — same markup & vars as CardStep -->
      <div class="preview-body">
        <transition :name="slideDir" mode="out-in">
          <div
            v-if="card"
            :key="card.id"
            class="card-display"
            :style="{ '--card-color': card.color }"
          >
            <div class="card-icon">
              <v-icon size="56">{{ card.icon }}</v-icon>
            </div>
            <div class="card-name">{{ card.name }}</div>
            <div class="card-desc">{{ card.description }}</div>
          </div>
        </transition>

        <div v-if="activeCards.length === 0" class="empty-state">
          All cards are set to OFF.
        </div>
      </div>

      <!-- Nav -->
      <div class="preview-nav" v-if="activeCards.length > 1">
        <button class="nav-btn" @click="prev">
          <v-icon size="16">mdi-arrow-left</v-icon>PREV
        </button>
        <div class="pip-row">
          <span
            v-for="(c, i) in activeCards"
            :key="c.id"
            class="pip"
            :class="{ active: i === index }"
            :style="{ '--pip-color': c.color }"
            @click="index = i"
          />
        </div>
        <button class="nav-btn" @click="next">
          NEXT<v-icon size="16">mdi-arrow-right</v-icon>
        </button>
      </div>

    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { cards } from '../../../data/cards'
import { useGameStore } from '../../../stores/gameStore'

const open = defineModel<boolean>({ required: true })
const store = useGameStore()

const activeCards = computed(() =>
  cards.filter(c => (store.cardWeights[c.id] ?? c.weight) > 0)
)

const index = ref(0)
const slideDir = ref<'slide-left' | 'slide-right'>('slide-left')

const card = computed(() => activeCards.value[index.value] ?? null)

// Reset index when dialog opens
watch(open, (val) => { if (val) index.value = 0 })

function next() {
  slideDir.value = 'slide-left'
  index.value = (index.value + 1) % activeCards.value.length
}
function prev() {
  slideDir.value = 'slide-right'
  index.value = (index.value - 1 + activeCards.value.length) % activeCards.value.length
}
</script>

<style scoped>
.preview-shell {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  padding: 0 20px 32px;
}

/* Header */
.preview-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 0 16px;
  border-bottom: 1px solid color-mix(in srgb, var(--text) 8%, transparent);
}
.preview-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--text-dim);
  flex: 1;
}
.preview-counter {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--text-dim);
}
.close-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--primary) 35%, transparent);
  color: var(--primary);
  font-family: 'Orbitron', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  padding: 9px 9px;
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.2s;
}
.close-btn:hover {
  background: color-mix(in srgb, var(--primary) 12%, transparent);
}

/* Body */
.preview-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Reused from CardStep — same vars, same look */
.card-display {
  background: var(--surface);
  border: 2px solid var(--card-color);
  border-radius: 16px;
  padding: 36px 56px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  color: var(--card-color);
}
.card-icon { margin-bottom: 16px; }
.card-name {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  letter-spacing: 0.05em;
  margin-bottom: 14px;
}
.card-desc {
  font-size: 1.05rem;
  color: color-mix(in srgb, var(--text) 75%, transparent);
  line-height: 1.6;
}

.empty-state {
  font-size: 0.9rem;
  color: var(--text-dim);
  font-style: italic;
}

/* Nav */
.preview-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 24px;
}
.nav-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  border-radius: 8px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  padding: 13px 20px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid;
  background: transparent;
  border-color: var(--secondary);
  color: var(--secondary);
}
.nav-btn:hover {
  background: color-mix(in srgb, var(--secondary) 10%, transparent);
  transform: translateY(-2px);
}

.pip-row {
  display: flex;
  gap: 6px;
  align-items: center;
}
.pip {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--text) 20%, transparent);
  cursor: pointer;
  transition: all 0.2s;
}
.pip.active {
  background: var(--pip-color);
  transform: scale(1.25);
}

/* Slide transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.25s ease;
}
.slide-left-enter-from  { opacity: 0; transform: translateX(40px); }
.slide-left-leave-to    { opacity: 0; transform: translateX(-40px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-40px); }
.slide-right-leave-to   { opacity: 0; transform: translateX(40px); }
</style>
