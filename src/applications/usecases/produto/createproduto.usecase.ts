import { ProdutoModel } from '@/domain/models/produto'
import { UseCase as DefaultUseCase } from '../use-case'
import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { GetFornecedorByIdUseCase } from '../fornecedor/getfornecedorbyid,usecase'
import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'

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
    constructor(
      private produtoRepository: ProdutoRepository,
      private fornecedorRepository: FornecedorRepository
    ) {}

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
      if (input.price <= 0) {
        throw new BadRequestError('O preço do produto deve ser maior que zero.')
      }
      if (input.quantity > 0 && Number.isInteger(input.quantity) === false) {
        throw new BadRequestError(
          'A quantidade do produto deve ser maior que zero.'
        )
      }

      const fornecedor = await this.fornecedorRepository.findById(
        input.fornecedorId
      )

      if (!fornecedor) {
        throw new BadRequestError('Fornecedor não encontrado.')
      }

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
