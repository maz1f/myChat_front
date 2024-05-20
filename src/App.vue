<script setup>

import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <navbar></navbar>
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
