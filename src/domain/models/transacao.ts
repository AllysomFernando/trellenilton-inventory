import { TransacaoEnum } from "@/applications/enum/transacao.enum"


export class TransacaoModel {
  id: number
  tipo: TransacaoEnum
  data: string
  valor: number
  produtoId: number
  pedidoId: number
}
