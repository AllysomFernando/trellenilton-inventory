import { ClienteModel } from '@/domain/models/cliente'
import { UseCase as DefaultUseCase } from '../use-case'
import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { IsCPForCnpj } from '@/applications/validators/cpfcnpj.validators'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace UpdateClienteUseCase {
  export type Input = {
    id: number
    name: string
    cpf_cnpj: string
    contato: string
    endereco: string
    archived?: boolean
  }

  export type Output = ClienteModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private clienteRepository: ClienteRepository) {}

    async execute(input: Input): Promise<ClienteModel> {
      if (!input.id) {
        throw new Error('Id é obrigatório.')
      }
      const isValidCpfCnpj = IsCPForCnpj.isValid(input.cpf_cnpj)
      if (!isValidCpfCnpj) {
        throw new BadRequestError('CPF ou CNPJ inválido.')
      }
      const cliente = new ClienteModel()
      cliente.id = input.id
      cliente.name = input.name
      cliente.cpf_cnpj = input.cpf_cnpj
      cliente.contato = input.contato
      cliente.endereco = input.endereco
      try {
        const entity = await this.clienteRepository.update(cliente)
        if (!entity) {
          throw new BadRequestError('Falha ao atualizar o cliente.')
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Falha ao atualizar o cliente.')
      }
    }
  }
}
