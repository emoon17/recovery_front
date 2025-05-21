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
        @sendMailRequest="sendMail"
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
import {useToast} from 'primevue/usetoast'
import {accessApi} from "@/api/access.js";

const toast = useToast()
const riskOptions = [
  { label: '전체', value: '' },
  { label: 'HIGH', value: 'HIGH' },
  { label: 'MEDIUM', value: 'MEDIUM' },
  { label: 'LOW', value: 'LOW' }
]

onMounted(()=> {
  accessLog();
  fetchAllPredicts();
});

const accessLog = async () => {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");   // jobkorea
  const utmMedium = params.get("utm_medium");
  console.log("utmSource, " , utmSource);
  try{
    const res = await api.post(accessApi.url.accessLogInsert);
    console.log("Recovery");
  } catch (e){
    console.log("접근 실패 : : ", e);
  }
}

// 예측 결과
const predictionList = ref([]);
const selectedDate = ref('')
/**
 * 회수 지연 예측 전체 리스트 조회
 * */
const fetchAllPredicts = async () =>{
  try {
    const res = await api.get(predictApi.url.getAllPredicts);
    predictionList.value = res.data.data;

    const latestDate = predictionList.value
        .map(p => p.createdAt?.slice(0, 10))
        .filter(Boolean)
        .sort()
        .reverse()[0]  // 가장 최근 날짜

    selectedDate.value = latestDate
  }catch (e){
    console.log("fetchAllPredicts error ::: ", e);
  }
}

/**
 * 메일전송
 * */
const sendMail = async (highList = []) => {

  const names = highList.map(p => `${p.name}`).join(', ')

  if (highList.length === 0) {
    toast.add({
      severity: 'error',
      summary: '📩 메일 발송 실패',
      detail: `📭 HIGH 등급 대상자가 없습니다.`,
      life: 6000
    });
    return
  }

  try {
    toast.add({
      severity: 'info',
      summary: '🚀 메일 발송 중 ...🚀',
      detail: `잠시만 기다려주세요! 열심히 메일을 발송하고 있습니다.`,
      life: 99999,
      closable: false,
      id: 'sending-toast'
    });
    const res = await api.post(predictApi.url.sendTestMail, highList);

    if(res.data.success === 200 ){
      toast.remove({id :'sending-toast'});
      toast.add({
        severity: 'success',
        summary: '📩 메일 발송 완료 📩 ',
        detail: `HIGH 등급 대상자인 [ ${names} ]에게 메일이 발송되었습니다.`,
        life: 6000
      });
    }
  } catch (e){
    toast.add({
      severity: 'error',
      summary: '📩 메일 발송 실패 📩 ',
      detail: `'📤  서버에 오류로 메일 발송에 실패하였습니다.`,
      life: 4000
    });
  }


}


// 회수지연 위험 분석 통계 계산
const calculatedStats = computed(() => ({
  total: predictionList.value.length,
  exactMatch: predictionList.value.filter(p => p.absError === 0).length,
  avgAbsError: (
      predictionList.value.reduce((acc, cur) => acc + cur.absError, 0) / predictionList.value.length
  ).toFixed(2)
}))


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
