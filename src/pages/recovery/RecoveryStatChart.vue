<script setup>

import {Scatter} from "vue-chartjs";
import Dialog from "primevue/dialog";
import {Chart as ChartJS, Tooltip, Legend, PointElement, LinearScale, Title} from 'chart.js';
import {computed, ref} from "vue";

ChartJS.register(Tooltip, Legend, PointElement, LinearScale, Title);

const props = defineProps({
  stats: Array
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
    legend: {display: false},
    tooltip: {
      callbacks: {
        label: (ctx) => {
          const {client} = ctx.raw;
          return `${client.name} (회수율 ${client.recoveredRate}%, ${client.avgRecoveredDays}일)`;
        }
      }
    }
  },
  onClick: (e, elements, chart) => {
    const points = chart.getElementsAtEventForMode(e, 'nearest', {intersect: true}, false);
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
      title: {display: true, text: '평균 회수일'},
      beginAtZero: true,
      grid: {display: false},
      ticks: {
        stepSize: 10
      }
    },
    y: {
      title: {display: true, text: '회수율 (%)'},
      min: -10,
      max: 120,
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {
        callback: (value) => (value >= 0 && value <= 100 ? value : '')
      },
      grid: {display: false}
    }
  }
};

const yesterdayStr = (() => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10); // YYYY-MM-DD 형식
})();
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
    <Scatter :data="chartData" :options="chartOptions"/>
  </div>

  <!--  상세 정보 팝업 -->
  <Dialog v-model:visible="showDetail" modal header="거래처 상세 정보" :style="{ width: '430px' }">
    <div v-if="selectedClient" class="detail-popup">

      <div class="row">
        <span class="label">거래처</span>
        <span class="value">{{ selectedClient.name }}</span>
      </div>

      <div class="row">
        <span class="label">평균 회수율
        <span class="custom-tooltip-wrapper">
          <i class="pi pi-info-circle"></i>
          <span class="custom-tooltip-text">
            <strong>평균 회수율 산정 기준</strong><br/>
            ▸ <strong>기간:</strong> {{ selectedClient.startTransactionDate }} ~ {{ yesterdayStr }}<br/>
            ▸ <strong>회수율 =</strong> 회수금액 ÷ 총 거래금액 × 100
          </span>
        </span>
        </span>
        <span class="value">
        {{ selectedClient.recoveredRate }}%

      </span>
      </div>

      <div class="row">
        <span class="label">평균 회수일
        <span class="custom-tooltip-wrapper">
          <i class="pi pi-info-circle"></i>
          <span class="custom-tooltip-text">
            <strong>평균 회수일 산정 기준</strong><br/>
            ▸ <strong>기간:</strong> {{ selectedClient.startTransactionDate }} ~ {{ yesterdayStr }}<br/>
            ▸ <strong>평균 회수일 =</strong> (회수일 - 거래일) ÷ 거래 수
          </span>
        </span>
        </span>

        <span class="value">
        {{ selectedClient.avgRecoveredDays }}일

      </span>
      </div>

      <div class="row">
        <span class="label">총 거래금액</span>
        <span class="value">{{ selectedClient.totalAmount.toLocaleString() }}원</span>
      </div>

      <div class="row">
        <span class="label">회수금액</span>
        <span class="value">{{ selectedClient.recoveredAmount.toLocaleString() }}원</span>
      </div>

    </div>
  </Dialog>

</template>

<style scoped>
.detail-popup .row {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  font-size: 15px;
}

.label {
  min-width: 120px;  /* 라벨 넓이 고정 */
  font-weight: bold;
  color: #333;
}

.value {
  padding-left: 10px;   /* 필요 시 추가 */
  text-align: left;     /* 첫 글자 기준으로 정렬 */
}

.custom-tooltip-text strong {
  font-weight: 600;
}

.custom-tooltip-wrapper {
  position: relative;
  display: inline-block;
  margin-left: 6px;
  cursor: pointer;
}

.custom-tooltip-wrapper .custom-tooltip-text {
  visibility: hidden;
  background-color: #e0e0e0;
  color: #070707;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 13px;
  white-space: normal;
  position: absolute;
  top: 100%;
  left: 100%;
  transform: translate(10px, 6px);
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.2s ease;
  width: max-content;
  max-width: 300px;
  line-height: 1.5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.custom-tooltip-wrapper:hover .custom-tooltip-text {
  visibility: visible;
  opacity: 1;
}

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

::v-deep(.p-dialog),
::v-deep(.p-dialog-content),
::v-deep(.p-component-overlay),
::v-deep(.p-dialog-mask) {
  overflow: visible !important;
}
</style>