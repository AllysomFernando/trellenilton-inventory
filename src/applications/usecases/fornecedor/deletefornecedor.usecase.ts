import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'
import { UseCase as DefaultUseCase } from '../use-case'

export namespace DeleteFornecedorUseCase {
  export type Input = {
    id: number
  }
  export type Output = void
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private fornecedorRepository: FornecedorRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new Error('Id é obrigatório.')
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
