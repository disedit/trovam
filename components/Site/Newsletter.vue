<script setup>
const props = defineProps({
  home: { type: Boolean, default: false }
})

const route = useRoute()
const isHome = computed(() => {
  return ['/', '/en', '/es'].includes(route.path) && !props.home
})
</script>

<template>
  <div class="newsletter" aria-labelledby="newsletterHeader" v-if="!isHome">
    <form action="https://acumbamail.com/newform/subscribe/4OxtEEboWyxckRNdGt3Kq/48338/" method="post" class="container padded">
      <div class="newsletter-header">
        <ShapesArtists2 v-if="false" class="shape" />
        <h2 id="newsletterHeader" class="headline">
          <span class="compensate">
            {{ home ? $t('newsletter.header_home') : $t('newsletter.header_footer') }}
          </span>
        </h2>
      </div>

      <div class="newsletter-form">
        <div class="newsletter-field">
          <label for="r0c0m1i1" class="visually-hidden">
            {{ $t('newsletter.email') }}
          </label>
          <input id="r0c0m1i1" name="email_1" type="email" :placeholder="$t('newsletter.placeholder')" class="newsletter-input" required />
          <input type="text" name="a958883c" tabindex="-1" value="" style="position: absolute; left: -4900px;" aria-hidden="true" id="a958883c" autocomplete="off" />
          <input type="email" name="b958883c" tabindex="-1" value="" style="position: absolute; left: -5000px;" aria-hidden="true" id="b958883c" autocomplete="off" />
          <input type="checkbox" name="c958883c" tabindex="-1" style="position: absolute; left: -5100px;" aria-hidden="true" id="c958883c" autocomplete="off" />
          <input type="hidden" name="ok_redirect" id="id_redirect" :value="$t('newsletter.redirect')">

          <button type="submit" class="newsletter-button">
            <span class="hidden md:block">
              {{ $t('newsletter.button') }}
            </span>
            <Icon name="material-symbols:arrow-forward" class="icon md:hidden" />
          </button>
        </div>
        <div class="pt-4 xl:text-right leading-none text-sm color-yellow accent-links">
          {{ $t('newsletter.legal_before') }}
          <NuxtLink :to="localePath('/legal/politica-de-privacitat')">{{ $t('newsletter.policy') }}</NuxtLink>
          {{ $t('newsletter.legal_after') }}
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.newsletter {
  --input-padding: .25em .5em 0 .5em;
  overflow-x: clip;

  .container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--site-padding);
    position: relative;
  }

  .shape {
    top: 0;
    left: 0;
    bottom: 0;
    height: 225%;
    width: auto;
    color: var(--red);
    flex-shrink: 0;
    position: absolute;
    z-index: -1;
  }

  &-header {
    display: flex;
    font-size: var(--text-lg);

    h2 {
      position: relative;
      font-size: 1.25em;
      text-transform: uppercase;
      line-height: 1;
      text-wrap: balance;
      z-index: 2;
    }
  }

  &-field {
    display: flex;

    &:focus-within {
      .newsletter-button {
        background: var(--yellow);
        color: var(--black);
        outline: 2px var(--yellow) solid;
        border-color: var(--yellow);
      }
    }
  }

  &-input {
    appearance: none;
    border: 2px var(--white) solid;
    font-size: var(--text-xl);
    background: transparent;
    border-radius: 0;
    padding: var(--input-padding);
    flex-grow: 1;

    &::placeholder {
      color: rgba(255, 255, 255, 0.75);
    }

    &:focus-visible {
      outline-offset: 0;
      outline-width: 2px;
      border-color: var(--yellow);
    }
  }

  &-button {
    appearance: none;
    font-weight: bold;
    font-size: var(--text-xl);
    border: 2px var(--white) solid;
    padding: var(--input-padding);
    border-radius: 0;
    border-left: 0;
    cursor: pointer;
    line-height: 1;
    flex-shrink: 0;

    &:hover {
      background: var(--white);
      color: var(--black);
    }
  }
}

@include media('<xl') {
  .newsletter {
    .container {
      grid-template-columns: 1fr;
    }
  }
}

@include media('<md') {
  .newsletter {
    &-input,
    &-button {
      font-size: var(--text-lg);
    }

    &-input {
      width: 100%;
    }

    .icon {
      translate: 0 -.1em;
    }
  }
}
</style>