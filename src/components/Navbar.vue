<script setup>

import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode"
const model = defineModel();

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

</script>

<template>
  <div class="navbar">
    <div class="site_logo" @click="$router.push('/')">MyChat</div>
    <div class="navbar-btns">
      <my-button @click="checkRefresh" style="margin-right: 5px;">refresh</my-button>
      <my-button v-if="model === 'false'" @click="$router.push('/login');">Login</my-button>
      <my-button v-else v-model="model" @click="$router.push('/logout');">Logout</my-button>
      <my-button style="margin-left: 5px;" @click="$router.push('/registration')">Registration</my-button>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightcyan;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar-btns {
  margin-left: auto;
}
.site_logo {

}
.site_logo:hover {
  transform: scale(1.3);
  cursor: pointer;
  color: lightseagreen;
}
.site_logo:active {
  opacity: 0.6;
}
</style>