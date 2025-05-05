<template>
  <div class="risk-dashboard">
    <!-- 대시보드 통계 -->
    <PredictDashboard :stats="calculatedStats" />
    <!-- 위험도 추이 -->
   <PredictRiskChart v-model:selectedDate="selectedDate" :predictionList="predictionList" />
    <!-- 예측 테이블 -->
    <PredictRiskTable
        :riskOptions="riskOptions"
        v-model:selectedRiskLevel="selectedRiskLevel"
        :filteredList="filteredList"
        :predictionList="predictionList"
        :selectedDate="selectedDate"
    />

  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import PredictDashboard from "@/pages/predict/PredictDashboard.vue";
import PredictRiskTable from "@/pages/predict/PredictRiskTable.vue";
import PredictRiskChart from "@/pages/predict/PredictRiskChart.vue";
import api from "@/api/axios.js";
import {predictApi} from "@/api/predict.js";

const riskOptions = [
  { label: '전체', value: '' },
  { label: 'HIGH', value: 'HIGH' },
  { label: 'MEDIUM', value: 'MEDIUM' },
  { label: 'LOW', value: 'LOW' }
]

// 예측 결과
const predictionList = ref([]);

/**
 * 회수 지연 예측 전체 리스트 조회
 * */
const fetchAllPredicts = async () =>{
  try {
    const res = await api.get(predictApi.url.getAllPredicts);
    predictionList.value = res.data.data;
    console.log("res ::::: ", res.data)
  }catch (e){
    console.log("fetchAllPredicts error ::: ", e);
  }
}

onMounted(()=> {
  fetchAllPredicts();
})

// 회수지연 위험 분석 통계 계산
const calculatedStats = computed(() => ({
  total: predictionList.value.length,
  exactMatch: predictionList.value.filter(p => p.absError === 0).length,
  avgAbsError: (
      predictionList.value.reduce((acc, cur) => acc + cur.absError, 0) / predictionList.value.length
  ).toFixed(2)
}))

// 표 날짜 선택
const selectedDate = ref(getYesterday())
function getYesterday() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)  // '2025-05-04'
}

// 위험도 필터링
const selectedRiskLevel = ref('')
const filteredList = computed(() =>
    predictionList.value.filter(item =>
        (!selectedRiskLevel.value || item.riskLevel === selectedRiskLevel.value) &&
        (!selectedDate.value || item.createdAt?.slice(0, 10) === selectedDate.value)
    )
)



</script>

<style scoped>
.risk-dashboard {
  padding: 24px;
  font-family: Arial, sans-serif;
}




</style>
