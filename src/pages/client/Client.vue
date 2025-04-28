<template>
  <div class="client-page">
    <div class="client-header">
      <h2>거래처 리스트</h2>
      <!-- 거래처 등록 팝업 -->
      <ClientRegister/>
    </div>

    <!-- 거래처 리스트 -->
    <ClientList :clients="clients" @selectClient="onClientSelected" />
    <!-- 거래처 상세보기 팝업 -->
    <ClientDetail :selectedClient="selectedClient" :showDialog="showDialog" @close="handleClose" />
  </div>


</template>

<script setup>
import ClientRegister from "@/pages/client/ClientRegister.vue";
import ClientList from "@/pages/client/ClientList.vue";
import api from "@/api/axios.js";
import {client} from "@/api/client.js";
import {onMounted, ref} from "vue";
import ClientDetail from "@/pages/client/ClientDetail.vue";

// 기존 거래처
const clients = ref([]);
// 선택된 거래처
const selectedClient = ref(null);
const showDialog = ref(false);

onMounted(() => {
  fetchClients();
});

/**
 * 거래처 전체 조회
 * */
const fetchClients = async () => {
  try {
    const res = await api.get(client.url.getAllClients);
    clients.value = res.data;
  } catch (e) {
    console.log("client >>> fetchClients :: ", e);
  }
}

const onClientSelected = (client) => {
  selectedClient.value = client;
  console.log("Client >>>> onClientSelected ::: " , selectedClient.value);
  showDialog.value = true;

};

// 팝업 닫을 때 상태 변경
const handleClose = () => {
  showDialog.value = false; // 팝업 닫기
};
</script>

<style scoped>

.client-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}


</style>