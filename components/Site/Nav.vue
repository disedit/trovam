<script setup>
const settings = useState('settings')
const localePath = useLocalePath()
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 100)
const route = useRoute()
const compact = computed(() => !!route.params?.slug && !route.params?.slug[0]?.includes('home'))
</script>

<template>
  <nav :class="['nav', { scrolled, compact: scrolled || compact, 'gradient-nav': settings.data.story.content.gradient_nav }]">
    <NuxtLink :to="localePath('/')" class="nav-logo" :aria-label="$t('assist.logo')">
      <SiteLogo />
    </NuxtLink>
    <SiteMenu
      class="nav-menu hidden lg:flex"
      :items="settings.data.story.content.nav"
    />
    <SiteLanguage class="nav-langs hidden lg:flex" />
    <SiteMobileMenu
      class="nav-mobile lg:hidden ms-auto"
      :items="settings.data.story.content.nav"
      :socials="settings.data.story.content.social_networks"
    />
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
  padding: var(--spacer-4) var(--site-padding);
  gap: var(--site-padding);
  --nav-height: 5.75vw;
  font-size: var(--nav-height);
  transition: .25s ease;

  &-logo {
    position: relative;
    z-index: 10000;
    color: var(--white);
    flex-shrink: 0;

    svg, img {
      display: block;
      height: 1em;
      width: auto;
    }
  }

  &-langs {
    align-self: flex-start;
    margin-inline-start: auto;
    font-size: var(--text-base);
    z-index: 9000;
  }

  &-menu {
    z-index: 9000;
  }

  &.compact {
    --nav-height: 2.5rem;
  }

  &.scrolled {
    &:not(.gradient-nav) {
      background: var(--navbar-color, var(--black));
    }

    &.gradient-nav::after {
      opacity: 1;
    }
  }

  &.gradient-nav::after {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to bottom, rgba($black, 1), rgba($black, 0));
    pointer-events: none;
    z-index: 8000;
    height: 15rem;
    opacity: 0;
    transition: 1s ease;
  }
}

@include media('<lg') {
  .nav {
    --nav-height: 2rem;
    height: 4rem;

    &.compact {
      --nav-height: 2rem;
    }

    &.gradient-nav::after {
      opacity: 1;
    }
  }
}
</style>