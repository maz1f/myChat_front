<script setup>
import {ref} from "vue";
const name = ref(localStorage.name);

</script>

<template>
<div>
  <h2>Hello, {{name}}</h2>
</div>
</template>

<style scoped>

</style>