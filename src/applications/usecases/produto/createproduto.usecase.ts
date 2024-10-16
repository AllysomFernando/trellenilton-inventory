import { ProdutoModel } from '@/domain/models/produto'
import { UseCase as DefaultUseCase } from '../use-case'
import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace CreateProdutoUseCase {
  export type Input = {
    name: string
    description: string
    price: number
    quantity: number
    image: string
    fornecedorId: number
  }

  export type Output = ProdutoModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private produtoRepository: ProdutoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (
        !input.name ||
        !input.description ||
        input.price === null ||
        input.price === undefined ||
        input.quantity === null ||
        input.quantity === undefined ||
        !input.image ||
        input.fornecedorId === null ||
        input.fornecedorId === undefined
      ) {
        throw new BadRequestError(
          'Nome, descrição, preço, quantidade, imagem e id do fornecedor são obrigatórios.'
        )
      }

      //TODO: implementar logica de verificar o id do fornecedor antes de salvar o produto, se o fornecedor nao existir retornar um erro
      const produto = new ProdutoModel()
      produto.name = input.name
      produto.description = input.description
      produto.price = input.price
      produto.quantity = input.quantity
      produto.image = input.image
      produto.fornecedorId = input.fornecedorId

      try {
        const entity = await this.produtoRepository.save(produto)
        if (!entity) {
          throw new BadRequestError('Falha ao salvar o produto.')
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Falha ao salvar o produto.')
      }
    }
  }
}
