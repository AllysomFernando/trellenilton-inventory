import { ClienteModel } from '@/domain/models/cliente'
import { UseCase as DefaultUseCase } from '../use-case'
import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { IsCPForCnpj } from '@/applications/validators/cpfcnpj.validators'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace CreateClienteUseCase {
  export type Input = {
    name: string
    cpf_cnpj: string
    endereco: string
    contato: string
  }

  export type Output = ClienteModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private clienteRepository: ClienteRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.name || !input.cpf_cnpj || !input.endereco || !input.contato) {
        throw new Error('Nome, CPF/CNPJ, Endereço e Contato são obrigatórios.')
      }
      const isValidCpfCnpj = IsCPForCnpj.isValid(input.cpf_cnpj)
      if (!isValidCpfCnpj) {
        throw new BadRequestError('CPF ou CNPJ inválido.')
      }
      const cliente = new ClienteModel()
      cliente.name = input.name
      cliente.cpf_cnpj = input.cpf_cnpj
      cliente.endereco = input.endereco
      cliente.contato = input.contato
      const entity = await this.clienteRepository.save(cliente)
      console.log(entity)
      return entity
      // try {

      //   if (!entity) {
      //     throw new BadRequestError('Falha ao salvar o cliente.')
      //   }
      //   return entity
      // } catch (e) {
      //   throw new BadRequestError('Falha ao salvar o cliente.')
      // }
    }
  }
}
