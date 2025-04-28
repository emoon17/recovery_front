import {createRouter, createWebHistory} from "vue-router";
import Home from '@/pages/Home.vue'
import Client from '@/pages/client/Client.vue'
import ClientRegister from "../pages/client/ClientRegister.vue";

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: 'client',
                component: Client
            },
            {
                path: 'client/register',
                component: ClientRegister
            },
            // { path: 'dashboard', component: Dashboard },
            // { path: 'risk', component: RiskPrediction },
            // { path: 'transaction', component: TransactionRegister }
        ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;