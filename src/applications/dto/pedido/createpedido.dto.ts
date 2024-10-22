import { PedidoStatus } from '@/domain/models/pedido'

export class CreatePedidoDto {
  data: Date
  clienteId: number
  status: PedidoStatus
  total: number
  itens: { produtoId: number; quantidade: number; preco: number }[]
}
