<script setup>
const props = defineProps({ blok: Object })

const img = useImage()
const backgroundStyle = computed(() => {
  const imgUrl = img(props.blok.background_picture.filename, { width: 1000 })
  return { backgroundImage: `url('${imgUrl}')` }
})
</script>

<template>
  <section
    v-editable="blok"
    class="home-hero"
    :style="backgroundStyle"
  >
    <div class="home-hero-text" v-html="blok.text" />
  </section>
</template>

<style lang="scss" scoped>
.home-hero {
  background: var(--black);
  height: 100vh;
  height: 100svh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>