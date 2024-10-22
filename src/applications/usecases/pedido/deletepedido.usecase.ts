import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace DeletePedidoUseCase {
  export type Input = {
    id: number
  }
  export type Output = boolean

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private pedidoRepository: PedidoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Id é obrigatório.')
      }
      const pedido = await this.pedidoRepository.findById(input.id)
      if (!pedido) {
        throw new BadRequestError('Pedido não encontrado.')
      }
      try {
        const result = await this.pedidoRepository.delete(input.id)
        if (!result) {
          throw new BadRequestError('Pedido deletion failed')
        }
        return result
      } catch (e) {
        throw new BadRequestError('Erro ao deletar pedido.')
      }
    }
  }
}
