import { ItemPedido } from '@/infrastructures/entities/itemPedido.entity'
import { UseCase as DefaultUseCase } from '@/applications/usecases/use-case'
import { ItemPedidoRepositoryOrm } from '@/infrastructures/repositories/itempedido.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace GetAllItensPedidoUseCase {
  export type Input = void
  export type Output = ItemPedido[]

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private itemPedidoRepository: ItemPedidoRepositoryOrm) {}

    async execute(): Promise<Output> {
      try {
        const entity = await this.itemPedidoRepository.findAll()
        if (!entity) {
          throw new BadRequestError('Itens do pedido não encontrados.')
        }
        return entity
      } catch (error) {
        throw new BadRequestError('Falha ao buscar os itens do pedido.')
      }
    }
  }
}
