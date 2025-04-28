<script setup>

import {defineProps, defineEmits, ref} from 'vue';
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import BasePopup from "@/pages/common/BasePopup.vue";

defineProps({
  selectedClient: {
    type: Object,
    required: true
  },
  showDialog: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

const isEditable = ref(false);

// 수정하기 버튼 클릭 시
const goToEdit = async () => {
  isEditable.value = !isEditable.value;
}

// 수정 완료 버튼 클릭 시
const submitChanges = () => {
  isEditable.value = false; // 수정 모드를 종료
}

// 수정 취소 버튼 클릭 시
const cancelEdit = () => {
  isEditable.value = false;
}

// 팝업 닫을 때 값 복원 처리 (X 버튼 클릭 시)
const handleClose = () => {
  emit('close'); // 부모로 close 이벤트 전달
}
</script>

<template>
  <BasePopup :visible="showDialog" title="거래처 상세보기" @close="handleClose">
    <div v-if="selectedClient" class="form-wrap">
      <div class="form-item">
        <label>사업자번호</label>
        <InputText v-model="selectedClient.businessNumber" :disabled="!isEditable" :class="{'editable': isEditable}"/>
      </div>
      <div class="form-item">
        <label>거래처명</label>
        <InputText v-model="selectedClient.name" :disabled="!isEditable" :class="{'editable': isEditable}"/>
      </div>
      <div class="form-item">
        <label>업종</label>
        <InputText v-model="selectedClient.industry" :disabled="!isEditable" :class="{'editable': isEditable}"/>
      </div>
      <div class="form-item">
        <label>이메일</label>
        <InputText v-model="selectedClient.email" :disabled="!isEditable" :class="{'editable': isEditable}"/>
      </div>
      <div class="form-item">
        <label>연락처</label>
        <InputText v-model="selectedClient.contact" :disabled="!isEditable" :class="{'editable': isEditable}"/>
      </div>
      <div class="form-item">
        <label>외상대 회수 평균일수</label>
        <InputText v-model="selectedClient.expectedRecoveryDays" :disabled="!isEditable"
                   :class="{'editable': isEditable}"/>
      </div>

      <div class="form-buttons">
        <Button
            label="수정하기"
            v-if="!isEditable"
            class="modify-btn"
            @click="goToEdit"
        />
        <Button
            label="수정완료"
            v-if="isEditable"
            class="modify-btn"
            @click="submitChanges"
        />
        <Button
            label="삭제하기"
            v-if="!isEditable"
            class="delete-btn"
            @click="deleteClient"
        />
        <Button
            label="수정 취소"
            v-if="isEditable"
            class="delete-btn"
            @click="cancelEdit"
        />
      </div>
    </div>
  </BasePopup>
</template>

<style scoped>
.form-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

/* 한 줄에 label + input */
.form-item {
  display: flex;
  justify-content: space-between; /* 라벨과 입력란을 양쪽에 배치 */
  align-items: center; /* 수직 가운데 정렬 */
  gap: 12px;
}

/* label 스타일 */
.form-item label {
  width: 130px; /* 라벨 너비 고정 */
  font-weight: 600;
  font-size: 14px;
}

/* input 스타일 */
.form-item :deep(.p-inputtext) {
  flex: 1; /* 입력란이 남은 공간을 채우도록 설정 */
}

/* 버튼들 스타일 */
.form-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.modify-btn, .delete-btn {
  flex: 1; /* 버튼 크기를 동일하게 맞추기 */
  font-weight: bold;
}
.editable {
  color: #bdb9b9; /* 검은색 글씨 */
  background-color: #f0f0f4;
  border: 1px solid #b0b0b8;
}

/* 수정하기, 삭제하기 버튼 스타일 통일 */
.modify-btn,
.delete-btn {
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
</style>