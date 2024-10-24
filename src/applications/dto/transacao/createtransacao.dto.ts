import { TransacaoEnum } from '@/domain/models/transacao'

export class CreateTransacaoDto {
  tipo: TransacaoEnum
  data: string
  valor: number
  produtoId: number
  pedidoId: number
}
