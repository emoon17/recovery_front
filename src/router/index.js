import { createRouter, createWebHistory} from "vue-router";
import Home from '@/pages/Home.vue'
import Client from '@/pages/client/Client.vue'

const routes = [
    {
        path: '/',
        name : 'Home',
        component : Home
    },
    {
        path: '/client',
        name: 'Client',
        component: Client
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;