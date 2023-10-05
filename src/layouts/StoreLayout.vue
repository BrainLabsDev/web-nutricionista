<template>
  <q-layout view="lHh Lpr lFf">
    <SolicitarCita />
    <div class="max-container row justify-between items-center">
      <div>
        <q-img src="../assets/Logo.png" width="200px" @click="goSite" />
      </div>
      <nav>
        <ul style="display: flex">
          <li style="list-style: none">
            <a
              href="https://www.nutricionistacostarica.com/alimentacion-saludable-costa-rica"
              class="link"
              >Alimentación Saludable</a
            >
          </li>
          <li style="list-style: none; margin-right: 10px">
            <q-btn
              label="Nuestro Equipo"
              class="link"
              flat
              style="
                padding: 2px 0;
                text-transform: capitalize;
                display: inline;
              "
              icon-right="expand_more"
            >
              <q-menu :offset="[0, 10]">
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <a
                        href="https://www.nutricionistacostarica.com/nutricionista-costa-rica-natalia-segura"
                        class="link"
                        style="
                          padding: 2px 0;
                          text-transform: capitalize;
                          display: inline;
                        "
                        >Natalia Segura</a
                      >
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <a
                        href="https://www.nutricionistacostarica.com/nutricionista-costa-rica-rebeca-segura"
                        class="link"
                        style="
                          padding: 0 0;
                          text-transform: capitalize;
                          display: inline;
                        "
                        >Rebeca Segura</a
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </li>
          <li style="list-style: none">
            <q-btn
              label="Patologías"
              class="link"
              flat
              style="
                padding: 0 0;
                text-transform: capitalize;
                display: inline;
              "
              icon-right="expand_more"
            >
              <q-menu :offset="[0, 10]">
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <a
                        href="https://www.nutricionistacostarica.com/blog/sobrepeso"
                        class="link"
                        style="
                          padding: 2px 0;
                          text-transform: capitalize;
                          display: inline;
                        "
                        >Sobrepeso</a
                      >
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <a
                        href="https://www.nutricionistacostarica.com/blog/obesidad"
                        class="link"
                        style="
                          padding: 2px 0;
                          text-transform: capitalize;
                          display: inline;
                        "
                        >Obesidad</a
                      >
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <a
                        href="https://www.nutricionistacostarica.com/blog/trastornos-metabolicos-dislipidemia-hiperlipidemia"
                        class="link"
                        style="
                          padding: 2px 0;
                          text-transform: capitalize;
                          display: inline;
                        "
                        >Trastornos metabólicos</a
                      >
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <a
                        href="https://www.nutricionistacostarica.com/blog/trastornos-de-la-conducta-alimentaria-tca"
                        class="link"
                        style="
                          padding: 2px 0;
                          text-transform: capitalize;
                          display: inline;
                        "
                        >Trastornos de Conducta Alimentaria (TCA)</a
                      >
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <a
                        href="https://www.nutricionistacostarica.com/blog/diabetes"
                        class="link"
                        style="
                          padding: 2px 0;
                          text-transform: capitalize;
                          display: inline;
                        "
                        >Diabetes</a
                      >
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <a
                        href="https://www.nutricionistacostarica.com/blog/hipertension-arterial"
                        class="link"
                        style="
                          padding: 2px 0;
                          text-transform: capitalize;
                          display: inline;
                        "
                        >Hipertensión arterial</a
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <!-- <a href="" class="link">Patologías</a> -->
          </li>
          <li style="list-style: none">
            <a
              href="https://www.nutricionistacostarica.com/casos-de-exito-nutricionista-costa-rica"
              class="link"
              >Casos de éxito</a
            >
          </li>
          <li style="list-style: none">
            <a href="https://www.nutricionistacostarica.com/blog" class="link"
              >Blog</a
            >
          </li>
          <li style="list-style: none">
            <a
              href="https://www.nutricionistacostarica.com/contactar-nutricionista-costa-rica"
              class="link"
              >Contacto</a
            >
          </li>
        </ul>
      </nav>
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
