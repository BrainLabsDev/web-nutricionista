<template>
  <div class="max-container row justify-between items-center">
    <div class="q-my-md col-12 text-center">
      <q-img src="../../assets/Logo.png" width="200px" @click="goSite" />
    </div>

    <div class="col-12 text-center">
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
</template>

<script setup lang="ts">
const goSite = () => {
  window.open('https://www.nutricionistacostarica.com/', '_blank')
}
</script>

<style scoped>
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
