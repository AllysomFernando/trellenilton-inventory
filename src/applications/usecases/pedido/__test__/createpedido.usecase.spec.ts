import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { CreatePedidoUseCase } from '../createpedido.usecase'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { PedidoEnum } from '@/applications/enum/pedido.enum'
import { PedidoModel } from '@/domain/models/pedido'

const mockPedidoRepository: PedidoRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByClienteId: jest.fn()
} as any

describe('CreatePedidoUseCase', () => {
  let createPedidoUseCase: CreatePedidoUseCase.UseCase

  beforeEach(() => {
    jest.clearAllMocks()

    createPedidoUseCase = new CreatePedidoUseCase.UseCase(mockPedidoRepository)
  })

  it('should throw an error if required fields are missing', async () => {
    const input: CreatePedidoUseCase.Input = {
      data: '',
      clienteId: 0,
      status: undefined,
      itens: []
    }

    await expect(createPedidoUseCase.execute(input)).rejects.toThrow(
      new BadRequestError('data, clienteId, status e itens são obrigatórios.')
    )
  })

  it('should throw an error if itens array is empty', async () => {
    const input: CreatePedidoUseCase.Input = {
      data: '2023-10-01',
      clienteId: 1,
      status: PedidoEnum.Concluido,
      itens: []
    }

    await expect(createPedidoUseCase.execute(input)).rejects.toThrow(
      new BadRequestError('data, clienteId, status e itens são obrigatórios.')
    )
  })

  it('should create a pedido with valid input', async () => {
    const input: CreatePedidoUseCase.Input = {
      data: '2023-10-01',
      clienteId: 1,
      status: PedidoEnum.Concluido,
      itens: [
        {
          produtoId: 1,
          quantidade: 2,
          preco: 50
        }
      ]
    }

    const total = input.itens.reduce(
      (sum, item) => sum + item.quantidade * item.preco,
      0
    )

    const pedido: PedidoModel = {
      id: 1,
      data: input.data,
      clienteId: input.clienteId,
      status: input.status,
      total,
      itens: input.itens
    }

    ;(mockPedidoRepository.save as jest.Mock).mockResolvedValueOnce(pedido)

    const result = await createPedidoUseCase.execute(input)

    expect(result).toEqual(pedido)
  })

  it('should throw an error if save fails', async () => {
    const input: CreatePedidoUseCase.Input = {
      data: '2023-10-01',
      clienteId: 1,
      status: PedidoEnum.Concluido,
      itens: [
        {
          produtoId: 1,
          quantidade: 2,
          preco: 50
        }
      ]
    }

    ;(mockPedidoRepository.save as jest.Mock).mockResolvedValueOnce(null)

    await expect(createPedidoUseCase.execute(input)).rejects.toThrow(
      new BadRequestError('Erro ao criar pedido.')
    )
  })
})
