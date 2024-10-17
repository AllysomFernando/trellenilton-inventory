import { ItemPedidoModel } from '@/domain/models/itemPedido'
import { UseCase as DefaultUseCase } from '@/applications/usecases/use-case'
import { ItemPedidoRepository } from '@/domain/repository/itempedido.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace GetItemPedidoByIdUseCase {
  export type Input = {
    id: number
  }

  export type Output = ItemPedidoModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private itemPedidoRepository: ItemPedidoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Id do item do pedido não informado')
      }
      try {
        const itemPedido = await this.itemPedidoRepository.findById(input.id)

        if (!itemPedido) {
          throw new BadRequestError('Item do pedido não encontrado')
        }

        return itemPedido
      } catch (error) {
        throw new BadRequestError('Erro ao buscar item do pedido')
      }
    }
  }
}
