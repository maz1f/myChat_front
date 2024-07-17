<script setup>

import {store} from "@/store/store.js";
import Message from "@/components/UI/Message.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import {onMounted, onUnmounted, ref} from "vue";
import VueJwtDecode from "vue-jwt-decode"
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

// websocket

let stompClient = null;

const connect = () => {
  const socket = new SockJS("http://localhost:5050/ws");
  stompClient = Stomp.over(socket);
  stompClient.connect(
      {
        Authorization: `Bearer ${localStorage.access_token}`
      },
      frame => {
        stompClient.subscribe(`/topic/${localStorage.name}/messages`, onMessageReceived)
      },error => {
        console.log(error);
      }
  );

};


const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect()
  }
  console.log("Disconnected")
}

const onMessageReceived = async (msg) => {
  const response = JSON.parse(msg.body);
  await store.dispatch('setMessages', response.messages);
  changeScroll();
};

const checkHeight = () => {
  console.log(`scrollDiv: ${scrollDiv.scrollHeight}`);
}

const sendMessage = () => {
  if (newMessage.value.trim() !== "") {
    const sender = VueJwtDecode.decode(localStorage.refresh_token).sub;
    const message = {
      message: newMessage.value,
      sender: sender,
      recipient: recipient.value
    };
    stompClient.send("/app/send", JSON.stringify(message), {});
    newMessage.value = "";
  }
};

//

var scrollDiv = null;

const changeScroll = () => {
  scrollDiv.scrollTo(0, scrollDiv.scrollHeight);
}

onMounted(() => {
  scrollDiv = document.getElementById("chat");
  changeScroll();
  connect();
})

onUnmounted(() => {
  disconnect();
})

const newMessage = ref("");

const route = useRoute();
const recipient = ref(route.params.username);

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.username !== from.params.username) {
    recipient.value = to.params.username;
  }
})

</script>

<template>
<div class="chat" id="chat">
      <message v-for="msg in store.state.messages" :key="msg.id" :type="msg.type === 'sent' ? 'sent' : 'received'">
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
      <my-button style="margin-top: 15px; margin-left: 5px;" @click="sendMessage" >Send message</my-button>
    </div>
  </form>

  <div>
    <my-button @click="checkHeight">Check</my-button>
  </div>

</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 75vh;
  overflow-y: auto;
}
.sendMessageForm {
  display: flex;
  height: 10vh;
}
</style>