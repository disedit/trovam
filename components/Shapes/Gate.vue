<script setup>
defineProps({
  shape: { type: String, required: true }
})

const shapes = {
  Shape1: resolveComponent('ShapesShape1'),
  Shape2: resolveComponent('ShapesShape2'),
  Shape3: resolveComponent('ShapesShape3'),
  Shape4: resolveComponent('ShapesShape4'),
  Shape5: resolveComponent('ShapesShape5'),
  Shape6: resolveComponent('ShapesShape6')
}
</script>

<template>
  <Component :is="shapes[shape]" />
</template>
