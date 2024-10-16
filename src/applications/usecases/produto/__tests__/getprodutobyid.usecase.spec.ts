import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { GetProdutoByIdUseCase } from '../getprodutobyid.usecase'

const mockProdutoRepository: ProdutoRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByFornecedorId: jest.fn()
}

describe('GetProdutoByIdUseCase', () => {
  let getProdutoByIdUseCase: GetProdutoByIdUseCase.UseCase

  beforeEach(() => {
    getProdutoByIdUseCase = new GetProdutoByIdUseCase.UseCase(
      mockProdutoRepository
    )
  })

  it('should return a product by ID successfully', async () => {
    const product = {
      id: 1,
      name: 'sabão',
      description: 'Um sabão de uma marca boa',
      price: 10,
      quantity: 10,
      image: 'url.da.imagem',
      fornecedorId: 1
    }

    ;(mockProdutoRepository.findById as jest.Mock).mockResolvedValueOnce(
      product
    )

    const result = await getProdutoByIdUseCase.execute({ id: 1 })

    expect(result).toEqual(product)
  })

  it('should throw BadRequestError if id is not provided', async () => {
    await expect(
      getProdutoByIdUseCase.execute({ id: undefined })
    ).rejects.toThrow(new Error('ID eh obrigatório.'))
  })

  it('should throw BadRequestError if an error occurs while fetching the product', async () => {
    ;(mockProdutoRepository.findById as jest.Mock).mockRejectedValueOnce(
      new Error('Repository Error')
    )

    await expect(getProdutoByIdUseCase.execute({ id: 1 })).rejects.toThrow(
      new Error('Falha ao buscar o produto com id informado.')
    )
  })
})
