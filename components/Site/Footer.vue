<script setup>
/* Load nav items */
const settings = await useSettings()
const { internalLink } = useLinks()
</script>

<template>
  <footer class="footer" aria-describedby="FooterTitle">
    <SiteNewsletter />
    <h2 id="FooterTitle" class="visually-hidden">Footer</h2>
    <div class="container padded grid md:grid-cols-2 gap-6">
      <div class="footer-sponsors md:col-span-2 mb-10">
        <StoryblokComponent
          v-for="blok in settings.data.story.content.footer_logos"
          :blok="blok"
          class="sponsor"
        />
      </div>
      <div class="footer-socials">
        Valencian Music Association (VAM!)
        <SiteSocials :socials="settings.data.story.content.social_networks" />
      </div>
      <div class="footer-links flex flex-wrap gap-4 md:items-end md:justify-end">
        <NuxtLink
          v-for="link in settings.data.story.content.footer_links"
          :key="link._uid"
          :to="internalLink(link.link.cached_url)"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: relative;
  background: url(~/assets/images/bg-2.jpg);
  background-size: cover;
  background-color: #000;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 150px;
    translate: 0 -150px;
    background: linear-gradient(to bottom, rgba($black, 0), rgba($black, 1));
    pointer-events: none;
  }

  &-sponsors {
    display: flex;
    flex-wrap: wrap;
    row-gap: var(--spacer-8);
    column-gap: var(--spacer-14);
  }

  a {
    color: var(--white);

    &:hover {
      color: var(--yellow);
    }
  }

  .socials :deep(a) {
    font-size: 1.75rem;

    &:hover {
      color: var(--yellow);
      opacity: 1;
    }
  }
}
</style>