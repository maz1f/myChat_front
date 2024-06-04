<script setup>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode"
import {ref} from "vue";
import MyButton from "@/components/UI/MyButton.vue";

const name = ref(localStorage.name);

const checkRefresh = async() => {
    const token = localStorage.access_token;
    if(!token || VueJwtDecode.decode(token).exp < Date.now()/1000) {
      try {
        const response = await axios.post('http://localhost:5050/refreshToken', {
          "token": `${localStorage.refresh_token}`
        });
        localStorage.access_token = response.data.token;
        console.log("Token has been refreshed");
      } catch (e) {
        console.log(e);
      }
    }
}

const getChats = async() => {
  await checkRefresh();
  const chats = await axios.get('http://localhost:5050/getChats',
      {
        headers: {
          'Authorization': `Bearer ${localStorage.access_token}`
        }
      })
  console.log(chats.data.users);
  localStorage.users = chats.data.users;
}

</script>

<template>
<div>
  <h2>Hello, {{name}}</h2>
  <my-button @click="checkRefresh">refresh</my-button>
</div>
</template>

<style scoped>

</style>