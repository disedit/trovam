
<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok" class="table">
    <pre>{{ blok }}</pre>
  </div>
</template>

<style lang="scss" scoped>
.table {
  background: red;
}
</style>
