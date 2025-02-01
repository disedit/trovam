<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})

const { internalLink } = useLinks()

const hovering = ref(null)
const gracePeriod = ref(false)

function toggleHover (id) {
  if (hovering.value === id) {
    hovering.value = null
  } else {
    hovering.value = id
  }
}

function hover(id) {
  if (!gracePeriod.value) {
    hovering.value = id
  }
}

function unhover() {
  hovering.value = null
  gracePeriod.value = true
  setTimeout(() => {
    gracePeriod.value = false
  }, 1000)
}
</script>

<template>
  <ul class="menu" :aria-label="$t('assist.main_menu')">
    <li
      v-for="(item, i) in items"
      :key="item._uid"
      :class="['menu-item', `color-${item.shape_color}`, { open: hovering === item._uid}]"
      :style="{ '--index': i }"
      @mouseenter="hover(item._uid)"
      @mouseleave="hovering = null"
    >
      <a
        v-if="item.component === 'Submenu'"
        :href="internalLink(item.index?.story?.full_slug)"
        :aria-expanded="hovering === item._uid ? 'true' : 'false'"
        class="menu-link"
        @click.prevent="toggleHover(item._uid)"
      >
        <ShapesGate :shape="item.shape" />
        <span>{{ item.label }}</span>
      </a>
      <NuxtLink
        v-else
        :to="internalLink(item.link?.story?.full_slug)"
        class="menu-link">
        <ShapesGate :shape="item.shape" />
        <span>{{ item.label }}</span>
      </NuxtLink>

      <ul v-if="item.items?.length > 0" class="submenu">
        <li v-for="subitem in item.items" :key="subitem._uid" class="submenu-item">
          <NuxtLink
            :to="internalLink(subitem.link?.story?.full_slug)"
            class="submenu-link"
            @click="unhover"
          >
            {{ subitem.label }}
          </NuxtLink>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.menu {
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 17em;
  column-gap: .25em;
  height: 1em;
  transition: opacity .1s ease;

  &-item {
    position: relative;
    font-size: .5em;
    display: flex;
    align-items: center;
    line-height: 1;
    margin: -.1em;
    padding: 0;

    &:last-child {
      font-style: italic;
    }

    &.open {
      z-index: calc(11000 - var(--index));

      .menu-link {
        background-color: var(--color);
        color: var(--black);

        svg {
          color: var(--black);
        }
      }

      .submenu {
        visibility: visible;
        transition-delay: 0s;
        transform: translateY(0) scaleY(1);
        z-index: 10001;
      }
    }
  }

  &-link {
    display: flex;
    gap: .15em;
    text-decoration: none;
    color: var(--white);
    font-family: var(--font-headline);
    text-transform: uppercase;
    font-size: 1.1em;
    padding: .1em;
    transition: outline .25s ease, outline-offset .25s ease;

    svg {
      color: var(--color);
      height: .9em;
      flex-shrink: 0;
    }

    span {
      transform: translateY(.1em)
    }
  }
}

.submenu {
  visibility: hidden;
  position: absolute;
  background: var(--color);
  top: 1.75em;
  left: 0;
  padding: .1em;
  list-style: none;
  transition: visibility 0s linear .2s, transform .2s ease;
  transform: translateY(0) scaleY(0);
  transform-origin: 0 0;
  will-change: visibility, opacity, transform;
  z-index: calc(11000 - var(--index));
  min-width: 300px;

  &-link {
    display: block;
    color: var(--black);
    text-decoration: none;
    padding: .35em .25em .15em .25em;

    &:hover,
    &:focus-visible {
      background: var(--white);
      color: var(--black);
    }

    &:active {
      background: var(--black);
      color: var(--white);
    }
  }

  &-item:not(:last-child) .submenu-link {
    border-bottom: 2px var(--black) solid;
  }
}

.compact {
  .menu {
    max-width: 100%;

    &-item {
      font-size: 1.5rem;
    }

    .submenu {
      top: 1.5em;
      min-width: 200px;
    }
  }
}

@include media('<xl') {  
  .compact {
    .menu {
      &-item {
        font-size: 1.2rem;
      }
    }
  }
}
</style>