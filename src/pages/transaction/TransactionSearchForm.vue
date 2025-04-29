<script setup>

import Button from "primevue/button";
import InputText from "primevue/inputtext";

defineProps({
  searchForm:Object
})

const emit = defineEmits(['fetchTransactionList']);

const fetchTransactionList = () => {
  emit('fetchTransactionList');
}

</script>

<template>
  <div class="search-form">
    <InputText v-model="searchForm.businessNumber" placeholder="사업자번호 입력" />
    <InputText v-model="searchForm.clientName" placeholder="거래처명 입력" />
    <Button label="검색" class="search-btn" @click="fetchTransactionList" />
  </div>
</template>

<style scoped>
.search-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-btn {
  background-color: #4e4e53;
}
</style>