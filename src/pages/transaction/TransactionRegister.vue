<script setup>

import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import BasePopup from "@/pages/common/BasePopup.vue";
import DatePicker from "@vuepic/vue-datepicker";
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
  transactionAmount: 0,
  recoveredAmount: 0,
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
    showSuggestions.value = false
  }, 100)
}


// 거래처 등록 팝업
const goToRegister = () => {
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
    <h2>거래 관리</h2>
    <Button
        icon="pi pi-plus"
        class="register-btn"
        @click="goToRegister"
    />
  </div>
  <BasePopup
      :visible="showDialog"
      title="거래 등록"
      @close="handleClose"
  >
    <div class="form-wrap">
      <div class="form-item auto-complete">
        <InputText
            v-model="transaction.name"
            @input="onSearch"
            @focus="onSearch"
            @blur="handleBlur"
            placeholder="거래처명"/>
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
      <div class="form-item">
        <InputText v-model="transaction.businessNumber" placeholder="사업자번호"/>
      </div>
      <div class="form-item">
        <DatePicker
            v-model="transaction.transactionDate"
            input-class="calendar-input"
            placement="bottom"
            placeholder="거래일자"
            date-format="yy.mm.dd"
        />
      </div>
      <div class="form-item">
        <InputText
            v-model="transaction.transactionAmount"
            @input="onlyNumberInput('transactionAmount')"
            :value="formatCurrency(transaction.transactionAmount)"
            placeholder="외상금액"/>
      </div>
      <div class="form-item">
        <InputText
            v-model="transaction.recoveredAmount"
            @input="onlyNumberInput('recoveredAmount')"
            :value="formatCurrency(transaction.recoveredAmount)"
            placeholder="회수금액"/>
      </div>
      <div class="form-item">
        <Button
            label="등록하기"
            @click="insertTransaction"
            class="submit-btn"
            :disabled="!isFormValid"/>
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
}


.form-item {
  width: 100%;
}

.form-item :deep(.p-inputtext),
.form-item :deep(.p-calendar) {
  width: 100%;
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
.form-item :deep(.dp__input) {
  width: 100%;
  height: 38px;
  padding: 0 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border 0.3s;
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

</style>