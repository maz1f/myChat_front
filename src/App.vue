<script setup>

import Navbar from "@/components/Navbar.vue";
import {ref} from "vue";
import Chats from "@/components/Chats.vue";
import router from "@/router/router.js";

const isAuth = ref(localStorage.isAuth);
if (!isAuth) {
  router.push('/login');
}
</script>

<template>
  <div class="myChat">
    <navbar v-model="isAuth"></navbar>
    <div style="display: flex; height: 100%;" >
      <div>
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
