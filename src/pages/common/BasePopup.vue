<template>
  <div v-if="visible" class="popup-overlay">
    <div class="popup-content" :style="{ width }">
      <div class="popup-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="$emit('close')">X</button>
      </div>
      <div class="popup-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  title: String,
  width: {
    type: String,
    default : '400px'
  }
})
defineEmits(['close'])
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* 뒷배경 어둡게 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-content {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  min-width: 400px;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

</style>
