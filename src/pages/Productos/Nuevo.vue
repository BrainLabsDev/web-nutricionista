<template>
  <q-page class="fondo-gris q-py-md q-px-md">
    <!-- <BotonBack url="/productos" /> -->
    <div class="q-mx-md q-mt-sm">
      <span class="text-black text-bold text-h5">Producto Nuevo</span>
    </div>
    <div class="row q-mt-md">
      <div class="col-5 q-px-md">
        <q-card flat class="q-pa-md" style="height: 620px">
          <q-card-section>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <label for="nombre" class="text-semibold q-mb-none"
                >Nombre del producto</label
              >
              <q-input
                outlined
                rounded
                v-model="formProducto.nombre"
                label="Nombre del producto"
                lazy-rules
                :rules="[val => val.length > 0 || 'El nombre es requerido']"
              />
              <label for="cantidad" class="text-semibold q-mb-none"
                >Cantidad del producto</label
              >
              <q-input
                outlined
                rounded
                v-model="formProducto.cantidad_producto"
                label="Cantidad del producto"
                lazy-rules
                :rules="[val => val.length > 0 || 'La cantidad es requerida']"
              />
              <label for="intercambio" class="text-semibold q-mb-none"
                >Intercambio nutricional</label
              >
              <q-input
                outlined
                rounded
                v-model="formProducto.intercambio_nutricional"
                label="Intercambio nutricional"
                lazy-rules
                :rules="[
                  val =>
                    val.length > 0 || 'El intercambio nutricional es requerido'
                ]"
              />
              <label for="detalles" class="text-semibold q-mb-none"
                >Detalles adicionales</label
              >
              <q-input
                outlined
                rounded
                v-model="formProducto.detalles_adicionales"
                label="Detalles adicionales"
                lazy-rules
                type="textarea"
                :rules="[
                  val =>
                    val.length > 0 || 'Los detalles adicionales son requeridos'
                ]"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-7 q-px-md">
        <q-card flat class="q-pa-md" style="height: 620px">
          <q-card-section>
            <div class="text-h6">
              Seleccionar categoría y subcategoria del producto
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row justify-between">
              <q-input
                rounded
                class="q-mr-md"
                v-model="search"
                outlined
                dense
                label="Buscar categoría"
                bg-color="white"
                style="width: 350px"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <!-- <q-btn label="Crear Categoría" color="primary" :icon="'add'" /> -->
            </div>
            <div class="q-mt-lg" style="max-height: 26rem; overflow-y: scroll">
              <q-card
                flat
                bordered
                v-for="(item, i) in itemsFiltered"
                :key="item.id"
              >
                <q-card-section>
                  <div class="row justify-between">
                    <div class="text-h6">{{ item.nombre }}</div>
                    <q-btn
                      :label="
                        category === item
                          ? 'Categoría Seleccionada'
                          : 'Seleccionar'
                      "
                      :color="category !== item ? 'black' : 'primary'"
                      :outline="category !== item"
                      unelevated
                      @click="selectedCategory(item)"
                    />
                  </div>
                </q-card-section>
                <template v-if="category === item">
                  <q-card
                    flat
                    bordered
                    v-for="subItem in itemsSub"
                    :key="subItem.id"
                  >
                    <q-card-section>
                      <div class="row justify-between">
                        <div>
                          <span>{{ subItem?.nombre }}</span>
                        </div>
                        <q-btn
                          unelevated
                          :label="
                            subcategory === subItem
                              ? 'Subcategoria Seleccionada'
                              : 'Seleccionar subcategoria'
                          "
                          :color="subcategory !== subItem ? 'black' : 'primary'"
                          :outline="subcategory !== subItem"
                          @click="selectedSubcategory(subItem)"
                        />
                      </div>
                    </q-card-section>
                  </q-card>
                </template>
              </q-card>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row justify-end">
      <q-btn
        label="Cancelar"
        color="white"
        class="text-black q-mt-md q-mr-md"
        @click="onReset"
        style="width: 200px"
      />
      <q-btn
        label="Guardar"
        color="primary"
        :disabled="disabled"
        class="q-mt-md q-mr-md"
        @click="onSubmit"
        style="width: 200px"
      />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue'
