<script setup>

import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import BasePopup from "@/pages/common/BasePopup.vue";
import '@vuepic/vue-datepicker/dist/main.css';
import {useToast} from 'primevue/usetoast';

const toast = useToast();

import {computed, ref} from "vue";


const props = defineProps({
  showDialog: Boolean,
  clients: Array
});

const emit = defineEmits(['open', 'close', 'insertTransaction']);

const transaction = ref({
  clientId: '',
  businessNumber: '',
  name: '',
  transactionDate: '',
  transactionAmount: '',
  recoveredAmount: '',
  expectedPaymentDate: ''
});


const showSuggestions = ref(false)
const filteredClients = ref([])


// 자동완성용 검색 로직
const onSearch = () => {
  const keyword = transaction.value.name.trim()
  if (keyword.length > 0) {
    filteredClients.value = props.clients.filter(client =>
        client.name.includes(keyword)
    )
    showSuggestions.value = true
  } else {
    filteredClients.value = []
    showSuggestions.value = false
  }
}
const selectClient = (item) => {
  transaction.value.clientId = item.clientId;
  transaction.value.name = item.name
  transaction.value.businessNumber = item.businessNumber
  showSuggestions.value = false
}

const handleBlur = () => {
  setTimeout(() => {
    if (!document.activeElement.closest('.suggestions')) {
      showSuggestions.value = false
    }

  }, 100)
}


// 거래처 등록 팝업
const goToRegister = () => {
  transaction.value = {
    clientId: '',
    businessNumber: '',
    name: '',
    transactionDate: '',
    transactionAmount: '',
    recoveredAmount: '',
    expectedPaymentDate: ''
  };
  emit('open');
}

const handleClose = () => {
  emit('close');
};

// 거래 등록
const insertTransaction = () => {
  transaction.value.transactionDate = new Date(transaction.value.transactionDate).toISOString().substring(0, 10);
  emit('insertTransaction', transaction.value);
  handleClose();

};

//포맷팅
const onlyNumberInput = (field) => {
  const raw = transaction.value[field]?.toString().replace(/[^\d]/g, '');
  transaction.value[field] = raw ? parseInt(raw, 10) : 0;
};

