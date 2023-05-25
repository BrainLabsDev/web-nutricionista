<template>
  <div class="row justify-center items-center" style="height: 100vh">
    <div class="col-11 col-md-6" style="height: 60vh">
      <q-card>
        <q-card-section>
          <div class="row justify-end q-mx-md q-mt-lg">
            <q-img src="../../assets/Logo.png" width="200px" />
          </div>
          <div
            class="text-h6 text-md-h5 text-center text-uppercase text-weight-bold"
          >
            ¿Como te podemos ayudar?
          </div>
          <div
            class="q-mt-sm q-px-md"
            style="font-size: 17px; text-align: justify"
          >
            <form
              method="post"
              name="form1"
              action="mailto:damonbalam@gmail.com"
            >
              <q-input
                outlined
                name="nombre"
                id="nombre"
                label="Nombre"
                v-model="nombre"
                class="q-mt-md"
              />
              <q-input
                outlined
                id="correo"
                name="correo"
                label="Correo"
                v-model="correo"
                class="q-mt-md"
              />

              <q-input
                outlined
                id="asunto"
                name="asunto"
                label="Asunto"
                v-model="asunto"
                class="q-mt-md"
              />

              <q-input
                type="textarea"
                outlined
                id="mensaje"
                name="comments"
                label="Mensaje"
                v-model="mensaje"
                class="q-mt-md"
              />
              <div class="row justify-center">
                <q-btn
                  type="submit"
                  color="primary"
                  label="Enviar"
                  class="q-mt-md"
                  style="width: 200px"
                  :disable="disabled"
                />
              </div>
            </form>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { computed } from '@vue/reactivity'

const nombre = ref('')
const correo = ref('')
const asunto = ref('')
const mensaje = ref('')

const disabled = computed(() => {
  return (
    nombre.value === '' ||
    correo.value === '' ||
    mensaje.value === '' ||
    asunto.value === ''
  )
})
</script>

<style lang="scss" scoped></style>
