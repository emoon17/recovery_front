<template>
  <div class="recovery-stats-page">

    <!-- 전체 평균 카드 -->
    <RecoveryStatCards :statsCard="statsCard"/>

    <!-- 산점도 차트 -->
    <RecoveryStatChart :stats="stats"/>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import RecoveryStatCards from "@/pages/recovery/RecoveryStatCards.vue";
import RecoveryStatChart from "@/pages/recovery/RecoveryStatChart.vue";
import {statApi} from "@/api/stat.js";
import api from "@/api/axios.js";


const stats = ref([]);
const statsCard = computed(() => ({
  statDate: stats.value[0]?.createdAt.slice(0, 10) ?? '-',
  avgRecoveredRate: (stats.value.reduce((sum, s) => sum + s.recoveredRate, 0) / stats.value.length).toFixed(1),
  avgDays: (stats.value.reduce((sum, s) => sum + s.avgRecoveredDays, 0) / stats.value.length).toFixed(0),
  totalCount: stats.value.length
}));

/**
 * 회수율 차트 조회
 * */
const fetchRecoveryAllStats = async () => {
  try {
    const res = await api.get(statApi.url.getRecoveryAllStats);
    console.log("res :::: ", res);
    stats.value = res.data.data;
  }catch (e) {
    console.log("fetchRecoveryAllStats error ::: ", e);
  }
}

onMounted(() => {
  fetchRecoveryAllStats();
})


</script>

<style scoped>
.recovery-stats-page {
  padding: 20px;
}


</style>
