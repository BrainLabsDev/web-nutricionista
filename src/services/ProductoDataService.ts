import { API } from 'src/common/api'
import { IProducto } from 'src/interfaces/Producto'
import { IResponse } from 'src/interfaces/Response'
import { ISubscription } from 'src/interfaces/Subscription'

import { useAuthStore } from 'src/stores/auth'
const store = useAuthStore()

const { deleteLocalStorage } = store

class ProductoDataService {
  async getProductos (): Promise<IResponse<IProducto[]>> {
    let response
    try {
      response = await API.get('show/productos', {})
    } catch (error) {
      deleteLocalStorage()
    }
    return response!.data
  }

  async getSubscriptions (): Promise<IResponse<ISubscription[]>> {
    let response
    try {
      response = await API.get('paypal/catalogo', {})
    } catch (error) {
      deleteLocalStorage()
    }
    return response!.data
  }

  async getProductoById (id: string): Promise<IResponse<IProducto>> {
    let response
    try {
      response = await API.get(`show/producto/${id}`, {})
    } catch (error) {
      deleteLocalStorage()
    }
    return response!.data
  }

  async saveProducto (data: IProducto): Promise<IResponse<IProducto>> {
    let response
    try {
      response = await API.post(`create/producto`, { data })
    } catch (error) {
      deleteLocalStorage()
    }
    return response!.data
  }
  async updateProducto (
    id: string,
    data: IProducto
  ): Promise<IResponse<IProducto>> {
    let response
    try {
      response = await API.post(`update/producto/${id}`, { data })
    } catch (error) {
      deleteLocalStorage()
    }
    return response!.data
  }

  async deleteProducto (id: string): Promise<IResponse<IProducto>> {
    let response
    try {
      response = await API.delete(`delete/producto/${id}`, {})
    } catch (error) {
      deleteLocalStorage()
    }
    return response!.data
  }
}

export const productoDataServices = new ProductoDataService()
