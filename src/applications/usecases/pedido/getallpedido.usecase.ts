import { PedidoModels } from '@/domain/models/pedido'
import { UseCase as DefaultUseCase } from '../use-case'
import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace GetAllPedidoUseCase {
  export type Output = PedidoModels[]

  export class UseCase implements DefaultUseCase<void, Output> {
    constructor(private pedidoRepository: PedidoRepository) {}

    async execute(): Promise<Output> {
      try {
        const entity = await this.pedidoRepository.findAll()
        if (!entity) {
          throw new BadRequestError('Pedidos não encontrados.')
        }
        return entity
      } catch (error) {
        throw new BadRequestError('Falha ao buscar os pedidos.')
      }
    }
  }
}
