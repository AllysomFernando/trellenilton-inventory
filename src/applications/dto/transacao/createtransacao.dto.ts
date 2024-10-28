import { TransacaoEnum } from '@/applications/enum/transacao.enum'

export class CreateTransacaoDto {
  tipo: TransacaoEnum
  data: string
  valor: number
  produtoId: number
  pedidoId: number
}
