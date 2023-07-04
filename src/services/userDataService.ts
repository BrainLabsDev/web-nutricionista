import { API } from 'src/common/api'
import { IResponse } from 'src/interfaces/Response'

class UserDataService {
  async userDelete (id: any): Promise<IResponse<any>> {
    let response = await API.get('delete/user/{{id}}', {
      params: {
        id
      }
    })
    return response!.data
  }
}

export const userDataServices = new UserDataService()
