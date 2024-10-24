export enum PedidoStatus {
  Pendente = 'Pendente',
  Concluido = 'Concluído'
}

export class PedidoModel {
  id: number
  data: string
  clienteId: number
  status: PedidoStatus.Concluido | PedidoStatus.Pendente
  total: number
  itens: { produtoId: number; quantidade: number; preco: number }[]
}
