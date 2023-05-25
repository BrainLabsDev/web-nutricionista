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
            <form>
              <q-input
                outlined
                v-model="nombre"
                label="Nombre"
                class="q-mt-md"
              />
              <q-input
                outlined
                v-model="correo"
                label="Correo"
                class="q-mt-md"
              />

              <q-input
                type="textarea"
                outlined
                v-model="mensaje"
                label="Mensaje"
                class="q-mt-md"
              />
              <div class="row justify-center">
                <q-btn
                  color="primary"
                  label="Enviar"
                  class="q-mt-md"
                  style="width: 200px"
                />
              </div>
            </form>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
