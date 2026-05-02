<template>
  <div class="title-block">
    <div v-if="sub" class="title-sub">{{ sub }}</div>
    <h1 class="title-main"><slot /></h1>
    <div class="title-line" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ sub?: string }>()
</script>

<style scoped>
.title-block { text-align: center; }
.title-sub {
  font-family: 'Share Tech Mono', monospace;
  color: color-mix(in srgb, var(--primary) 60%, transparent);
  font-size: 0.75rem;
  letter-spacing: 0.4em;
  margin-bottom: 8px;
}
.title-main {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 900;
  color: var(--text);
  line-height: 1;
  letter-spacing: 0.05em;
}
.title-line {
  height: 2px;
  width: 80px;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
  margin: 16px auto 0;
}
</style>
