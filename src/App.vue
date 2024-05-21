<script setup>

import Navbar from "@/components/Navbar.vue";
import {ref} from "vue";

const isAuth = ref(localStorage.isAuth);

</script>

<template>
  <navbar v-model="isAuth"></navbar>
  <div class="app">
    <RouterView></RouterView>
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
}
</style>
