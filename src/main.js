import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.component('Toast', Toast)
app.component("InputText", InputText)
app.component('Calendar', Calendar);
app.component('Dialog', Dialog)
app.mount('#app')
