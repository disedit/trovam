<script setup>
defineProps({ blok: Object })

onMounted(() => {
  const filloutScript = document.createElement('script')
  filloutScript.setAttribute('src','https://server.fillout.com/embed/v1/')
  document.body.appendChild(filloutScript)
})
</script>

<template>
  <div
    v-editable="blok"
    class="fillout-form"
  >
    <div
      style="width:100%;height:500px;"
      :data-fillout-id="blok.fillout_id"
      :data-fillout-embed-type="blok.fillout_type"
      data-fillout-inherit-parameters
      data-fillout-dynamic-resize
    />
  </div>
</template>
