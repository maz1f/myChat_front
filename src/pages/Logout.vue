<script setup>

import router from "@/router/router.js";
import MyButton from "@/components/UI/MyButton.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import axios from "axios";

const logout = async() => {
  try {
    const response = await axios.post('/customLogout', {
      "token": `${localStorage.refresh_token}`
    });
    console.log(response);
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.isAuth = false;
    localStorage.name = "Anonimus";
    console.log("Logout is complete");
    location.reload();
  } catch(e) {
    alert(e)
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