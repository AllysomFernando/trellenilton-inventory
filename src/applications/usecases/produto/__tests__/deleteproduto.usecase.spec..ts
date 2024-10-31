import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { DeleteProdutoUseCase } from '../deleteproduto.usecase'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

describe('DeleteProdutoUseCase', () => {
  let produtoRepository: ProdutoRepository
  let deleteProdutoUseCase: DeleteProdutoUseCase.UseCase

  beforeEach(() => {
    produtoRepository = {
      delete: jest.fn()
    } as unknown as ProdutoRepository

    deleteProdutoUseCase = new DeleteProdutoUseCase.UseCase(produtoRepository)
  })

  it('should throw an error if id is not provided', async () => {
    await expect(deleteProdutoUseCase.execute({ id: null })).rejects.toThrow(
      'ID eh obrigatório.'
    )
  })

  it('should throw BadRequestError if produto deletion fails', async () => {
    ;(produtoRepository.delete as jest.Mock).mockResolvedValue(null)
    await expect(deleteProdutoUseCase.execute({ id: 1 })).rejects.toThrow(
      BadRequestError
    )
  })

  it('should delete produto successfully', async () => {
    ;(produtoRepository.delete as jest.Mock).mockResolvedValue(true)
    await expect(
      deleteProdutoUseCase.execute({ id: 1 })
    ).resolves.toBeUndefined()
    expect(produtoRepository.delete).toHaveBeenCalledWith(1)
  })

  it('should throw BadRequestError if an exception occurs during deletion', async () => {
    ;(produtoRepository.delete as jest.Mock).mockRejectedValue(
      new Error('Some error')
    )
    await expect(deleteProdutoUseCase.execute({ id: 1 })).rejects.toThrow(
      BadRequestError
    )
  })
})
