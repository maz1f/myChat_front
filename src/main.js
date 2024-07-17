import components from '@/components/UI'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import {store} from "@/store/store.js";
import '@/interceptors/axios.js';

const app = createApp(App);

components.forEach(component => app.component(component.name, component));

app
    .use(router)
    .use(store)
    .mount('#app')

