<script setup>
useHead({ title: 'Newletter - Fira Trovam' })
useServerSeoMeta({
  robots: 'noindex'
})

const localePath = useLocalePath()
</script>

<template>
  <main class="newsletter">
    <div class="container padded">
      <p class="success pb-4">
        {{ $t('newsletter.success') }}
      </p>
      <p class="confirm pb-10">
        {{ $t('newsletter.confirm') }}
      </p>
      <ElementsButton :to="localePath('/')" color="blue">
        <template #icon-prepend>
          <Icon name="material-symbols:arrow-back" />
        </template>
        {{ $t('newsletter.back') }}
      </ElementsButton>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.newsletter {
  background-image: url(~/assets/images/bg-1.jpg);
  background-size: cover;
  min-height: 100vh;
  padding-top: var(--navbar-safest-area);
  display: flex;
  align-items: center;
}

.success {
  font-size: var(--text-4xl);
  max-width: 20ch;
  text-wrap: balance;
  line-height: 1;
}

.confirm {
  font-size: var(--text-lg);
  max-width: 40ch;
  text-wrap: balance;
  line-height: 1.25;
}
</style>