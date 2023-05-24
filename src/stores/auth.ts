import { defineStore } from 'pinia'
import { authDataServices } from 'src/services/AuthDataService'
import { LocalStorage, SessionStorage } from 'quasar'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    counter: 0,
    user: {},
    token: '',
    initLoader: false
  }),

  getters: {
    isAuth: state => state.token !== '',
    getUser: state => state.user,
    getLoader: state => state.initLoader
  },

  actions: {
    setLoader (payload: boolean) {
      this.initLoader = payload
    },
    setUser (payload: any) {
      this.user = payload.user
      this.token = payload.token
    },
    setLocalStorage (payload: any) {
      SessionStorage.set('user', JSON.stringify(payload.user))
      SessionStorage.set('access_token', payload.token)
    },
    login (payload: any) {
      this.setUser(payload)
      this.setLocalStorage(payload)
      this.router.push('/pacientes')
    },
    async logout () {
      try {
        await authDataServices.logout()
        this.user = {}
        this.token = ''
        SessionStorage.remove('user')
        SessionStorage.remove('access_token')
        this.router.push('/login')
      } catch (error) {
        console.log(error)
      }
    }
  }
})
