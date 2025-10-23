<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok" class="footer-logos">
    <h3>{{ blok.title }}</h3>
    <div class="footer-logos-assets">
      <NuxtImg
        v-for="logo in blok.logos"
        :key="logo.id"
        :src="logo.filename"
        :alt="logo.alt"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-logos {
  h3 {
    font-weight: bold;
    text-transform: uppercase;
    line-height: 1;
    margin-block-end: var(--spacer-2);
  }

  &-assets {
    display: flex;
    gap: var(--spacer-4);
    flex-wrap: wrap;

    img {
      height: 2rem;
      width: auto;
    }
  }
}

@include media('>md') {
  .footer-logos {
    max-width: 45%;
  }
}
</style>
