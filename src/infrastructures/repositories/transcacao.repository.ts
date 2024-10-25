import { TransacaoRepository } from '@/domain/repository/transacao.repository'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Transacao } from '../entities/transacao'
import { Repository } from 'typeorm'
import { TransacaoEnum, TransacaoModel } from '@/domain/models/transacao'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { Produto } from '../entities/produto.entity'
import { Pedido } from '../entities/pedido.entity'

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
    const produto = await this.transacaoRepository.manager.findOne(Produto, {
      where: { id: transacao.produtoId }
    })
    if (!produto) {
      throw new BadRequestError(
        `Produto com id ${transacao.produtoId} não encontrado.`
      )
    }
    const pedido = await this.transacaoRepository.manager.findOne(Pedido, {
      where: { id: transacao.pedidoId }
    })
    if (!pedido) {
      throw new BadRequestError(
        `Pedido com id ${transacao.pedidoId} não encontrado.`
      )
    }
    const entity = this.transacaoRepository.create({
      ...transacao,
      produto,
      pedido
    })
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
    if (!transacaoEntity.produto || !transacaoEntity.pedido) {
      throw new BadRequestError(
        'Produto ou Pedido não estão definidos na transação.'
      )
    }
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
