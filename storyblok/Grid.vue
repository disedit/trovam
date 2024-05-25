<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    :class="[
      'grid gap-padding',
      {
        'grid-cols-1': blok.columns_sm === '1',
        'grid-cols-2': blok.columns_sm === '2',
        'md:grid-cols-1': blok.columns_md === '1',
        'md:grid-cols-2': blok.columns_md === '2',
        'md:grid-cols-3': blok.columns_md === '3',
        'lg:grid-cols-1': blok.columns_lg === '1',
        'lg:grid-cols-2': blok.columns_lg === '2',
        'lg:grid-cols-3': blok.columns_lg === '3',
        'lg:grid-cols-4': blok.columns_lg === '4'
      }
    ]"
    :style="{
      '--template-lg': blok.template_lg,
      '--template-md': blok.template_md,
      '--template-sm': blok.template_sm
    }"
  >
    <StoryblokComponent
      v-for="blok in blok.blocks"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<style lang="scss" scoped>
.grid {
  grid-template-columns: var(--template-sm);
}

@include media('>=md') {
  .grid {
    grid-template-columns: var(--template-md);
  }
}

@include media('>=lg') {
  .grid {
    grid-template-columns: var(--template-lg);
  }
}
</style>