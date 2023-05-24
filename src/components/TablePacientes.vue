<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { computed } from '@vue/reactivity'
import { IPaciente } from '../interfaces/Paciente'
import { pacienteDataServices } from 'src/services/PacienteDataService'
import { nutriDataServices } from '../services/NutriDataService'
import { clinicDataServices } from '../services/ClinicDataService'

const router = useRouter()
const columns = [
  {
    name: 'nombre',
    label: 'Nombre completo',
    field: 'nombre',
    align: 'left'
  },
  {
    name: 'suscripcion',
    label: 'Acceso',
    field: 'suscripcion',
    align: 'center'
  },
  {
    name: 'consultorio',
    label: 'Consultorio',
    field: 'consultorio',
    align: 'center'
  },
  {
    name: 'nutricionista',
    label: 'Nutricionista',
    field: 'nutricionista',
    align: 'center'
  },
  {
    name: 'telefono',
    label: 'Teléfono',
    field: 'telefono',
    align: 'center'
  },
  {
    name: 'email',
    label: 'Correo electrónico',
    field: 'email',
    align: 'center'
  },

  { name: 'accion', label: '', align: 'center' }
]

const search = ref('')
const fecha = ref('')
const acceso = ref(null)
const consultorio = ref(null)
const colaborador = ref(null)
const showFilters = ref(false)

const options = [
  { label: 'Todos', value: null },
  { label: 'Activos', value: true },
  { label: 'Inactivos', value: false }
]

const loading = ref(false)
const items = ref<any[]>([])
const nutricionistas = ref<any[]>([])
const consultorios = ref<any[]>([])

onMounted(async () => {
  await getItems()
  await getNutricionistas()
  await getConsultorios()
})

const getItems = async () => {
  loading.value = true
  try {
    const data = await pacienteDataServices.getAll()

    if (data.code === 200) {
      items.value = data.data
      // console.log(data.data)
    }
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

const getNutricionistas = async () => {
  try {
    const data = await nutriDataServices.getNutriologas()

    if (data.code === 200) {
      nutricionistas.value = data.data
      // console.log(data.data)
    }
  } catch (error) {
    console.log(error)
  }
}

const getConsultorios = async () => {
  try {
    const data = await clinicDataServices.getClinics()

    if (data.code === 200) {
      consultorios.value = data.data
      // console.log(data.data)
    }
  } catch (error) {
    console.log(error)
  }
}

const fechaActual = computed(() => {
  const fechaActual = new Date().toISOString().substr(0, 10)
  return fechaActual
})

function isFechaEnRango(fechaInicio: any, fechaFin: any) {
  return fechaActual.value >= fechaInicio && fechaActual.value <= fechaFin
}

const pacientesFiltered = computed(() => {
  return items.value.filter((item: IPaciente) => {
    const coincideNombre =
      search.value === '' ||
      item.nombre.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
    const coincideAcceso =
      acceso.value === null ||
      isFechaEnRango(item.suscripcion?.empieza, item.suscripcion?.termina) ===
        acceso.value
    const coincideConsultorio =
      consultorio.value === null ||
      item.consultorio?.nombre === consultorio.value
    const coincideColaborador =
      colaborador.value === null ||
      item.nutricionista?.nombre === colaborador.value
    const coincideFecha = fecha.value === '' || item.cita?.fecha === fecha.value

    return (
      coincideNombre &&
      coincideAcceso &&
      coincideConsultorio &&
      coincideColaborador &&
      coincideFecha
    )
  })
})

const getPerfil = (id: string) => {
  router.push({ name: 'PerfilPaciente', params: { id } })
}
const getEditar = (id: string) => {
  router.push({ name: 'EditarPaciente', params: { id } })
}
</script>
<template>
  <div class="q-mt-lg q-pt-lg">
    <div class="row justify-between items-center">
      <p class="text-black text-bold text-h5">Lista de pacientes</p>

      <div class="row">
        <q-input
          class="q-mr-sm"
          v-model="search"
          outlined
          dense
          label="Buscar paciente"
          bg-color="white"
          style="width: 300px"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          @click="showFilters = !showFilters"
          label="Filtros"
          color="accent"
          :icon="'o_filter_alt'"
          class="q-mr-sm text-black"
        />
        <q-btn
          :to="{ name: 'NuevoPaciente' }"
          label="Nuevo Paciente"
          color="primary"
          :icon="'add'"
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mt-sm" v-if="showFilters">
      <!-- <div class="col-2">
        <q-input
          class="q-mr-xs"
          v-model="fecha"
          type="date"
          outlined
          dense
          label="Fecha"
          bg-color="white"
        />
      </div> -->
      <div class="col-2">
        <q-select
          class="q-mr-xs"
          v-model="acceso"
          :options="options"
          outlined
          dense
          label="Acceso"
          bg-color="white"
          emit-value
          map-options
        >
        </q-select>
      </div>

      <div class="col-4">
        <q-select
          outlined
          dense
          v-model="consultorio"
          bg-color="white"
          label="Consultorio"
          :options="
            consultorios.map(item => {
              return {
                label: item.name,
                value: item.name
              }
            })
          "
          emit-value
          map-options
          clearable
        />
      </div>
      <div class="col-4">
        <q-select
          outlined
          dense
          v-model="colaborador"
          bg-color="white"
          label="Nutricionistas"
          :options="
            nutricionistas.map(item => {
              return {
                label: item.nombre,
                value: item.nombre
              }
            })
          "
          emit-value
          map-options
          clearable
        />
      </div>
    </div>
  </div>
  <div class="q-mt-lg">
    <q-table
      flat
      :rows="pacientesFiltered"
      :columns="columns"
      row-key="name"
      table-header-class="bg-accent text-black border-accent text-weight-bold"
      :separator="'cell'"
      :loading="loading"
      no-data-label="No se han encontrado registros"
      rows-per-page-label="Filas por página"
      :rows-per-page-options="[10, 15, 30, 50]"
    >
      <template v-slot:body-cell-cita="props">
        <q-td key="cita" :props="props">
          {{
            props.row.cita.fecha !== null
              ? props.row.cita.fecha
              : 'No hay registro'
          }}
        </q-td>
      </template>
      <template v-slot:body-cell-suscripcion="props">
        <q-td key="suscripcion" :props="props">
          <q-chip
            :color="
              isFechaEnRango(
                props.row.suscripcion.empieza,
                props.row.suscripcion.termina
              )
                ? 'primary'
                : 'negative'
            "
            text-color="white"
            size="md"
            class="q-pa-md"
          >
            {{
              isFechaEnRango(
                props.row.suscripcion.empieza,
                props.row.suscripcion.termina
              )
                ? 'Con acceso'
                : 'Sin acceso'
            }}
          </q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-consultorio="props">
        <q-td key="consultorio" :props="props">
          {{
            props.row.consultorio !== null
              ? props.row.consultorio.nombre
              : 'No hay registro'
          }}
        </q-td>
      </template>
      <template v-slot:body-cell-nutricionista="props">
        <q-td key="nutricionista" :props="props">
          {{
            props.row.nutricionista !== null
              ? props.row.nutricionista.nombre
              : 'No hay registro'
          }}
        </q-td>
      </template>
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <q-btn
            round
            color="primary"
            :icon="'o_visibility'"
            @click="getPerfil(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>
