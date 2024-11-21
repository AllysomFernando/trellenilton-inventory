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
      const entities = await this.itemPedidoRepository.findAll()
      
      const validEntities = entities.filter(item => item !== null);
      
      if (!validEntities || validEntities.length === 0) {
        throw new BadRequestError('Itens do pedido não encontrados.')
      }

      return validEntities.map((item) => ({
        id: item.id,
        pedidoId: item.pedidoId,
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario
      }))
    }
  }
}
