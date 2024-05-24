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
  }

  &-assets {
    display: flex;
    gap: var(--spacer-2);

    img {
      height: 3rem;
      max-width: 100%;
      object-fit: contain;
    }
  }
}
</style>
