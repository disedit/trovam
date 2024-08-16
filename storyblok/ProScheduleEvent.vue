<script setup>
const props = defineProps({
  blok: Object,
  stages: Object
})
</script>

<template>
  <LegosEvent :event="blok" :stages="stages" />
</template>
