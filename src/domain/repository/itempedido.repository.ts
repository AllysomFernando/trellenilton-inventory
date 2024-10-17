import { ItemPedidoModel } from '../models/itemPedido'

export interface ItemPedidoRepository {
  save: (pedidoId: number, produtoId: number) => Promise<ItemPedidoModel>
}
