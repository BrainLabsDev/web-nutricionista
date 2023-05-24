<template>
  <q-page class="fondo-gris q-py-md q-px-xl">
    <BotonBack :url="`/pacientes/perfil/${id}`" />
    <div class="q-my-md">
      <span class="text-black text-bold text-h5">Editar Paciente</span>
    </div>
    <q-form ref="myForm" autocomplete="off">
      <div class="row q-col-gutter-sm">
        <!-- DATOS PERSONALES -->
        <div class="col-12 q-mb-md">
          <q-card style="border-radius: 15px" flat bordered class="q-pa-lg">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <span class="text-weight-bold" style="color: #1e293b"
                  >Datos personales</span
                >
              </div>
              <div class="col-4">
                <label for="nombre" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Nombre(s)</label
                >
                <q-input
                  outlined
                  v-model="formulario.nombre"
                  dense
                  placeholder="Escribe el nombre(s)"
                  lazy-rules
                  :rules="[val => !!val || 'Este campo es obligatorio']"
                />
              </div>
              <div class="col-4">
                <label
                  for="apellido_paterno"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Primer apellido</label
                >
                <q-input
                  id="apellido_paterno"
                  outlined
                  dense
                  v-model="formulario.apellido_paterno"
                  placeholder="Escribe el primer apellido"
                  lazy-rules
                  :rules="[val => !!val || 'Este campo es obligatorio']"
                />
              </div>
              <div class="col-4">
                <label
                  for="apellido_materno"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Segundo apellido</label
                >
                <q-input
                  id="apellido_materno"
                  outlined
                  dense
                  v-model="formulario.apellido_materno"
                  placeholder="Escribe el segundo apellido"
                  lazy-rules
                  :rules="[val => !!val || 'Este campo es obligatorio']"
                />
              </div>
              <div class="col-4">
                <label for="nombre" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Fecha de nacimiento</label
                >
                <q-input
                  outlined
                  type="date"
                  v-model="formulario.fecha_nacimiento"
                  dense
                  placeholder="Fecha de nacimiento"
                  lazy-rules
                  :rules="[val => !!val || 'Este campo es obligatorio']"
                />
              </div>
              <div class="col-4">
                <label for="apellido" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Sexo</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.sexo"
                  hide-hint
                  label="Seleccione el sexo"
                  :options="[
                    { label: 'Masculino', value: 'M' },
                    { label: 'Femenino', value: 'F' }
                  ]"
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[val => !!val || 'Este campo es obligatorio']"
                />
              </div>
            </div>
          </q-card>
        </div>

        <!-- SALUD Y ESTILO DE VIDA -->
        <div class="col-12 q-mb-md">
          <q-card style="border-radius: 15px" flat bordered class="q-pa-lg">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <span class="text-weight-bold" style="color: #1e293b"
                  >Salud y estilo de vida</span
                >
              </div>
              <div class="col-6">
                <label for="apellido" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Actividad física semanal</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.actividad_fisica_id"
                  label="Seleccione la cantidad de actividad física semanal"
                  :options="
                    actividades.map(item => {
                      return {
                        label: item.nombre,
                        value: item.id,
                        description: item.descripcion
                      }
                    })
                  "
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[
                    val => val !== null || 'El actividad física es requerida'
                  ]"
                >
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label style="font-size: 14px">{{
                          scope.opt.label
                        }}</q-item-label>
                        <q-item-label style="font-size: 14px" caption>{{
                          scope.opt.description
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-6">
                <label for="apellido" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Objetivo Actual</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.objetivo_id"
                  label="Seleccione el objetivo actual"
                  :options="
                    objetivos.map(item => {
                      return {
                        label: item.nombre,
                        value: item.id,
                        description: item.descripcion
                      }
                    })
                  "
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[
                    val => val !== null || 'El objetivo actual es requerido'
                  ]"
                >
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label style="font-size: 14px">{{
                          scope.opt.label
                        }}</q-item-label>
                        <q-item-label caption style="font-size: 14px">{{
                          scope.opt.description
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-6">
                <label for="apellido" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Alergias</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.alergias"
                  placeholder="Ingrese alguna alergia"
                  use-input
                  use-chips
                  multiple
                  hide-dropdown-icon
                  input-debounce="0"
                  new-value-mode="add-unique"
                />
              </div>
              <div class="col-6">
                <label for="apellido" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Condiciones médicas</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.condiciones_medicas"
                  placeholder="Ingrese alguna condición médica"
                  use-input
                  use-chips
                  multiple
                  hide-dropdown-icon
                  input-debounce="0"
                  new-value-mode="add-unique"
                />
              </div>
            </div>
          </q-card>
        </div>

        <!-- DATOS DE CONTACTO -->
        <div class="col-6 q-mb-md">
          <q-card style="border-radius: 15px" flat bordered class="q-pa-lg">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <span class="text-weight-bold" style="color: #1e293b"
                  >Datos de contacto</span
                >
              </div>
              <div class="col-6">
                <label for="email" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Correo electrónico</label
                >
                <q-input
                  outlined
                  dense
                  v-model="formulario.email"
                  placeholder="correo@ejemplo.com"
                  lazy-rules
                  :rules="[
                    val =>
                      val.length > 0 || 'El correo electrónico es requerido'
                  ]"
                />
              </div>
              <div class="col-6">
                <label for="telefono" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Teléfono</label
                >
                <q-input
                  type="phone"
                  outlined
                  v-model="formulario.telefono"
                  dense
                  placeholder="Escribe el telefono(s)"
                  lazy-rules
                  :rules="[val => val.length > 0 || 'El teléfono es requerido']"
                />
              </div>
            </div>
          </q-card>
        </div>

        <!-- USO INTERNO -->
        <div class="col-6 q-mb-md">
          <q-card style="border-radius: 15px" flat bordered class="q-pa-lg">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <span class="text-weight-bold" style="color: #1e293b"
                  >Uso interno</span
                >
              </div>
              <div class="col-6">
                <label
                  for="consultorio"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Consultorio</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.consultorio_id"
                  label="Seleccione el consultorio"
                  :options="
                    consultorios.map(item => {
                      return {
                        label: item.name,
                        value: item.id
                      }
                    })
                  "
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[
                    val => val !== null || 'El consultorio es requerido'
                  ]"
                />
              </div>
              <div class="col-6">
                <label
                  for="nutricionista"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Nutricionista</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.nutricionista_id"
                  label="Elegir nutricionista"
                  :options="
                    nutricionistas.map(item => {
                      return {
                        label: item.nombre,
                        value: item.id
                      }
                    })
                  "
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[
                    val => val !== null || 'La nutricionista es requerida'
                  ]"
                />
              </div>
            </div>
          </q-card>
        </div>

        <!-- ACTIONS -->
        <div class="col-12 row justify-end">
          <q-btn
            label="Cancelar"
            :to="{ name: 'Pacientes' }"
            class="q-mt-md q-mr-md bg-white"
            outline
            style="width: 240px"
          />
          <q-btn
            @click="submit"
            color="primary"
            label="Actualizar"
            class="q-mt-md bg-primary text-white border-primary"
            flat
            style="width: 240px"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue'
import BotonBack from '../../components/common/BotonBack.vue'
import { clinicDataServices } from '../../services/ClinicDataService'
import { IClinic } from '../../interfaces/Clinic'
import { INutri } from '../../interfaces/Nutri'
import { nutriDataServices } from '../../services/NutriDataService'
import { actividadDataServices } from 'src/services/ActividadDataService'
import { IActividadFisica } from 'src/interfaces/ActividadFisica'
import { IObjetivo } from 'src/interfaces/Objetivo'
import { objetivoDataServices } from 'src/services/ObjetivoDataService'
import { pacienteDataServices } from '../../services/PacienteDataService'
import { IPaciente, Paciente } from '../../interfaces/Paciente'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const router = useRouter()

const myForm = ref<any>(null)
const consultorios = ref<IClinic[]>([])
const nutricionistas = ref<INutri[]>([])
const actividades = ref<IActividadFisica[]>([])
const objetivos = ref<IObjetivo[]>([])

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

let formulario = reactive<IPaciente>({
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  fecha_nacimiento: '',
  sexo: '',
  telefono: null,
  email: '',
  alergias: [],
  condiciones_medicas: [],
  actividad_fisica_id: null,
  objetivo_id: null,
  consultorio_id: null,
  nutricionista_id: null
})

onMounted(async () => {
  getConsultorios()
  getNutris()
  getActividades()
  getObjetivos()

  let res = await pacienteDataServices.getById(props.id)

  if (res.code == 200) {
    formulario.nombre = res.data.user.nombre
    formulario.apellido_paterno = res.data.user.apellido_paterno
    formulario.apellido_materno = res.data.user.apellido_materno
    formulario.fecha_nacimiento = res.data.user.fecha_nacimiento
    formulario.sexo = res.data.user.sexo
    formulario.telefono = res.data.user.telefono
    formulario.email = res.data.user.email
    formulario.actividad_fisica_id = res.data.user.actividad_fisica.id
    formulario.objetivo_id = res.data.user.objetivo.id
    formulario.consultorio_id = res.data.user.consultorio.id
    formulario.nutricionista_id = res.data.user.nutricionista.id

    formulario.alergias = JSON.parse(res.data.user.alergias)
    formulario.condiciones_medicas = JSON.parse(
      res.data.user.condiciones_medicas
    )
  }
})

const getConsultorios = async () => {
  const data = await clinicDataServices.getClinics()
  if (data.code === 200) {
    consultorios.value = data.data
  }
}

const getNutris = async () => {
  const data = await nutriDataServices.getNutriologas()
  if (data.code === 200) {
    nutricionistas.value = data.data
  }
}

const getActividades = async () => {
  const data = await actividadDataServices.getActividades()
  if (data.code === 200) {
    actividades.value = data.data
  }
}

const getObjetivos = async () => {
  const data = await objetivoDataServices.getObjetivos()
  if (data.code === 200) {
    objetivos.value = data.data
  }
}

const submit = async () => {
  if (myForm.value?.validate()) {
    try {
      const data = await pacienteDataServices.updatePaciente(props.id, {
        nombre: formulario.nombre,
        apellido_paterno: formulario.apellido_paterno,
        apellido_materno: formulario.apellido_materno,
        fecha_nacimiento: formulario.fecha_nacimiento,
        sexo: formulario.sexo,
        telefono: Number(formulario.telefono),
        email: formulario.email,
        alergias: formulario.alergias,
        condiciones_medicas: formulario.condiciones_medicas,
        actividad_fisica_id: formulario.actividad_fisica_id,
        objetivo_id: formulario.objetivo_id,
        consultorio_id: formulario.consultorio_id,
        nutricionista_id: formulario.nutricionista_id
      })

      if (data.code === 201) {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Cliente actualizado correctamente',
          position: 'top-right'
        })
        myForm.value?.resetValidation()

        router.push({
          name: 'PerfilPaciente',
          params: { id: data.data.user.id }
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
  }
}
</script>

<style lang="scss" scoped>
.fondo-gris {
  background-color: #f1f5f9;
}
</style>
