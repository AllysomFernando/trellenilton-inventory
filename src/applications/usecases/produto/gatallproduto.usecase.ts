import { ProdutoModel } from '@/domain/models/produto'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { ProdutoRepository } from '@/domain/repository/produto.repository'
export namespace GatAllProdutoUseCase {
  export type Input = {
    page: number
    limit: number
  }

  export type Output = ProdutoModel[]

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private produtoRepository: ProdutoRepository) {}

    async execute(input: Input): Promise<Output> {
      try {
        const entity = await this.produtoRepository.findAll()

        if (!entity) {
          throw new BadRequestError('Produtos não encontrados.')
        }
        return entity
      } catch (error) {
        throw new BadRequestError('Falha ao buscar os produtos.')
      }
    }
  }
}
