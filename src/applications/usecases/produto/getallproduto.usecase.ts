import { ProdutoModel } from '@/domain/models/produto'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { ProdutoRepository } from '@/domain/repository/produto.repository'
export namespace GetAllProdutoUseCase {
  export type Output = ProdutoModel[]

  export class UseCase implements DefaultUseCase<void, Output> {
    constructor(private produtoRepository: ProdutoRepository) {}

    async execute(): Promise<Output> {
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
