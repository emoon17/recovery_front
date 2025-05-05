<script setup>

import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import {useToast} from 'primevue/usetoast'

const toast = useToast()

const props = defineProps({
  riskOptions: Array,
  filteredList: Array,
  predictionList: Array,
  selectedDate: String
})

const selectedRiskLevel = defineModel('selectedRiskLevel')


// 메일 발송
const sendMail = () => {
  const highList = props.predictionList.filter(p => p.riskLevel === 'HIGH')
  const names = highList.map(p => `${p.name}`).join(', ')

  if (highList.length === 0) {
    alert('📭 HIGH 등급 대상자가 없습니다.')
    return
  }

  toast.add({
    severity: 'info',
    summary: '📩 메일 발송 완료',
    detail: `HIGH 등급 대상자인 [ ${names} ]에게 메일이 발송되었습니다.`,
    life: 4000
  })
}
</script>

<template>
  <div class="table-wrapper">
    <div class="table-controls">
      <strong class="table-guide">
        🏢 선택한 날짜와 위험도에 따라 예측 리스트가 표시됩니다. ( 기준일: {{ props.selectedDate }} )
      </strong>
      <!-- 필터 + 버튼 -->
      <div class="filter-box">
        <span class="filter-label">위험도 필터:</span>
        <Dropdown
            v-model="selectedRiskLevel"
            :options="riskOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="전체"
            style="width: 150px"
        />
        <Button icon="pi pi-send" label="메일 발송" severity="info" @click="sendMail"/>
        <span class="mail-desc">※ HIGH 등급 대상자에게만 메일이 발송됩니다. </span>
      </div>
    </div>

    <!-- 예측 테이블 -->
    <table class="risk-table">
      <thead>
      <tr>
        <th>거래처명</th>
        <th>예측 지연일</th>
        <th>실제 지연일</th>
        <th>오차</th>
        <th>위험도</th>
        <th>코멘트</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in props.filteredList"
          :key="item.txId"
          :class="`risk-${item.riskLevel.toLowerCase()}`"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.predictedDelay }}</td>
        <td>{{ item.realDelay !== null ? item.realDelay : '미회수' }}</td>
        <td>{{ item.absError !== null ? item.absError : '-' }}</td>
        <td>{{ item.riskLevel }}</td>
        <td>{{ item.comment }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
}

.table-controls {
  margin-bottom: 12px;
  text-align: left;
}

.risk-table {
  width: 90%;
  margin: 0 auto;
  border-collapse: collapse;
}
.filter-box {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.risk-table {
  width: 100%;
  margin: 0 auto;

  border-collapse: collapse;
}

.risk-table th,
.risk-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.risk-high {
  background-color: #ffe5e5;
}

.risk-medium {
  background-color: #fff9d5;
}

.risk-low {
  background-color: #e6f9e6;
}


.filter-box {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-label {
  font-weight: bold;
}

.mail-desc {
  font-size: 0.85rem;
  color: #888;
}

.table-guide {
  display: block;
  margin-bottom: 12px;
  font-size: 0.95rem;
  color: #444;
}
</style>