export enum TransacaoEnum {
  Entrada = 'Entrada',
  Saida = 'Saída'
}

export class TransacaoModel {
  id: number
  tipo: TransacaoEnum.Entrada | TransacaoEnum.Saida
  data: Date
  valor: number
  produtoId: number
  pedidoId: number
}
