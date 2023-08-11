import { API } from 'src/common/api'
import { ICitaControl } from 'src/interfaces/CitaControl'
import { IResponse } from 'src/interfaces/Response'
import { useAuthStore } from 'src/stores/auth'
const store = useAuthStore()

const { deleteLocalStorage } = store
class CitaControlDataService {
  async getAll (id: string): Promise<IResponse<ICitaControl[]>> {
    let response
    try {
      response = await API.get(`show-history/cita-control/${id}`, {})
    } catch (error) {
      deleteLocalStorage
    }
    return response!.data
  }

  async save (data: ICitaControl): Promise<IResponse<ICitaControl>> {
    let response = await API.post('create/cita-control', { data })
    return response.data
  }
  async update (
    id: string,
    data: ICitaControl
  ): Promise<IResponse<ICitaControl>> {
    let response = await API.post(`update/cita-control/${id}`, { data })
    return response.data
  }

  async deleteCita (id: string): Promise<IResponse<any>> {
    let response
    try {
      response = await API.delete(`eliminar/cita-control/{{id}}`, {
        params: { id }
      })
    } catch (error) {
      // deleteLocalStorage()
    }
    return response!.data
  }
}

export const citaControlDataServices = new CitaControlDataService()
