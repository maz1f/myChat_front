<script setup>
import {ref} from "vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import {store} from "@/store/store.js";
import router from "@/router/router.js";

const name = ref(localStorage.name);
const btnClick = async () => {
  try {
    const messages = await axios.get(`/artem/user`, {});
    await store.dispatch('setSentMessages', messages.data.sentMessages);
    await store.dispatch('setReceivedMessages', messages.data.receivedMessages);
    await router.push('/chat');
  } catch(e) {
    console.log(e);
  }
}
</script>

<template>
<div>
  <h2>Hello, {{name}}</h2>
</div>
<div>
  <my-button @click="btnClick">get messages</my-button>
</div>
</template>

<style scoped>

</style>