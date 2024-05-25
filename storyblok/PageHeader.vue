<script setup>
const props = defineProps({ blok: Object })

const img = useImage()
const backgroundStyle = computed(() => {
  if (!props.blok.background?.filename) return false
  const imgUrl = img(props.blok.background.filename, { width: 1500 })
  return { backgroundImage: `url('${imgUrl}')` }
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
      { 'container-sm': blok.small_container }
    ]">
      <h1 class="headline">
        <span :class="['headline-inner', { 'pill p-4': blok.pill }]">
          <ShapesGate v-if="blok.shape" :shape="blok.shape" class="icon" />
          <span class="headline-text compensate">{{ blok.title }}</span>
        </span>
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
    top: .4em;
    z-index: 5;
    margin-block-end: -.2em;
    line-height: 1;

    .headline-inner {
      display: inline-flex;
      gap: .25em;
      align-items: center;
    }

    .icon {
      height: 1em;
      width: 1em;
      color: var(--color);
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
}

@include media('<md') {
  .page-header {
    h1 {
      font-size: var(--text-3xl);
    }
  }
}
</style>