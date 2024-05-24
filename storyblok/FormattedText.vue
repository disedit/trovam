<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    class="formatted-text"
  >
    <UtilsRichText :content="blok.content" />
  </div>
</template>
