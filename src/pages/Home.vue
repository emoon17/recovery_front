<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const gotoClient = () => {
  router.push('/client');
}


</script>

<template>
  <div>test</div>
  <div>
    <h1>router- client 이동</h1>
    <button @click="gotoClient" >Client 페이지 이동</button>
  </div>
</template>