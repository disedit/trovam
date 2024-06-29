<script setup>
const props = defineProps({ blok: Object })
</script>

<template>
  <section v-editable="blok" class="home-recap relative py-14 md:py-32" :aria-labelledby="`title-${blok._uid}`">
    <div class="container padded">
      <h2 :id="`title-${blok._uid}`" class="headline mb-4">
        <span class="compensate">{{ blok.title }}</span>
        <ShapesRings class="hidden md:block" />
        <ShapesArtists2 class="md:hidden" />
        <span class="compensate">{{ blok.year }}</span>
      </h2>
      <iframe
        width="560"
        height="315"
        :src="`https://www.youtube-nocookie.com/embed/${blok.youtube_id}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
      <div class="flex justify-end">
        <ElementsButton block :to="blok.link.cached_url">
          <template #icon-prepend>
            <ShapesArtists2 class="hidden md:block" />
            <ShapesShape5 class="md:hidden" />
          </template>
          {{ $t('recap.editions') }}
          <template #icon-append>
            <Icon name="material-symbols:arrow-forward" />
          </template>
        </ElementsButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.home-recap {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    display: flex;
    font-size: var(--text-2xl);
    gap: .5em;
    align-items: center;
    justify-content: center;
  }

  svg {
    color: var(--blue);
    height: 1em;
  }

  iframe {
    aspect-ratio: 16/6.5;
    width: 100%;
    height: 100%;
    border: 3px var(--white) solid;
  }
}

@include media('<md') {
  .home-recap {
    min-height: 75svh;

    iframe {
      aspect-ratio: 1;
    }
  }
}
</style>