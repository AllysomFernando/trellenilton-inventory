import { PedidoModels } from '@/domain/models/pedido'
import { UseCase as DefaultUseCase } from '../use-case'
import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace CreatePedidoUseCase {
  export type Input = {
    data: Date
    clienteId: number
    status: string
    total: number
  }

  export type Output = PedidoModels

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private pedidoRepository: PedidoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.data || !input.clienteId || !input.status || !input.total) {
        throw new BadRequestError(
          'Data, clienteId, status e total são obrigatórios.'
        )
      }
      const pedido = new PedidoModels()
      pedido.data = input.data
      pedido.clienteId = input.clienteId
      pedido.status = input.status
      pedido.total = input.total
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
