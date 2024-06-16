<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    :class="[
      'formatted-text',
      'underlined-links',
      `text-${blok.base_size}`,
      `text-${blok.base_color}`,
      `color-${blok.link_color}`
    ]"
  >
    <UtilsRichText :content="blok.content" />
  </div>
</template>

<style lang="scss">
.formatted-text {
  p:not(:last-child) {
    margin-block-end: var(--spacer-4);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin-bottom: .25em;
  }

  :is(h1, h2, h3, h4, h5, h6):not(:first-child) {
    margin-top: 1.5em;
  }

  h2 {
    font-size: var(--text-lg);
  }

  h3 {
    font-size: var(--text-md);
  }

  ul, ol {
    margin-left: 1.5em;

    li {
      margin: .5em 0;
      padding-left: .5em;
    }
  }

  ul {
    list-style: disc;

    li {
      &::marker {
        color: var(--color);
        font-size: 1.5em;
      }
    }
  }

  ol {
    list-style: decimal;

    li {
      &::marker {
        color: var(--color);
        font-size: 1.25em;
        font-weight: bold;
      }
    }
  }
}
</style>
