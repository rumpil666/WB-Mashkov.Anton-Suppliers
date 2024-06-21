export interface IProduct {
  id: number
  date: Date | string
  city: string
  count: number
  type: string
  warehouse: {
    name: string
    address: string
  }
  status: string
}