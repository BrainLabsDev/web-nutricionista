<template>
  <q-page class="fondo-gris q-py-md q-px-xl">
    <Notification />
    <TableColaborador />
    <TableConsultorio />
  </q-page>
</template>

<script setup lang="ts">
import Notification from '../../components/Notification.vue'
import TableColaborador from '../../components/TableColaborador.vue'
import TableConsultorio from '../../components/TableConsultorio.vue'
</script>
<style scoped lang="scss">
.fondo-gris {
  background-color: #F1F5F9;
}
</style>
