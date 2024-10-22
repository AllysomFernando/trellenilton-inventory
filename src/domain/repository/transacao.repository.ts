import { TransacaoModel } from '../models/transacao'

export interface TransacaoRepository {
  save(transacao: TransacaoModel): Promise<TransacaoModel>
  findById(id: number): Promise<TransacaoModel>
  findAll(): Promise<TransacaoModel[]>
  delete(id: number): Promise<boolean>
}
