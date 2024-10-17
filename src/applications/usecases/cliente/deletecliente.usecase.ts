import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { PedidoRepository } from '@/domain/repository/pedido.repository'

export namespace DeleteClienteUseCase {
  export type Input = {
    id: number
  }

  export type Output = void

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
      if (verifyPedido.length > 0) {
        throw new BadRequestError('Cliente possui pedidos.')
      }
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
