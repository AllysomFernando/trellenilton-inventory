import { ClienteModel } from '@/domain/models/cliente'
import { UseCase as DefaultUseCase } from '../use-case'
import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace GetClientByIdUseCase {
  export type Input = {
    id: number
  }

  export type Output = ClienteModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private clienteRepository: ClienteRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Id é obrigatório.')
      }
      try {
        const entity = await this.clienteRepository.findById(input.id)
        if (!entity) {
          throw new BadRequestError('Cliente não encontrado.')
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Falha ao buscar o cliente.')
      }
    }
  }
}
