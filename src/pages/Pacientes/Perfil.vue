<template>
  <q-page class="fondo-gris q-py-sm q-px-xl">
    <BotonBack :url="`/pacientes`" />
    <div class="row justify-between items-center q-mx-md q-mt-sm">
      <span class="text-black text-bold text-h5">Resumen del paciente</span>
      <q-btn
        color="primary"
        fab
        text-color="white"
        :icon="'o_edit'"
        :to="{ name: 'EditarPaciente', params: { id: paciente.id } }"
      />
    </div>
    <div class="row q-mx-md q-mt-sm">
      <div class="col-12 q-mb-xs">
        <q-card flat bordered class="row" style="height: 240px">
          <q-card-section class="col-3" style="border-right: 1px solid #e2e8f0">
            <div class="column items-center justify-center">
              <q-avatar size="80px" class="q-mt-sm">
                <img src="../../assets/images.png" />
              </q-avatar>
              <span class="text-weight-bold q-mt-xs" style="font-size: 18px">{{
                paciente.nombre +
                ' ' +
                paciente.apellido_paterno +
                ' ' +
                paciente.apellido_materno
              }}</span>
              <span style="font-size: 12px; font-weight: 700; color: #94a3b8">{{
                paciente.telefono
              }}</span>
              <span style="font-size: 12px; font-weight: 700; color: #94a3b8">{{
                paciente.email
              }}</span>
              <q-toggle
                v-model="acceso"
                checked-icon="check"
                color="primary"
                :label="getAcceso ? 'Acceso' : 'Sin acceso'"
                size="xl"
                @click="handleAcceso"
              />
            </div>
          </q-card-section>
          <q-card-section
            class="col-4 q-pl-xl"
            style="border-right: 1px solid #e2e8f0"
          >
            <p class="text-weight-bold q-mt-md">Datos generales</p>
            <div class="row justify-between q-mb-sm" style="width: 230px">
              <span class="text-weight-bold" style="font-size: 16px">Sexo</span>
              <span
                class="text-weight-bold"
                style="font-size: 16px; color: #94a3b8"
                >{{ paciente.sexo == 'M' ? 'Hombre' : 'Mujer' }}</span
              >
            </div>
            <div class="row justify-between q-mb-sm" style="width: 230px">
              <span class="text-weight-bold" style="font-size: 16px">Edad</span>
              <span
                class="text-weight-bold"
                style="font-size: 16px; color: #94a3b8"
                >{{ getEdad }}</span
              >
            </div>
            <div class="row justify-between q-mb-sm" style="width: 230px">
              <span class="text-weight-bold" style="font-size: 16px"
                >Consultorio</span
              >
              <span
                class="text-weight-bold"
                style="font-size: 16px; color: #94a3b8"
                >{{ paciente.consultorio?.nombre }}</span
              >
            </div>
            <div class="row justify-between q-mb-sm" style="width: 230px">
              <span class="text-weight-bold" style="font-size: 16px"
                >Nutricionista</span
              >
              <span
                class="text-weight-bold"
                style="font-size: 16px; color: #94a3b8"
                >{{ paciente.nutricionista?.nombre }}</span
              >
            </div>
          </q-card-section>

          <q-card-section class="col-4 q-pl-xl">
            <div class="row justify-between items-center q-mt-md q-mb-md">
              <p class="text-weight-bold q-mb-none">Datos Adicionales</p>
              <!--  -->
            </div>
            <div class="row justify-between q-mb-sm" style="">
              <span class="text-weight-bold" style="font-size: 16px"
                >Condiciones médicas</span
              >
              <span
                class="text-weight-bold"
                style="font-size: 16px; color: #94a3b8"
                >{{
                  paciente.condiciones_medicas
                    ? paciente.condiciones_medicas
                    : 'Ninguna'
                }}</span
              >
            </div>
            <div class="row justify-between q-mb-sm" style="">
              <span class="text-weight-bold" style="font-size: 16px"
                >Actividad física</span
              >
              <span
                class="text-weight-bold"
                style="font-size: 16px; color: #94a3b8"
                >{{ paciente.actividad_fisica?.nombre }}</span
              >
            </div>
            <div class="row justify-between q-mb-sm" style="">
              <span class="text-weight-bold" style="font-size: 16px"
                >Alergias</span
              >
              <span
                class="text-weight-bold"
                style="font-size: 16px; color: #94a3b8"
                >{{ paciente.alergias ? paciente.alergias : 'Ninguna' }}</span
              >
            </div>
            <div class="row justify-between q-mb-sm" style="">
              <span class="text-weight-bold" style="font-size: 16px"
                >Objetivo actual</span
              >
              <span
                class="text-weight-bold"
                style="font-size: 16px; color: #94a3b8"
                >{{ paciente.objetivo?.nombre }}</span
              >
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12">
        <TableCitas :id="id" @cita="handleCita" />
      </div>
      <div class="col-12 q-mb-xs">
        <TableEquivalencias :id="id" :cita="idCita" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import BotonBack from '../../components/common/BotonBack.vue'
import TableCitas from '../../components/TableCitas.vue'
import TableEquivalencias from '../../components/TableEquivalencias.vue'
import { Paciente, IPaciente } from '../../interfaces/Paciente'
import { pacienteDataServices } from '../../services/PacienteDataService'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const paciente = ref(new Paciente({} as IPaciente))
const idCita = ref('')

const handleCita = (id: string) => {
  idCita.value = id
}

onMounted(async () => {
  let res = await pacienteDataServices.getById(props.id)

  if (res.code == 200) {
    paciente.value = res.data.user
  }
})

function calcularEdad(fechaNacimiento: any) {
  var fechaActual = new Date()
  var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()

  // Verificar si aún no ha cumplido años en este año
  if (
    fechaActual.getMonth() < fechaNacimiento.getMonth() ||
    (fechaActual.getMonth() === fechaNacimiento.getMonth() &&
      fechaActual.getDate() < fechaNacimiento.getDate())
  ) {
    edad--
  }

  return edad
}

const getEdad = computed(() => {
  const fechaNacimiento = new Date(paciente.value.fecha_nacimiento)

  return calcularEdad(fechaNacimiento)
})

const acceso = ref(false)

const getAcceso = computed(() => {
  const fechaActual = new Date().toISOString().substr(0, 10)

  return isFechaEnRango(
    fechaActual,
    paciente.value.suscripcion?.empieza,
    paciente.value.suscripcion?.termina
  )
})

watch(
  () => getAcceso.value,
  (newVal, oldVal) => {
    acceso.value = newVal
  }
)

const handleAcceso = async () => {
  try {
    if (acceso.value) {
      await pacienteDataServices.enabledAccess(props.id)
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check_circle',
        message: 'Se habilito el acceso correctamente',
        position: 'top-right'
      })
    } else {
      await pacienteDataServices.disabledAccess(props.id)
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check_circle',
        message: 'Se deshabilito el acceso correctamente',
        position: 'top-right'
      })
    }
  } catch (error) {
    console.log(error)
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: 'Se produjo un error en el acceso',
      position: 'top-right'
    })
  }
}

function isFechaEnRango(fecha: any, fechaInicio: any, fechaFin: any) {
  return fecha >= fechaInicio && fecha <= fechaFin
}
</script>

<style lang="scss" scoped>
.fondo-gris {
  background-color: #f1f5f9;
}
</style>
