import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { ProdutoModel } from '@/domain/models/produto'
import { GetAllProdutoUseCase } from '../getallproduto.usecase'

const mockProdutoRepository: ProdutoRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByFornecedorId: jest.fn(),
  uploadImage: jest.fn()
}

describe('GetAllProdutoUseCase', () => {
  let getAllProdutoUseCase: GetAllProdutoUseCase.UseCase

  beforeEach(() => {
    getAllProdutoUseCase = new GetAllProdutoUseCase.UseCase(
      mockProdutoRepository
    )
  })

  it('should return a list of products successfully', async () => {
    const products: ProdutoModel[] = [
      {
        id: 1,
        name: 'sabão',
        description: 'Um sabão de uma marca boa',
        price: 10,
        quantity: 10,
        image: 'url.da.imagem',
        fornecedorId: 1
      },
      {
        id: 2,
        name: 'sabão',
        description: 'Um sabão de uma marca boa',
        price: 10,
        quantity: 10,
        image: 'url.da.imagem',
        fornecedorId: 2
      }
    ]

    ;(mockProdutoRepository.findAll as jest.Mock).mockResolvedValueOnce(
      products
    )

    const result = await getAllProdutoUseCase.execute()
    expect(result).toEqual(products)
  })

  it('should throw BadRequestError if an error occurs while fetching products', async () => {
    ;(mockProdutoRepository.findAll as jest.Mock).mockRejectedValueOnce(
      new Error('Error')
    )

    await expect(getAllProdutoUseCase.execute()).rejects.toThrow()
  })
})
