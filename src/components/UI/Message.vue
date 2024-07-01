<script setup>
defineProps({
  type: String
})
</script>

<template>
  <div class="msg" :class="type">
    <div class="message_data">
      <div class="username">
        <slot name="username"></slot>
      </div>
      <div class="date">
        <slot name="date"></slot>
      </div>
    </div>
    <div class="message_text">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<style scoped>
.msg {
  border: 1px solid black ;
  border-radius: 10px;
  display: flex;
  justify-content:space-between;
  margin: 5px 0;
}
.username {
  font-size: 15px;
  color: grey;
  margin: 1px 0 5px 3px;
}
.message_text {
  font-size: 20px;
  text-align: center;
  justify-self: center;
  width: 100%;
  margin: auto;
  padding: 0 20px

}
.date {
  font-size: 12px;
  margin-left: 3px;
  margin-bottom: 2px;
}
.sent {
  align-self: flex-end;
  background-color: aliceblue;
}
.received {
  align-self: flex-start;
  background-color: whitesmoke;
}
</style>