<script setup>
const props = defineProps({
  duration: { type: Number, default: .5 },
  ease: { type: String, default: 'power4.out' },
  start: { type: String, default: 'top 90%' },
  rotate: { type: String, default: '0deg' },
  y: { type: [Number, String], default: 100 }
})

const { $gsap } = useNuxtApp()
const element = ref(null)

onMounted(() => {
  $gsap.set(element.value, {
    y: props.y,
    opacity: 0,
    rotate: props.rotate
  })

  $gsap.to(element.value, {
    y: 0,
    opacity: 1,
    rotate: 0,
    duration: props.duration,
    ease: props.ease,
    scrollTrigger: {
      trigger: element.value,
      start: element.start,
    }
  })
})
</script>

<template>
  <div ref="element">
    <slot />
  </div>
</template>