<script setup>
import { ref } from 'vue';
import { Scatter } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
  Title
} from 'chart.js';
import Dialog from 'primevue/dialog';

ChartJS.register(Tooltip, Legend, PointElement, LinearScale, Title);

// 샘플 데이터
const stats = [
  {
    name: 'Kakao',
    recoveredRate: 91.08,
    avgRecoveredDays: 28,
    totalAmount: 22424438,
    recoveredAmount: 20424438,
    createdAt: '2025-05-02T05:52:37'
  },
  {
    name: 'Samsung',
    recoveredRate: 79.06,
    avgRecoveredDays: 30,
    totalAmount: 4775543,
    recoveredAmount: 3775543,
    createdAt: '2025-05-02T05:52:37'
  },
  {
    name: 'Coupang',
    recoveredRate: 77.14,
    avgRecoveredDays: 65,
    totalAmount: 7461589,
    recoveredAmount: 5755947,
    createdAt: '2025-05-02T05:52:37'
  }
];

const selectedClient = ref(null);
const showDetail = ref(false);

const chartData = {
  datasets: [
    {
      label: '거래처 회수율 분포',
      data: stats.map((s) => ({
        x: s.avgRecoveredDays,
        y: s.recoveredRate,
        client: s
      })),
      backgroundColor: '#42A5F5',
      pointRadius: 6
    }
  ]
};

const chartOptions = {
  responsive: true,
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
      selectedClient.value = stats[index];
      showDetail.value = true;
    }
  },
  scales: {
    x: {
      title: { display: true, text: '평균 회수일' },
      beginAtZero: true
    },
    y: {
      title: { display: true, text: '회수율 (%)' },
      min: 0,
      max: 100
    }
  }
};
</script>

<template>
  <Scatter :data="chartData" :options="chartOptions" />

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
