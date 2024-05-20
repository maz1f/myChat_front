<script setup>
import {ref} from "vue";


const username = ref('')
const password = ref('')

const login = async () => {
  try {
    const response = await axios.post('http://localhost:5050/login', {
      "username": username.value,
      "password": password.value
    });
    localStorage.access_token = response.data.token;
    localStorage.refresh_token = response.data.refreshToken;
    console.log(`${localStorage.access_token} \n ${localStorage.refresh_token}`)
  } catch(e) {
    alert(e.response.data.message)
  }
}

import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import axios from "axios";
</script>

<template>
  <my-dialog>
      <form @submit.prevent>
        <my-input v-model="username" class="input" type="text" placeholder="Username" />
        <my-input style="margin-top: 15px;" v-model="password" class="input" type="password" placeholder="Password" />
        <my-button style="margin-top: 15px;" @click="login" >Login</my-button>
      </form>
  </my-dialog>
</template>

<style scoped>

</style>