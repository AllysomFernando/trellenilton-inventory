import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { DeletePedidoUseCase } from '../deletepedido.usecase'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

describe('DeletePedidoUseCase', () => {
  let pedidoRepository: PedidoRepository
  let deletePedidoUseCase: DeletePedidoUseCase.UseCase

  beforeEach(() => {
    pedidoRepository = {
      delete: jest.fn()
    } as unknown as PedidoRepository

    deletePedidoUseCase = new DeletePedidoUseCase.UseCase(pedidoRepository)
  })

  it('should throw an error if id is not provided', async () => {
    await expect(deletePedidoUseCase.execute({ id: null })).rejects.toThrow(
      'Id é obrigatório.'
    )
  })

  it('should throw BadRequestError if pedido deletion fails', async () => {
    ;(pedidoRepository.delete as jest.Mock).mockResolvedValue(false)
    await expect(deletePedidoUseCase.execute({ id: 1 })).rejects.toThrow(
      new BadRequestError('Erro ao deletar pedido.')
    )
  })

  it('should delete pedido successfully', async () => {
    ;(pedidoRepository.delete as jest.Mock).mockResolvedValue(true)
    await expect(
      deletePedidoUseCase.execute({ id: 1 })
    ).resolves.toBeUndefined()
    expect(pedidoRepository.delete).toHaveBeenCalledWith(1)
  })

  it('should throw BadRequestError if an exception occurs during deletion', async () => {
    ;(pedidoRepository.delete as jest.Mock).mockRejectedValue(
      new BadRequestError('Some error')
    )
    await expect(deletePedidoUseCase.execute({ id: 1 })).rejects.toThrow(
      BadRequestError
    )
  })
})
