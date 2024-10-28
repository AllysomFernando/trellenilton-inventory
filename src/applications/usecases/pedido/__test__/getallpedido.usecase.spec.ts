import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { PedidoModel } from '@/domain/models/pedido'
import { GetAllPedidoUseCase } from '../getallpedido.usecase'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { PedidoEnum } from '@/applications/enum/pedido.enum'

const mockPedidoRepository: PedidoRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByClienteId: jest.fn()
}

describe('GetAllPedidoUseCase', () => {
  let getAllPedidoUseCase: GetAllPedidoUseCase.UseCase

  beforeEach(() => {
    getAllPedidoUseCase = new GetAllPedidoUseCase.UseCase(mockPedidoRepository)
  })

  it('should return a list of pedidos successfully', async () => {
    const pedidos: PedidoModel[] = [
      {
        id: 1,
        data: '2023-10-01',
        clienteId: 1,
        status: PedidoEnum.Concluido,
        total: 100,
        itens: []
      },
      {
        id: 2,
        data: '2023-10-01',
        clienteId: 2,
        status: PedidoEnum.Pendente,
        total: 200,
        itens: []
      }
    ]

    ;(mockPedidoRepository.findAll as jest.Mock).mockResolvedValueOnce(pedidos)

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
