<script setup>
const props = defineProps({ blok: Object })

const img = useImage()
const backgroundStyle = computed(() => {
  if (!props.blok.background?.filename) return false
  const imgUrl = img(props.blok.background.filename, { width: 1500 })
  return { backgroundImage: `url('${imgUrl}')` }
})

const tag = computed(() => {
  return props.blok.link ? resolveComponent('NuxtLink') : 'span'
})
</script>

<template>
  <header
    v-editable="blok"
    class="page-header"
  >
    <div :class="[
      'container padded navbar-safest-area',
      `color-${blok.color}`,
      {
        'container-sm': blok.small_container,
        'has-background': !!blok.background?.filename
      }
    ]">
      <h1 class="hyphens-auto">
        <Component
          :is="tag"
          :class="['headline-inner', { 'pill p-4': blok.pill }]"
          :to="blok.link"
        >
          <ShapesGate v-if="blok.shape" :shape="blok.shape" class="icon" />
          <span class="headline-text compensate">{{ blok.title }}</span>
        </Component>
      </h1>
    </div>
    <div
      v-if="backgroundStyle"
      class="background absolute inset-0"
      :style="backgroundStyle"
    />
  </header>
</template>

<style lang="scss" scoped>
.page-header {
  position: relative;
  display: flex;
  min-height: 50vh;
  max-height: 500px;
  align-items: flex-end;

  h1 {
    position: relative;
    font-size: var(--text-4xl);
    font-family: var(--font-heavy);
    top: .2em;
    z-index: 5;
    margin-block-end: -.2em;
    line-height: 1;

    a {
      color: inherit;

      &:hover {
        background: var(--color);
        color: var(--black);

        svg {
          color: var(--black);
        }
      }
    }

    .headline-inner {
      display: inline-flex;
      gap: .25em;
      align-items: center;
    }

    .icon {
      height: 1em;
      width: 1em;
      color: var(--color);
      flex-shrink: 0;
    }

    .pill {
      background: var(--color);
      color: var(--black);

      .icon {
        color: inherit;
      }
    }
  }

  .background {
    inset: 0;
    opacity: .5;
    z-index: 1;
    background-size: cover;
  }

  .has-background {
    h1 {
      margin-block-end: 0;
    }
  }
}

@include media('<md') {
  .page-header {
    h1 {
      font-size: var(--text-3xl);
    }
  }
}
</style>