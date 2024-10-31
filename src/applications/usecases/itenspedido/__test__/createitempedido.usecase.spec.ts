import { ItemPedidoRepository } from '@/domain/repository/itempedido.repository'
import { CreateItemPedidoUseCase } from '../createitempedido.usecase'
import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

const mockItemPedidoRepository: ItemPedidoRepository = {
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}

const mockPedidoRepository: PedidoRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByClienteId: jest.fn()
}

const mockProdutoRepository: ProdutoRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByFornecedorId: jest.fn()
}

describe('CreateItemPedidoUseCase', () => {
  let createItemPedidoUseCase: CreateItemPedidoUseCase.UseCase

  beforeEach(() => {
    createItemPedidoUseCase = new CreateItemPedidoUseCase.UseCase(
      mockItemPedidoRepository,
      mockPedidoRepository,
      mockProdutoRepository
    )
  })

  it('should throw an error if required fields are missing', async () => {
    const input = {
      pedidoId: undefined,
      produtoId: 0,
      quantidade: 0,
      precoUnitario: undefined
    }
    await expect(createItemPedidoUseCase.execute(input)).rejects.toThrow(
      BadRequestError
    )
  })

  it('should throw an error if pedidoId is invalid', async () => {
    const input = {
      pedidoId: 999,
      produtoId: 1,
      quantidade: 1,
      precoUnitario: 100
    }
    ;(mockPedidoRepository.findById as jest.Mock).mockResolvedValueOnce(null)

    await expect(createItemPedidoUseCase.execute(input)).rejects.toThrow(
      BadRequestError
    )
  })

  it('should throw an error if produtoId is invalid', async () => {
    const input = {
      pedidoId: 1,
      produtoId: 999,
      quantidade: 1,
      precoUnitario: 100
    }
    ;(mockProdutoRepository.findById as jest.Mock).mockResolvedValueOnce(null)

    await expect(createItemPedidoUseCase.execute(input)).rejects.toThrow(
      BadRequestError
    )
  })

  it('should create an itemPedido with valid input', async () => {
    const input = {
      pedidoId: 1,
      produtoId: 1,
      quantidade: 2,
      precoUnitario: 50
    }
    const itemPedido = {
      id: 1,
      pedidoId: input.pedidoId,
      produtoId: input.produtoId,
      quantidade: input.quantidade,
      precoUnitario: input.precoUnitario
    }
    ;(mockPedidoRepository.findById as jest.Mock).mockResolvedValueOnce({
      id: 1
    })
    ;(mockProdutoRepository.findById as jest.Mock).mockResolvedValueOnce({
      id: 1
    })
    ;(mockItemPedidoRepository.save as jest.Mock).mockResolvedValueOnce(
      itemPedido
    )

    const result = await createItemPedidoUseCase.execute(input)

    expect(result).toEqual(itemPedido)
  })
})
