<script setup lang="ts">
import { IProducto } from '../interfaces/Producto'
import { ref, onMounted, reactive } from 'vue'
import { citaControlDataServices } from '../services/CitaControlDataService'
import { ICitaControl } from '../interfaces/CitaControl'
import { useQuasar } from 'quasar'
import { computed } from '@vue/reactivity'
const $q = useQuasar()
const props = defineProps({
  id: {
    type: String || Number,
    required: true
  }
})

const emits = defineEmits(['cita'])

const columns = [
  {
    name: 'fecha_cita',
    label: 'Fecha',
    field: 'fecha_cita',
    align: 'center'
  },
  {
    name: 'peso',
    label: 'Peso (Kg)',
    field: 'peso',
    align: 'center'
  },
  {
    name: 'musculo',
    label: 'Músculo (Kg)',
    field: 'musculo',
    align: 'center'
  },
  {
    name: 'grasas',
    label: 'Grasas (Kg)',
    field: 'grasas',
    align: 'center'
  },
  {
    name: 'porcentaje_grasa',
    label: '% de Grasa',
    field: 'porcentaje_grasa',
    align: 'center'
  },
  {
    name: 'cc',
    label: 'CC',
    field: 'cc',
    align: 'center'
  },
  {
    name: 'grasa_viceral',
    label: 'Grasa visceral (Kg)',
    field: 'grasa_viceral',
    align: 'center'
  },
  {
    name: 'evolucion',
    label: 'Notas',
    field: 'evolucion',
    align: 'center'
  },
  { name: 'accion', label: 'Acciones', align: 'center' }
]

const prompt = ref(false)
const confirm = ref(false)
const idCita = ref('')
const myForm = ref<HTMLFormElement | null>(null)
const loading = ref(false)
const items = ref<ICitaControl[]>([])

const form = reactive({
  id: null,
  peso: '',
  musculo: '',
  grasas: '',
  porcentaje_grasa: '',
  cc: '',
  grasa_viceral: '',
  evolucion: ''
})

onMounted(() => {
  getItems()
})

const getItems = async () => {
  loading.value = true
  try {
    const data = await citaControlDataServices.getAll(props.id)

    if (data.code === 200) {
      items.value = data.data.reverse()
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
        // console.log('crea')

        const data = await citaControlDataServices.save({
          peso: Number(form.peso),
          musculo: Number(form.musculo),
          grasas: Number(form.grasas),
          porcentaje_grasa: Number(form.porcentaje_grasa),
          cc: Number(form.cc),
          grasa_viceral: Number(form.grasa_viceral),
          evolucion: form.evolucion,
          cliente_id: props.id
        })
        if (data.code === 200) {
          // console.log(data.data.cita.id)
          emits('cita', data.data.cita.id)
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Cita agregada correctamente',
            position: 'top-right'
          })
          await getItems()
          closeModal()
        }
      } else {
        // console.log('actualiza')

        const data = await citaControlDataServices.update(form.id, {
          peso: Number(form.peso),
          musculo: Number(form.musculo),
          grasas: Number(form.grasas),
          porcentaje_grasa: Number(form.porcentaje_grasa),
          cc: Number(form.cc),
          grasa_viceral: Number(form.grasa_viceral),
          evolucion: form.evolucion,
          cliente_id: props.id
        })
        if (data.code === 200) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Cita actualizada correctamente',
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
  form.peso = ''
  form.musculo = ''
  form.grasas = ''
  form.porcentaje_grasa = ''
  form.cc = ''
  form.grasa_viceral = ''
  form.evolucion = ''
}

const disabled = computed(() => {
  return (
    form.peso === '' ||
    form.musculo === '' ||
    form.grasas === '' ||
    form.porcentaje_grasa === '' ||
    form.cc === '' ||
    form.grasa_viceral === ''
  )
})

const handleCita = (id: number) => {
  emits('cita', id)
}

const edit = (id: number) => {
  const item = items.value.find(item => item.id === id)
  if (item) {
    form.id = item.id
    form.peso = item.peso.toString()
    form.musculo = item.musculo.toString()
    form.grasas = item.grasas.toString()
    form.porcentaje_grasa = item.porcentaje_grasa.toString()
    form.cc = item.cc.toString()
    form.grasa_viceral = item.grasa_viceral.toString()
    form.evolucion = item.evolucion
    prompt.value = true
  }

  prompt.value = true
}

const getDelete = (id: string) => {
  confirm.value = true
  idCita.value = id
}

