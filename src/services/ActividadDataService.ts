import { API } from 'src/common/api'
import { IActividadFisica } from 'src/interfaces/ActividadFisica'

import { IResponse } from 'src/interfaces/Response'

class ActividadDataService {
  async getActividades (): Promise<IResponse<IActividadFisica[]>> {
    let response = await API.get('show/actividades-fisicas', {})
    return response.data
  }
}

export const actividadDataServices = new ActividadDataService()
