<script setup>
const props = defineProps({ blok: Object })

const img = useImage()
const backgroundStyle = computed(() => {
  if (!props.blok.background.filename) return false
  const imgUrl = img(props.blok.background.filename, { width: 1500 })
  return { backgroundImage: `url('${imgUrl}')` }
})
</script>

<template>
  <div
    v-editable="blok"
    class="page"
    :style="backgroundStyle"
  >
    <div class="relative z-10">
      <StoryblokComponent
        v-for="blok in blok.body"
        :key="blok._uid"
        :blok="blok" />
    </div>
    <div class="background-overlay" v-if="blok.background_overlay" />
  </div>
</template>

<style lang="scss" scoped>
.page {
  position: relative;
  background-size: cover;
  background-attachment: fixed;
  padding-block-end: var(--spacer-20);
}

.background-overlay {
  background: rgba($black, .5);
  position: absolute;
  inset: 0;
}
</style>