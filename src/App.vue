<template>
  <v-app :theme="vuetifyTheme">
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useGameStore } from './stores/gameStore'
import { themes } from './data/themes'

const store = useGameStore()

const vuetifyTheme = computed(() => {
  const t = themes.find(t => t.id === store.selectedTheme) ?? themes[0]
  return t.dark ? 'dark' : 'light'
})

watchEffect(() => {
  const theme = themes.find(t => t.id === store.selectedTheme) ?? themes[0]
  const html = document.documentElement
  for (const [prop, val] of Object.entries(theme.vars)) {
    html.style.setProperty(prop, val)
  }
})
</script>
