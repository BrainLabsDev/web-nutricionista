import { API } from 'src/common/api'
import { IResponse } from 'src/interfaces/Response'
import { IRole } from 'src/interfaces/Role'

class RoleDataService {
  async getAll (): Promise<IResponse<IRole[]>> {
    let response = await API.get('show/roles', {})
    return response.data
  }
}

export const roleDataServices = new RoleDataService()
