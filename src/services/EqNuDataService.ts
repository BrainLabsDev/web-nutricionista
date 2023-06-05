import { API } from 'src/common/api'
import { IResponse } from 'src/interfaces/Response'
import { useAuthStore } from 'src/stores/auth'
const store = useAuthStore()

const { deleteLocalStorage } = store
class EqNuDataService {
  async getByCita (id: string): Promise<IResponse<any[]>> {
    let response

    try {
      response = await API.get(`show/equivalencias-nutricionales/${id}`, {})
    } catch (error) {
      deleteLocalStorage()
    }
    return response!.data
  }

  async save (data: any): Promise<IResponse<any>> {
    let response = await API.post('create/equivalencia-nutricional', { data })
    return response.data
  }
  async update (id: any, data: any): Promise<IResponse<any>> {
    let response = await API.post(`update/equivalencia-nutricional/${id}`, {
      data
    })
    return response.data
  }
}

export const eqNuDataService = new EqNuDataService()
