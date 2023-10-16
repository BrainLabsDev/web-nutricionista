import IAuditable from './Auditable'

export interface ISubscription extends IAuditable {
  id: number
  sku: string
  nombre: string
  representacion_numerica: number
  precio: number
  descuento: number
}
