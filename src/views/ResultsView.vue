<template>
  <div class="results-screen">
    <GridBg />
    <div class="results-content">
      <PageTitle>
        GAME OVER
      </PageTitle>

      <RankList
        :teams="allTeamsByScore"
        title="FINAL STANDINGS"
        icon="mdi-trophy"
        :color="currentTheme?.secondary ?? '#FFD600'"
      />

      <EndPanel @keep="goHomeKeepTeams" @fresh="goHome" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import { themes } from '../data/themes'
import GridBg from '../components/GridBg.vue'
import PageTitle from '../components/PageTitle.vue'
import RankList from '../components/results/RankList.vue'
import EndPanel from '../components/results/EndPanel.vue'

const store = useGameStore()
const router = useRouter()

const currentTheme = computed(() => themes.find(t => t.id === store.selectedTheme))

const allTeamsByScore = computed(() =>
  [...store.teams].sort((a, b) => b.cups - a.cups)
)

function goHome()          { store.goHome();          router.push('/') }
function goHomeKeepTeams() { store.goHomeKeepTeams(); router.push('/') }
</script>

<style scoped>
.results-screen {
  min-height: 100vh; background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.results-content {
  position: relative; z-index: 1; width: 100%; max-width: 560px;
  padding: 40px 24px; display: flex; flex-direction: column; gap: 28px; align-items: center;
}
</style>
