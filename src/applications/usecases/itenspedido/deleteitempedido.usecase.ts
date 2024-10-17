import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { UseCase as DefaultUseCase } from '@/applications/usecases/use-case'
import { ItemPedidoRepository } from '@/domain/repository/itempedido.repository'

export namespace DeleteItemPedidoUseCase {
  export type Input = {
    id: number
  }

  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private itemPedidoRepository: ItemPedidoRepository) {}

    async execute(input: Input): Promise<Output> {
      const itemPedido = await this.itemPedidoRepository.findById(input.id)
      if (!itemPedido) {
        throw new BadRequestError('Item do pedido não encontrado.')
      }
      try {
        const deleted = await this.itemPedidoRepository.delete(input.id)
        if (!deleted) {
          throw new BadRequestError('Erro ao deletar item do pedido.')
        }
      } catch (e) {
        throw new BadRequestError('Erro ao deletar item do pedido.')
      }
    }
  }
}
