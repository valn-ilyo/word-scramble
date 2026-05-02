<script setup lang="ts">
withDefaults(defineProps<{ fixed?: boolean }>(), { fixed: false })
</script>

<template>
  <div :class="['grid-bg', { 'grid-bg--fixed': fixed }]" />
</template>

<style scoped>
.grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}
.grid-bg--fixed { position: fixed; }
</style>
