import { ItemPedidoModel } from '../models/itemPedido'

export interface ItemPedidoRepository {
  save: (
    pedidoId: number,
    produtoId: number,
    quantidade: number,
    precoUnitario: number
  ) => Promise<ItemPedidoModel>
}
