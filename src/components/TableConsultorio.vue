<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { IClinic } from '../interfaces/Clinic'
import { clinicDataServices } from 'src/services/ClinicDataService'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const columns = [
  {
    name: 'name',
    label: 'Ubicación',
    field: 'name',
    align: 'left'
  },
  {
    name: 'address',
    align: 'center',
    label: 'Dirección',
    field: 'address'
  },
  { name: 'telefono', label: 'Contacto', field: 'phone', align: 'center' },
  { name: 'accion', label: 'Acción', align: 'center' }
]

const myForm = ref<HTMLFormElement | null>(null)

const items = ref<IClinic[]>([])
const prompt = ref(false)
const form = reactive({
  id: null,
  nombre: '',
  direccion: '',
  telefono: ''
})
const loading = ref(false)

onMounted(async () => {
  await getItems()
})

const getItems = async () => {
  loading.value = true
  try {
    const data = await clinicDataServices.getClinics()

    if (data.code === 200) {
      items.value = data.data
    }
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}
const submit = async () => {
  if (myForm.value?.validate()) {
    try {
      if (form.id === null) {
        const data = await clinicDataServices.saveClinic({
          nombre: form.nombre,
          direccion: form.direccion,
          telefono: form.telefono
        })
        if (data.code === 200) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Consultorio agregado correctamente'
          })
          await getItems()
          closeModal()
        }
      } else {
        const data = await clinicDataServices.updateClinic(form.id, {
          nombre: form.nombre,
          direccion: form.direccion,
          telefono: form.telefono
        })
        if (data.code === 200) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Consultorio actualizado correctamente',
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
  form.telefono = ''
  form.direccion = ''
}

const handleEdit = (data: any) => {
  console.log(data.row)
  form.id = data.row.id
  form.nombre = data.row.name
  form.telefono = data.row.phone
  form.direccion = data.row.address
  prompt.value = true
}
</script>

<template>
  <div class="q-mt-lg q-pt-lg row justify-between">
    <span class="text-black text-bold text-h5">Consultorios</span>
    <q-btn
      label="Añadir Consultorio"
      type="submit"
      color="primary"
      :icon="'add'"
      @click="prompt = true"
    />
  </div>

  <div class="q-mt-lg">
    <q-table
      :rows="items"
      flat
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
            form.id === null ? 'Nuevo Consultorio' : 'Actualizar Consultorio'
          }}
        </div>
      </q-card-section>

      <q-form ref="myForm">
        <q-card-section class="row q-col-gutter-sm">
          <div class="col-4">
            <q-input
              outlined
              label="Ubicación"
              dense
              v-model="form.nombre"
              autofocus
              lazy-rules
              :rules="[val => !!val || 'Este campo es requerido']"
            />
          </div>
          <div class="col-4">
            <q-input
              outlined
              label="Dirección"
              dense
              v-model="form.direccion"
              autofocus
              lazy-rules
              :rules="[val => !!val || 'Este campo es requerido']"
            />
          </div>
          <div class="col-4">
            <q-input
              outlined
              label="Teléfono"
              dense
              v-model="form.telefono"
              autofocus
              lazy-rules
              :rules="[val => !!val || 'Este campo es requerido']"
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
          @click="submit"
          style="width: 175px"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
