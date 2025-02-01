<script setup>
import { Vue3Marquee } from 'vue3-marquee'

const props = defineProps({ blok: Object })

const { internalLink } = useLinks()
const wrapperComponent = computed(() => {
  return props.blok?.link?.cached_url ? resolveComponent('NuxtLink') : 'section'
})

const img = useImage()
const backgroundStyle = computed(() => {
  const imgUrl = img(props.blok.background_picture.filename, { width: 1000 })
  return { backgroundImage: `url('${imgUrl}')` }
})

const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 800)
</script>

<template>
  <Component
    :is="wrapperComponent"
    :to="internalLink(blok.link.cached_url)"
    v-editable="blok"
    :class="['home-hero', {
      scrolled: scrolled && blok.animate,
      'background-filter': blok.background_filter
    }]"
    :style="backgroundStyle"
  >
    <div class="container">
      <div class="home-hero-text" v-html="blok.text" />
    </div>
    <ShapesArrows v-if="blok.arrows" class="arrows" />
    <Vue3Marquee v-if="blok.marquee" clone class="home-hero-marquee">
      <span class="mx-10">{{ blok.marquee }}</span>
    </Vue3Marquee>
  </Component>
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
  color: var(--white);

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

  &-marquee {
    font-family: var(--font-heavy);
    font-size: var(--text-md);
    margin-inline: calc(var(--site-padding) * -1);
    margin-top: 1rem;
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