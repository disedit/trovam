<script setup>
defineProps({ blok: Object })
const { longDate } = useDate()
</script>

<template>
  <article v-editable="blok">
    <h2>{{ blok.title }}</h2>
    <p>{{ longDate(blok.date) }}</p>
  </article>
</template>
