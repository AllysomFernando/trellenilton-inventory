import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { PedidoRepository } from '@/domain/repository/pedido.repository'

export namespace DeleteClienteUseCase {
  export type Input = {
    id: number
  }

  export type Output = boolean

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private clienteRepository: ClienteRepository,
      private pedidoRepository: PedidoRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new Error('Id é obrigatório.')
      }
      const verifyPedido = await this.pedidoRepository.findByClienteId(input.id)
      try {
        if (verifyPedido.length > 0) {
          const entity = await this.clienteRepository.archive(input.id)
          if (!entity) {
            throw new BadRequestError('Cliente não arquivado')
          }
          return entity
        }
        const entity = await this.clienteRepository.delete(input.id)
        if (!entity) {
          throw new BadRequestError('Cliente não deletado')
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Falha ao deletar o cliente.')
      }
    }
  }
}
