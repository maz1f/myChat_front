<script setup>

import ChatPreview from "@/components/UI/ChatPreview.vue";
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode"
import {ref} from "vue";
import {store} from "@/store/store.js";
import router from "@/router/router.js";

const users = ref(localStorage.users.split(','));

const getMessages = async (recipient) => {
  try {
    const sender = VueJwtDecode.decode(localStorage.access_token).sub;
    console.log(`http://localhost:5050/${sender}/${recipient}`);
    const messages = axios.get(`http://localhost:5050/${sender}/${recipient}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.access_token}`
    }
    }).then(async res => {
      await store.dispatch('setSentMessages', res.data.sentMessages);
      await store.dispatch('setReceivedMessages', res.data.receivedMessages);
    });
    await router.push('/chat');

  } catch(e) {
    alert(e.response.data.message)
  }
}

</script>

<template>
  <div class="chats_menu">
   <div class="chats" v-for="user in users" :key="user">
      <chat-preview :radio_id="user" @change="getMessages(user)">{{user}}</chat-preview>
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