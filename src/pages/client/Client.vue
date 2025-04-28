<template>
  <div class="client-page">
    <div class="client-header">
      <h2>거래처 리스트</h2>
      <Button
          icon="pi pi-plus"
          iconPos="left"
          @click="goToRegister"
          class="register-btn"/>
      <BasePopup :visible="showDialog" title="거래처 등록" @close="showDialog = false">
        <!-- 팝업 안에 들어갈 폼 -->
        <p>여기서 거래처 등록</p>
      </BasePopup>
    </div>

    <DataTable :value="clients" class="client-table">
      <Column field="name" header="거래처명" />
      <Column field="industry" header="업종" />
      <Column field="email" header="이메일" />
      <Column field="contact" header="연락처" />
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import BasePopup from "@/pages/common/BasePopup.vue";

// 예시 데이터
const clients = ref([
  { name: '천재교육', industry: '교육', email: 'edu@chunjae.co.kr', contact: '02-1234-5678', expectedRecoveryDays: 30 },
  { name: '네이버', industry: 'IT', email: 'naver@naver.com', contact: '031-1234-5678', expectedRecoveryDays: 15 }
])

const showDialog = ref(false);

const goToRegister = () => {
  showDialog.value = true;
}
</script>

<style scoped>
/* scoped css */


.register-btn {
  background-color:#b0b0b8;
  border: none;
  border-radius: 8px;
  padding: 6px 14px; /* 👈 살짝 작게 */
  font-weight: 600;
  font-size: 14px; /* 👈 글자도 살짝 작게 */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}
.register-btn:hover {
  background-color: #b0b0b8;
  transform: scale(1.05); /* 👈 hover 시 약간 커지는 효과 */
}

.client-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.client-table {
  width: 100%;
}
</style>