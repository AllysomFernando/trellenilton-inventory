import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { DeleteProdutoUseCase } from '../deleteproduto.usecase'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

describe('DeleteProdutoUseCase', () => {
  let produtoRepository: ProdutoRepository
  let deleteProdutoUseCase: DeleteProdutoUseCase.UseCase

  beforeEach(() => {
    produtoRepository = {
      delete: jest.fn(),
      findById: jest.fn()
    } as unknown as ProdutoRepository

    deleteProdutoUseCase = new DeleteProdutoUseCase.UseCase(produtoRepository)
  })

  it('should throw an error if id is not provided', async () => {
    await expect(deleteProdutoUseCase.execute({ id: null })).rejects.toThrow(
      'Id é obrigatório.'
    )
  })

  it('should throw BadRequestError if produto was not found', async () => {
    ;(produtoRepository.findById as jest.Mock).mockResolvedValue(null)

    await expect(deleteProdutoUseCase.execute({ id: 1 })).rejects.toThrow(
      'Produto não encontrado.'
    )
  })

  it('should throw BadRequestError if produto deletion fails', async () => {
    ;(produtoRepository.findById as jest.Mock).mockResolvedValue({ id: 1 })
    ;(produtoRepository.delete as jest.Mock).mockResolvedValue(false)

    await expect(deleteProdutoUseCase.execute({ id: 1 })).rejects.toThrow(
      'Erro ao deletar produto.'
    )
  })

  it('should delete produto successfully', async () => {
    ;(produtoRepository.findById as jest.Mock).mockResolvedValue({ id: 1 })
    ;(produtoRepository.delete as jest.Mock).mockResolvedValue(true)

    await expect(deleteProdutoUseCase.execute({ id: 1 })).resolves.toBe(true)
    expect(produtoRepository.delete).toHaveBeenCalledWith(1)
  })

  it('should throw BadRequestError if an exception occurs during deletion', async () => {
    ;(produtoRepository.findById as jest.Mock).mockResolvedValue({ id: 1 })
    ;(produtoRepository.delete as jest.Mock).mockRejectedValue(
      new BadRequestError('Some error')
    )

    await expect(deleteProdutoUseCase.execute({ id: 1 })).rejects.toThrow(
      new BadRequestError('Erro ao deletar produto.')
    )
  })
})
