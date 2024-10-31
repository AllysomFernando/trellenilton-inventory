import { ItemPedidoRepository } from '@/domain/repository/itempedido.repository'
import { UpdateItemPedidoUseCase } from '../updateitempedido.usecase'
import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

describe('UpdateItemPedidoUseCase', () => {
  let itemPedidoRepository: ItemPedidoRepository
  let produtoRepository: ProdutoRepository
  let pedidoRepository: PedidoRepository
  let updateItemPedidoUseCase: UpdateItemPedidoUseCase.UseCase

  beforeEach(() => {
    itemPedidoRepository = {
      update: jest.fn()
    } as unknown as ItemPedidoRepository

    produtoRepository = {
      findById: jest.fn()
    } as unknown as ProdutoRepository

    pedidoRepository = {
      findById: jest.fn()
    } as unknown as PedidoRepository

    updateItemPedidoUseCase = new UpdateItemPedidoUseCase.UseCase(
      itemPedidoRepository,
      produtoRepository,
      pedidoRepository
    )
  })

  it('should throw an error if id is not provided', async () => {
    await expect(
      updateItemPedidoUseCase.execute({
        id: null,
        pedidoId: 1,
        produtoId: 1,
        quantidade: 1,
        precoUnitario: 100
      })
    ).rejects.toThrow('Id é obrigatório')
  })

  it('should throw an error if quantidade and precoUnitario are not provided', async () => {
    ;(produtoRepository.findById as jest.Mock).mockResolvedValueOnce({})
    ;(pedidoRepository.findById as jest.Mock).mockResolvedValueOnce({})

    await expect(
      updateItemPedidoUseCase.execute({
        id: 1,
        pedidoId: 1,
        produtoId: 1,
        quantidade: 0,
        precoUnitario: 0
      })
    ).rejects.toThrow(
      'Quantidade deve ser maior que 0 e preço unitário deve ser maior que 0'
    )
  })

  it('should throw an error if precoUnitario is not an integer', async () => {
    ;(produtoRepository.findById as jest.Mock).mockResolvedValueOnce({})
    ;(pedidoRepository.findById as jest.Mock).mockResolvedValueOnce({})

    await expect(
      updateItemPedidoUseCase.execute({
        id: 1,
        pedidoId: 1,
        produtoId: 1,
        quantidade: 1,
        precoUnitario: 1.1
      })
    ).rejects.toThrow('Preço unitário precisa ser um número inteiro.')
  })

  it('should throw an error if item pedido is not found', async () => {
    ;(produtoRepository.findById as jest.Mock).mockResolvedValueOnce({})
    ;(pedidoRepository.findById as jest.Mock).mockResolvedValueOnce({})
    ;(itemPedidoRepository.update as jest.Mock).mockResolvedValueOnce(null)

    await expect(
      updateItemPedidoUseCase.execute({
        id: 1,
        pedidoId: 1,
        produtoId: 1,
        quantidade: 1,
        precoUnitario: 100
      })
    ).rejects.toThrow('Erro ao atualizar item pedido')
  })

  it('should update item pedido successfully', async () => {
    const itemPedido = {
      id: 1,
      pedidoId: 1,
      produtoId: 1,
      quantidade: 1,
      precoUnitario: 100
    }

    ;(produtoRepository.findById as jest.Mock).mockResolvedValueOnce({})
    ;(pedidoRepository.findById as jest.Mock).mockResolvedValueOnce({})
    ;(itemPedidoRepository.update as jest.Mock).mockResolvedValueOnce(
      itemPedido
    )

    const result = await updateItemPedidoUseCase.execute({
      id: 1,
      pedidoId: 1,
      produtoId: 1,
      quantidade: 1,
      precoUnitario: 100
    })

    expect(result).toEqual(itemPedido)
  })
})
