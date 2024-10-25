import { TransacaoEnum, TransacaoModel } from '@/domain/models/transacao'
import { UseCase as DefaultUseCase } from '../use-case'
import { TransacaoRepository } from '@/domain/repository/transacao.repository'
import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace CreateTransacoesUseCase {
  export type Input = {
    data: string
    tipo: TransacaoEnum.Entrada | TransacaoEnum.Saida
    valor: number
    produtoId: number
    pedidoId: number
  }

  export type Output = TransacaoModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private transacaoRepository: TransacaoRepository,
      private produtoRepository: ProdutoRepository,
      private pedidoRepository: PedidoRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (
        !input.data ||
        !input.tipo ||
        !input.valor ||
        !input.produtoId ||
        !input.pedidoId
      ) {
        throw new BadRequestError(
          'Data, tipo, valor, id do produto e id do pedido são obrigatórios.'
        )
      }
      if (input.valor <= 0) {
        throw new BadRequestError(
          'O valor da transação deve ser maior que zero.'
        )
      }

      const produto = await this.produtoRepository.findById(input.produtoId)

      if (!produto) {
        throw new BadRequestError('Produto não encontrado.')
      }

      const pedido = await this.pedidoRepository.findById(input.pedidoId)

      if (!pedido) {
        throw new BadRequestError('Pedido não encontrado.')
      }

      const transacao = new TransacaoModel()
      transacao.data = input.data
      transacao.pedidoId = pedido.id
      transacao.produtoId = produto.id
      transacao.tipo = input.tipo
      transacao.valor = input.valor

      try {
        const entity = await this.transacaoRepository.save(transacao)

        if (!entity) {
          throw new BadRequestError('Falha na transação.')
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Falha na transação.')
      }
    }
  }
}
