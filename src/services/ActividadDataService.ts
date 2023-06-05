import { API } from 'src/common/api'
import { IActividadFisica } from 'src/interfaces/ActividadFisica'

import { IResponse } from 'src/interfaces/Response'
import { useAuthStore } from 'src/stores/auth'
const store = useAuthStore()

const { deleteLocalStorage } = store
class ActividadDataService {
  async getActividades (): Promise<IResponse<IActividadFisica[]>> {
    let response
    try {
      response = await API.get('show/actividades-fisicas', {})
    } catch (error) {
      deleteLocalStorage()
    }
    return response!.data
  }
}

export const actividadDataServices = new ActividadDataService()
