import { createMemoryHistory, createRouter } from 'vue-router'
import Main from "@/pages/Main.vue";
import Login from "@/pages/Login.vue";
import Registration from "@/pages/Registration.vue";



const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/registration',
        component: Registration
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router;