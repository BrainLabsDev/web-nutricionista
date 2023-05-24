<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { INutri } from '../interfaces/Nutri'
import { nutriDataServices } from '../services/NutriDataService'
import { roleDataServices } from '../services/RoleDataService'
import { IRole } from '../interfaces/Role'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const columns = [
  {
    name: 'nombre',
    label: 'Nombre',
    field: 'nombre',
    align: 'left'
  },
  {
    name: 'email',
    align: 'center',
    label: 'Email',
    field: 'email'
  },
  { name: 'rol', label: 'Rol', field: 'rol', align: 'center' },
  { name: 'accion', label: 'Acción', align: 'center' }
]
const myForm = ref<HTMLFormElement | null>(null)
const items = ref<INutri[]>([])
const prompt = ref(false)
const form = reactive({
  id: null,
  nombre: '',
  email: '',
  rol: null
})
const loading = ref(false)

const roles = ref<IRole[]>([])

onMounted(async () => {
  await getItems()
  await getRoles()
})

const rol = ['Nutricionista', 'Admin']

const getRoles = async () => {
  try {
    const data = await roleDataServices.getAll()
    if (data.code === 200) {
      roles.value = data.data.filter(role => rol.includes(role.name))
    }
  } catch (error) {
    console.log(error)
  }
}

const getItems = async () => {
  loading.value = true
  try {
    const data = await nutriDataServices.getNutriologas()
    if (data.code === 200) {
      items.value = data.data
    }
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

const submit = async () => {
  console.log(form)
  if (myForm.value?.validate()) {
    try {
      if (form.id === null) {
        const data = await nutriDataServices.saveNutricionista({
          nombre: form.nombre,
          email: form.email,
          rol: form.rol.name
        })
        if (data.code === 200) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Nutricionista agregado correctamente',
            position: 'top-right'
          })
          await getItems()
          closeModal()
        }
      } else {
        const data = await nutriDataServices.updateNutricionista(form.id, {
          nombre: form.nombre,
          email: form.email,
          rol: form.rol
        })
        if (data.code === 200) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Nutricionista actualizado correctamente',
            position: 'top-right'
          })
          await getItems()
          closeModal()
        }
      }
    } catch (error) {
      $q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'error',
        message: 'Ocurrió un error',
        position: 'top-right'
      })
      console.log(error)
    }
  }
}

const closeModal = () => {
  prompt.value = false
  form.id = null
  form.nombre = ''
  form.email = ''
  form.rol = null
}

const handleEdit = (data: any) => {
  console.log(data.row)
  form.id = data.row.id
  form.nombre = data.row.nombre
  form.email = data.row.email
  form.rol = data.row.rol
  prompt.value = true
}
</script>

<template>
  <div class="q-mt-lg q-pt-lg row justify-between">
    <span class="text-black text-bold text-h5">Nutricionistas</span>
    <q-btn type="submit" color="primary" :icon="'add'" @click="prompt = true"
      >Añadir Nutricionista</q-btn
    >
  </div>

  <div class="q-mt-lg">
    <q-table
      flat
      :rows="items"
      :columns="columns"
      row-key="name"
      :hide-pagination="true"
      table-header-class="bg-accent text-black border-accent text-weight-bold"
      :separator="'cell'"
      :loading="loading"
      no-data-label="No se han encontrado registros"
      rows-per-page-label="Filas por página"
      :rows-per-page-options="[5]"
    >
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <q-btn
            round
            color="primary"
            :icon="'o_edit'"
            @click="handleEdit(props)"
          />
          <!-- <div>
            <q-btn flat round color="black" icon="more_vert">
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="handleEdit(props)">
                    <q-item-section>Editar</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div> -->
        </q-td>
      </template>
    </q-table>
  </div>

  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 775px; border-radius: 40px" class="q-pa-lg">
      <q-card-section>
        <div class="text-h6">
          {{
            form.id === null
              ? 'Nueva Nutricionista'
              : 'Actualizar Nutricionista'
          }}
        </div>
      </q-card-section>

      <q-form ref="myForm">
        <q-card-section class="row q-col-gutter-sm">
          <div class="col-4">
            <q-input
              outlined
              placeholder="Nombre"
              dense
              v-model="form.nombre"
              autofocus
              lazy-rules
              :rules="[val => !!val || 'El nombre es requerido']"
            />
          </div>
          <div class="col-4">
            <q-input
              outlined
              type="email"
              placeholder="Correo electrónico"
              dense
              v-model="form.email"
              lazy-rules
              :rules="[
                val => !!val || 'El email es requerido',
                val => /.+@.+/.test(val) || 'El email debe ser válido'
              ]"
            />
          </div>
          <div class="col-4">
            <q-select
              outlined
              label="Rol"
              :options="roles"
              option-value="item.id"
              option-label="name"
              dense
              v-model="form.rol"
              lazy-rules
              :rules="[val => !!val || 'El rol es requerido']"
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
          color="primary"
          :label="form.id === null ? 'Guardar' : 'Actualizar'"
          v-close-popup
          style="width: 175px"
          @click="submit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
