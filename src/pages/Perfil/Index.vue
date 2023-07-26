<template>
  <q-page class="fondo-gris q-py-md q-px-xl">
    <Notification />
    <div class="q-my-md">
      <span class="text-black text-bold text-h5">Mi Perfil</span>
    </div>
    <q-card flat bordered style="height: 380px; width: 380px">
      <q-card-section style="border-right: 1px solid #e2e8f0">
        <div class="column items-center justify-center">
          <q-avatar size="100px" class="q-mt-md q-mb-md">
            <img src="../../assets/images.png" />
          </q-avatar>
          <span class="text-weight-bold q-mt-xs" style="font-size: 18px">
            Nombre(s):
            <span class="text-weight-regular">{{ user.nombre }}</span>
          </span>
          <span class="text-weight-bold q-mt-xs" style="font-size: 18px">
            Apellido(s):
            <span class="text-weight-regular"
              >{{ user.apellido_paterno }} {{ user.apellido_materno }}</span
            >
          </span>
          <span class="text-weight-bold q-mt-xs" style="font-size: 18px">
            E-mail: <span class="text-weight-regular">{{ user.email }}</span>
          </span>
          <span
            class="text-weight-bold q-mt-xs q-mb-lg"
            style="font-size: 18px"
          >
            Teléfono:
            <span class="text-weight-regular">{{ user.telefono }}</span>
          </span>
          <q-btn color="primary" @click="prompt = true"
            >Actualizar Contraseña</q-btn
          >
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 500px; border-radius: 40px" class="q-pa-lg">
        <q-card-section>
          <div class="text-h6">
            {{ 'Actualizar Contraseña ' }}
          </div>
        </q-card-section>

        <q-form ref="myForm">
          <q-card-section class="row q-col-gutter-sm">
            <div class="col-12 q-mb-sm">
              <q-input
                outlined
                placeholder="Elige tu nueva contraseña"
                dense
                v-model="password"
                hint="Mínimo 6 caracteres"
                autofocus
                lazy-rules
                :rules="[val => !!val || 'La contraseña es requerida']"
              />
            </div>
            <div class="col-12">
              <q-input
                outlined
                placeholder="Confirma tu contraseña"
                dense
                v-model="passwordConfirm"
                autofocus
                lazy-rules
                :rules="[val => !!val || 'La contraseña es requerida']"
              />
            </div>
          </q-card-section>
        </q-form>

        <q-card-actions align="right" class="text-primary q-mr-md">
          <q-btn
            outline
            label="Cancelar"
            @click="closeModal"
            style="width: 175px"
          />
          <q-btn
            :disable="getDisabled"
            color="primary"
            label="Actualizar"
            style="width: 175px"
            @click="submit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Notification from '../../components/Notification.vue'
import { useAuthStore } from 'stores/auth'
import { useQuasar } from 'quasar'
import { authDataServices } from '../../services/AuthDataService'
const $q = useQuasar()
const store = useAuthStore()

const user = store.user
const myForm = ref<HTMLFormElement | null>(null)
const prompt = ref(false)
const password = ref('')
const passwordConfirm = ref('')
const closeModal = () => {
  prompt.value = false
  password.value = ''
  passwordConfirm.value = ''
}

const getDisabled = computed(() => {
  if (password.value === '') return true
  if (password.value.length <= 5) return true
  if (passwordConfirm.value === '') return true
  if (passwordConfirm.value.length <= 5) return true
  if (password.value !== passwordConfirm.value) return true

  return false
})

const submit = async () => {
  if (myForm.value?.validate()) {
    try {
      console.log(password)

      const data = await authDataServices.updatePassword(
        user.email,
        password.value
      )

      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check_circle',
        message: 'Se ha actualizado la contraseña correctamente',
        position: 'top-right'
      })
    } catch (error) {
      $q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'error',
        message: 'Ocurrió un error',
        position: 'top-right'
      })
      console.log(error)
    } finally {
      closeModal()
    }
  }
}
</script>
<style scoped lang="scss">
.fondo-gris {
  background-color: #f1f5f9;
}
</style>
