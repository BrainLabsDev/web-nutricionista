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
      },
      {
        path: '/politicas-de-privacidad',
        name: 'Acuerdos',
        component: () => import('pages/Externos/acuerdos.vue')
      },
      {
        path: '/soporte',
        name: 'Soporte',
        component: () => import('pages/Externos/soporte.vue')
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
      },
      {
        path: '/mi-perfil',
        component: () => import('pages/Perfil/Index.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/store',
    component: () => import('layouts/StoreLayout.vue'),
    children: [
      {
        path: '',
        name: 'Store',
        component: () => import('pages/Store/Index.vue')
      },
      {
        path: '/checkout/:id',
        name: 'Checkout',
        props: true,
        component: () => import('pages/Store/Payment.vue')
      },
      {
        path: '/success',
        name: 'Success',
        component: () => import('pages/Store/Success.vue')
      },
      {
        path: '/success-renovation',
        name: 'SuccessExist',
        component: () => import('pages/Store/SuccessExist.vue')
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
