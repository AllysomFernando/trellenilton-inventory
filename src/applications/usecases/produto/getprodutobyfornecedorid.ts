import { ProdutoModel } from '@/domain/models/produto'
import { UseCase as DefaultUseCase } from '../use-case'
import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace GetProdutoByFornecedorIdUseCase {
  export type Input = {
    fornecedorId: number
  }

  export type Output = ProdutoModel[]

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private produtoRepository: ProdutoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.fornecedorId) {
        throw new BadRequestError('ID do fornecedor eh obrigatório.')
      }
      try {
        const entity = await this.produtoRepository.findByFornecedorId(
          input.fornecedorId
        )
        if (!entity) {
          throw new BadRequestError(
            'Falha ao buscar os produtos com id do fornecedor informado.'
          )
        }
        return entity
      } catch (e) {
        throw new BadRequestError(
          'Falha ao buscar os produtos com id do fornecedor informado.'
        )
      }
    }
  }
}
