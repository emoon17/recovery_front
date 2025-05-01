<template>
  <div class="transaction-page">

    <!-- 거래 등록 -->
    <TransactionRegister :showDialog="showDialog" @open="handleOpen" @close="handleClose"  />


    <!-- 검색 폼 -->
    <TransactionSearchForm :searchForm="searchForm" :clients="clients" @fetchTransactionList="fetchTransactionList"/>

    <!-- 거래 리스트 테이블 -->
    <TransactionList :transactions="transactions"/>

  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import TransactionSearchForm from "@/pages/transaction/TransactionSearchForm.vue";
import TransactionList from "@/pages/transaction/TransactionList.vue";
import TransactionRegister from "@/pages/transaction/TransactionRegister.vue";
import api from "@/api/axios.js";
import {transactionApi} from "@/api/transaction.js";
import {clientApi} from "@/api/client.js";


const transactions = ref([]);
const clients = ref([]);

const showDialog = ref(false);

const searchForm = ref({
  clientId : '',
  businessNumber: '',
  name: '',
});


transactions.value = [
  {
    clientId : '',                      // 거래처아이디
    businessNumber: '',                 // 거래처사업자번호
    name: '',                           // 거래처명
    transactionDate: '',                // 거래날짜
    transactionAmount: 0,               // 거래 금액
    recoveredDate : '',                 // 회수날짜
    recoveredAmount: 0,                 // 회수금액
    expectedPaymentDate: '',  // 회수 예정일
  },
];

clients.value = [
  {
    clientId : '',                      // 거래처아이디
    businessNumber: '',                 // 거래처사업자번호
    name: '',                           // 거래처명
  }
]

onMounted(()=> {
  fetchTransactionList();
  fetchClientList();
});

// 금액 포맷팅
const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '-';
  return Number(amount).toLocaleString(); // 3자리 , 처리
};

//사업자번호 포맷팅
const formatBusinessNumber = (bn) => {
  if (!bn) return '-';
  return bn.replace(/^(\d{3})-?(\d{2})-?(\d{5})$/, "$1-$2-$3");
};

/**
 * transaction 전체 조회
 * */
const fetchTransactionList = async (searchForm) => {
  console.log('검색조건:', searchForm);

  try {
    const res = await api.post(transactionApi.url.getAllTransactions, searchForm || {});

    transactions.value = res.data.data.map(item => ({
      ...item,
      transactionAmount: formatCurrency(item.transactionAmount),
      recoveredAmount: formatCurrency(item.recoveredAmount),
      businessNumber: formatBusinessNumber(item.businessNumber),
    }));
    console.log("transactions.value::: ", transactions.value);
  }catch (e){
    console.log("fetchTransactionList error :::  ", e);
  }

};

/**
 * 거래처 조회
 * */
const fetchClientList = async () => {
  try {
    const res = await api.get(clientApi.url.getAllClients);
    console.log("거래처 조회 ::: ", res);
    clients.value = res.data.data;
  } catch (e) {
    console.log("Transacion >>> fetchClientList error ::: ", e);
  }
}

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