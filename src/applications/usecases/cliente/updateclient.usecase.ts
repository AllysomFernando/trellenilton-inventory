import { ClienteModel } from '@/domain/models/cliente'
import { UseCase as DefaultUseCase } from '../use-case'
import { ClienteRepository } from '@/domain/repository/cliente.repository'

export namespace UpdateClienteUseCase {
  export type Input = {
    id: number
    nome: string
    cpf_cnpj: string
    contato: string
    endereco: string
  }

  export type Output = ClienteModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private clienteRepository: ClienteRepository) {}

    async execute(input: Input): Promise<ClienteModel> {
      if (!input.id) {
        throw new Error('Id é obrigatório.')
      }
      const cliente = new ClienteModel()
      cliente.id = input.id
      cliente.name = input.nome
      cliente.cpf_cnpj = input.cpf_cnpj
      cliente.contato = input.contato
      cliente.endereco = input.endereco
      try {
        const entity = await this.clienteRepository.update(cliente)
        if (!entity) {
          throw new Error('Falha ao atualizar o cliente.')
        }
        return entity
      } catch (e) {
        throw new Error('Falha ao atualizar o cliente.')
      }
    }
  }
}