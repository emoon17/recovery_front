<script setup>

import Button from "primevue/button";
import BasePopup from "@/pages/common/BasePopup.vue";
import InputText from "primevue/inputtext";
import {ref} from "vue";

const showDialog = ref(false);

// 신규 거래처
const newClient = ref({
  businessNumber: '',
  name: '',
  industry: '',
  email: '',
  contact: '',
  expectedRecoveryDays: ''
});

// 거래처 등록 팝업
const goToRegister = () => {
  showDialog.value = true;
}

</script>

<template>
  <div class="client-header">
  <!-- 거래처 등록 팝업 -->
  <Button
      icon="pi pi-plus"
      iconPos="left"
      @click="goToRegister"
      class="register-btn"/>
  <BasePopup :visible="showDialog" title="거래처 등록" @close="showDialog = false">
    <div class="form-wrap">
      <div class="form-item">
        <label>사업자번호</label>
        <InputText v-model="newClient.businessNumber"/>
      </div>
      <div class="form-item">
        <label>거래처명</label>
        <InputText v-model="newClient.name"/>
      </div>
      <div class="form-item">
        <label>업종</label>
        <InputText v-model="newClient.industry"/>
      </div>
      <div class="form-item">
        <label>이메일</label>
        <InputText v-model="newClient.email"/>
      </div>
      <div class="form-item">
        <label>연락처</label>
        <InputText v-model="newClient.contact"/>
      </div>
      <div class="form-item">
        <label>외상대 회수 평균일수</label>
        <InputText v-model="newClient.expectedRecoveryDays"/>
      </div>

      <Button label="등록하기" class="submit-btn" @click="submitClient"/>
    </div>
  </BasePopup>
  </div>
</template>

<style scoped>
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

/* 등록 버튼 */
.submit-btn {
  width: 100%;
  margin-top: 10px;
  background-color: #b0b0b8;
  border: none;
}

.submit-btn:hover {
  background-color: #4e4e53;
}

.client-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.form-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

/* 한 줄에 label + input */
.form-item {
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
  gap: 12px;
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