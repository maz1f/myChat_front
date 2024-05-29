<script setup>
defineProps({
  radio_id: String
})
</script>

<template>
  <div class="chatPreview">
    <input type="radio" name="radio" :id="radio_id">
    <label :for="radio_id"><slot></slot></label>
  </div>
</template>

<style scoped>
.chatPreview {
  width: 100%;
}
.chatPreview input[type=radio] {
  display: none;
}
.chatPreview label {
  font-size: 20px;
  text-align: center;
  width: 100%;
  display: inline-block;
  cursor: pointer;
  padding: 10px 40px;
  line-height: 34px;
  border: 1px solid #999;
  user-select: none;
}
/* Checked */
.chatPreview input[type=radio]:checked + label {
  background-color: lightblue;
}

/* Hover */
.chatPreview label:hover {
  color: #666;
}

/* Disabled */
.chatPreview input[type=radio]:disabled + label {
  background: #efefef;
  color: #666;
}
</style>