import { PedidoModel } from '@/domain/models/pedido'
import { UseCase as DefaultUseCase } from '../use-case'
import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { PedidoEnum } from '@/applications/enum/pedido.enum'

export namespace CreatePedidoUseCase {
  export type Input = {
    data: string
    clienteId: number
    status: PedidoEnum
    itens: { produtoId: number; quantidade: number; preco: number }[]
  }

  export type Output = PedidoModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private pedidoRepository: PedidoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (
        !input.data ||
        !input.clienteId ||
        !input.status ||
        !Array.isArray(input.itens) ||
        input.itens.length === 0
      ) {

        if (!input.data) console.log('Missing: data')
        if (!input.clienteId) console.log('Missing: clienteId')
        if (!input.status) console.log('Missing: status')
        if (!Array.isArray(input.itens)) console.log('itens is not an array')
        if (input.itens?.length === 0) console.log('itens array is empty')

        throw new BadRequestError(
          'data, clienteId, status e itens são obrigatórios.'
        )
      }

      const total = input.itens.reduce(
        (sum, item) => sum + item.quantidade * item.preco,
        0
      )

      const pedido = new PedidoModel()
      pedido.data = input.data
      pedido.clienteId = input.clienteId
      pedido.status = input.status
      pedido.total = total
      pedido.itens = input.itens.map((item) => ({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        preco: item.preco
      }))
      try {
        const entity = await this.pedidoRepository.save(pedido)
        if (!entity) {
          throw new BadRequestError('Erro ao criar pedido.')
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Erro ao criar pedido.')
      }
    }
  }
}
