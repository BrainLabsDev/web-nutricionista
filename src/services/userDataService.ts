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

  async checkUser (email: string): Promise<IResponse<any>> {
    let response
    try {
      response = await API.post(`check/user`, {
        data: {
          email
        }
      })
    } catch (error) {
      // deleteLocalStorage()
    }
    return response!.data
  }

  async createUser (data: any): Promise<IResponse<any>> {
    let response
    try {
      response = await API.post(`create/user`, {
        data: data
      })
    } catch (error) {
      // deleteLocalStorage()
    }
    return response!.data
  }
  async updateUser (data: any, id: string): Promise<IResponse<any>> {
    let response
    try {
      response = await API.post(`update/user/${id}`, {
        data: data
      })
    } catch (error) {
      // deleteLocalStorage()
    }
    return response!.data
  }
}

export const userDataServices = new UserDataService()
