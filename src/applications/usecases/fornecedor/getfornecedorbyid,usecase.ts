import { FornecedorModel } from '@/domain/models/fornecedor'
import { UseCase as DefaultUseCase } from '../use-case'
import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace GetFornecedorByIdUseCase {
  export type Input = {
    id: number
  }

  export type Output = FornecedorModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private fornecedorRepository: FornecedorRepository) {}
    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('ID é obrigatório.')
      }
      try {
        const entity = await this.fornecedorRepository.findById(input.id)
        if (!entity) {
          throw new BadRequestError(
            'Falha ao buscar o fornecedor com id informado.'
          )
        }
        return entity
      } catch (e) {
        throw new BadRequestError(
          'Falha ao buscar o fornecedor com id informado.'
        )
      }
    }
  }
}
