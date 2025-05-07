<script setup>

import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import {useToast} from 'primevue/usetoast'
import DataTable from "primevue/datatable";
import Column from "primevue/column";

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

const getRowClass = (data) => {
  const level = data.riskLevel?.toLowerCase();
  return `risk-${level}`;
};

const realDelayBody = (rowData) => {
  return rowData.realDelay !== null ? rowData.realDelay : '미회수';
};

const absErrorBody = (rowData) => {
  return rowData.absError !== null ? rowData.absError : '-';
};
</script>

<template>
  <div class="table-wrapper">
    <div class="table-controls">
      <strong class="table-guide">
        🏢 선택한 날짜와 위험도에 따라 예측 리스트가 표시됩니다. ( 기준일: {{ props.selectedDate }} )
      </strong>

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
        <Button icon="pi pi-send" label="메일 발송" severity="info" @click="sendMail" />
        <span class="mail-desc">※ HIGH 등급 대상자에게만 메일이 발송됩니다.</span>
      </div>
    </div>

    <DataTable
        :value="props.filteredList"
        paginator
        :rows="10"
        :rowsPerPageOptions="[10, 20, 30]"
        :rowClass="getRowClass"
    >
      <Column field="name" header="거래처명" />
      <Column field="predictedDelay" header="예측 지연일" />
      <Column header="실제 지연일">
        <template #body="slotProps">
          {{ slotProps.data.realDelay !== null ? slotProps.data.realDelay : '미회수' }}
        </template>
      </Column>
      <Column header="오차">
        <template #body="slotProps">
          {{ slotProps.data.absError !== null ? slotProps.data.absError : '-' }}
        </template>
      </Column>
      <Column field="riskLevel" header="위험도" />
      <Column field="comment" header="코멘트" />
    </DataTable>
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

.risk-high {
  background-color: #ffe5e5 !important;
}
.risk-medium {
  background-color: #fff9d5 !important;
}
.risk-low {
  background-color: #e6f9e6 !important;
}
:deep(.risk-high) {
  background-color: #ffe5e5 !important;
}
:deep(.risk-medium) {
  background-color: #fff9d5 !important;
}
:deep(.risk-low) {
  background-color: #e6f9e6 !important;
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