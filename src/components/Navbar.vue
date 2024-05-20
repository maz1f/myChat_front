<script setup>

import MyButton from "@/components/UI/MyButton.vue";
</script>

<template>
  <div class="navbar">
    <div class="site_logo" @click="$router.push('/')">MyChat</div>
    <div class="navbar-btns">
      <my-button @click="$router.push('/login')">Login</my-button>
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