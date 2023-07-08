import { API } from 'src/common/api'
import { IResponse } from 'src/interfaces/Response'

class UserDataService {
  async deleteUser (id: string): Promise<IResponse<any>> {
    let response
    try {
      response = await API.delete(`delete/user/${id}`, {})
    } catch (error) {
      // deleteLocalStorage()
    }
    return response!.data
  }
}

export const userDataServices = new UserDataService()
