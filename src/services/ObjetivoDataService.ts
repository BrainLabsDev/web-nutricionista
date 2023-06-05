import { API } from 'src/common/api'
import { IObjetivo } from 'src/interfaces/Objetivo'
import { IResponse } from 'src/interfaces/Response'
import { useAuthStore } from 'src/stores/auth'
const store = useAuthStore()

const { deleteLocalStorage } = store
class ObjetivoDataService {
  async getObjetivos (): Promise<IResponse<IObjetivo[]>> {
    let response
    try {
      response = await API.get('show/objetivos', {})
    } catch (error) {
      deleteLocalStorage()
    }
    return response!.data
  }
}

export const objetivoDataServices = new ObjetivoDataService()
