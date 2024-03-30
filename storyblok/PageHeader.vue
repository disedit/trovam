<script setup>
const props = defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    class="page-header"
  >
    <h1>{{ blok.title }}</h1>
    <pre>{{ blok }}</pre>
  </section>
</template>

<style lang="scss" scoped>
.page-header {
  background: teal;
}
</style>