import { ProdutoModel } from '@/domain/models/produto'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { GetProdutoByIdUseCase } from './getprodutobyid.usecase'

export namespace UpdateProdutoUseCase {
  export type Input = {
    id: number
    name: string
    description: string
    price: number
    quantity: number
    image: Express.Multer.File
    fornecedorId: number
  }

  export type Output = ProdutoModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private produtoRepository: ProdutoRepository,
      private getProdutoByIdUseCase: GetProdutoByIdUseCase.UseCase
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new Error('Id é obrigatório.')
      }

      const existingProduto = await this.getProdutoByIdUseCase.execute({
        id: input.id
      })

      if (!existingProduto) {
        throw new BadRequestError('Produto não encontrado.')
      }
      if (
        !input.name &&
        !input.description &&
        !input.price &&
        !input.quantity &&
        !input.image &&
        !input.fornecedorId
      ) {
        throw new BadRequestError('Informe ao menos um campo para atualização.')
      }
      const produto = new ProdutoModel()
      produto.id = input.id
      produto.name = input.name
      produto.description = input.description
      produto.price = input.price
      produto.quantity = input.quantity
      produto.image = input.image
      produto.fornecedorId = input.fornecedorId
      try {
        const entity = await this.produtoRepository.update(produto)
        if (!entity) {
          throw new BadRequestError('Falha ao atualizar o produto.')
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Falha ao atualizar o produto.')
      }
    }
  }
}
