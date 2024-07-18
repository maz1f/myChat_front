<script setup>

import {store} from "../store/store.js";
</script>

<template>
<div class="helloPage">
  <h1>Hello, {{store.state.name}}</h1>
  <h3 v-if="!store.state.isAuth" style="margin-top: 20px;">Please, login to chat</h3>
</div>
</template>

<style scoped>
.helloPage {
  margin: 30px auto 0;
  text-align: center;
  vertical-align: center;
}
</style>