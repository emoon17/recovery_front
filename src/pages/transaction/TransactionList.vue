<script setup>

import DataTable from "primevue/datatable";
import Column from "primevue/column";

defineProps({
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
      <Column field="businessNumber" header="사업자번호"/>
      <Column field="name" header="거래처명"/>
      <Column field="transactionDate" header="거래날짜"/>
      <Column field="transactionAmount" header="외상대"/>
      <Column field="recoveredAmount" header="회수금액"/>
      <Column field="recoveredDate" header="회수날짜"/>
    </DataTable>
  </div>
</template>

<style scoped>

.transaction-list {
  margin-top: 10px;
}
</style>