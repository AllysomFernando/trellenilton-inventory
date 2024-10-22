import { TransacaoEnum } from '@/domain/models/transacao'

export class CreateTransacaoDto {
  id: string
  tipo: TransacaoEnum
  data: Date
  valor: number
  produtoId: number
  pedidoId: number
}
