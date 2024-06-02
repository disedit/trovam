<script setup>
defineProps({
  shape: { type: String, required: true }
})

const shapes = {
  Artists1: resolveComponent('ShapesArtists1'),
  Artists2: resolveComponent('ShapesArtists2'),
  Artists3: resolveComponent('ShapesArtists3'),
  Artists4: resolveComponent('ShapesArtists4'),
  Artists5: resolveComponent('ShapesArtists5'),
  Artists6: resolveComponent('ShapesArtists6'),
  Artists7: resolveComponent('ShapesArtists7'),
  Artists8: resolveComponent('ShapesArtists8'),
  Artists9: resolveComponent('ShapesArtists9'),
  Artists10: resolveComponent('ShapesArtists10'),
  Artists11: resolveComponent('ShapesArtists11'),
  Artists12: resolveComponent('ShapesArtists12'),
}
</script>

<template>
  <Component class="artists-shape" :is="shapes[shape]" />
</template>

<style>
  .artists-shape .cls-1 {
    fill: currentColor;
    stroke-width: 0px;
  }
</style>