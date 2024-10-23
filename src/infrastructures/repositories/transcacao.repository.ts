import { TransacaoRepository } from '@/domain/repository/transacao.repository'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Transacao } from '../entities/transacao'
import { Repository } from 'typeorm'
import { TransacaoEnum, TransacaoModel } from '@/domain/models/transacao'

@Injectable()
export class TransacaoRepositoryOrm implements TransacaoRepository {
  constructor(
    @InjectRepository(Transacao)
    private readonly transacaoRepository: Repository<Transacao>
  ) {}

  async findAll(): Promise<Transacao[]> {
    const transacoes = await this.transacaoRepository.find()
    if (!transacoes || transacoes.length === 0) {
      return []
    }
    return transacoes
  }

  async findById(id: number): Promise<TransacaoModel> {
    const transacao = await this.transacaoRepository.findOneBy({ id })
    if (!transacao) {
      return null
    }
    return this.toTransacao(transacao)
  }

  async save(transacao: TransacaoModel): Promise<TransacaoModel> {
    const entity = this.transacaoRepository.create(transacao)
    await this.transacaoRepository.save(entity)
    return this.toTransacao(entity)
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.transacaoRepository.findOneBy({ id })
    if (!entity) {
      return false
    }
    await this.transacaoRepository.remove(entity)
    return true
  }

  private toTransacao(transacaoEntity: Transacao): TransacaoModel {
    const transacao = new TransacaoModel()

    transacao.id = transacaoEntity.id
    transacao.data = transacaoEntity.data
    transacao.produtoId = transacaoEntity.produtoId
    transacao.pedidoId = transacaoEntity.pedidoId
    transacao.tipo = transacaoEntity.tipo as TransacaoEnum
    transacao.valor = transacaoEntity.valor

    return transacao
  }
}