import BotonBack from '../../components/common/BotonBack.vue'
import { ICategory } from '../../interfaces/Category'
import { ISubcategory } from '../../interfaces/Subcategory'
import { categoryDataServices } from '../../services/CategoryDataService'
import { productoDataServices } from '../../services/ProductoDataService'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const router = useRouter()
const search = ref('')
const category = ref(null)
const subcategory = ref(null)
const colors = [
  '#339933',
  '#4195F1',
  '#E60026',
  '#27C1C1',
  '#FF005A',
  '#900020',
  '#EE890B',
  '#339933',
  '#4195F1',
  '#E60026',
  '#27C1C1',
  '#FF005A',
  '#900020',
  '#EE890B'
]
const colorsSubs = [
  '#54c654',
  '#4195F1',
  '#E60026',
  '#27C1C1',
  '#FF005A',
  '#900020',
  '#EE890B',
  '#54c654',
  '#4195F1',
  '#E60026',
  '#27C1C1',
  '#FF005A',
  '#900020',
  '#EE890B'
]
const formProducto = reactive({
  nombre: '',
  cantidad_producto: '',
  intercambio_nutricional: '',
  detalles_adicionales: ''
})
const formProductoDefault = reactive({
  nombre: '',
  cantidad_producto: '',
  intercambio_nutricional: '',
  detalles_adicionales: ''
})

//buscador de categorias
const items = ref<ICategory[]>([])
const itemsSub = ref<ISubcategory[]>([])

function selectedCategory(item: any) {
  if (category.value === item) {
    category.value = null
    subcategory.value = null
  } else {
    category.value = item
    getSubcategories(item.id)
  }
}

function selectedSubcategory(item: any) {
  if (subcategory.value === item) {
    subcategory.value = null
  } else {
    subcategory.value = item
  }
}

async function onSubmit() {
  try {
    const data = {
      nombre: formProducto.nombre,
      cantidad_producto: formProducto.cantidad_producto,
      intercambio_nutricional: formProducto.intercambio_nutricional,
      detalles_adicionales: formProducto.detalles_adicionales,
      subcategoria_id: subcategory.value?.id
    }

    const res = await productoDataServices.saveProducto(data)

    if (res.code === 200) {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check_circle',
        message: 'Producto agregado correctamente',
        position: 'top-right'
      })
      router.push('/productos')
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

function onReset() {
  formProducto.nombre = ''
  formProducto.cantidad_producto = ''
  formProducto.intercambio_nutricional = ''
  formProducto.detalles_adicionales = ''
  category.value = null
  subcategory.value = null

  router.push('/productos')
}

onMounted(async () => {
  await getItems()
})

const getItems = async () => {
  // loading.value = true
  try {
    const data = await categoryDataServices.getCategories()
    if (data.code === 200) {
      items.value = data.data
    }
  } catch (error) {
    console.log(error)
  }
  // loading.value = false
}
const getSubcategories = async (id: number) => {
  // loading.value = true
  itemsSub.value = []
  try {
    const res = await categoryDataServices.getSubCategoriesByCategoryId(id)

    if (res.code === 200) {
      itemsSub.value = res.data.subcategorias || []
    }
  } catch (error) {
    console.log(error)
  }
  // loading.value = false
}

const itemsFiltered = computed(() => {
  if (search.value === '') {
    return items.value
  }

  return items.value.filter(item => {
    return item.nombre.toLowerCase().includes(search.value.toLowerCase())
  })
})

const disabled = computed(() => {
  return (
    !formProducto.nombre ||
    !formProducto.cantidad_producto ||
    !formProducto.intercambio_nutricional ||
    !formProducto.detalles_adicionales ||
    !category.value ||
    !subcategory.value
  )
})
</script>

<style lang="scss" scoped>
.fondo-gris {
  background-color: #f1f5f9;
}
</style>
