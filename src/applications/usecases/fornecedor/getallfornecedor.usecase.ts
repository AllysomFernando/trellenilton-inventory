import { FornecedorModel } from '@/domain/models/fornecedor'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'

export namespace GetAllFornecedorUseCase {
  export type Output = FornecedorModel[]

  export class UseCase implements DefaultUseCase<void, Output> {
    constructor(private fornecedorRepository: FornecedorRepository) {}
    async execute(): Promise<Output> {
      try {
        const entity = await this.fornecedorRepository.findAll()
        if (!entity) {
          throw new BadRequestError('Fornecedores não encontrados.')
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Falha ao buscar os fornecedores.')
      }
    }
  }
}
