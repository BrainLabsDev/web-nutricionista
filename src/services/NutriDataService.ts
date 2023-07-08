import { API } from 'src/common/api'
import { INutri } from 'src/interfaces/Nutri'
import { IResponse } from 'src/interfaces/Response'
import { useAuthStore } from 'src/stores/auth'
const store = useAuthStore()

const { deleteLocalStorage } = store
class NutriDataService {
  async getNutriologas (): Promise<IResponse<INutri[]>> {
    let response
    try {
      response = await API.get('show/nutricionistas', {})
    } catch (error) {
      deleteLocalStorage()
    }

    return response!.data
  }

  async saveNutricionista (data: INutri): Promise<IResponse<INutri>> {
    let response = await API.post('create/nutricionista', {
      data: data
    })
    return response.data
  }
  async updateNutricionista (
    id: number,
    data: INutri
  ): Promise<IResponse<INutri>> {
    let response = await API.post(`update/nutricionista/${id}`, {
      data: data
    })
    return response.data
  }
}

export const nutriDataServices = new NutriDataService()
