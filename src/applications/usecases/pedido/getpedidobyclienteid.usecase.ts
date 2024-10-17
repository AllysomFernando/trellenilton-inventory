import { PedidoModel } from '@/domain/models/pedido'
import { UseCase as DefaultUseCase } from '../use-case'
import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace GetPedidoByClienteIdUseCase {
  export type Input = {
    clienteId: number
  }

  export type Output = PedidoModel[]

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private pedidoRepository: PedidoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.clienteId) {
        throw new BadRequestError('Id do cliente é obrigatório.')
      }

      try {
        const entity = await this.pedidoRepository.findByClienteId(
          input.clienteId
        )
        if (!entity) {
          throw new BadRequestError('Pedidos não encontrados.')
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Falha ao buscar pedidos.')
      }
    }
  }
}
