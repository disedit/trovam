<script setup>
/* Load nav items */
const settings = await useSettings()
</script>

<template>
  <footer class="footer">
    <a href="sd">Test</a>
    <div class="container padded">
      <div class="footer-org"></div>
      <div class="footer-sponsors">
        <img src="@/assets/images/sponsors.png" />
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  height: 100vh;

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--site-padding);
  }

  &-sponsors {
    img {
      width: 100%;
    }
  }
}
</style>