<template>
  <div class="max-container">
    <div class="row justify-center justify-sm-start">
      <div class="col-10">
        <h1 class="text-h4">
          ¡Bienvenido a la tienda de Natalia Segura Nutricionista!
        </h1>
      </div>
    </div>

    <div class="row q-mb-lg">
      <div class="col-12 col-sm-6 row justify-center">
        <q-img
          v-show="img === 1"
          src="../../assets/app-mobile.png"
          width="350px"
        />
        <q-img
          v-show="img === 2"
          src="../../assets/app-mobile2.png"
          width="350px"
        />

        <div class="col-12 text-center">
          <q-img
            src="../../assets/app-mobile.png"
            width="50px"
            class="q-mx-sm"
            @click="img = 1"
          />
          <q-img
            src="../../assets/app-mobile2.png"
            width="50px"
            class="q-mx-sm"
            @click="img = 2"
          />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="row">
          <!-- TEXTOS -->
          <div class="mobile-only col-12 text-center">
            <h2 class="text-h5">
              Aplicación: Lista de intercambios nutricionales
            </h2>
            <p class="text-subtitle2">
              Puedes comprar el acceso por 1, 3, 6 o 12 meses.
            </p>
            <p class="text-subtitle2">
              Compra por más meses parar ahorrar más.
            </p>
            <p class="text-subtitle2">
              Disponible para
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
              Puedes comprar el acceso por 1, 3, 6 o 12 meses.
            </p>
            <p class="text-subtitle2">
              Compra por más meses parar ahorrar más.
            </p>
            <p class="text-subtitle2">
              Disponible para
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

          <div class="mobile-only col-12 text-center">
            <div class="q-my-lg">
              <span v-if="suscripcion.precio != suscripcion.descuento" class="text-h5 q-mr-sm text-descuento">{{
                formatMoney(suscripcion.precio || 0)
              }}</span>
              <span class="text-h5">{{
                formatMoney(suscripcion.descuento || 0)
              }}</span>
            </div>
          </div>

          <div class="desktop-only col-12">
            <div class="q-my-lg">
              <span v-if="suscripcion.precio != suscripcion.descuento" class="text-h5 q-mr-sm text-descuento">{{
                formatMoney(suscripcion.precio || 0)
              }}</span>
              <span class="text-h5">{{
                formatMoney(suscripcion.descuento || 0)
              }}</span>
            </div>
          </div>

          <div class="mobile-only col-10 q-mb-lg q-mx-auto">
            <q-select
              outlined
              :loading="loading"
              label="Suscripción"
              v-model="suscripcion"
              :options="
                items.map(item => {
                  return {
                    label:
                      item.nombre + ' - ' + formatMoney(item.descuento || 0),
                    value: item
                  }
                })
              "
              emit-value
              map-options
              return-object
            />
          </div>

          <div class="desktop-only col-6 q-mb-lg">
            <q-select
              outlined
              :loading="loading"
              label="Suscripción"
              v-model="suscripcion"
              :options="
                items.map(item => {
                  return {
                    label:
                      item.nombre + ' - ' + formatMoney(item.descuento || 0),
                    value: item
                  }
                })
              "
              emit-value
              map-options
              return-object
            />
          </div>

          <div class="mobile-only col-12 text-center">
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
                params: { id: suscripcion.id }
              }"
              >COMPRAR</q-btn
            >
          </div>

          <div class="desktop-only col-12">
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
                params: { id: suscripcion.id }
              }"
              >COMPRAR</q-btn
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row q-my-lg justify-center justify-sm-start">
      <div class="col-10 col-sm-5" style="text-align: justify">
        <p>
          Nuestra aplicación pone a su disposición un catálogo de más de 2200
          productos, cada uno con su respectiva información nutricional
          detallada: intercambio nutricional, sodio, azúcar, grasa y demás
          información de interés.
        </p>

        <p>
          Puede confiar en la experiencia y respaldo de la Dra. Natalia Segura y
          la Dra. Rebeca Segura para tomar decisiones saludables en su
          alimentación.
        </p>

        <p>
          Disponible para
          <a
            href="https://apps.apple.com/cr/app/nutricionista-natalia-segura/id6449504782"
            target="_blank"
            >iOS</a
          >
          y
          <a
            href="https://play.google.com/store/apps/details?id=org.nutrimind.app"
            target="_blank"
            >Android</a
          >.
        </p>
      </div>
    </div>
  </div>

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
import { productoDataServices } from 'src/services/ProductoDataService'
import { ref, onMounted } from 'vue'
import { ISubscription } from '../../interfaces/Subscription'
const img = ref(1)
const loading = ref(false)
const suscripcion = ref<ISubscription>({} as ISubscription)

const items = ref<ISubscription[]>([] as ISubscription[])

onMounted(async () => {
  await getItems()
})

const getItems = async () => {
  loading.value = true
  try {
    const data = await productoDataServices.getSubscriptions()

    if (data.code === 200) {
      items.value = data.data
      suscripcion.value = items.value[1]
    }
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

const formatMoney = (value: number) => {
  return `$${value.toFixed(2)} USD`
}
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
