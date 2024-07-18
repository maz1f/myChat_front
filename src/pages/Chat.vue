<script setup>

import {store} from "@/store/store.js";
import Message from "@/components/UI/Message.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import {computed, onMounted, ref, watch} from "vue";
import VueJwtDecode from "vue-jwt-decode"
import {onBeforeRouteUpdate, useRoute} from "vue-router";

const sendMessage = () => {
  if (newMessage.value.trim() !== "") {
    const sender = VueJwtDecode.decode(localStorage.refresh_token).sub;
    const message = {
      message: newMessage.value,
      sender: sender,
      recipient: recipient.value
    };
    store.state.stompClient.send("/app/send", JSON.stringify(message), {});
    newMessage.value = "";
  }
};
//

const messages = computed(() => {
  return store.state.messages;
});

var scrollDiv = null;

const changeScroll = () => {
  scrollDiv.scrollTo(0, scrollDiv.scrollHeight);
}

onMounted(() => {
  scrollDiv = document.getElementById("chat");
  changeScroll();
})


watch(messages, (oldValue, newValue) => {
  setTimeout(() => {
    changeScroll();
  }, 100);
})


const newMessage = ref("");

const route = useRoute();
const recipient = ref(route.params.username);

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.username !== from.params.username) {
    recipient.value = to.params.username;
  }
  changeScroll();
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