<script setup>
defineProps({
  close: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <svg :class="{ close }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.67 23.13">
    <polygon class="cls-1 top" points="7.31 0 0 0 0 4.63 7.31 4.63 23.38 4.63 27.67 4.63 27.67 0 23.38 0 7.31 0"/>
    <polygon class="cls-1 middle" points="7.31 9.25 0 9.25 0 13.88 7.31 13.88 23.38 13.88 27.67 13.88 27.67 9.25 23.38 9.25 7.31 9.25"/>
    <polygon class="cls-1 bottom" points="7.31 18.5 0 18.5 0 23.13 7.31 23.13 23.38 23.13 27.67 23.13 27.67 18.5 23.38 18.5 7.31 18.5"/>
  </svg>
</template>

<style lang="scss" scoped>
  .cls-1 {
    fill: currentColor;
    stroke-width: 0px;
    transition: .25s ease;
  }

  .close {
    .top {
      transform-origin: 50% 50%;
      transform: translate(25%, 30%) rotate(-45deg);
    }

    .middle {
      opacity: 0;
    }

    .bottom {
      transform-origin: 50% 50%;
      transform: translate(25%, -25%) rotate(45deg);
    }
  }
</style>