import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/Auth/Index.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/pacientes',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/inicio',
        component: () => import('pages/Inicio/Index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/pacientes',
        name: 'Pacientes',
        component: () => import('pages/Pacientes/Index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/pacientes/nuevo-paciente',
        name: 'NuevoPaciente',
        component: () => import('pages/Pacientes/Nuevo.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/pacientes/perfil/:id',
        name: 'PerfilPaciente',
        props: true,
        component: () => import('pages/Pacientes/Perfil.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/pacientes/paciente-editar/:id',
        name: 'EditarPaciente',
        props: true,
        component: () => import('pages/Pacientes/Editar.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/productos',
        component: () => import('pages/Productos/Index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/productos/nuevo',
        component: () => import('pages/Productos/Nuevo.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/productos/producto-editar/:id',
        name: 'EditarProducto',
        props: true,
        component: () => import('pages/Productos/Editar.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/ajustes',
        component: () => import('pages/Ajustes/Index.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
