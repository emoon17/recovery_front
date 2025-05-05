<script setup>

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import {ref} from "vue";

const props = defineProps({
  searchForm: Object,
  clients: Array
})

const emit = defineEmits(['fetchTransactionList']);




const fetchTransactionList = () => {
  emit('fetchTransactionList', props.searchForm);
}

const filteredClients = ref([]);
const showSuggestions = ref(false);

// 자동완성용 검색 로직
const onSearch = () => {
  const keyword = props.searchForm.name.trim().toLowerCase();
  if (keyword.length > 0) {
    filteredClients.value = props.clients.filter(client =>
        client.name.toLowerCase().includes(keyword)
    );
    showSuggestions.value = true;
  } else {
    filteredClients.value = [];
    showSuggestions.value = false;
  }
};

const selectClient = (client) => {
  props.searchForm.clientId = client.clientId;
  props.searchForm.name = client.name;
  props.searchForm.businessNumber = client.businessNumber;
  showSuggestions.value = false;

};

const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 150); // 클릭 이벤트와 충돌 방지
};


</script>

<template>
  <div class="search-form">
    <!-- 거래처명 입력 + 자동완성 -->
    <div class="autocomplete-wrapper">
      <InputText
          v-model="searchForm.name"
          placeholder="거래처명 입력"
          @input="onSearch"
          @focus="onSearch"
          @blur="handleBlur"
      />
      <ul
          v-if="showSuggestions && filteredClients.length"
          class="suggestions"
      >
        <li
            v-for="client in filteredClients"
            :key="client.businessNumber"
            @mousedown.prevent="selectClient(client)"
        >
          {{ client.name }} ({{ client.businessNumber }})
        </li>
      </ul>
    </div>
    <!-- 사업자번호 입력 -->
    <InputText
        v-model="searchForm.businessNumber"
        placeholder="사업자번호 입력"
    />
    <Button
        label="검색"
        class="search-btn"
        type="button"
        @click="fetchTransactionList"
    />
  </div>
</template>

<style scoped>
.search-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border: none !important;
}

.search-btn {
  background-color: #b0b0b8;
  border: none !important;

}

.search-btn:hover {
  background-color: #4e4e53;
  transform: scale(1.05);
}

.autocomplete-wrapper {
  position: relative;
  width: 200px;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  list-style: none;
  margin: 0;
  padding: 0;
}

.suggestions li {
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.suggestions li:hover {
  background-color: #f0f0f0;
}


</style>