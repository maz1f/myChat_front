<script setup>

import ChatPreview from "@/components/UI/ChatPreview.vue";
import axios from "axios";
import {store} from "@/store/store.js";
import router from "@/router/router.js";
import {onMounted} from "vue";

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

const getChats = async () => {
  try {
    const {data} = await axios.get('/getChats', {});
    await store.dispatch('setChats', data.chats);
    for (var user in store.state.chats) {
      console.log (user.username);
    }
  } catch(e) {
    alert(e);
  }
}

onMounted(async () => {
  await getChats();
})
</script>

<template>
  <div class="chats_menu">
   <div class="chats" v-for="chat in store.state.chats" :key="chat.username">
      <chat-preview :radio_id="chat.username" @change="setChat(chat.username)">
        {{chat.username}}
        <div class="newMessagesCount" v-if="chat.numberOfNewMessages > 0">You have {{chat.numberOfNewMessages}} new messages</div>
      </chat-preview>
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
.newMessagesCount {
  font-size: 1.2vh;
}

</style>