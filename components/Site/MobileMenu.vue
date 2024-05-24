<script setup>
import * as focusTrap from 'focus-trap'

defineProps({
  items: {
    type: Array,
    required: true
  },
  socials: {
    type: Array,
    required: true
  },
})

const { internalLink } = useLinks()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

/* Menu toggler */
const menuOpen = ref(false)
const menu = ref()
let trap

const showMenu = () => {
  menuOpen.value = true
  document.documentElement.classList.add('overflow-hidden')
  trap = focusTrap.createFocusTrap(menu.value)
  trap.activate()
}
const hideMenu = () => {
  menuOpen.value = false
  document.documentElement.classList.remove('overflow-hidden')
  trap && trap.deactivate()
}

function toggleMenu () {
  if (menuOpen.value) {
    hideMenu()
  } else {
    showMenu()
  }
}

/* Menu animations */
const { $gsap } = useNuxtApp()
let timeline

function beforeEnter(el) {
  $gsap.set(el, { opacity: 0 })
}

function onEnter(el, done) {
  $gsap.set('.menu-drawer .animate', { y: '105%' })
  timeline = $gsap.timeline()

  timeline.to(el, {
    opacity: 1,
    duration: .5,
    ease: 'power4.out',
  }).to('.menu-drawer .animate', {
    y: 0,
    duration: .25,
    ease: 'power4.out',
    stagger: .1,
    onComplete: done
  }, "-=.5s")
}

function onLeave (el, done) {
  timeline = $gsap.timeline()
  timeline.to('.menu-drawer .animate', {
    y: '105%',
    duration: .25,
    stagger: {
      amount: .25,
      from: 'end'
    },
  }).to(el, {
    opacity: 0,
    duration: .5,
    ease: 'power4.in',
    onComplete: done
  }, "-=.25s")
}

function onEnterCancelled() {
  timeline && timeline.kill()
}

function onLeaveCancelled() {
  timeline && timeline.kill()
}
</script>

<template>
  <div ref="menu" class="mobile-menu">
    <button
      class="menu-burger"
      @click="toggleMenu"
      :aria-label="menuOpen ? $t('assist.close_menu') : $t('assist.open_menu')"
      aria-controls="mainMobileNav"
      :aria-expanded="menuOpen ? 'true' : 'false'"
    >
      <ShapesMenu :close="menuOpen" class="icon" />
    </button>

    <Transition
      @before-enter="beforeEnter"
      @enter="onEnter"
      @enter-cancelled="onEnterCancelled"
      @leave="onLeave"
      @leave-cancelled="onLeaveCancelled"
    >
      <div
        v-if="menuOpen"
        id="mainMobileNav"
        class="menu-drawer"
      >
        <div class="overflow-clip">
          <ul class="language-options animate" aria-label="Idiomes / Languages">
            <li v-for="lang in locales" :key="lang.code">
              <NuxtLink
                :to="switchLocalePath(lang.code)"
                :class="{ 'active': locale === lang.code }"
                @click="hideMenu"
              >
                {{ lang.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <ul class="menu-items" :aria-label="$t('assist.main_menu')">
          <li
            v-for="item in items"
            :key="item._uid"
            :class="['menu-item', `color-${item.shape_color}`]"
          >
            <NuxtLink
              :to="item.component === 'Submenu' ? internalLink(item.index?.story?.full_slug) : internalLink(item.link?.story?.full_slug)"
              class="menu-link"
              @click="hideMenu"
            >
              <div class="animate font-headline">
                <ShapesGate :shape="item.shape" />
                <span class="compensate">{{ item.label }}</span>
              </div>
            </NuxtLink>
          </li>
        </ul>
        <div class="overflow-clip">
          <SiteSocials :socials="socials" class="menu-socials animate" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  &-burger {
    position: relative;
    z-index: 10000;

    .icon {
      height: 1em;
      width: 1em;
    }
  }

  &-drawer {
    position: fixed;
    inset: 0;
    background: rgba($black, .75);
    z-index: 9000;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding-top: var(--navbar-safe-area);
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: var(--spacer-4);
  }

  &-link {
    display: block;
    color: var(--black);
    overflow: clip;
    font-size: var(--text-xl);

    .animate {
      display: flex;
      background: var(--color);
      align-items: center;
      gap: var(--site-padding);
      padding: .2em var(--site-padding);
      border-bottom: 3px var(--black) solid;
    }

    svg {
      height: 1.25em;
    }

    span {
      text-transform: uppercase;
    }

    &:focus-visible {
      outline: 0;

      .animate {
        background: var(--black);
        color: var(--color);
        box-shadow: inset 0 0 0 5px var(--color);
      }

      span {
        text-decoration: underline;
      }
    }
  }

  &-item:first-child .animate {
    border-top: 3px var(--black) solid;
  }

  &-socials {
    justify-content: space-evenly;
  }
}

.language-options {
  display: flex;
  align-items: center;
  gap: var(--spacer-4);
  padding: var(--site-padding);
  justify-content: space-evenly;

  a {
    color: var(--white);
    font-weight: bold;
    font-size: var(--text-md);

    &.active {
      text-decoration: underline;
      color: var(--yellow);
    }
  }
}
</style>