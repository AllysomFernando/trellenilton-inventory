import { TransacaoEnum, TransacaoModel } from '../models/transacao'

export interface TransacaoRepository {
  save(
    data: Date,
    tipo: TransacaoEnum.Entrada | TransacaoEnum.Saida,
    valor: number,
    produtoId: number,
    pedidoId: number
  ): Promise<TransacaoModel>
  findById(id: number): Promise<TransacaoModel>
  findAll(): Promise<TransacaoModel[]>
}
