import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { CreatePedidoUseCase } from '../createpedido.usecase'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

const mockPedidoRepository: PedidoRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}

describe('CreatePedidoUseCase', () => {
  let createPedidoUseCase: CreatePedidoUseCase.UseCase

  beforeEach(() => {
    createPedidoUseCase = new CreatePedidoUseCase.UseCase(
      mockPedidoRepository
    )
  })

  it('should throw an error if required fields are missing', async () => {
    const input = {
      data: new Date('2020/10/01'),
      clienteId: 0,
      status: '',
      total: 0
    }
    await expect(createPedidoUseCase.execute(input)).rejects.toThrow(
      BadRequestError
    )
  })

  it('should create a pedido with valid input', async () => {
    const input = {
      data: new Date('2023-10-01'),
      clienteId: 1,
      status: 'PENDING',
      total: 100
    }
    const pedido = {
      id: 1,
      data: input.data,
      clienteId: input.clienteId,
      status: input.status,
      total: input.total
    }
    ;(mockPedidoRepository.save as jest.Mock).mockResolvedValueOnce(pedido)

    const result = await createPedidoUseCase.execute(input)

    expect(result).toEqual(pedido)
  })
})