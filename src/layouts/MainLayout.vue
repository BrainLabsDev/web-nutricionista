<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header class="row justify-center q-mt-md">
          <q-img src="../assets/Logo.png" width="200px" />
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <!-- <q-separator spaced /> -->
      </q-list>
      <div class="row justify-center">
        <q-btn
          style="position: absolute; top: 90%"
          flat
          icon="o_power_settings_new"
          label="Cerrar Sesión"
          class="text-bold"
          @click="handleSubmit"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue'
import { useAuthStore } from 'stores/auth'
import { onMounted, ref } from 'vue'

const store = useAuthStore()
const { logout } = store
const essentialLinks: EssentialLinkProps[] = [
  // {
  //   title: 'Inicio',
  //   icon: 'o_home',
  //   link: '/inicio'
  // },
  {
    title: 'Pacientes',
    icon: 'o_account_circle',
    link: '/pacientes'
  },
  {
    title: 'Productos',
    icon: 'o_shopping_cart',
    link: '/productos'
  },
  {
    title: 'Ajustes',
    icon: 'o_settings',
    link: '/ajustes'
  }
]

const leftDrawerOpen = ref(true)

onMounted(() => {
  leftDrawerOpen.value = true
  // await getItems()
})
function handleSubmit() {
  logout()
}
</script>
