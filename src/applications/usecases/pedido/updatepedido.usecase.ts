import { PedidoModel } from '@/domain/models/pedido'
import { UseCase as DefaultUseCase } from '../use-case'
import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { GetPedidoByIdUseCase } from './getpedidobyid.usecase'
import { GetClientByIdUseCase } from '../cliente/getclientbyid.usecase'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace UpdatePedidoUseCase {
  export type Input = {
    id: number
    data: Date
    clienteId: number
    status: string
    total: number
  }

  export type Output = PedidoModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private pedidoRepository: PedidoRepository,
      private getPedidoByIdUseCase: GetPedidoByIdUseCase.UseCase,
      private getClienteByIdUseCase: GetClientByIdUseCase.UseCase
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new Error('Id é obrigatório.')
      }

      const existingPedido = await this.getPedidoByIdUseCase.execute({
        id: input.id
      })

      if (!existingPedido) {
        throw new BadRequestError('Pedido não encontrado.')
      }
      if (!input.data && !input.clienteId && !input.status && !input.total) {
        throw new BadRequestError('Informe ao menos um campo para atualização.')
      }
      const cliente = await this.getClienteByIdUseCase.execute({
        id: input.clienteId
      })
      if (!cliente) {
        throw new BadRequestError('Cliente não encontrado.')
      }
      const pedido = new PedidoModel()
      pedido.id = input.id
      pedido.data = input.data
      pedido.clienteId = input.clienteId
      pedido.status = input.status
      pedido.total = input.total
      try {
        const entity = await this.pedidoRepository.update(pedido)
        if (!entity) {
          throw new BadRequestError('Falha ao atualizar o pedido.')
        }
        return entity
      } catch (error) {
        throw new BadRequestError('Falha ao atualizar o pedido.')
      }
    }
  }
}
