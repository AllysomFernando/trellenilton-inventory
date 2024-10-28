import { PedidoEnum } from '@/applications/enum/pedido.enum'

export class PedidoModel {
  id: number
  data: string
  clienteId: number
  status: PedidoEnum
  total: number
  itens: { produtoId: number; quantidade: number; preco: number }[]
}
