import { TransacaoEnum, TransacaoModel } from '@/domain/models/transacao'
import { UseCase as DefaultUseCase } from '../use-case'
import { TransacaoRepository } from '@/domain/repository/transacao.repository'
import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace CreateTransacoesUseCase {
  export type Input = {
    data: Date
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

    async execute(input: Input): Promise<TransacaoModel> {
      if (
        !input.data ||
        !input.tipo ||
        input.valor === null ||
        input.valor === undefined ||
        input.produtoId === null ||
        input.produtoId === undefined ||
        input.pedidoId === null ||
        input.pedidoId === undefined
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

      const transacao: TransacaoModel = {
        id: 0,
        data: input.data,
        tipo: input.tipo,
        valor: input.valor,
        produtoId: input.produtoId,
        pedidoId: input.pedidoId
      }

      const savedTransacao = await this.transacaoRepository.save(transacao)

      return savedTransacao
    }
  }
}
