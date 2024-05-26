<script setup>
const props = defineProps({ blok: Object })
</script>

<template>
  <section v-editable="blok" class="home-funding p-site" :aria-labelledby="`title-${blok._uid}`">
    <div class="container padded">
      <h2 :id="`title-${blok._uid}`" class="visually-hidden">
        {{ blok.title }}
      </h2>
      <div class="grid gap-8">
        <div
          v-for="block in blok.blocks"
          :key="blok._uid"
        >
          <img
            :src="block.logos[0].filename"
            :alt="block.logos[0].alt"
          />
          <p class="text-sm">{{ block.title }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.home-funding {
  .container {
    border: 2px var(--white) solid;

    img {
      height: 3rem;
      margin-block-end: var(--spacer-4);
    }

    p {
      line-height: 1;
    }
  }

  @include media('>md') {
    .grid {
      grid-template-columns: 2fr 1fr 1fr;
    }
  }
}
</style>