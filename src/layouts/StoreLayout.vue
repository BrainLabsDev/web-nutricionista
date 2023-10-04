<template>
  <q-layout view="lHh Lpr lFf">
    <SolicitarCita />
    <div class="max-container row justify-between items-center">
      <div>
        <q-img src="../assets/Logo.png" width="200px" @click="goSite" />
      </div>
      <div></div>
      <div>
        <q-btn
          size="lg"
          rounded
          color="primary"
          flat
          text-color="white"
          style="
            font-size: 14px;
            height: 45px;
            width: 168px;
            background-color: #51b001;
          "
          href="https://api.whatsapp.com/send?phone=50685428620"
          target="_blank"
          >Solicitar Cita</q-btn
        >
      </div>
    </div>

    <div class="max-container">
      <q-breadcrumbs class="q-my-lg">
        <q-breadcrumbs-el label="Inicio" />
        <q-breadcrumbs-el :to="{ name: 'Store' }" label="Tienda" />
        <q-breadcrumbs-el label="Natalia Segura App" />
      </q-breadcrumbs>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SolicitarCita from 'components/storePage/SolicitarCita.vue'

const goSite = () => {
  window.open('https://www.nutricionistacostarica.com/', '_blank')
}
</script>
<style scoped lang="scss">
.max-container {
  margin: 0 auto;
  max-width: 1260px;
}
</style>
