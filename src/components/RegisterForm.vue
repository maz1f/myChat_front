<script setup>
import {ref} from "vue";

const username = ref('')
const email = ref('')
const password = ref('')

const addUser = async () => {
  try {
    const response = await axios.post('http://localhost:5050/', {
      "username": username.value,
      "email": email.value,
      "password": password.value
    });
    alert(response.data)
  } catch(e) {
    alert(e)
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
    <my-input style="margin-top: 15px;" v-model="email" class="input" type="text" placeholder="Email" />
    <my-input style="margin-top: 15px;" v-model="password" class="input" type="password" placeholder="Password" />
    <my-button style="margin-top: 15px;" @click="addUser">Register</my-button>
  </form>
  </my-dialog>
</template>

<style scoped>
</style>