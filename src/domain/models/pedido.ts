export class PedidoModel {
  id: number
  data: Date
  clienteId: number
  status: Enumerator<'Pendente' | 'Concluído'>
  total: number
}
