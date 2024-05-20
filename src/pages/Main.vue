<script setup>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode"

import MyButton from "@/components/UI/MyButton.vue";
import {ref} from "vue";

const name = ref("Anonymous");

const getName = async() => {
  try {
    const response = await axios.get('http://localhost:5050/getName', {
      headers: {
        'authorization': `Bearer ${localStorage.access_token}`
      }
    });
    name.value = response.data;
  } catch (e) {
    alert(e.message);
  }
}

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

const showName = async() => {
  await checkRefresh();
  await getName();
}

</script>

<template>
<div>
  <h2>Hello, {{name}}</h2>
  <my-button style="margin-top: 15px;" @click="showName">Get My Name</my-button>

</div>
</template>

<style scoped>

</style>