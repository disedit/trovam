<script setup>
defineProps({
  to: { type: String, required: true },
  icon: { type: String, default: null },
  hoverIcon: { type: String, default: 'material-symbols:arrow-forward' }
})

const showIcon = ref(false)
</script>

<template>
  <a
    :href="to"
    class="button"
    @mouseenter="showIcon = true"
    @mouseleave="showIcon = false"
  >
    <span class="compensate">
      <slot />
    </span>
    
    <Transition name="fade-right" mode="out-in">
      <Icon :name="hoverIcon" v-if="showIcon && icon" class="icon" key="hoverIcon" />
      <Icon :name="icon" v-else-if="icon" key="icon" />
    </Transition>
  </a>
</template>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  font-weight: bold;
  background: var(--black);
  border-radius: 2em;
  padding: .25em .75em;
  font-size: var(--text-base);
  color: var(--white);
  gap: .5em;
  border: 2px var(--black) solid;
}
</style>