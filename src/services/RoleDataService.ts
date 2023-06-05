import { API } from 'src/common/api'
import { IResponse } from 'src/interfaces/Response'
import { IRole } from 'src/interfaces/Role'
import { useAuthStore } from 'src/stores/auth'
const store = useAuthStore()

const { deleteLocalStorage } = store
class RoleDataService {
  async getAll (): Promise<IResponse<IRole[]>> {
    let response
    try {
      response = await API.get('show/roles', {})
    } catch (error) {
      deleteLocalStorage()
    }
    return response!.data
  }
}

export const roleDataServices = new RoleDataService()
