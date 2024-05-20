<script setup>
 const model = defineModel()
 const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input :value="model"
         @input="emit('update:modelValue', $event.target.value)"
         class="input"
         type="text">
</template>

<style scoped>
.input {
  width:100%;
  border: 1px solid teal;
  padding: 10px 15px;
}
</style>