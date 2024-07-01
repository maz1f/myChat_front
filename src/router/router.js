import { createMemoryHistory, createRouter } from 'vue-router'
import Main from "@/pages/Main.vue";
import Login from "@/pages/Login.vue";
import Registration from "@/pages/Registration.vue";
import Logout from "@/pages/Logout.vue";
import Chat from "@/pages/Chat.vue";



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
    },
    {
        path: '/logout',
        component: Logout
    },
    {
        path: '/chat/:username',
        component: Chat
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router;