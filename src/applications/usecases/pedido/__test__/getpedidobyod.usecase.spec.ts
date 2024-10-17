import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { GetPedidoByIdUseCase } from '../getpedidobyid.usecase'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { PedidoStatus } from '@/domain/models/pedido'

const mockPedidoRepository: PedidoRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}

describe('GetPedidoByIdUseCase', () => {
  let getPedidoByIdUseCase: GetPedidoByIdUseCase.UseCase

  beforeEach(() => {
    getPedidoByIdUseCase = new GetPedidoByIdUseCase.UseCase(
      mockPedidoRepository
    )
  })

  it('should return a pedido by ID successfully', async () => {
    const pedido = {
      id: 1,
      data: '2023-10-01',
      clienteId: 1,
      status: PedidoStatus.Concluido,
      total: 100
    }

    ;(mockPedidoRepository.findById as jest.Mock).mockResolvedValueOnce(pedido)

    const result = await getPedidoByIdUseCase.execute({ id: 1 })

    expect(result).toEqual(pedido)
  })

  it('should throw BadRequestError if id is not provided', async () => {
    await expect(
      getPedidoByIdUseCase.execute({ id: undefined })
    ).rejects.toThrow(new BadRequestError('Id do pedido é obrigatório.'))
  })

  it('should throw BadRequestError if an error occurs while fetching the pedido', async () => {
    ;(mockPedidoRepository.findById as jest.Mock).mockRejectedValueOnce(
      new BadRequestError('Repository Error')
    )

    await expect(getPedidoByIdUseCase.execute({ id: 1 })).rejects.toThrow(
      new BadRequestError('Falha ao buscar o pedido.')
    )
  })
})
