<template>
  <div class="transaction-page">

    <!-- 거래 등록 -->
    <TransactionRegister :showDialog="showDialog" :clients="clients" @insertTransaction="insertTransaction"
                         @open="handleOpen" @close="handleClose"/>

    <!-- 검색 폼 -->
    <TransactionSearchForm :searchForm="searchForm" :clients="clients" @fetchTransactionList="fetchTransactionList"/>

    <!-- 거래 리스트 테이블 -->
    <TransactionList :transactions="transactions" @rowSelected="openDetail"/>

    <TransactionDetail
        v-if="showDetail && selectedRow"
        :visible="showDetail"
        :transaction="selectedRow"
        @close="showDetail = false"
        @edit="updateTransaction"
    />

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
import {useToast} from 'primevue/usetoast';
import TransactionDetail from "@/pages/transaction/TransactionDetail.vue";

const toast = useToast();


const transactions = ref([]);
const clients = ref([]);

const showDialog = ref(false);

const searchForm = ref({
  clientId: '',
  businessNumber: '',
  name: '',
});


transactions.value = [
  {
    clientId: '',                      // 거래처아이디
    businessNumber: '',                 // 거래처사업자번호
    name: '',                           // 거래처명
    transactionDate: '',                // 거래날짜
    transactionAmount: 0,               // 거래 금액
    recoveredDate: '',                 // 회수날짜
    recoveredAmount: 0,                 // 회수금액
    expectedPaymentDate: '',  // 회수 예정일
  },
];

clients.value = [
  {
    clientId: '',                      // 거래처아이디
    businessNumber: '',                 // 거래처사업자번호
    name: '',                           // 거래처명
  }
]

onMounted(() => {
  fetchTransactionList();
  fetchClientList();
});

const showDetail = ref(false);
const selectedRow = ref(null);

// 상세보기
const openDetail = (row) => {
  selectedRow.value = row;
  showDetail.value = true;
}

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

  try {
    const res = await api.post(transactionApi.url.getAllTransactions, searchForm || {});

    transactions.value = res.data.data.map(item => ({
      ...item,
      transactionAmount: formatCurrency(item.transactionAmount),
      recoveredAmount: formatCurrency(item.recoveredAmount),
      businessNumber: formatBusinessNumber(item.businessNumber),
    }));
  } catch (e) {
    console.log("fetchTransactionList error :::  ", e);
  }

};

/**
 * 거래처 조회
 * */
const fetchClientList = async () => {
  try {
    const res = await api.get(clientApi.url.getAllClients);
    clients.value = res.data.data;
  } catch (e) {
    console.log("Transacion >>> fetchClientList error ::: ", e);
  }
}

/**
 * 거래 등록
 * */
const insertTransaction = async (transaction) => {
  try {
    const res = await api.post(transactionApi.url.insertTransaction, transaction);
    if (res.data.success === 200) {
      await fetchTransactionList(searchForm.value);
      toast.add({severity: 'success', summary: '등록 완료', detail: '거래가 등록되었습니다.', life: 3000})
    } else {
      toast.add({severity: 'error', summary: '등록 실패', detail: '서버 오류가 발생했습니다.', life: 3000});

    }
  } catch (e) {
    console.log("transaction >>> insertTransaction error ::: ", e);
    toast.add({severity: 'error', summary: '등록 실패', detail: '서버 오류가 발생했습니다.', life: 3000});
  }
}

/**
 * 거래 수정
 * */
const updateTransaction = async (detail) => {
  try {
    const res = await api.post(transactionApi.url.updateTransaction, detail);
    if(res.data.success === 200) {
      await fetchTransactionList(searchForm.value);
      selectedRow.value = detail;
      toast.add({severity: 'success', summary: '수정 완료', detail: '거래가 수정되었습니다.', life: 3000})
    } else {
      toast.add({severity: 'error', summary: '수정 실패', detail: '서버 오류가 발생했습니다.', life: 3000});
    }
  } catch (e) {
    console.log("transaction >>> updateTransaction error ::: ", e);
    toast.add({severity: 'error', summary: '수정 실패', detail: '서버 오류가 발생했습니다.', life: 3000});
  }
}

const handleOpen = () => {
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