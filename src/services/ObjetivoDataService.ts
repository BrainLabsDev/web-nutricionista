import { API } from 'src/common/api'
import { IObjetivo } from 'src/interfaces/Objetivo'
import { IResponse } from 'src/interfaces/Response'

class ObjetivoDataService {
  async getObjetivos (): Promise<IResponse<IObjetivo[]>> {
    let response = await API.get('show/objetivos', {})
    return response.data
  }
}

export const objetivoDataServices = new ObjetivoDataService()
