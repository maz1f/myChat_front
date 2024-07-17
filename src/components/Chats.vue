<script setup>

import ChatPreview from "@/components/UI/ChatPreview.vue";
import axios from "axios";
import {ref} from "vue";
import {store} from "@/store/store.js";
import router from "@/router/router.js";

const users = ref(localStorage.users.split(','));

const setChat = async(recipient) => {
  await getMessages(recipient);
}

const getMessages = async (recipient) => {
  try {
    const sender = localStorage.name;
    const messages = await axios.get(`/chat/${sender}/${recipient}`, {});
    await store.dispatch('setMessages', messages.data.messages);
    await router.push(`/chat/${recipient}`);

  } catch(e) {
    alert(e);
  }
}

</script>

<template>
  <div class="chats_menu">
   <div class="chats" v-for="user in users" :key="user">
      <chat-preview :radio_id="user" @change="setChat(user)">{{user}}</chat-preview>
   </div>
  </div>
</template>

<style scoped>
.chats_menu {
  height: 100vh;
  width: 200px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: block;
  position: sticky;
}
.chats {
  width: 100%;
}
</style>