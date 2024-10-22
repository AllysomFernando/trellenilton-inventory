import { PedidoStatus } from '@/domain/models/pedido'

export class PedidoDto {
  data: Date
  clienteId: number
  status: PedidoStatus
  total: number
}
