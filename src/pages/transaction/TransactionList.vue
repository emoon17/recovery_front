<script setup>

import DataTable from "primevue/datatable";
import Column from "primevue/column";

const props = defineProps({
  transactions: Array
})
</script>

<template>
  <div class="transaction-list">
    <DataTable
        :value="transactions"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 30]">
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
            <span v-if="slotProps.data.transactionAmount === slotProps.data.recoveredAmount">✅</span>
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

</style>