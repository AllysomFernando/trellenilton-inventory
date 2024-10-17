import { DeleteFornecedorUseCase } from '../deletefornecedor.usecase'
import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'
import { ProdutoRepository } from '@/domain/repository/produto.repository'

describe('DeleteFornecedorUseCase Unit Tests', () => {
  let fornecedorRepository: FornecedorRepository
  let produtoRepository: ProdutoRepository
  let useCase: DeleteFornecedorUseCase.UseCase

  beforeEach(() => {
    fornecedorRepository = {
      delete: jest.fn()
    } as any

    produtoRepository = {
      findByFornecedorId: jest.fn()
    } as any

    useCase = new DeleteFornecedorUseCase.UseCase(
      fornecedorRepository,
      produtoRepository
    )
  })

  it('should throw an error if id is not provided', async () => {
    await expect(useCase.execute({ id: null })).rejects.toThrow(
      'Id é obrigatório.'
    )
  })

  it('should throw an error if there are products associated with the supplier', async () => {
    ;(produtoRepository.findByFornecedorId as jest.Mock).mockResolvedValue([{}])

    await expect(useCase.execute({ id: 1 })).rejects.toThrow(
      'Não é possível deletar o fornecedor, pois existem produtos associados a ele.'
    )
  })

  it('should throw an error if deletion fails', async () => {
    ;(produtoRepository.findByFornecedorId as jest.Mock).mockResolvedValue([])
    ;(fornecedorRepository.delete as jest.Mock).mockResolvedValue(null)

    await expect(useCase.execute({ id: 1 })).rejects.toThrow(
      'Falha ao deletar o fornecedor.'
    )
  })

  it('should delete the supplier successfully', async () => {
    ;(produtoRepository.findByFornecedorId as jest.Mock).mockResolvedValue([])
    ;(fornecedorRepository.delete as jest.Mock).mockResolvedValue(true)

    await expect(useCase.execute({ id: 1 })).resolves.toBeUndefined()
    expect(fornecedorRepository.delete).toHaveBeenCalledWith(1)
  })
})
