<template>
  <q-layout view="lHh Lpr lFf">
    <SolicitarCita />
    <NavMenuDesktop class="mobile-hide" />
    <NavMenuMobile class="desktop-hide" />

    <div class="max-container row justify-center justify-sm-start">
      <q-breadcrumbs class="mobile-hide q-my-lg">
        <q-breadcrumbs-el label="Inicio" />
        <q-breadcrumbs-el :to="{ name: 'Store' }" label="Tienda" />
        <q-breadcrumbs-el label="Natalia Segura App" />
      </q-breadcrumbs>

      <q-breadcrumbs class="desktop-hide q-my-lg q-mx-auto">
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
import NavMenuDesktop from 'components/storePage/NavMenuDesktop.vue'
import NavMenuMobile from 'components/storePage/NavMenuMobile.vue'

const goSite = () => {
  window.open('https://www.nutricionistacostarica.com/', '_blank')
}
</script>
<style scoped lang="scss">
.max-container {
  margin: 0 auto;
  max-width: 1260px;
}

.link {
  padding: 40px 15px;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: normal;
  text-decoration: none;
  color: #959595;
  font-size: 14px;
}
.link:hover {
  color: #51b001;
}
</style>
