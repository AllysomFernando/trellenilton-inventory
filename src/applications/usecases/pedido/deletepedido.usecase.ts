import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'


export namespace DeletePedidoUseCase {
  export type Input = {
    id: number
  }
  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private pedidoRepository: PedidoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Id é obrigatório.')
      }
      try {
        await this.pedidoRepository.delete(input.id)
      } catch (e) {
        throw new BadRequestError('Erro ao deletar pedido.')
      }
    }
  }
}
