import { ItemPedidoModel } from '@/domain/models/itemPedido'
import { UseCase as DefaultUseCase } from '@/applications/usecases/use-case'
import { ItemPedidoRepository } from '@/domain/repository/itempedido.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { PedidoRepository } from '@/domain/repository/pedido.repository'
export namespace UpdateItemPedidoUseCase {
  export type Input = {
    id: number
    pedidoId: number
    produtoId: number
    quantidade: number
    precoUnitario: number
  }

  export type Output = ItemPedidoModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private itemPedidoRepository: ItemPedidoRepository,
      private produtoRepository: ProdutoRepository,
      private pedidoRepository: PedidoRepository
    ) {}

    async execute(input: Input): Promise<ItemPedidoModel> {
      if (!input.id) {
        throw new BadRequestError('Id é obrigatório')
      }
      if (this.produtoRepository.findById(input.produtoId) === null) {
        throw new BadRequestError('Produto não encontrado')
      }
      if (this.pedidoRepository.findById(input.pedidoId) === null) {
        throw new BadRequestError('Pedido não encontrado')
      }
      if (input.quantidade <= 0 && input.precoUnitario <= 0) {
        throw new BadRequestError(
          'Quantidade deve ser maior que 0 e preço unitário deve ser maior que 0'
        )
      }
      if (Number.isInteger(input.precoUnitario) === false) {
        throw new BadRequestError(
          'Preço unitário precisa ser um número inteiro.'
        )
      }
      const itemPedido = new ItemPedidoModel()
      itemPedido.id = input.id
      itemPedido.pedidoId = input.pedidoId
      itemPedido.produtoId = input.produtoId
      itemPedido.quantidade = input.quantidade
      itemPedido.precoUnitario = input.precoUnitario

      try {
        const entity = await this.itemPedidoRepository.update(
          itemPedido.id,
          itemPedido.pedidoId,
          itemPedido.produtoId,
          itemPedido.quantidade,
          itemPedido.precoUnitario
        )
        if (!entity) {
          throw new BadRequestError('Erro ao atualizar item pedido')
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Erro ao atualizar item pedido')
      }
    }
  }
}
