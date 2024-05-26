<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok" class="footer-logos">
    <h3>{{ blok.title }}</h3>
    <div class="footer-logos-assets">
      <img
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
    gap: var(--spacer-2);
    flex-wrap: wrap;

    img {
      height: 100%;
      max-height: 3rem;
      max-width: 100%;
      object-fit: contain;
    }
  }
}

@include media('>md') {
  .footer-logos {
    max-width: 45%;
  }
}
</style>
