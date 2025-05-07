<script setup>
defineProps(
    {
      stats: Object
    })
</script>

<template>

  <div class="dashboard-header-row">
    <div class="dashboard-left">
      <h2>📊 회수 지연 위험 분석</h2>
      <p class="stats-desc">
        ※ 아래 통계는 최근 7일간 예측된 전체 데이터를 기준으로 계산된 값입니다.
      </p>
      <div class="dashboard-stats">
        <div class="stat">총 예측건수: {{ stats.total }}</div>
        <div class="stat">정확히 일치: {{ stats.exactMatch }}</div>
        <div class="stat">평균 오차: {{ stats.avgAbsError }}일</div>
      </div>
    </div>

    <div class="ai-description">
      🤖 <strong>AI 예측 안내</strong> 🤖<br />
      회수 지연 데이터는 <strong style="color:#2c70ba;">AI 회귀모델</strong>을 기반으로 한 예측 결과입니다.<br />
      과거 지연 패턴을 학습하여 <strong style="color:#c0392b;">향후 회수 가능성</strong>을 추정합니다.
    </div>
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

.stats-desc {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 16px;
}

.dashboard-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  gap: 24px;
  flex-wrap: wrap; /* 모바일 대응 */
}

.dashboard-left {
  flex: 1;
}

.dashboard-stats {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.stat {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
}

.stats-desc {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 8px;
}

.ai-description {
  flex: 1; /* 왼쪽으로 좀 더 확장되게 */
  min-width: 340px;
  max-width: 520px; /* 더 넓게 */
  background: rgba(252, 227, 255, 0.78);
  border-left: 6px solid #e8b3ff;
  padding: 18px 22px;
  margin-top : 26px;
  border-radius: 8px;
  font-size: 16px;         /* ← 글씨 더 크게 */
  line-height: 1.8;
  color: #1e1e1e;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.ai-description strong {
  color: #ed0b5c; /* 회귀모델 */
  font-weight: 700;
}
</style>