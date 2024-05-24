<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const renderedContent = computed(() => {
  return renderRichText(props.content)
})
</script>

<template>
  <div v-html="renderedContent" class="rich-text-rendered" />
</template>
