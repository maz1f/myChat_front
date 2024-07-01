<script setup>

import {store} from "@/store/store.js";
import Message from "@/components/UI/Message.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import {ref} from "vue";
import VueJwtDecode from "vue-jwt-decode"
import {useRoute} from "vue-router";
const newMessage = ref("");

const route = useRoute();
const recipient = route.params.username;
const send = async () => {
  try {
    const sender = VueJwtDecode.decode(localStorage.refresh_token).sub;

    const response = await axios.post('send', {
      "message": newMessage.value,
      "sender": sender,
      "recipient": recipient
    }, {});
    newMessage.value = "";
  } catch(e) {
    alert(e.response.data.message)
  }
}

</script>

<template>
  <h1>{{$route.params.username}}</h1>
<div class="chat">
      <message v-for="msg in store.state.messages" :key="msg.sentDate" :type="msg.type === 'sent' ? 'sent' : 'received'">
        <template v-slot:username>
          {{msg.sender}}
        </template>
        <template v-slot:date>
          {{msg.sentDate.slice(11,16)}}
        </template>
        <template v-slot:text>
          {{msg.message}}
        </template>
      </message>
</div>

  <form @submit.prevent>
    <div class="sendMessageForm">
      <my-input v-model="newMessage" style="margin-top: 15px" class="input" type="text" placeholder="Message" />
      <my-button style="margin-top: 15px; margin-left: 5px;" @click="send" >Send message</my-button>
    </div>
  </form>

</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
}
.sendMessageForm {
  display: flex;
}
</style>