const deleteCita = async () => {
  try {
    const data = await citaControlDataServices.deleteCita(idCita.value)

    if (data.code === 200) {
      await getItems()
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check_circle',
        message: 'Se elimino correctamente',
        position: 'top-right'
      })
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

  confirm.value = false
  idCita.value = ''
}
</script>
<template>
  <div class="q-mt-sm row justify-between items-center">
    <span class="text-black text-bold text-h5">Registro de citas</span>
    <q-btn color="primary" @click="prompt = true">Nueva cita</q-btn>
  </div>
  <div class="q-mt-sm">
    <q-table
      dense
      flat
      :rows="items"
      :columns="columns"
      row-key="name"
      table-header-class="bg-accent text-black border-accent text-weight-bold"
      :separator="'cell'"
      :loading="loading"
      no-data-label="No se han encontrado registros"
      rows-per-page-label="Filas por página"
      :rows-per-page-options="[3, 5, 10]"
    >
      <template v-slot:body-cell-peso="props">
        <q-td key="peso" :props="props" auto-width>
          {{ props.row.peso }}
        </q-td>
      </template>
      <template v-slot:body-cell-musculo="props">
        <q-td key="musculo" :props="props" auto-width>
          {{ props.row.musculo }}
        </q-td>
      </template>
      <template v-slot:body-cell-grasas="props">
        <q-td key="grasas" :props="props" auto-width>
          {{ props.row.grasas }}
        </q-td>
      </template>
      <template v-slot:body-cell-porcentaje_grasa="props">
        <q-td key="porcentaje_grasa" :props="props" auto-width>
          {{ props.row.porcentaje_grasa }}
        </q-td>
      </template>
      <template v-slot:body-cell-cc="props">
        <q-td key="cc" :props="props" style="width: 80px;">
          {{ props.row.cc }}
        </q-td>
      </template>
      <template v-slot:body-cell-grasa_viceral="props">
        <q-td key="grasa_viceral" :props="props" auto-width>
          {{ props.row.grasa_viceral }}
        </q-td>
      </template>
      <template v-slot:body-cell-evolucion="props">
        <q-td key="evolucion" :props="props" auto-width>
          <div
            style="
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              max-width: 500px;
            "
          >
            {{ props.row.evolucion }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-fecha_cita="props">
        <q-td key="fecha_cita" :props="props" auto-width>
          <q-btn
            rounded
            flat
            size="sm"
            class="bg-primary"
            text-color="white"
            @click="handleCita(props.row.id)"
          >
            {{ props.row.fecha_cita }}
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-accion="props">
        <q-td :props="props" auto-width>
          <q-btn
            round
            color="primary"
            :icon="'o_edit'"
            size="sm"
            class="q-mr-sm"
            @click="edit(props.row.id)"
          />
          <q-btn
            round
            color="red"
            :icon="'o_delete'"
            size="sm"
            @click="getDelete(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 775px; border-radius: 40px" class="q-pa-lg">
      <q-card-section>
        <div class="text-h6">
          {{ form.id === null ? 'Nueva cita' : 'Actualizar Cita' }}
        </div>
      </q-card-section>

      <q-form ref="myForm">
        <q-card-section class="row q-col-gutter-sm">
          <div class="col-4">
            <label for="">Peso (Kg)</label>
            <q-input
              outlined
              dense
              v-model="form.peso"
              autofocus
              lazy-rules
              :rules="[val => !!val || 'El peso es requerido']"
            />
          </div>
          <div class="col-4">
            <label for="">Músculo (Kg)</label>
            <q-input
              outlined
              placeholder="Músculo"
              dense
              v-model="form.musculo"
              autofocus
              lazy-rules
              :rules="[val => !!val || 'El Músculo es requerido']"
            />
          </div>
          <div class="col-4">
            <label for="">Grasas (Kg)</label>
            <q-input
              outlined
              placeholder="Grasas"
              dense
              v-model="form.grasas"
              autofocus
              lazy-rules
              :rules="[val => !!val || 'La grasa es requerido']"
            />
          </div>
          <div class="col-4">
            <label for="">Porcentaje de grasa (%)</label>
            <q-input
              outlined
              placeholder="Porcentaje de grasa"
              dense
              v-model="form.porcentaje_grasa"
              autofocus
              lazy-rules
              :rules="[val => !!val || 'El porcentaje de grasa  es requerido']"
            />
          </div>
          <div class="col-4">
            <label for="">Grasa visceral (Kg)</label>
            <q-input
              outlined
              placeholder="Grasa visceral"
              dense
              v-model="form.grasa_viceral"
              autofocus
              lazy-rules
              :rules="[val => !!val || 'La grasa visceral es requerido']"
            />
          </div>
          <div class="col-4">
            <label for="">CC</label>
            <q-input
              outlined
              placeholder="CC"
              dense
              v-model="form.cc"
              autofocus
              lazy-rules
              :rules="[val => !!val || 'El CC  es requerido']"
            />
          </div>
          <div class="col-12">
            <label for="">Notas (Uso Interno)</label>
            <q-input
              outlined
              placeholder="Notas"
              v-model="form.evolucion"
              autogrow
              type="textarea"
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
          :disabled="disabled"
          @click="submit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirm" persistent>
    <q-card class="q-pa-sm">
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Se eliminara la siguiente cita</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn flat label="Eliminar" color="red" @click="deleteCita" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped lang="scss">
.altura {
  height: 10px !important;
}
</style>
