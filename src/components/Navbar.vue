<script setup>

import MyButton from "@/components/UI/MyButton.vue";
import router from "@/router/router.js";
const model = defineModel();

const clickLogo = () => {

  router.push('/');
}

</script>

<template>
  <div class="navbar">
    <div class="site_logo" @click="clickLogo">MyChat</div>
    <div class="navbar-btns">
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