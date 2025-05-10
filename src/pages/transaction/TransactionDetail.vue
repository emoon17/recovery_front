<script setup>

import BasePopup from "@/pages/common/BasePopup.vue";
import Button from "primevue/button";
import {computed, reactive, watch, ref} from "vue";
import Calendar from 'primevue/calendar';


const props = defineProps({
  visible: Boolean,
  transaction: Object
})
const emit = defineEmits(['close', 'edit']);

const fields = [
  {label: "거래처명", key: "name"},
  {label: "사업자번호", key: "businessNumber"},
  {label: "거래일자", key: "transactionDate"},
  {label: "외상금액", key: "transactionAmount"},
  {label: "회수금액", key: "recoveredAmount"},
  {label: "회수일자", key: "recoveredDate"},
];

const details = computed(() => props.transaction || {});

const isEditMode = ref(false);
const editableTransaction = ref({});

watch(() => props.transaction, (newValue) => {
  if (newValue) {
    Object.assign(editableTransaction, newValue);
  }
});

const toggleEdit = () => {
  isEditMode.value = !isEditMode.value;
}

// 저장하기
const saveEdit = () => {
  const original = props.transaction;
  const updated = {...original};

  // 수정된 필드만 덮어쓰기
  for (const key in editableTransaction.value) {
    const newVal = editableTransaction.value[key];
    if (newVal !== undefined && newVal !== null && newVal !== original[key]) {
      if (['transactionDate', 'recoveredDate'].includes(key)) {
        updated[key] = formatDate(newVal);
      } else {
        updated[key] = newVal;
      }


    }
  }

  //  모든 필드를 한 번에 포맷팅
  for (const key in updated) {
    const value = updated[key];

    // 날짜 문자열로 변환
    if (['transactionDate', 'recoveredDate'].includes(key)) {
      // 문자열 형태라면 변환 생략, Date 객체면 변환
      if (value instanceof Date) {
        updated[key] = formatDate(value);
      }
    }

    // 금액 콤마 제거
    if (['transactionAmount', 'recoveredAmount'].includes(key)) {
      updated[key] = Number(value.toString().replace(/,/g, ''));
    }
  }
  props.transaction = {...updated};
  emit('edit', updated);
  isEditMode.value = false;
};

const formatDate = (date) => {
  if (!(date instanceof Date)) return date;

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};
</script>

<template>
  <BasePopup :visible="visible" title="거래 상세보기" @close="$emit('close')">
    <div class="detail-box">
      <div class="detail-row" v-for="field in fields" :key="field.key">
        <span class="label">{{ field.label }}</span>
        <span class="value">
          <template v-if="isEditMode">
             <Calendar
                 v-if="['transactionDate', 'recoveredDate'].includes(field.key)"
                 v-model="editableTransaction[field.key]"
                 dateFormat="yy-mm-dd"
                 showIcon
                 :placeholder="props.transaction[field.key]"
                 :touchUI="false"
                 style="flex: 1; "
             />
            <InputText
                v-else
                class="edit-input"
                v-model="editableTransaction[field.key]"
                :placeholder="props.transaction[field.key]"
                :disabled="field.key === 'name' || field.key === 'businessNumber'"
            />
          </template>
          <template v-else>
            {{ props.transaction[field.key] || '-'}}
          </template>
        </span>
      </div>

      <Button v-if="!isEditMode" label="수정하기" class="edit-btn" @click="toggleEdit"/>
      <Button v-else label="저장하기" class="edit-btn" @click="saveEdit"/>
      <Button v-if="isEditMode" label="취소" severity="secondary" @click="$emit('close')"/>
    </div>
  </BasePopup>
</template>

<style scoped>
.detail-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-row {
  display: flex;
  justify-content: center;
  padding: 4px 0;
}

.label {
  width: 250px;
  font-weight: 600;
  color: #333;
}

.value {
  flex: 1;
  text-align: left;
  color: #555;
}


.edit-btn {
  margin-top: 20px;
  background-color: #b0b0b8;
  color: white;
  border: none;
}

.edit-btn:hover {
  background-color: #4e4e53;
}

:deep(.p-calendar .p-inputtext) {
  width: 160px;
}

:deep(.p-calendar .p-datepicker-trigger) {
  background-color: #b0b0b8; /* 원하는 색상으로 변경 */
  border: 1px solid #b0b0b8 !important;
}

</style>