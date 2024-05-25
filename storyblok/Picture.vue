<script setup>
defineProps({ blok: Object })
</script>

<template>
  <figure
    v-editable="blok"
    :class="['picture-component', { polaroid: blok.polaroid} ]"
  >
    <NuxtPicture
      format="avif,webp"
      :src="blok.picture?.filename"
      :img-attrs="{ alt: blok.picture?.alt || '' }"
      sizes="100vw sm:50vw md:400px"
    />
    <figcaption v-if="blok.caption || blok.polaroid">
      {{ blok.caption }}
    </figcaption>
  </figure>
</template>

<style lang="scss">
.picture-component {
  display: block;

  img {
    width: 100%;
  }

  &.polaroid {
    background: var(--white);
    padding: var(--spacer-4);
  }

  figcaption {
    display: flex;
    min-height: 4rem;
    align-items: flex-end;
  }
}
</style>
