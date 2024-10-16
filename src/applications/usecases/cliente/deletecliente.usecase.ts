import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { UseCase as DefaultUseCase } from '../use-case'

export namespace DeleteClienteUseCase {
  export type Input = {
    id: number
  }

  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private clienteRepository: ClienteRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new Error('Id é obrigatório.')
      }
      try {
        const entity = await this.clienteRepository.findById(input.id)
        if (!entity) {
          throw new Error('Cliente não encontrado.')
        }
      } catch (e) {
        throw new Error('Falha ao deletar o cliente.')
      }
    }
  }
}
