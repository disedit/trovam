<script setup>
const props = defineProps({ blok: Object })

const list = computed(() => {
  return props.blok.list?.split('\n').map(line => line.split('|'))
})
</script>

<template>
  <div v-editable="blok" class="definition-list">
    <dl class="flex flex-col gap-4 md:gap-8">
      <div v-for="(line, l) in list" :key="l" class="line">
        <dt>{{ line[0] }}</dt>
        <dd>{{ line[1] }}</dd>
      </div>
    </dl>
  </div>
</template>

<style lang="scss" scoped>
.definition-list {
  .line {
    display: flex;
    gap: var(--spacer-2);
    border-bottom: 1px dotted var(--black);
    justify-content: space-between;
    font-size: var(--text-base);
  }

  dt {
    font-weight: 900;
    background: var(--bg-color, var(--white));
    margin-block-end: -.5em;
    padding-inline-end: .5em;
    align-self: flex-end;
  }

  dd {
    text-align: right;
    background: var(--bg-color, var(--white));
    margin-block-end: -.5em;
    padding-inline-start: .5em;
    text-wrap: balance;
    width: fit-content;
  }
}

@include media('<sm') {
  .definition-list {
    .line {
      flex-direction: column;
      padding-block-end: .5em;
    }

    dt, dd {
      margin-block-end: 0;
      text-align: left;
      padding: 0;
      align-self: flex-start;
    }
  }
}
</style>
