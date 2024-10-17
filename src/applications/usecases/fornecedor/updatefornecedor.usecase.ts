import { FornecedorModel } from '@/domain/models/fornecedor'
import { GetFornecedorByIdUseCase } from './getfornecedorbyid,usecase'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'
import { CNPJValidator } from '@/applications/validators/cnpj.validators'

export namespace UpdateFornecedorUseCase {
  export type Input = {
    id: number
    name: string
    cnpj: string
    contato: string
    endereco: string
  }

  export type Output = FornecedorModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private fornecedorRepository: FornecedorRepository,
      private getFornecedorById: GetFornecedorByIdUseCase.UseCase
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new Error('Id é obrigatório.')
      }

      const existingFornecedor = await this.getFornecedorById.execute({
        id: input.id
      })

      if (!existingFornecedor) {
        throw new BadRequestError('Fornecedor não encontrado.')
      }
      if (!input.name && !input.cnpj && !input.contato && !input.endereco) {
        throw new BadRequestError('Informe ao menos um campo para atualização.')
      }

      if (!CNPJValidator.isValid(input.cnpj)) {
        throw new BadRequestError('CNPJ inválido.')
      }

      const fornecedor = new FornecedorModel()
      fornecedor.id = input.id
      fornecedor.name = input.name
      fornecedor.cnpj = input.cnpj
      fornecedor.contato = input.contato
      fornecedor.endereco = input.endereco
      try {
        const entity = await this.fornecedorRepository.update(fornecedor)
        if (!entity) {
          throw new BadRequestError('Falha ao atualizar o fornecedor.')
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Falha ao atualizar o fornecedor.')
      }
    }
  }
}
