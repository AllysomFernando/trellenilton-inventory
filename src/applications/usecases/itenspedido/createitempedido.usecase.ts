import { ItemPedidoModel } from '@/domain/models/itemPedido'
import { UseCase as DefaultUseCase } from '@/applications/usecases/use-case'
import { ItemPedidoRepository } from '@/domain/repository/itempedido.repository'
import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { TransacaoModel } from '@/domain/models/transacao'
import { TransacaoEnum } from '@/applications/enum/transacao.enum'
import { TransacaoRepository } from '@/domain/repository/transacao.repository'

export namespace CreateItemPedidoUseCase {
  export type Input = {
    pedidoId: number
    produtoId: number
    quantidade: number
    precoUnitario: number
  }

  export type Output = ItemPedidoModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private itemPedidoRepository: ItemPedidoRepository,
      private pedidoRepository: PedidoRepository,
      private produtoRepository: ProdutoRepository,
      private transacaoRepository: TransacaoRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (input.quantidade <= 0 || input.precoUnitario <= 0) {
        throw new BadRequestError(
          'Quantidade ou preço unitário precisam ser maior que 0.'
        )
      }

      if (Number.isInteger(input.precoUnitario) === false) {
        throw new BadRequestError(
          'Preço unitário precisa ser um número inteiro.'
        )
      }

      const pedido = await this.pedidoRepository.findById(input.pedidoId)
      if (!pedido) {
        throw new BadRequestError('Pedido não encontrado.')
      }

      const produto = await this.produtoRepository.findById(input.produtoId)
      if (!produto) {
        throw new BadRequestError('Produto não encontrado.')
      }

      if (produto.quantity < input.quantidade) {
        throw new BadRequestError('Quantidade indisponível em estoque.')
      }

      const itemPedido = new ItemPedidoModel()
      itemPedido.pedidoId = input.pedidoId
      itemPedido.produtoId = input.produtoId
      itemPedido.quantidade = input.quantidade
      itemPedido.precoUnitario = input.precoUnitario

      const entity = await this.itemPedidoRepository.save(itemPedido)
      if (!entity) {
        throw new BadRequestError('Erro ao criar item pedido.')
      }

      produto.quantity -= input.quantidade
      await this.produtoRepository.update(produto)

      const transacao = new TransacaoModel()
      transacao.data = new Date().toISOString()
      transacao.tipo = TransacaoEnum.Saida
      transacao.valor = input.quantidade * input.precoUnitario
      transacao.produtoId = produto.id
      transacao.pedidoId = input.pedidoId

      console.log('transacao', transacao)

      await this.transacaoRepository.save(transacao)

      if (!transacao) {
        throw new BadRequestError('Erro ao criar transação')
      }

      return entity
    }
  }
}
