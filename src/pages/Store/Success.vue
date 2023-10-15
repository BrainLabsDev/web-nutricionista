<template>
  <div class="max-container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-h4 text-center">
          ¡Gracias por suscribirte con nosotros!
        </h1>
      </div>
    </div>

    <div class="row q-mb-lg">
      <div class="col-12 col-sm-6 row justify-center">
        <q-img src="../../assets/app-mobile.png" width="350px" />
      </div>
      <div class="col-12 col-sm-4">
        <div class="row">
          <div class="mobile-only col-12 text-center">
            <h2 class="text-h6">
              Aplicación: Lista de intercambios nutricionales
            </h2>
            <p class="text-subtitle2 q-mx-sm">
              Se ha enviado un correo electrónico con la cuenta de usuario y la
              contraseña para ingresar a la aplicación.
            </p>
            <p class="text-subtitle2">
              Descarga la aplicación en tu celular
              <a
                href="https://apps.apple.com/cr/app/nutricionista-natalia-segura/id6449504782"
                target="_blank"
                >iOS</a
              >
              &
              <a
                href="https://play.google.com/store/apps/details?id=org.nutrimind.app"
                target="_blank"
                >Android</a
              >.
            </p>
          </div>
          <div class="desktop-only col-12">
            <h2 class="text-h4">
              Aplicación: Lista de intercambios nutricionales
            </h2>
            <p class="text-subtitle2">
              Se ha enviado un correo electrónico con la cuenta de usuario y la
              contraseña para ingresar a la aplicación.
            </p>
            <p class="text-subtitle2">
              Descarga la aplicación en tu celular
              <a
                href="https://apps.apple.com/cr/app/nutricionista-natalia-segura/id6449504782"
                target="_blank"
                >iOS</a
              >
              &
              <a
                href="https://play.google.com/store/apps/details?id=org.nutrimind.app"
                target="_blank"
                >Android</a
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <div
    class="desktop-only"
    style="height: 400px !important; background-color: #e0eedc"
  >
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
  <div
    class="mobile-only"
    style="height: 550px !important; background-color: #e0eedc"
  >
    <div class="max-container">
      <div class="row q-py-lg justify-center">
        <div class="col-10 text-center">
          <q-img src="../../assets/Logo.png" width="200px" />
        </div>
        <div class="col-10">
          <div class="row">
            <div class="col-12">
              <h2 class="text-h5">Consultorios</h2>
              <div class="row">
                <p class="text-subtitle2">
                  Escazú:
                  <span class="text-weight-light">
                    Centro Médico Momentum , enfrente de Multiplaza Escazú. Piso
                    7 , consultorio 72.
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
        </div>
        <div class="col-10">
          <div class="row">
            <div class="col-12">
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
        <div class="col-12 text-center">
          Natalia Segura Nutricionista - Copyright © 2023
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue'
const props = defineProps(['id'])
const formulario = reactive({
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  telefono: null,
  email: ''
})
const suscripcion = ref({
  label: '1 mes',
  value: '1',
  precio: '$60.00',
  precioDesc: '$50.00'
})
const options = [
  { label: '1 mes', value: '1', precio: '$60.00', precioDesc: '$50.00' },
  { label: '3 meses', value: '3', precio: '$180.00', precioDesc: '$150.00' },
  { label: '6 meses', value: '6', precio: '$320.00', precioDesc: '$300.00' },
  { label: '9 meses', value: '9', precio: '$480.00', precioDesc: '$450.00' },
  { label: '1 año', value: '12', precio: '$550.00', precioDesc: '$500.00' }
]

onMounted(() => {
  suscripcion.value = options.find(item => item.value === props.id)
})
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
