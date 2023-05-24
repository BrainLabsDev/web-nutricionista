<script setup lang="ts">
import { useRouter } from 'vue-router'
import { IProducto } from '../interfaces/Producto'
import { productoDataServices } from '../services/ProductoDataService'
import { ref, onMounted } from 'vue'
import { computed } from '@vue/reactivity'

const router = useRouter()
const columns = [
  {
    name: 'nombre',
    label: 'Nombre del producto',
    field: 'nombre',
    align: 'left'
  },
  {
    name: 'cantidad_producto',
    label: 'Cantidad del producto',
    field: 'cantidad_producto',
    align: 'center'
  },
  {
    name: 'intercambio_nutricional',
    label: 'Intercambio nutricional',
    field: 'intercambio_nutricional',
    align: 'center'
  },
  {
    name: 'detalles_adicionales',
    label: 'Detalles adicionales',
    field: 'detalles_adicionales',
    align: 'center'
  },
  { name: 'accion', label: 'Acción', align: 'center' }
]

const search = ref('')
const loading = ref(false)
const items = ref<IProducto[]>([])

onMounted(async () => {
  await getItems()
})

const getItems = async () => {
  loading.value = true
  try {
    const data = await productoDataServices.getProductos()

    if (data.code === 200) {
      items.value = data.data
    }
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

const itemsFiltered = computed(() => {
  if (search.value === '') {
    return items.value
  }

  return items.value.filter(item => {
    return item.nombre.toLowerCase().includes(search.value.toLowerCase())
  })
})

const getEditar = (id: string) => {
  router.push({ name: 'EditarProducto', params: { id } })
}
</script>
<template>
  <div class="q-mt-lg q-pt-lg row justify-between">
    <span class="text-black text-bold text-h5">Lista de productos</span>
    <div class="row">
      <q-input
        rounded
        class="q-mr-md"
        v-model="search"
        outlined
        dense
        label="Buscar producto"
        bg-color="white"
        style="width: 250px"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        to="/productos/nuevo"
        label="Añadir Producto"
        color="primary"
        :icon="'add'"
      />
    </div>
  </div>
  <div class="q-mt-lg">
    <q-table
      flat
      :rows="itemsFiltered"
      :columns="columns"
      row-key="name"
      table-header-class="bg-accent text-black border-accent text-weight-bold"
      :separator="'cell'"
      :loading="loading"
      no-data-label="No se han encontrado registros"
      rows-per-page-label="Filas por página"
      :rows-per-page-options="[10, 15, 30, 50]"
    >
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <q-btn
            round
            color="primary"
            :icon="'o_edit'"
            @click="getEditar(props.row.id)"
          />
          <!-- <q-btn flat round color="black" icon="more_vert">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item
                  clickable
                  v-close-popup
                  @click="getEditar(props.row.id)"
                >
                  <q-item-section>Editar</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn> -->
        </q-td>
      </template>
    </q-table>
  </div>
</template>
