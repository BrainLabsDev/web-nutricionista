<template>
  <div class="max-container">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Inicio" />
      <q-breadcrumbs-el label="Tienda" />
      <q-breadcrumbs-el label="Natalia Segura App" />
    </q-breadcrumbs>

    <div class="row">
      <div class="col-12">
        <h1 class="text-h4">
          ¡Bienvenido a la tienda de Natalia Segura Nutricionista!
        </h1>
      </div>
    </div>

    <div class="row q-mb-lg">
      <div class="col-6 row justify-center">
        <q-img src="../../assets/app-mobile.png" width="350px" />
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-12">
            <h2 class="text-h4">Natalia Segura App</h2>
            <p class="text-subtitle2">Disponible para Android & iOS</p>
          </div>
          <div class="col-12">
            <div class="q-my-lg">
              <span class="text-h4 q-mr-sm text-descuento">{{
                suscripcion.precio
              }}</span>
              <span class="text-h4">{{ suscripcion.precioDesc }}</span>
            </div>
          </div>
          <div class="col-6 q-mb-lg">
            <q-select
              outlined
              label="Suscripción"
              v-model="suscripcion"
              :options="options"
              return-object
            />
          </div>

          <div class="col-12">
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
              :to="{
                name: 'Checkout',
                params: { id: suscripcion.value }
              }"
              >COMPRAR</q-btn
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row q-my-lg">
      <div class="col-5" style="text-align: justify">
        <p>
          Nuestra aplicación pone a su disposición un catálogo de más de 2200
          productos, cada uno con su respectiva información nutricional
          detallada.
        </p>

        <p>
          Puede confiar en la experiencia y respaldo de la Dra. Natalia Segura
          para tomar decisiones saludables en su alimentación.
        </p>

        <p>Disponible para iOS y Android.</p>
      </div>
    </div>
  </div>
  <div style="height: 400px !important; background-color: #e0eedc">
    <div class="max-container">
      <div class="row q-py-lg">
        <div class="col-12">
          <q-img src="../../assets/Logo.png" width="200px" />
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <h2 class="text-h5">Consultorios</h2>
              <p class="text-subtitle2">
                Escazú:
                <span class="text-weight-light">
                  Centro Médico Momentum , enfrente de Multiplaza Escazú. Piso 7
                  , consultorio 72.
                </span>
              </p>
              <p class="text-subtitle2">
                Calle Blancos:
                <span class="text-weight-light">
                  Centro Médico Centauro , costado SUR de la Clinica Católica,
                  Piso 3, consultorio 322
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <h2 class="text-h5">Horario</h2>
              <p class="text-subtitle2">
                Lunes a Viernes:
                <span class="text-weight-light"> 8:30 a. m. – 7 p. m. </span>
              </p>
              <p class="text-subtitle2">
                Sábados:
                <span class="text-weight-light"> 9 a.m. - 1 p.m. </span>
              </p>
              <p class="text-subtitle2">
                Teléfono:
                <span class="text-weight-light"> 2253-3773 </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          Natalia Segura Nutricionista - Copyright © 2023
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue'
const suscripcion = ref({
  label: '1 mes',
  value: '1',
  precio: '$60.00',
  precioDesc: '$50.00'
})
const options = [
  { label: '1 mes', value: '1', precio: '$60.00', precioDesc: '$50.00' },
  { label: '3 mes', value: '3', precio: '$180.00', precioDesc: '$150.00' },
  { label: '6 mes', value: '6', precio: '$320.00', precioDesc: '$300.00' },
  { label: '9 mes', value: '9', precio: '$480.00', precioDesc: '$450.00' },
  { label: '1 año', value: '12', precio: '$550.00', precioDesc: '$500.00' }
]
</script>

<style lang="scss" scoped>
.max-container {
  margin: 0 auto;
  max-width: 1260px;
}
.text-descuento {
  color: #c6c6c6;
  text-decoration: line-through;
}
</style>
