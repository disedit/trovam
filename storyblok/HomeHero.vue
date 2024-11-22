<script setup>
const props = defineProps({ blok: Object })

const img = useImage()
const backgroundStyle = computed(() => {
  const imgUrl = img(props.blok.background_picture.filename, { width: 1000 })
  return { backgroundImage: `url('${imgUrl}')` }
})

const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 800)
</script>

<template>
  <section
    v-editable="blok"
    :class="['home-hero background-filter', { scrolled: scrolled && blok.animate }]"
    :style="backgroundStyle"
  >
    <div class="container">
      <div class="home-hero-text" v-html="blok.text" />
    </div>
    <ShapesArrows v-if="blok.arrows" class="arrows" />
  </section>
</template>

<style lang="scss" scoped>
.home-hero {
  position: relative;
  background: var(--black);
  min-height: 100vh;
  min-height: 100svh;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: var(--text-xl);
  font-family: var(--font-headline);
  padding: var(--site-padding);
  padding-block-start: var(--navbar-safest-area);

  &-text {
    transition: .5s ease;
  }

  .container {
    margin-block: auto;
    position: relative;
    z-index: 2;
  }

  .arrows {
    height: 5rem;
    color: var(--yellow);
    transition: .5s ease;
    animation: arrow 3s infinite;
  }

  &.scrolled {
    .arrows,
    .home-hero-text {
      opacity: 0;
      transform: translateY(-20%);
    }
  }
}

.background-filter::before {
  background-attachment: fixed;
}

@include media('<md') {
  .home-hero,
  .background-filter::before {
    background-attachment: scroll;
  }
}

@keyframes arrow {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>