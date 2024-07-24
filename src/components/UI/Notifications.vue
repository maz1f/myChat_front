<script setup>

import {store} from "@/store/store.js";

const close = () => {
  store.state.notificationsCollapse.hide();
}
</script>

<template>
  <div class="collapse collapse-horizontal notifications" id="notifications">
    <div class="card card-body" style="width: 25vw;">
      <button type="button" class="btn-close close-notification" @click="close"></button>
      <p>{{store.state.lastNotifications}}</p>
    </div>
  </div>
</template>

<style scoped>
.notifications {
  position: fixed;
  bottom: 2vh;
  right: 5vh;
  font-size: 1vw;
  text-align: center;
}
.close-notification {
  align-self: flex-end;
  font-size: 0.7vw;
}
</style>