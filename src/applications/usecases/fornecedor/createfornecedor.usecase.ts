import { FornecedorModel } from '@/domain/models/fornecedor'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'

export namespace CreateFornecedorUseCase {
  export type Input = {
    name: string
    cnpj: string
    endereco: string
    contato: string
  }

  export type Output = FornecedorModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private fornecedorRepository: FornecedorRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.name || !input.cnpj || !input.contato) {
        throw new BadRequestError('Nome, CNPJ e Contato são obrigatórios.')
      }
      const fornecedor = new FornecedorModel()
      fornecedor.name = input.name
      fornecedor.cnpj = input.cnpj
      fornecedor.endereco = input.endereco
      fornecedor.contato = input.contato
      try {
        const entity = await this.fornecedorRepository.save(fornecedor)
        if (!entity) {
          throw new BadRequestError('Falha ao salvar o fornecedor.')
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Falha ao salvar o fornecedor.')
      }
    }
  }
}
