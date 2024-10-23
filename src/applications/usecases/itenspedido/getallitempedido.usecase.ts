import { UseCase as DefaultUseCase } from '@/applications/usecases/use-case'
import { ItemPedidoRepositoryOrm } from '@/infrastructures/repositories/itempedido.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { ItemPedidoModel } from '@/domain/models/itemPedido'

export namespace GetAllItensPedidoUseCase {
  export type Input = void
  export type Output = ItemPedidoModel[]

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private itemPedidoRepository: ItemPedidoRepositoryOrm) {}

    async execute(): Promise<Output> {
      try {
        const entities = await this.itemPedidoRepository.findAll()
        if (!entities || entities.length === 0) {
          throw new BadRequestError('Itens do pedido não encontrados.')
        }

        return entities.map((item) => ({
          id: item.id,
          pedidoId: item.pedidoId,
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          precoUnitario: item.precoUnitario
        }))
      } catch (error) {
        throw new BadRequestError('Falha ao buscar os itens do pedido.')
      }
    }
  }
}