const formatCurrency = (value) => {
  if (value === null || value === undefined) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// validation
const isFormValid = computed(() => {
  const t = transaction.value;
  return (
      t.clientId &&
      t.name &&
      t.businessNumber &&
      t.transactionDate instanceof Date &&
      !isNaN(t.transactionDate) &&
      typeof t.transactionAmount === 'number' &&
      typeof t.recoveredAmount === 'number'
  );
});
</script>

<template>
  <div class="transaction-header">
    <div class="transaction-header-left">
      <div class="page-title">
        <span class="emoji">📋</span>
        <h2>거래 관리</h2>
      </div>

    </div>
    <Button icon="pi pi-plus" class="register-btn" @click="goToRegister" />
  </div>
  <BasePopup
      :visible="showDialog"
      title="거래 등록"
      @close="handleClose"
      :width="'550px'"
  >
    <div class="form-wrap">

      <!-- 거래처명 (자동완성) -->
      <div class="form-item horizontal auto-complete" >
        <label class="form-label">거래처명</label>
        <div style="width: 100%; position: relative;">
          <InputText
              v-model="transaction.name"
              @input="onSearch"
              @focus="onSearch"
              @blur="handleBlur"
          />
          <ul v-if="showSuggestions && filteredClients.length" class="suggestions">
            <li
                v-for="item in filteredClients"
                :key="item.businessNumber"
                @mousedown.prevent="selectClient(item)"
            >
              {{ item.name }} ({{ item.businessNumber }})
            </li>
          </ul>
        </div>
      </div>

      <!-- 사업자번호 -->
      <div class="form-item horizontal">
        <label class="form-label">사업자번호</label>
        <InputText v-model="transaction.businessNumber" />
      </div>

      <!-- 거래일자 -->
      <div class="form-item horizontal">
        <label class="form-label">거래일자</label>
<!--        <DatePicker-->
<!--            v-model="transaction.transactionDate"-->
<!--            input-class="calendar-input"-->
<!--            placement="bottom"-->
<!--            placeholder="거래일자"-->
<!--            date-format="yy.mm.dd"-->
<!--            showIcon-->
<!--            fluid-->
<!--        />-->
        <Calendar
            v-model="transaction.transactionDate"
            dateFormat="yy-mm-dd"
            showIcon
            :panelStyle="{ marginBottom: '6px' }"
            :showButtonBar="true"
            :touchUI="false"
        />
      </div>

      <!-- 외상금액 -->
      <div class="form-item horizontal">
        <label class="form-label">외상금액</label>
        <InputText
            v-model="transaction.transactionAmount"
            @input="onlyNumberInput('transactionAmount')"
            :value="formatCurrency(transaction.transactionAmount)"
        />
      </div>

      <!-- 회수금액 -->
      <div class="form-item horizontal">
        <label class="form-label">회수금액</label>
        <InputText
            v-model="transaction.recoveredAmount"
            @input="onlyNumberInput('recoveredAmount')"
            :value="formatCurrency(transaction.recoveredAmount)"
        />
      </div>

      <!-- 회수예정일 (추가한 경우) -->
      <div class="form-item horizontal">
        <label class="form-label">회수예정일</label>
        <Calendar
            v-model="transaction.expectedPaymentDate"
            dateFormat="yy-mm-dd"
            showIcon
            :panelStyle="{ marginBottom: '6px' }"
            :showButtonBar="true"
            :touchUI="false"
        />
      </div>

      <!-- 등록 버튼 -->
      <div class="form-item">
        <Button
            label="등록하기"
            @click="insertTransaction"
            class="submit-btn"
            :disabled="!isFormValid"
        />
      </div>
    </div>
  </BasePopup>

</template>

<style scoped>
.transaction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.register-btn {
  background-color: #b0b0b8;
  border: none;
  border-radius: 8px;
  padding: 6px 14px;
  font-weight: 600;
  font-size: 14px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.register-btn:hover {
  background-color: #4e4e53;
  transform: scale(1.05);
}

.form-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px 0;
  max-width: 480px;   /* ✅ 최대 너비 제한 추가 */
  margin: 0 auto;
}


.form-item {
  width: 100%;
}

.form-item :deep(.p-inputtext){
  width: 100%;
  padding-right: 3.5rem;
}

.submit-btn {
  width: 100%;
  background-color: #b0b0b8;
  border: none;
}

.submit-btn:hover {
  background-color: #4e4e53;
  transform: scale(1.05);
}


/* 입력창 스타일 */
.form-item :deep(.p-inputtext),
.form-item :deep(.dp__input) {
  height: 36px;
  font-size: 14px;
  padding: 4px 12px;
  text-align: center;
}

.form-item :deep(.dp__input) {
  height: 36px;
  font-size: 14px;
  padding: 4px 12px;
  text-align: center;
}

.form-item :deep(.dp__input:focus) {
  border-color: #4e4e53;
  outline: none;
}

.form-item :deep(.dp__input_icon) {
  right: 0.75rem !important;
  inset-inline-start: unset !important;
}


/* ✅ 팝업 스타일 */
:deep(.dp__menu) {
  width: 100% !important;
  max-width: 100% !important;
  min-width: auto !important;
  box-sizing: border-box;
  z-index: 99999 !important;
  font-size: 14px;
}

/* ✅ 선택된 날짜 스타일 */
:deep(.dp__calendar_item--selected) {
  background-color: #4e4e53;
  color: white;
  border-radius: 50%;
}

.auto-complete {
  position: relative;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.suggestions li {
  padding: 8px 12px;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: #f0f0f0;
}


.form-item.horizontal {
  display: flex;
  align-items: center;
  gap: 50px;
}

.form-label {
  width: 100px; /* 기존 90px보다 넉넉하게 */
  white-space: nowrap; /* 한 줄로 표시 */
  font-weight: 500;
  color: #495057;
  text-align: right;
  margin-right: 0;
}

:deep(.p-calendar) {
  width: 100%;
  .p-inputtext {
    height: 36px;
    text-align: center;
  }
}
:deep(.p-datepicker) {
  position: absolute !important;
  left: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  z-index: 9999 !important;
  box-sizing: border-box;
}
:deep(.p-datepicker-calendar) {
  width: 100%;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.page-title .emoji {
  font-size: 24px;
}


</style>