import { API } from 'src/common/api'
import { IClinic } from 'src/interfaces/Clinic'
import { IResponse } from 'src/interfaces/Response'

class ClinicDataService {
  async getClinics (): Promise<IResponse<IClinic[]>> {
    let response = await API.get('consultorios', {})
    return response.data
  }

  async saveClinic (clinic: IClinic): Promise<IResponse<IClinic>> {
    let response = await API.post('create/consultorio', {
      data: clinic
    })
    return response.data
  }
  async updateClinic (id: number, clinic: IClinic): Promise<IResponse<IClinic>> {
    let response = await API.post(`update/consultorio/${id}`, {
      data: clinic
    })
    return response.data
  }
}

export const clinicDataServices = new ClinicDataService()
