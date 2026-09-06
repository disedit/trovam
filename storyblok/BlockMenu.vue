<script setup>
const props = defineProps({ blok: Object })

const { internalLink } = useLinks()

/* Load relations */
const { locale } = useI18n()
const { tr } = useTranslated()
const version = useEnvironment()
const storyblokApi = useStoryblokApi()
const { data: menuItems } = await useAsyncData(
  'menu_' + props.blok._uid,
  async () => {
    if (props.blok.blocks.length > 0) return []

    return await storyblokApi.get(`cdn/stories`, {
      version,
      excluding_fields: 'blocks,body,background,seo_title,seo_title_es,seo_title_en,seo_picture,seo_picture_es,seo_picture_en,seo_description,seo_description_es,seo_description_en,seo_keywords,seo_keywords_es,seo_keywords_en',
      by_uuids_ordered: props.blok.items.join(',')
    })
  }, {
    watch: [locale],
    dedupe: 'defer',
    getCachedData: (key, nuxtApp) => {
      const cachedSettings = useState('menu_' + props.blok._uid + locale.value)
      return cachedSettings.value
      ? cachedSettings.value
      : nuxtApp.payload.data[key]
    }
  }
)

const menu = computed(() => {
  if (props.blok.blocks.length > 0) {
    return props.blok.blocks.map((item) => ({
      id: item._uid,
      label: tr(item, 'label'),
      shape: item.shape,
      color: item.shape_color,
      flair: tr(item, 'flair'),
      link: internalLink(item.link.cached_url)
    }))
  }

  return menuItems.value.data.stories.map((item) => ({
    id: item.uuid,
    label: tr(item.content, 'title'),
    shape: props.blok.items_shape,
    color: props.blok.items_color,
    flair: false,
    link: internalLink(item.full_slug)
  }))
})
</script>

<template>
  <nav
    v-editable="blok"
    class="block-menu"
    :aria-label="blok.label"
  >
    <NuxtLink
      v-for="item in menu"
      :to="item.link"
      :key="item.id"
      :class="['block-menu-item headline', `color-${item.color}`]"
    >
      <ShapesGate :shape="item.shape" />
      <span class="compensate">{{ tr(item, 'label') }}</span>
      <span class="flair" v-if="tr(item, 'flair')">{{ tr(item, 'flair') }}</span>
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
.block-menu {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
  background: var(--black);
  border-top: 3px solid var(--black);
  border-bottom: 3px solid var(--black);
  overflow: clip;

  &-item {
    position: relative;
    display: flex;
    background: var(--color);
    color: var(--black);
    padding: var(--spacer-3) var(--site-padding);
    font-size: var(--text-2xl);
    gap: .25em;
    align-items: center;
    transition: outline .25s ease, outline-offset .25s ease;
    line-height: 1;

    svg {
      height: 1em;
    }

    .flair {
      background: var(--black);
      color: var(--white);
      text-transform: capitalize;
      padding: .25em .25em 0 .25em;
      position: absolute;
      font-size: .45em;
      font-weight: 900;
      font-family: var(--font-base);
      top: 0;
      right: 0;
    }

    &:hover,
    &:focus {
      position: relative;
      z-index: 10;
      background: var(--white);

      svg {
        color: var(--color);
      }
    }
  }
}

@include media('<md') {
  .block-menu {
    grid-template-columns: 1fr;
  }
}
</style>
