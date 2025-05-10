<script setup>

import DataTable from "primevue/datatable";
import Column from "primevue/column";

const props = defineProps({
  transactions: Array
})
const emit = defineEmits(['rowSelected'])

const onRowClick = (e) => {
  emit('rowSelected', e.data)
}
</script>

<template>
  <div class="transaction-list">
    <p class="info-note">
      📌 거래 내역을 <strong>등록하고 회수 일정을 관리</strong>할 수 있으며, 거래 내역은 <strong>최신 거래일 기준</strong>으로 정렬되어 표시됩니다.
    </p>
    <DataTable
        :value="transactions"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 30]"
        @row-click="onRowClick"
    >
      <Column
          field="businessNumber"
          header="사업자번호"
          headerClass="custom-header-center"
          :bodyStyle="{ textAlign: 'center' }"
      />
      <Column
          field="name"
          header="거래처명"
          headerClass="custom-header-center"
          :bodyStyle="{ textAlign: 'center' }"
      />
      <Column
          field="transactionDate"
          header="거래날짜"
          headerClass="custom-header-center"
          :bodyStyle="{ textAlign: 'center' }"
      />
      <Column
          field="transactionAmount"
          header="외상대"
          headerClass="custom-header-center"
          :bodyStyle="{ textAlign: 'center' }"
      />
      <Column
          header="회수금액"
          headerClass="custom-header-center"
          :bodyStyle="{ textAlign: 'center' }">
        <template #body="slotProps">
          {{ slotProps.data.recoveredAmount !== "0" ? slotProps.data.recoveredAmount : '-' }}
        </template>
      </Column>
      <Column
          header="회수날짜"
          headerClass="custom-header-center"
          :bodyStyle="{ textAlign: 'center' }"
      >
        <template #body="slotProps">
          {{ slotProps.data.recoveredDate !== null ? slotProps.data.recoveredDate : '-' }}
        </template>
      </Column>
      <Column
          field="expectedPaymentDate"
          header="회수예정일"
          headerClass="custom-header-center"
          :bodyStyle="{ textAlign: 'center' }"
      />
      <Column
          header="회수 완료 여부"
          headerClass="custom-header-center"
          :bodyStyle="{ textAlign: 'center' }"
      >
        <template #body="slotProps">
          <i
              v-if="slotProps.data.transactionAmount === slotProps.data.recoveredAmount"
              class="pi  pi-check-circle"
              style="color: #fd2e47; font-size: 1rem;"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>

.transaction-list {
  margin-top: 30px;
}

::v-deep(.custom-header-center .p-column-header-content) {
  justify-content: center;
}

.info-note {
  font-size: 15px;
  color: #495057;
}

</style>