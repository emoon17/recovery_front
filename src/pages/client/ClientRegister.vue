<script setup>

import Button from "primevue/button";
import BasePopup from "@/pages/common/BasePopup.vue";
import InputText from "primevue/inputtext";
import {computed, ref, watch} from "vue";
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const showDialog = ref(false);

const emit  = defineEmits(['submitClient'])


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

// 사업자번호 입력 가공
const formatBusinessNumber = (e) => {
  let value = e.target.value.replace(/\D/g, ''); // 숫자만 남기기

  //  10자리까지만 자르기
  if (value.length > 10) {
    value = value.slice(0, 10);
  }

  //  하이픈 포맷 적용
  if (value.length > 4) {
    value = value.slice(0, 3) + '-' + value.slice(3, 5) + '-' + value.slice(4);
  } else if (value.length > 3) {
    value = value.slice(0, 3) + '-' + value.slice(3);
  }

  newClient.value.businessNumber = value;
};

// 일수 입력 validation
watch(() => newClient.value.expectedRecoveryDays, async (val) => {
  const onlyNum = val.replace(/\D/g, '');
  if (val !== onlyNum) {
    newClient.value.expectedRecoveryDays = onlyNum;
    toast.add({
      severity: 'warn',
      summary: '입력 오류',
      detail: '숫자만 입력 가능합니다.',
      life: 2000
    });
  }
});
// validation
const validateBusinessNumber = () => {
  const rawNumber = newClient.value.businessNumber.replace(/-/g, '');
  if (rawNumber.length !== 10) {
    toast.add({
      severity: 'warn',
      summary: '사업자번호 오류',
      detail: '숫자 10자리로 입력해 주세요.',
      life: 3000
    });
  }
};

const validateName = () => {
  if (!newClient.value.name.trim()) {
    toast.add({ severity: 'warn', summary: '입력 오류', detail: '거래처명을 입력해 주세요.', life: 3000 });
  }
};

const validateIndustry = () => {
  if (!newClient.value.industry.trim()) {
    toast.add({ severity: 'warn', summary: '입력 오류', detail: '업종을 입력해 주세요.', life: 3000 });
  }
};

const validateEmail = () => {
  if (!newClient.value.email.trim()) {
    toast.add({ severity: 'warn', summary: '입력 오류', detail: '이메일을 입력해 주세요.', life: 3000 });
  }
};

const validateContact = () => {
  if (!newClient.value.contact.trim()) {
    toast.add({ severity: 'warn', summary: '입력 오류', detail: '연락처를 입력해 주세요.', life: 3000 });
  }
};

const validateExpectedRecoveryDays = () => {
  const value = newClient.value.expectedRecoveryDays.trim();
  if (!value) {
    toast.add({ severity: 'warn', summary: '입력 오류', detail: '외상대 회수 평균일수를 입력해 주세요.', life: 3000 });
  }
};

const isFormValid = computed(() => {
  const client = newClient.value;

  const hasValidBusinessNumber = client.businessNumber.replace(/-/g, '').length === 10;
  const hasName = client.name.trim().length > 0;
  const hasIndustry = client.industry.trim().length > 0;
  const hasEmail = client.email.trim().length > 0;
  const hasContact = client.contact.trim().length > 0;
  const hasValidExpectedDays = /^\d+$/.test(client.expectedRecoveryDays);

  return hasValidBusinessNumber && hasName && hasIndustry && hasEmail && hasContact && hasValidExpectedDays;
});

// 등록
const submitClient = () => {
  console.log("ClientRegister >>> submitClient ::: ", newClient.value);
  emit('submitClient', newClient.value);
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
  <BasePopup :visible="showDialog" title="거래처 등록" :width="'550px'" @close="showDialog = false" >
    <div class="form-wrap">
      <div class="form-item">
        <label>사업자번호</label>
        <InputText
            v-model="newClient.businessNumber"
            @input="formatBusinessNumber"
            @blur="validateBusinessNumber"
            placeholder="'-' 없이 숫자만 입력해주세요"
            :maxlength="12"/>
      </div>
      <div class="form-item">
        <label>거래처명</label>
        <InputText
            v-model="newClient.name"
            placeholder="상호명을 입력해주세요"
            @blur="validateName"
        />
      </div>
      <div class="form-item">
        <label>업종</label>
        <InputText
            v-model="newClient.industry"
            placeholder="업종을 입력해주세요"
            @blur="validateIndustry"
        />
      </div>
      <div class="form-item">
        <label>이메일</label>
        <InputText
            v-model="newClient.email"
            placeholder="이메일을 입력해주세요(eunhye62@gmail.com)"
            @blur="validateEmail"
        />
      </div>
      <div class="form-item">
        <label>연락처</label>
        <InputText
            v-model="newClient.contact"
            placeholder="번호를 입력해주세요(02-1234-1234)"
            @blur="validateContact"
        />
      </div>
      <div class="form-item">
        <label>외상대 회수 평균일수</label>
        <InputText
            v-model="newClient.expectedRecoveryDays"
            placeholder="일수로만 입력해주세요 (30일 경우 30)"
            @blur="validateExpectedRecoveryDays"
        />
      </div>

      <Button label="등록하기" class="submit-btn" @click="submitClient" :disabled="!isFormValid"/>
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
  min-width: 350px;
}

</style>