<template>
  <div>
    <SiteNav />
    <main class="error-page">
      <h1>Error 404</h1>
    </main>
    <SiteFooter />
  </div>
</template>

<style lang="scss">
.error-page {
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  place-items: center;

  h1 {
    font-weight: bold;
    font-size: var(--text-4xl);
  }
}
</style>