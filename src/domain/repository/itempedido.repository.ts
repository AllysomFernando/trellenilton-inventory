import { ItemPedidoModel } from '../models/itemPedido'

export interface ItemPedidoRepository {
  save: (itemPedido: ItemPedidoModel) => Promise<ItemPedidoModel>
  update: (itemPedido: ItemPedidoModel) => Promise<ItemPedidoModel>
  findById: (id: number) => Promise<ItemPedidoModel>
  delete: (id: number) => Promise<boolean>
}
