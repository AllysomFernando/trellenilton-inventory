import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

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
      //TODO: quando implementar o usecase de itenspedidos verificar se o cliente possui algum item relacionado com ele.
      try {
        const entity = await this.clienteRepository.findById(input.id)
        if (!entity) {
          throw new BadRequestError('Cliente não encontrado.')
        }
      } catch (e) {
        throw new BadRequestError('Falha ao deletar o cliente.')
      }
    }
  }
}
