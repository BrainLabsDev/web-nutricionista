<template>
  <div>
    <q-btn
      size="md"
      flat
      color="primary"
      label="Atrás"
      icon="chevron_left"
      :to="url"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  url: string
}>()
</script>

<style lang="scss" scoped></style>
