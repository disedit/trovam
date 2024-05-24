<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok" class="container padded navbar-safest-area">
    <div>
      <strong>Nom: </strong>
      {{ blok.name }}
    </div>
    <div>
      <strong>Description: </strong>
      {{ blok.description }}
    </div>
    <div>
      <strong>Picture: </strong>
      {{ blok.picture }}
    </div>
  </div>
</template>
