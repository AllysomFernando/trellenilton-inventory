import { ItemPedidoRepository } from '@/domain/repository/itempedido.repository';
import { DeleteItemPedidoUseCase } from '../deleteitempedido.usecase';
import { BadRequestError } from '@/applications/errors/bad-request-erros';

describe('DeleteItemPedidoUseCase', () => {
  let itemPedidoRepository: ItemPedidoRepository;
  let deleteItemPedidoUseCase: DeleteItemPedidoUseCase.UseCase;

  beforeEach(() => {
    itemPedidoRepository = {
      delete: jest.fn(),
      findById: jest.fn()
    } as unknown as ItemPedidoRepository;

    deleteItemPedidoUseCase = new DeleteItemPedidoUseCase.UseCase(
      itemPedidoRepository
    );
  });

  it('should throw an error if id is not provided', async () => {
    await expect(deleteItemPedidoUseCase.execute({ id: null })).rejects.toThrow(
      'Id é obrigatório.'
    );
  });

  it('should throw BadRequestError if itemPedido was not found', async () => {
    (itemPedidoRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(deleteItemPedidoUseCase.execute({ id: 1 })).rejects.toThrow(
      'Item do pedido não encontrado.'
    );
  });

  it('should throw BadRequestError if itemPedido deletion fails', async () => {
    (itemPedidoRepository.findById as jest.Mock).mockResolvedValue({ id: 1 });
    (itemPedidoRepository.delete as jest.Mock).mockResolvedValue(false);

    await expect(deleteItemPedidoUseCase.execute({ id: 1 })).rejects.toThrow(
      'Erro ao deletar item do pedido.'
    );
  });

  it('should delete itemPedido successfully', async () => {
    (itemPedidoRepository.findById as jest.Mock).mockResolvedValue({ id: 1 });
    (itemPedidoRepository.delete as jest.Mock).mockResolvedValue(true);

    await expect(deleteItemPedidoUseCase.execute({ id: 1 })).resolves.toBe(true);
    expect(itemPedidoRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw BadRequestError if an exception occurs during deletion', async () => {
    (itemPedidoRepository.findById as jest.Mock).mockResolvedValue({ id: 1 });
    (itemPedidoRepository.delete as jest.Mock).mockRejectedValue(
      new BadRequestError('Some error')
    );

    await expect(deleteItemPedidoUseCase.execute({ id: 1 })).rejects.toThrow(
      new BadRequestError('Erro ao deletar item do pedido.')
    );
  });
});