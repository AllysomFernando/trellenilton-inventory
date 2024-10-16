import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'
import { UseCase as DefaultUseCase } from '../use-case'
import { ProdutoRepository } from '@/domain/repository/produto.repository'

export namespace DeleteFornecedorUseCase {
  export type Input = {
    id: number
  }
  export type Output = void
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private fornecedorRepository: FornecedorRepository,
      private produtoRepository: ProdutoRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new Error('Id é obrigatório.')
      }
      const produtos = await this.produtoRepository.findByFornecedorId(input.id)
      if (produtos.length > 0) {
        throw new Error(
          'Não é possível deletar o fornecedor, pois existem produtos associados a ele.'
        )
      }
      try {
        const entity = await this.fornecedorRepository.delete(input.id)
        if (!entity) {
          throw new Error('Falha ao deletar o fornecedor.')
        }
      } catch (e) {
        throw new Error('Falha ao deletar o fornecedor.')
      }
    }
  }
}
