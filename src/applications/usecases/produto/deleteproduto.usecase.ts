import { ProdutoModel } from '@/domain/models/produto'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { ProdutoRepository } from '@/domain/repository/produto.repository'

export namespace DeleteProdutoUseCase {
  export type Input = {
    id: number
  }

  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private produtoRepository: ProdutoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new Error('Id é obrigatório.')
      }
      try {
        const entity = await this.produtoRepository.delete(input.id)
        if (!entity) {
          throw new BadRequestError('Falha ao deletar o produto.')
        }
      } catch (e) {
        throw new BadRequestError('Falha ao deletar o produto.')
      }
    }
  }
}
