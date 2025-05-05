import {createRouter, createWebHistory} from "vue-router";
import Home from '@/pages/Home.vue'
import Client from '@/pages/client/Client.vue'
import ClientRegister from "../pages/client/ClientRegister.vue";
import Transaction from "@/pages/transaction/Transaction.vue";
import RecoveryChart from "@/pages/recovery/RecoveryStats.vue";
import PredictRisk from "@/pages/predict/PredictRisk.vue";

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            { path: 'client', component: Client },
            { path: 'client/register', component: ClientRegister },
            { path: 'transaction', component: Transaction },
            { path: '', component: RecoveryChart },
            { path: 'predict', component: PredictRisk },
        ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;