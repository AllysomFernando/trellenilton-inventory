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

  async findAll(): Promise<TransacaoModel[]> {
    const transacoes = await this.transacaoRepository.find({
      relations: ['produto', 'pedido']
    })
    return transacoes.map((transacao) => this.toTransacao(transacao))
  }

  async findById(id: number): Promise<TransacaoModel> {
    const transacao = await this.transacaoRepository.findOne({
      where: { id },
      relations: ['produto', 'pedido'] 
    })
    return transacao ? this.toTransacao(transacao) : null
  }

  async save(transacao: TransacaoModel): Promise<TransacaoModel> {
    const entity = this.transacaoRepository.create(transacao)
    await this.transacaoRepository.save(entity)
    return this.toTransacao(entity)
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.transacaoRepository.findOneBy({ id })
    if (!entity) return false

    await this.transacaoRepository.remove(entity)
    return true
  }

  private toTransacao(transacaoEntity: Transacao): TransacaoModel {
    return {
      id: transacaoEntity.id,
      tipo: transacaoEntity.tipo as TransacaoEnum,
      data: transacaoEntity.data,
      valor: transacaoEntity.valor,
      produtoId: transacaoEntity.produto.id,
      pedidoId: transacaoEntity.pedido.id
    }
  }
}
