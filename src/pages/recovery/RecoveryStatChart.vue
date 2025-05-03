<script setup>

import {Scatter} from "vue-chartjs";
import Dialog from "primevue/dialog";
import { Chart as ChartJS, Tooltip, Legend, PointElement, LinearScale, Title } from 'chart.js';
import {computed, ref} from "vue";
ChartJS.register(Tooltip, Legend, PointElement, LinearScale, Title);

const props =defineProps({
  stats : Array
})

const selectedClient = ref(null);
const showDetail = ref(false);

// 색상 구분 함수
const getColor = (amount) => {
  if (amount <= 1_000_000) return 'green';
  if (amount <= 50_000_000) return 'orange';
  if (amount > 50_000_000) return 'red';
};

// 차트용 데이터 구성
const chartData = computed(() => ({
  datasets: [
    {
      label: '거래처 회수율 분포',
      data: props.stats?.map(s => ({
        x: s.avgRecoveredDays,
        y: s.recoveredRate,
        client: s
      })) ?? [],
      backgroundColor: props.stats?.map(s => getColor(s.totalAmount)) ?? [],
      pointRadius: 6
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => {
          const { client } = ctx.raw;
          return `${client.name} (회수율 ${client.recoveredRate}%, ${client.avgRecoveredDays}일)`;
        }
      }
    }
  },
  onClick: (e, elements, chart) => {
    const points = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
    if (points.length > 0) {
      const index = points[0].index;
      selectedClient.value = props.stats[index];
      showDetail.value = true;
    }
  },
  scales: {
    x: {
      min: 0,
      max: 60,
      title: { display: true, text: '평균 회수일' },
      beginAtZero: true,
      grid: { display: false },
      ticks: {
        stepSize: 10
      }
    },
    y: {
      title: { display: true, text: '회수율 (%)' },
      min: -10,
      max: 120,
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {
        callback: (value) => (value >= 0 && value <= 100 ? value : '')
      },
      grid: { display: false }
    }
  }
};
</script>

<template>
  <p class="desc">
    각 점은 거래처 하나를 나타냅니다.
    <span style="color: green;">초록색</span>은 거래금액이 100만원 이하,
    <span style="color: orange;">주황색</span>은 5000만원 이하,
    <span style="color: red;">빨간색</span>은 5000만원 초과를 의미합니다.
    <span style="font-weight: bold;">점을 클릭하면 상세 정보를 확인할 수 있습니다.</span>
  </p>

  <!--  산점도 차트 -->
  <div class="chart-container">
    <Scatter :data="chartData" :options="chartOptions" />
  </div>

  <!--  상세 정보 팝업 -->
  <Dialog v-model:visible="showDetail" modal header="거래처 상세 정보" :style="{ width: '400px' }">
    <div v-if="selectedClient">
      <p><strong>거래처:</strong> {{ selectedClient.name }}</p>
      <p><strong>회수율:</strong> {{ selectedClient.recoveredRate }}%</p>
      <p><strong>평균 회수일:</strong> {{ selectedClient.avgRecoveredDays }}일</p>
      <p><strong>총 거래금액:</strong> {{ selectedClient.totalAmount.toLocaleString() }}원</p>
      <p><strong>회수금액:</strong> {{ selectedClient.recoveredAmount.toLocaleString() }}원</p>
      <p><strong>기준일:</strong> {{ selectedClient.createdAt.slice(0, 10) }}</p>
    </div>
  </Dialog>

</template>

<style scoped>

.desc {
  margin-bottom: 16px;
  color: #333;
}

.chart {
  max-width: 100%;
}

.chart-container {
  width: 100%;
  height: 500px; /* 적절히 조절 */
  position: relative;
}
</style>