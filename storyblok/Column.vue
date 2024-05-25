<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok" class="column">
    <div :class="[
      'column-content flex flex-col',
      {
        'gap-padding': blok.gap,
        'sticky top-navbar': blok.sticky
      }
    ]">
      <StoryblokComponent
        v-for="blok in blok.blocks"
        :key="blok._uid"
        :blok="blok"
      />
    </div>
  </div>
</template>
