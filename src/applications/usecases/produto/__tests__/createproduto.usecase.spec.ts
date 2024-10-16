import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { CreateProdutoUseCase } from '../createproduto.usecase'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

const mockProdutoRepository: ProdutoRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}

describe('CreateProdutoUseCase', () => {
  let createProdutoUseCase: CreateProdutoUseCase.UseCase

  beforeEach(() => {
    createProdutoUseCase = new CreateProdutoUseCase.UseCase(
      mockProdutoRepository
    )
  })

  it('should throw an error if required fields are missing', async () => {
    const input = {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      image: '',
      fornecedorId: 0
    }
    await expect(createProdutoUseCase.execute(input)).rejects.toThrow(
      BadRequestError
    )
  })

  it('should create a produto with valid input', async () => {
    const input = {
      name: 'Test',
      description: 'Test',
      price: 1,
      quantity: 1,
      image: 'test',
      fornecedorId: 1
    }
    const produto = {
      id: 1,
      name: input.name,
      description: input.description,
      price: input.price,
      quantity: input.quantity,
      image: input.image,
      fornecedorId: input.fornecedorId
    }
    ;(mockProdutoRepository.save as jest.Mock).mockResolvedValueOnce(produto)

    const result = await createProdutoUseCase.execute(input)

    expect(result).toEqual(produto)
  })
})
