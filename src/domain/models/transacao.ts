export enum TransacaoEnum {
  Entrada = 'Entrada',
  Saida = 'Saída'
}

export class TransacaoModel {
  id: number
  tipo: TransacaoEnum.Entrada | TransacaoEnum.Saida
  data: string
  valor: number
  produtoId: number
  pedidoId: number
}
