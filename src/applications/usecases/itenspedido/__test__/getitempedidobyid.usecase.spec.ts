import { ItemPedidoRepository } from '@/domain/repository/itempedido.repository'
import { GetItemPedidoByIdUseCase } from '../getitempedidobyid.usecase'

const mockItemPedidoRepository: ItemPedidoRepository = {
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}

describe('GetItemPedidoByIdUseCase', () => {
  let getItemPedidoByIdUseCase: GetItemPedidoByIdUseCase.UseCase

  beforeEach(() => {
    getItemPedidoByIdUseCase = new GetItemPedidoByIdUseCase.UseCase(
      mockItemPedidoRepository
    )
  })

  it('should return a item pedido by ID successfully', async () => {
    const itemPedido = {
      id: 1,
      pedidoId: 1,
      produtoId: 1,
      quantidade: 1,
      valor: 100
    }

    ;(mockItemPedidoRepository.findById as jest.Mock).mockResolvedValueOnce(
      itemPedido
    )

    const result = await getItemPedidoByIdUseCase.execute({ id: 1 })

    expect(result).toEqual(itemPedido)
  })
  it('should throw BadRequestError if id is not provided', async () => {
    await expect(
      getItemPedidoByIdUseCase.execute({ id: undefined })
    ).rejects.toThrow(new Error('Id do item do pedido não informado'))
  })
  it('should throw BadRequestError if an error occurs while fetching the item pedido', async () => {
    ;(mockItemPedidoRepository.findById as jest.Mock).mockRejectedValueOnce(
      new Error('Repository Error')
    )

    await expect(getItemPedidoByIdUseCase.execute({ id: 1 })).rejects.toThrow(
      new Error('Erro ao buscar item do pedido')
    )
  })
})
