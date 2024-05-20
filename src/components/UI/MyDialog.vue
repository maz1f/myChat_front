<script setup>

</script>

<template>
  <div class="dialog" @click="$router.push('/')">
    <div @click.stop class="dialog_content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.dialog_content {
  margin: auto;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
}
</style>