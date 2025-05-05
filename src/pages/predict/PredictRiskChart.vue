<script setup>
import {ref, onMounted, computed} from 'vue'

const selectedDate = defineModel('selectedDate')
const props = defineProps({
  predictionList : Array
})

const chartRef = ref()

onMounted(() => {
  chartRef.value?.chart.on('click', params => {
    if (params.name) {
      selectedDate.value = params.name
    }
  })
})

const getLast7DaysFromYesterday = () => {
  const dates = []
  const base = new Date() // 오늘 날짜 (5/6)

  for (let i = 6; i >= 0; i--) {
    const d = new Date(base.getTime())
    d.setDate(base.getDate() - i)
    dates.push(d.toISOString().slice(0, 10))
  }

  return dates
}

// 위험레벨 카운트
const generateRiskChartSeries = (list, dates) => {
  const levels = ['LOW', 'MEDIUM', 'HIGH']

  return levels.map(level => {
    const counts = dates.map(date =>
        list.filter(item =>
            item.riskLevel === level &&
            item.createdAt?.startsWith(date)
        ).length
    )
    return {
      name: level,
      type: 'line',
      data: counts
    }
  })
}

const xAxisDates = getLast7DaysFromYesterday()
const chartOptions = computed(() => ({
  tooltip: { trigger: 'axis' },
  legend: { data: ['LOW', 'MEDIUM', 'HIGH'] },
  xAxis: { type: 'category', data: xAxisDates },
  yAxis: { type: 'value' },
  series: generateRiskChartSeries(props.predictionList, xAxisDates)
}))
</script>

<template>
  <div class="chart-container">
    <h3>📈 위험도 추이</h3>
    <p class="chart-desc">최근 날짜별 예측된 LOW, MEDIUM, HIGH 등급의 거래 수를 시각화한 그래프입니다.</p>
    <strong class="chart-desc guide-message">원하는 날짜를 클릭하면 해당 일자의 예측 리스트가 아래에 표시됩니다.</strong>
    <v-chart ref="chartRef" :option="chartOptions" style="width: 100%; height: 300px;" />
  </div>
</template>

<style scoped>
.chart-desc {
  margin: -8px 0 12px;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
}

.chart-container {
  margin-bottom: 24px;
}
.guide-message {
  display: block;
  margin-bottom: 16px;
}
</style>
