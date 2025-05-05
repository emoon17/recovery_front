<script setup>
defineProps(
    {
      stats: Object
    })
</script>

<template>
  <h2>📊 회수 지연 위험 분석</h2>

  <div class="dashboard-stats">
    <div class="stat">총 예측건수: {{ stats.total }}</div>
    <div class="stat">정확히 일치: {{ stats.exactMatch }}</div>
    <div class="stat">평균 오차: {{ stats.avgAbsError }}일</div>
  </div>
</template>

<style scoped>
.dashboard-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 32px;
}

.stat {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
}
</style>