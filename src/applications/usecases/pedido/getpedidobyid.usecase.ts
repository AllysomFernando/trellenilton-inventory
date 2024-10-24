import { PedidoModel } from '@/domain/models/pedido'
import { UseCase as DefaultUseCase } from '../use-case'
import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace GetPedidoByIdUseCase {
  export type Input = {
    id: number
  }

  export type Output = PedidoModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private pedidoRepository: PedidoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Id do pedido é obrigatório.')
      }
      try {
        const entity = await this.pedidoRepository.findById(input.id)

        if (!entity) {
          throw new BadRequestError('Pedido não encontrado.')
        }
        return entity
      } catch (error) {
        throw new BadRequestError('Falha ao buscar o pedido.')
      }
    }
  }
}
