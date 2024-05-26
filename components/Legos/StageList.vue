<script setup>
defineProps({
  stages: { type: Array, required: true }
})
</script>

<template>
  <div class="stages">
    <span v-for="stage in stages" :key="stage._uid">
      {{ stage.content.name }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.stages {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacer-2);

  span {
    background: var(--color, var(--pink));
    color: var(--black);
    padding: .25em 1em;
    border-radius: 3rem;
    flex-shrink: 0;
    font-weight: bold;
  }
}
</style>