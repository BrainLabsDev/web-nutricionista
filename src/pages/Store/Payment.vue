<template>
  <div class="max-container">
    <div class="row justify-center justify-sm-start">
      <div class="desktop-only col-12">
        <h1 class="text-h4">Finalizando la compra de la suscripción</h1>
      </div>
      <div class="mobile-only col-12 text-center">
        <h1 class="text-h6">Finalizando la compra de la suscripción</h1>
      </div>
    </div>

    <div class="row q-mb-lg">
      <div class="col-12 col-sm-8">
        <div class="row justify-center justify-sm-start">
          <div class="mobile-only col-12 text-center">
            <p class="text-h5">Detalles del Cliente</p>
          </div>
          <div class="desktop-only col-12">
            <p class="text-h5">Detalles del Cliente</p>
          </div>
          <div class="col-10">
            <label for="nombre" class="q-ml-xs text-subtitle2 q-mb-none"
              >Nombre(s)</label
            >
            <q-input
              outlined
              v-model="formulario.nombre"
              dense
              lazy-rules
              :rules="[val => !!val || 'Este campo es obligatorio']"
            />
          </div>
          <div class="col-10">
            <label
              for="apellido_paterno"
              class="q-ml-xs text-subtitle2 q-mb-none"
              >Primer apellido</label
            >
            <q-input
              id="apellido_paterno"
              outlined
              dense
              v-model="formulario.apellido_paterno"
              lazy-rules
              :rules="[val => !!val || 'Este campo es obligatorio']"
            />
          </div>
          <div class="col-10">
            <label
              for="apellido_materno"
              class="q-ml-xs text-subtitle2 q-mb-none"
              >Segundo apellido</label
            >
            <q-input
              id="apellido_materno"
              outlined
              dense
              v-model="formulario.apellido_materno"
              lazy-rules
              :rules="[val => !!val || 'Este campo es obligatorio']"
            />
          </div>
          <div class="col-10">
            <label for="email" class="q-ml-xs text-subtitle2 q-mb-none"
              >Correo electrónico</label
            >
            <q-input
              id="email"
              outlined
              dense
              v-model="formulario.email"
              lazy-rules
              :rules="[val => !!val || 'Este campo es obligatorio']"
            />
          </div>

          <div class="col-10">
            <label for="telefono" class="q-ml-xs text-subtitle2 q-mb-none"
              >Teléfono</label
            >
            <q-input
              id="telefono"
              outlined
              dense
              v-model="formulario.telefono"
              lazy-rules
              :rules="[val => !!val || 'Este campo es obligatorio']"
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4">
        <q-card class="q-pa-sm q-mt-lg" flat style="background-color: #f0f0f0">
          <q-card-section>
            <div class="text-h6">Resumen del Pedido</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            <div class="row justify-between">
              <div>
                <q-img src="../../assets/app-mobile.png" width="100px" />
              </div>
              <div>
                <p>Aplicación</p>
                <p>{{ suscripcion.label }}</p>
              </div>
              <div>
                <p class="text-descuento">{{ suscripcion.precio }}</p>
                <p>{{ suscripcion.precioDesc }}</p>
              </div>
            </div>
          </q-card-section>
          <q-separator inset />

          <q-card-section>
            <div class="row justify-between">
              <p>Total:</p>
              <p>{{ suscripcion.precioDesc }}</p>
            </div>
            <div class="row">
              <div class="col-12 text-center">
                <Paypal :amount-pay="amountPay" />
                <!-- <div id="paypal-button-container"></div> -->
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div class="row justify-center items-center q-mt-sm">
          <span class="text-caption text-weight-bold">Pago seguro </span>
          <q-icon name="lock"></q-icon>
        </div>
      </div>
      <div class="row q-mt-sm">
        <div class="col-12">
          <q-btn
            size="lg"
            rounded
            flat
            style="
              font-size: 14px;
              height: 45px;
              width: 168px;
              background-color: #f0f0f0;
            "
            :to="{
              name: 'Store'
            }"
            >REGRESAR</q-btn
          >
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
import Paypal from 'components/storePage/Paypal.vue'
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
  precio: '',
  precioDesc: '$10.00',
  amount: '10.00'
})
const options = [
  {
    label: '1 meses',
    value: '1',
    precio: '',
    precioDesc: '$10.00',
    amount: '10.00'
  },
  {
    label: '3 meses',
    value: '3',
    precio: '$30.00',
    precioDesc: '$15.00',
    amount: '15.00'
  },
  {
    label: '6 meses',
    value: '6',
    precio: '$60.00',
    precioDesc: '$30.00',
    amount: '30.00'
  },
  {
    label: '1 año',
    value: '12',
    precio: '$120.00',
    precioDesc: '$50.00',
    amount: '50.00'
  }
]
const amountPay = computed(() => {
  return suscripcion.value.amount
})
onMounted(() => {
  //@ts-ignore
  suscripcion.value = options.find(item => item.value === props.id)
  //@ts-ignore
  // paypal
  //   .Buttons({
  //     style: {
  //       layout: 'vertical',
  //       color: 'gold',
  //       shape: 'rect',
  //       label: 'paypal'
  //     },
  //     createOrder: function (data, actions) {
  //       return actions.order.create({
  //         purchase_units: [
  //           {
  //             amount: {
  //               value: `15.00` // El monto del pago
  //             }
  //           }
  //         ]
  //       })
  //     },
  //     onApprove: function (data, actions) {
  //       return actions.order.capture().then(function (details) {
  //         console.log(details)

  //         router.push({ name: 'Success' })
  //         // Aquí puedes realizar acciones adicionales después de que se apruebe el pago
  //       })
  //     }
  //   })
  //   .render('#paypal-button-container')
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
