import { ItemPedidoModel } from '../models/itemPedido'

export interface ItemPedidoRepository {
  save: (
    pedidoId: number,
    produtoId: number,
    quantidade: number,
    precoUnitario: number
  ) => Promise<ItemPedidoModel>
  update: (
    id: number,
    pedidoId: number,
    produtoId: number,
    quantidade: number,
    precoUnitario: number
  ) => Promise<ItemPedidoModel>
  findById: (id: number) => Promise<ItemPedidoModel>
  delete: (id: number) => Promise<boolean>
}
