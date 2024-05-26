<script setup>
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
        <template v-for="link in head.link" :key="link.id">
          <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
        </template>
      </Head>
    </Html>
    <NuxtLoadingIndicator :color="false" />
    <SiteNav />
    <main class="page">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style lang="scss">
.page {
  min-height: 100vh;
  min-height: 100svh;
}

.nuxt-loading-indicator {
  background: var(--yellow);
  top: 0;
}
</style>