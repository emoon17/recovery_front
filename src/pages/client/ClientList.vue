<script setup>

import Column from "primevue/column";
import DataTable from "primevue/datatable";

defineProps({
  clients : Array
})

const emit = defineEmits(['selectClient']);

const onRowClick = (e) => {
  console.log("ClientList >>> emit ::: ");
  emit('selectClient', e.data);
}

</script>

<template>
  <!-- 거래처 리스트 -->
  <DataTable
      :value="clients"
      class="client-table"
      @row-click="onRowClick"
      :paginator="true"
      :rows="10"
      :rowsPerPageOptions="[10, 20, 30]"
  >
    <Column field="name" header="거래처명"/>
    <Column field="industry" header="업종"/>
    <Column field="email" header="이메일"/>
    <Column field="contact" header="연락처"/>
  </DataTable>

</template>

<style scoped>
.client-table {
  width: 100%;
}

/* label */
.form-item label {
  width: 130px; /* 라벨 너비 고정 */
  font-weight: 600;
  font-size: 14px;
}

/* input */
.form-item :deep(.p-inputtext) {
  flex: 1;
}

</style>