<script setup>
defineProps({ blok: Object })
const { tr } = useTranslated()
</script>

<template>
  <div
    v-editable="blok"
    class="embed"
    v-html="tr(blok, 'html')"
  />
  <div
    v-if="blok.styles"
    v-html="blok.styles"
  />
</template>

