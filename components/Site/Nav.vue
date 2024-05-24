<script setup>
const localePath = useLocalePath()
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 100)
</script>

<template>
  <nav :class="['nav', { scrolled }]">
    <NuxtLink :to="localePath('/')" class="nav-logo">
      <SiteLogo />
    </NuxtLink>
    <SiteMenu class="nav-menu" :scrolled="scrolled" />
    <SiteLanguage class="nav-langs" />
    <SiteMobileMenu class="nav-mobile" />
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  padding: var(--site-padding);
  gap: var(--site-padding);
  --nav-height: 5.75vw;
  font-size: var(--nav-height);
  transition: .25s ease;

  &-logo {
    color: var(--white);

    svg {
      display: block;
      height: 1em;
      width: auto;
    }
  }

  &-langs {
    align-self: flex-start;
    margin-inline-start: auto;
    font-size: var(--text-base);
  }

  &.scrolled {
    background: var(--black);
    --nav-height: 2.5rem;
  }

  &-mobile {
    display: none;
  }
}

@include media('<lg') {
  .nav {
    --nav-height: 2rem;

    &-mobile {
      display: block;
    }

    &-menu,
    &-langs {
      display: none;
    }

    &.scrolled {
      --nav-height: 2rem;
    }
  }
}
</style>