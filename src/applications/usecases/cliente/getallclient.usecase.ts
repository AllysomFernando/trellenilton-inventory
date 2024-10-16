import { ClienteModel } from '@/domain/models/cliente'
import { UseCase as DefaultUseCase } from '../use-case'
import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace GetAllClientUseCase {
  export type Output = ClienteModel[]

  export class UseCase implements DefaultUseCase<void, Output> {
    constructor(private clienteRepository: ClienteRepository) {}

    async execute(): Promise<Output> {
      try {
        const entity = await this.clienteRepository.findAll()
        if (!entity) {
          throw new BadRequestError('Clientes não encontrados.')
        }
        return entity
      } catch (error) {
        throw new BadRequestError('Falha ao buscar os clientes.')
      }
    }
  }
}
