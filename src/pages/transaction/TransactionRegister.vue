<script setup>

import Button from "primevue/button";
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
</style>