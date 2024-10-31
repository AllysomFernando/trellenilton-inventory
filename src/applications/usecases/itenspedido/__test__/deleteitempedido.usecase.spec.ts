import { ItemPedidoRepository } from '@/domain/repository/itempedido.repository'
import { DeleteItemPedidoUseCase } from '../deleteitempedido.usecase'
import { GetItemPedidoByIdUseCase } from '../getitempedidobyid.usecase'

describe('DeleteItemPedidoUseCase', () => {
  let itemPedidoRepository: ItemPedidoRepository
  let deleteItemPedidoUseCase: DeleteItemPedidoUseCase.UseCase
  let findItemPedidoByIdUseCase: GetItemPedidoByIdUseCase.UseCase
  beforeEach(() => {
    itemPedidoRepository = {
      delete: jest.fn(),
      findById: jest.fn()
    } as unknown as ItemPedidoRepository

    deleteItemPedidoUseCase = new DeleteItemPedidoUseCase.UseCase(
      itemPedidoRepository
    )
    findItemPedidoByIdUseCase = {
      execute: jest.fn().mockResolvedValue({ id: 1 })
    } as unknown as GetItemPedidoByIdUseCase.UseCase
  })
  it('should throw an error if id is not provided', async () => {
    await expect(deleteItemPedidoUseCase.execute({ id: null })).rejects.toThrow(
      'Id é obrigatório.'
    )
  })
  it('should throw BadRequestError if itemPedido was not found', async () => {
    ;(findItemPedidoByIdUseCase.execute as jest.Mock).mockRejectedValue(
      new Error('Item do pedido não encontrado.')
    )
    await expect(findItemPedidoByIdUseCase.execute({ id: 1 })).rejects.toThrow(
      'Item do pedido não encontrado.'
    )
  })
  it('should throw BadRequestError if itemPedido deletion fails', async () => {
    ;(itemPedidoRepository.findById as jest.Mock).mockResolvedValue({ id: 1 })
    ;(itemPedidoRepository.delete as jest.Mock).mockResolvedValue(false)
    await expect(deleteItemPedidoUseCase.execute({ id: 1 })).rejects.toThrow(
      'Erro ao deletar item do pedido.'
    )
  })
  it('should delete itemPedido successfully', async () => {
    ;(findItemPedidoByIdUseCase.execute as jest.Mock).mockResolvedValue({
      id: 1
    })
    ;(itemPedidoRepository.delete as jest.Mock).mockResolvedValue(true)
    await expect(
      deleteItemPedidoUseCase.execute({ id: 1 })
    ).resolves.toBeUndefined()
    expect(itemPedidoRepository.delete).toHaveBeenCalledWith(1)
  })
})
