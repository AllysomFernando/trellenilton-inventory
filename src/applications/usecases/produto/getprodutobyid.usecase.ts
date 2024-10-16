import { ProdutoModel } from '@/domain/models/produto'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { ProdutoRepository } from '@/domain/repository/produto.repository'

export namespace GetProdutoByIdUseCase {
  export type Input = {
    id: number
  }

  export type Output = ProdutoModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private produtoRepository: ProdutoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Id é obrigatório.')
      }
      try {
        const entity = await this.produtoRepository.findById(input.id)
        if (!entity) {
          throw new BadRequestError(
            'Falha ao buscar o produto com id informado.'
          )
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Produto não encontrado.')
      }
    }
  }
}
