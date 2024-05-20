<script setup>
</script>

<template>
  <button class="myButton">
    <slot></slot>
  </button>
</template>

<style scoped>
.myButton {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  border-radius: 5px;
}
.myButton:hover {
  border: 1px solid lightseagreen;
  background-color: whitesmoke;
  cursor: pointer;
}
.myButton:active {
  opacity: 0.85;
}
</style>