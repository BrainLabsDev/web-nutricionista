import { API } from 'src/common/api'
import { IProducto } from 'src/interfaces/Producto'
import { IResponse } from 'src/interfaces/Response'

const route = 'producto'

class ProductoDataService {
  async getProductos (): Promise<IResponse<IProducto[]>> {
    let response = await API.get('show/productos', {})
    return response.data
  }

  async getProductoById (id:string): Promise<IResponse<IProducto>> {
    let response = await API.get(`show/producto/${id}`, {})
    return response.data
  }

  async saveProducto (data: IProducto): Promise<IResponse<IProducto>> {
    let response = await API.post(`create/producto`, { data })
    return response.data
  }
  async updateProducto (
    id: string,
    data: IProducto
  ): Promise<IResponse<IProducto>> {
    let response = await API.post(`update/producto/${id}`, { data })
    return response.data
  }
}

export const productoDataServices = new ProductoDataService()
