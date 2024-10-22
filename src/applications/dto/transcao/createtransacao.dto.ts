import { TransacaoEnum } from '@/domain/models/transacao'

export class CreateTransacaoDto {
  tipo: TransacaoEnum
  data: Date
  valor: number
  produtoId: number
  pedidoId: number
}
