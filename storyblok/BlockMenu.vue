<script setup>
const props = defineProps({ blok: Object })

const { internalLink } = useLinks()

/* Load relations */
const { locale } = useI18n()
const version = useEnvironment()
const storyblokApi = useStoryblokApi()
const { data: menuItems } = await useAsyncData(
  'menu_' + props.blok._uid,
  async () => {
    if (props.blok.blocks.length > 0) return []

    return await storyblokApi.get(`cdn/stories`, {
      version,
      language: locale.value,
      excluding_fields: 'blocks,body,background,seo_title,seo_picture',
      by_uuids_ordered: props.blok.items.join(',')
    })
  }
)

const menu = computed(() => {
  if (props.blok.blocks.length > 0) {
    return props.blok.blocks.map((item) => ({
      id: item._uid,
      label: item.label,
      shape: item.shape,
      color: item.shape_color,
      link: internalLink(item.link.cached_url)
    }))
  }

  return menuItems.value.data.stories.map((item) => ({
    id: item.uuid,
    label: item.content.title,
    shape: props.blok.items_shape,
    color: props.blok.items_color,
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
      <span class="compensate">{{ item.label }}</span>
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
