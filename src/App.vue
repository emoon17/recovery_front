<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <Toast />
  <RouterView />
</template>

<style>
.p-toast {
  z-index: 9999 !important;
}
.p-datepicker {
  z-index: 99999 !important;
}
</style>