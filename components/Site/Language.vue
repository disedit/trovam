<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const abbrs = {
  ca: 'VAL',
  es: 'CAS',
  en: 'ENG'
}
</script>

<template>
  <div class="language-switcher">
    <button class="language-button" aria-description="Selecciona idioma / Select your language">
      <span>{{ abbrs[$i18n.locale] }}</span>
      <Icon name="ic:outline-keyboard-arrow-down" />
    </button>
    <ul class="language-options" aria-label="Idiomes / Languages">
      <li v-for="lang in locales" :key="lang.code">
        <NuxtLink
          :to="switchLocalePath(lang.code)"
          :class="{ 'active': locale === lang.code }"
        >
          {{ lang.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.language {
  &-switcher {
    color: var(--white);
    position: relative;

    &:hover,
    &:focus-within {
      .language-button {
        background: var(--white);
        color: var(--black);
      }

      .language-options {
        visibility: visible;
        transition-delay: 0s;
        transform: translateY(0) scaleY(1);
        z-index: 10001;
      }
    }
  }

  &-button {
    appearance: none;
    color: inherit;
    display: flex;
    gap: var(--spacer-2);
    align-items: center;
    padding: .5em;

    span {
      transform: translateY(.1em);
    }
  }

  &-options {
    position: absolute;
    visibility: hidden;
    right: 0;
    top: 2em;
    transition: visibility 0s linear .2s, transform .2s ease;
    transform: translateY(0) scaleY(0);
    transform-origin: 0 0;
    will-change: visibility, opacity, transform;
    z-index: 10001;
    background: var(--white);
    margin: 0;
    padding: 0;
    list-style: none;
    font-weight: bold;
    
    a {
      display: block;
      color: var(--black);
      padding: .5em;
      text-decoration: none;

      &:hover,
      &:focus-visible {
        background: var(--yellow);
      }

      &:active {
        background: var(--black);
        color: var(--yellow);
      }
    }
  }
}
</style>