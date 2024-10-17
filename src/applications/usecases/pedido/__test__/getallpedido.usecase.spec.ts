import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { PedidoModel } from '@/domain/models/pedido'
import { GetAllPedidoUseCase } from '../getallpedido.usecase'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

const mockPedidoRepository: PedidoRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}

describe('GetAllPedidoUseCase', () => {
  let getAllPedidoUseCase: GetAllPedidoUseCase.UseCase

  beforeEach(() => {
    getAllPedidoUseCase = new GetAllPedidoUseCase.UseCase(
      mockPedidoRepository
    )
  })

  it('should return a list of pedidos successfully', async () => {
    const pedidos: PedidoModel[] = [
      {
        id: 1,
        data: new Date('2023-10-01'),
        clienteId: 1,
        status: 'PENDING',
        total: 100
      },
      {
        id: 2,
        data: new Date('2023-10-02'),
        clienteId: 2,
        status: 'COMPLETED',
        total: 200
      }
    ]

    ;(mockPedidoRepository.findAll as jest.Mock).mockResolvedValueOnce(
      pedidos
    )

    const result = await getAllPedidoUseCase.execute()
    expect(result).toEqual(pedidos)
  })

  it('should throw BadRequestError if an error occurs while fetching pedidos', async () => {
    ;(mockPedidoRepository.findAll as jest.Mock).mockRejectedValueOnce(
      new BadRequestError('Error')
    )

    await expect(getAllPedidoUseCase.execute()).rejects.toThrow()
  })
})