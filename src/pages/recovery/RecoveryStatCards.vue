<script setup>
defineProps(
    {
      statsCard: Object
    }
)
</script>

<template>
  <!-- 📅 제목 + 기준일 -->
  <h2 class="title">📊 회수율 통계 <span class="date">({{ statsCard.statDate }} 기준)</span></h2>

  <!-- 📌 요약 카드 영역 -->
  <div class="stat-cards">
    <div class="card">
      <p class="label">📈 평균 회수율</p>
      <p class="value">{{ statsCard.avgRecoveredRate }}%</p>
    </div>
    <div class="card">
      <p class="label">⏱ 평균 회수일</p>
      <p class="value">{{ statsCard.avgDays }}일</p>
    </div>
    <div class="card">
      <p class="label">🏢 총 거래처 수</p>
      <p class="value">{{ statsCard.totalCount }}곳</p>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 20px;
  margin-bottom: 12px;
}

.date {
  font-size: 16px;
  color: #888;
  font-weight: normal;
}

.stat-cards {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.card {
  background: #f4f4f4;
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.card .label {
  font-weight: 600;
  color: #666;
  margin-bottom: 6px;
}

.card .value {
  font-size: 20px;
  font-weight: bold;
}

</style>