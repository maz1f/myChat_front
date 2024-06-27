<script setup>

import {store} from "@/store/store.js";
import Message from "@/components/UI/Message.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import {ref} from "vue";
import VueJwtDecode from "vue-jwt-decode"

const newMessage = ref("");

const send = async () => {
  try {
    const sender = VueJwtDecode.decode(localStorage.access_token).sub;

    const response = await axios.post('send', {
      "message": newMessage.value,
      "sender": sender,
      "recipient": "user"
    }, {});
    const currentDate = new Date().toJSON();
    const message = {
      "message": newMessage.value,
      "sender": sender,
      "recipient": "user",
      "sentDate": currentDate
    }
    await store.dispatch('addSentMessage', message);
    newMessage.value = "";
  } catch(e) {
    alert(e.response.data.message)
  }
}

</script>

<template>
<div class="chat">
  <div class="sentMessages">
    <div v-for="msg in store.state.sentMessages" :key="msg.sentDate">
      <message style="background-color: lightblue">
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
  </div>

  <div class="receivedMessages">
    <div v-for="msg in store.state.receivedMessages" :key="msg.sentDate">
      <message style="background-color: pink">
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
  </div>
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
}
.sendMessageForm {
  display: flex;
}
</style>