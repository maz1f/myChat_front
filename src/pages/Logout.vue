<script setup>

import axios from "axios";
import router from "@/router/router.js";
import MyButton from "@/components/UI/MyButton.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import {onUpdated} from "vue";

const logout = async() => {
  try {
    /*const response = await axios.post('http://localhost:5050/logout', {
      "token": `${localStorage.refresh_token}`
    });*/
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.isAuth = "false";
    console.log("Logout is complete");
  } catch(e) {
    alert(e.response.data.message)
  }
  await router.push('/');
}

</script>

<template>
  <my-dialog>
    <form @submit.prevent style="text-align: center;">
      <h2 style="text-align: center;">Confirm action</h2>
      <my-button style="margin-top: 15px" @click="logout" >Logout</my-button>
    </form>
  </my-dialog>
</template>

<style scoped>

</style>