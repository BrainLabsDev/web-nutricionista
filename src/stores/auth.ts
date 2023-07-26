import { defineStore } from 'pinia'
import { authDataServices } from 'src/services/AuthDataService'
import { LocalStorage, Cookies } from 'quasar'
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
      /* Cookies */
      Cookies.set('user', payload.user)
      Cookies.set('access_token', payload.token)
    },
    setLocalStorageWithTime (payload: any) {
      /* Cookies */
      Cookies.set('user', payload.user, { expires: 100 })
      Cookies.set('access_token', payload.token, { expires: 100 })
    },
    login (payload: any) {
      this.setUser(payload)
      this.setLocalStorage(payload)
      this.router.push('/pacientes')
    },
    loginWithCookies (payload: any) {
      this.setUser(payload)
      this.setLocalStorageWithTime(payload)
      this.router.push('/pacientes')
    },
    async logout () {
      try {
        await authDataServices.logout()
        this.deleteLocalStorage()
      } catch (error) {
        console.log(error)
      }
    },
    deleteLocalStorage () {
      this.user = {}
      this.token = ''
      // LocalStorage.remove('user')
      // LocalStorage.remove('access_token')

      /* Cookies */
      Cookies.remove('user')
      Cookies.remove('access_token')
      this.router.push('/login')
    }
  }
})
