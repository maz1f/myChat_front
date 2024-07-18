<script setup>

import Navbar from "@/components/Navbar.vue";
import {onMounted, onUnmounted, ref} from "vue";
import Chats from "@/components/Chats.vue";
import {store} from "@/store/store.js";
import axios from "axios";

const isAuth = ref(localStorage.isAuth);

isAuth.value == null
    ? (store.dispatch('setAuth', false), store.dispatch('setName', 'Anonimus'))
    : (store.dispatch('setAuth', true), store.dispatch('setName', localStorage.name), store.dispatch('setChats', localStorage.users.split(',')));

const refreshToken = async () => {
  try {
    const {data} = await axios.post('/refreshToken', {
      "token": `${localStorage.refresh_token}`
    });
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    localStorage.access_token = data.token;
  } catch(e) {
    console.log(e.data.message);
  }
}

onMounted(async () => {
  await refreshToken();
  await store.dispatch('openWebSocketConnection');
})

onUnmounted(() => {
  store.dispatch('closeWebSocketConnection');
})

</script>

<template>
  <div class="myChat">
    <navbar></navbar>
    <div style="display: flex; height: 100%;" >
      <div v-if="isAuth === 'true'">
        <chats></chats>
      </div>
      <div class="app">
        <RouterView></RouterView>
      </div>
    </div>
  </div>

  <main>
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
  width: 100%;
  height: 100%;
}
.myChat {
  height: 60vh;
}
</style>
