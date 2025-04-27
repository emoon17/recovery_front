<script setup>
import {useCounterStore} from '@/store/counter'
import {client} from "@/api/client.js";
import {onMounted, ref} from "vue";
import axios from "axios";

// const counter = useCounterStore();
const testName = ref("");
const fetchTest = async () =>{
  try{
    const res = await axios.get(client.url.selectFindId);
    testName.value = res.data;
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
    <h1>testName::: {{testName}}</h1>
  </div>
</template>