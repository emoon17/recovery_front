<template>
  <div class="transaction-page">

    <!-- 거래 등록 -->
    <TransactionRegister :showDialog="showDialog" @open="handleOpen" @close="handleClose"  />


    <!-- 검색 폼 -->
    <TransactionSearchForm :searchForm="searchForm" @fetchTransactionList="fetchTransactionList"/>

    <!-- 거래 리스트 테이블 -->
    <TransactionList :transactions="transactions"/>

  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import TransactionSearchForm from "@/pages/transaction/TransactionSearchForm.vue";
import TransactionList from "@/pages/transaction/TransactionList.vue";
import TransactionRegister from "@/pages/transaction/TransactionRegister.vue";

const searchForm = ref({
  businessNumber: '',
  clientName: '',
});

const transactions = ref([]);

const showDialog = ref(false);

onMounted(()=> {
  fetchTransactionList();
});

// 조회 버튼 클릭 시 실행
const fetchTransactionList = () => {
  console.log('검색조건:', searchForm.value);

  // 임시 데이터 세팅
  transactions.value = [
    {
      businessNumber: '123-45-67890',
      clientName: '천재교육',
      transactionDate: '2025-04-29',
      creditAmount: '1,000,000원',
      recoveryAmount: '500,000원',
      recoveryDate: '2025-05-10',
    },
  ];
};

const handleOpen = () =>{
  showDialog.value = true;
}

// 팝업 닫을 때 상태 변경
const handleClose = () => {
  showDialog.value = false; // 팝업 닫기
};
</script>

<style scoped>
.transaction-page {
  padding: 20px;
}


</style>