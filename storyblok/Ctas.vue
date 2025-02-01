<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    :class="['ctas flex flex-wrap gap-2', `color-${blok.color}`, `text-${blok.size}`, `align-${blok.align}`]"
  >
    <StoryblokComponent
      v-for="blok in blok.ctas"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<style lang="scss" scoped>
.ctas.color-black {
  color: var(--white);
}

.align-start {
  justify-content: flex-start;
}

.align-center {
  justify-content: center;
}

.align-end {
  justify-content: flex-end;
}
</style>