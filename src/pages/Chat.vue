<script setup>

import {store} from "@/store/store.js";
</script>

<template>
<div class="chat">
  <div class="sentMessages">
    <div v-for="msg in store.state.sentMessages" :key="msg.id">
      {{msg.message}}
    </div>
  </div>

  <div class="receivedMessages">
    <div v-for="msg in store.state.receivedMessages" :key="msg.id">
      {{msg.message}}
    </div>
  </div>
</div>
</template>

<style scoped>
.chat {
  display: flex;
}
.sentMessages {
  background-color: #999999;
}
.receivedMessages {
  background-color: lightblue;
}
</style>