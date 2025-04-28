<script setup>
import {useCounterStore} from '@/store/counter'
import {client} from "@/api/client.js";
import {onMounted, ref} from "vue";
import api from '@/api/axios'

// const counter = useCounterStore();
const testEmail = ref("");
const fetchTest = async () =>{
  try{
    const res = await api.get(client.url.selectFindId);
    testEmail.value = res.data;
  }catch (e){
    console.log(e);
  }
}

onMounted(()=>{
  fetchTest();
})
</script>

<template>
  <div>test</div>
  <div>
    <h1>testEmail::: {{testEmail}}</h1>
  </div>
</template>