<script setup>

import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import BasePopup from "@/pages/common/BasePopup.vue";
import {ref} from "vue";


const props = defineProps({
  showDialog: Boolean
});


const emit = defineEmits(['open', 'close']);

const transaction = ref({
  businessNumber: '',
  clientName: '',
  transactionDate: '',
  creditAmount: '',
  recoveryAmount: '',
  recoveryDate: ''
});

// 거래처 등록 팝업
const goToRegister = () => {
  emit('open');
}

const handleClose = () => {
  emit('close');
};

const submitTransaction = () => {
  console.log("📦 거래 등록 정보:", transaction.value);


  // 팝업 닫고
  handleClose();

};

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
      <div class="form-item">
        <InputText v-model="transaction.businessNumber" placeholder="사업자번호" />
      </div>
      <div class="form-item">
        <InputText v-model="transaction.clientName" placeholder="거래처명" />
      </div>
      <div class="form-item">
        <Calendar
            v-model="transaction.transactionDate"
            showIcon
            inputClass="calendar-input"
            :inputStyle="{ width: '100%' }"
            placeholder="거래일자"
        />


      </div>
      <div class="form-item">
        <InputText v-model="transaction.creditAmount" placeholder="외상금액" />
      </div>
      <div class="form-item">
        <InputText v-model="transaction.recoveryAmount" placeholder="회수금액" />
      </div>
      <div class="form-item">
        <Calendar v-model="transaction.recoveryDate" showIcon appendTo="body" inputClass="calendar-input" placeholder="회수일자" />
      </div>
      <Button label="등록하기" @click="submitTransaction" class="submit-btn" />
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

.submit-btn{
  width: 100%;
  background-color: #b0b0b8;
  border: none;
}
.submit-btn:hover{
  background-color: #4e4e53;
  transform: scale(1.05);
}

/* Calendar 내부 버튼 스타일 (달력 아이콘) */
/* p-calendar 전체 영역을 InputText와 동일하게 */
.form-item :deep(.p-calendar) {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

/* input 안에 실제 입력 필드 */
.form-item :deep(.p-calendar .p-inputtext) {
  width: 100%;
  padding-right: 2.5rem; /* 아이콘 영역 확보 */
  box-sizing: border-box;
}

.form-item :deep(.p-calendar .p-button) {
  width: 2rem;
  height: 2rem;
  background-color: #b0b0b8;
  border: none;
  margin-left: -2.5rem;
  z-index: 1;
}

.form-item :deep(.p-calendar .p-button:hover) {
  background-color: #4e4e53;
}

</style>