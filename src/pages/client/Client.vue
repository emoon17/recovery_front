<template>
  <div class="client-page">
    <div class="client-header">
      <h2>거래처 리스트</h2>
      <!-- 거래처 등록 팝업 -->
      <ClientRegister @submitClient="submitClient"/>
    </div>

    <!-- 거래처 리스트 -->
    <ClientList :clients="clients" @selectClient="onClientSelected"/>
    <!-- 거래처 상세보기 팝업 -->
    <ClientDetail
        :selectedClient="selectedClient"
        :showDialog="showDialog"
        @close="handleClose"
        @updateClient="updateClient"
        @deleteClient="deleteClient"/>
  </div>


</template>

<script setup>
import ClientRegister from "@/pages/client/ClientRegister.vue";
import ClientList from "@/pages/client/ClientList.vue";
import api from "@/api/axios.js";
import {clientApi} from "@/api/client.js";
import {onMounted, ref} from "vue";
import ClientDetail from "@/pages/client/ClientDetail.vue";
import {useToast} from 'primevue/usetoast';

const toast = useToast();

// 기존 거래처
const clients = ref([]);
// 선택된 거래처
const selectedClient = ref({});
const showDialog = ref(false);

onMounted(() => {
  fetchClients();
});

/**
 * 거래처 전체 조회
 * */
const fetchClients = async () => {
  try {
    const res = await api.get(clientApi.url.getAllClients);
    clients.value = res.data.data;
  } catch (e) {
    console.log("client >>> fetchClients :: ", e);
  }
}

/**
 * 거래처 등록
 * */
const submitClient = async (newClient) => {
  console.log("newClient :::: " , newClient);
  try {
    const res = await api.post(clientApi.url.insertClient, newClient);
    if (res.data.success === 200) {
      toast.add({severity: 'success', summary: '등록 완료', detail: '거래처 정보가 수정되었습니다.', life: 3000});
      handleClose();
    }
  } catch (e) {
    toast.add({severity: 'error', summary: '등록 실패', detail: '서버 오류가 발생했습니다.', life: 3000});
    handleClose();

  }
}

/**
 * 거래처 수정
 * */
const updateClient = async (client) => {
  console.log("Client >>> updateClient ::: ", client);
  try {
    await api.post(clientApi.url.updateClient, client);
    await fetchClients();
    handleClose();
    toast.add({severity: 'success', summary: '수정 완료', detail: '거래처 정보가 수정되었습니다.', life: 3000});
  } catch (e) {
    console.log('client >>> updateClient ::', e);
    toast.add({severity: 'error', summary: '수정 실패', detail: '서버 오류가 발생했습니다.', life: 3000});

  }
};

/**
 * 거래처 삭제
 * */
const deleteClient = async (clientId) => {
  try {
    console.log("Client >>> deleteClient", clientId);
    await api.post(clientApi.url.deleteClient, {clientId: clientId});
    await fetchClients();
    handleClose();
    toast.add({severity: 'success', summary: '삭제 완료', detail: '거래처 정보가 삭제되었습니다.', life: 3000});
  } catch (e) {
    console.log('client >>> deleteClient ::', e);
    toast.add({severity: 'error', summary: '삭제 실패', detail: '서버 오류가 발생했습니다.', life: 3000});
  }
}

const onClientSelected = (client) => {
  selectedClient.value = client;
  console.log("Client >>>> onClientSelected ::: ", selectedClient.value);
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