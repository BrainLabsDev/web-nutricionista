<template>
  <q-layout view="lHh Lpr lFf" class="fondo">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.fondo {
  position: absolute;
  background-image: url("../assets/fondo.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
}
</style>
