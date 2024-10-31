import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { CreateProdutoUseCase } from '../createproduto.usecase'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'
import { ProdutoModel } from '@/domain/models/produto'

// Mock das interfaces de repositório
const mockProdutoRepository: ProdutoRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByFornecedorId: jest.fn(),
  uploadImage: jest.fn()
} as any

const mockFornecedorRepository: FornecedorRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
} as any

describe('CreateProdutoUseCase', () => {
  let createProdutoUseCase: CreateProdutoUseCase.UseCase

  beforeEach(() => {
    jest.clearAllMocks()

    createProdutoUseCase = new CreateProdutoUseCase.UseCase(
      mockProdutoRepository,
      mockFornecedorRepository
    )
  })

  it('should throw an error if required fields are missing', async () => {
    const input: CreateProdutoUseCase.Input = {
      name: '',
      description: '',
      price: 1,
      quantity: 1,
      image: {} as Express.Multer.File,
      fornecedorId: 0
    }

    await expect(createProdutoUseCase.execute(input)).rejects.toThrow(
      new BadRequestError(
        'Nome, descrição, preço, quantidade, imagem e id do fornecedor são obrigatórios.'
      )
    )
  })

  it('should throw an error if price is less than or equal to zero', async () => {
    const input: CreateProdutoUseCase.Input = {
      name: 'Produto Teste',
      description: 'Descrição do produto',
      price: 0,
      quantity: 10,
      image: {} as Express.Multer.File,
      fornecedorId: 4
    }

    await expect(createProdutoUseCase.execute(input)).rejects.toThrow(
      new BadRequestError('O preço do produto deve ser maior que zero.')
    )
  })

  it('should throw an error if quantity is not an integer', async () => {
    const input: CreateProdutoUseCase.Input = {
      name: 'Produto Teste',
      description: 'Descrição do produto',
      price: 100,
      quantity: 10.5,
      image: {} as Express.Multer.File,
      fornecedorId: 1
    }

    await expect(createProdutoUseCase.execute(input)).rejects.toThrow(
      new BadRequestError('A quantidade do produto deve ser maior que zero.')
    )
  })

  it('should throw an error if fornecedorId is invalid', async () => {
    const input: CreateProdutoUseCase.Input = {
      name: 'Produto Teste',
      description: 'Descrição do produto',
      price: 100,
      quantity: 10,
      image: {} as Express.Multer.File,
      fornecedorId: 999 // ID inválido
    }

    ;(mockFornecedorRepository.findById as jest.Mock).mockResolvedValueOnce(
      null
    )

    await expect(createProdutoUseCase.execute(input)).rejects.toThrow(
      new BadRequestError('Fornecedor não encontrado.')
    )
  })

  it('should throw an error if save fails', async () => {
    const input: CreateProdutoUseCase.Input = {
      name: 'Produto Teste',
      description: 'Descrição do produto',
      price: 100,
      quantity: 10,
      image: {} as Express.Multer.File,
      fornecedorId: 1
    }

    ;(mockFornecedorRepository.findById as jest.Mock).mockResolvedValueOnce({
      id: 1
    })
    ;(mockProdutoRepository.uploadImage as jest.Mock).mockResolvedValueOnce(
      'http://image.url/test.png'
    )
    ;(mockProdutoRepository.save as jest.Mock).mockResolvedValueOnce(null)

    await expect(createProdutoUseCase.execute(input)).rejects.toThrow(
      new BadRequestError('Falha ao salvar o produto.')
    )
  })

  it('should create a produto with valid input', async () => {
    const input: CreateProdutoUseCase.Input = {
      name: 'Produto Teste',
      description: 'Descrição do produto',
      price: 100,
      quantity: 10,
      image: {} as Express.Multer.File,
      fornecedorId: 1
    }

    const imageUrl = 'http://image.url/test.png'

    const savedProduto: ProdutoModel = {
      id: 1,
      name: input.name,
      description: input.description,
      price: input.price,
      quantity: input.quantity,
      image: imageUrl,
      fornecedorId: input.fornecedorId
    }

    ;(mockFornecedorRepository.findById as jest.Mock).mockResolvedValueOnce({
      id: 1
    })
    ;(mockProdutoRepository.uploadImage as jest.Mock).mockResolvedValueOnce(
      imageUrl
    )
    ;(mockProdutoRepository.save as jest.Mock).mockResolvedValueOnce(
      savedProduto
    )

    const result = await createProdutoUseCase.execute(input)

    expect(mockFornecedorRepository.findById).toHaveBeenCalledWith(
      input.fornecedorId
    )
    expect(mockProdutoRepository.uploadImage).toHaveBeenCalledWith(input.image)
    expect(mockProdutoRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        name: input.name,
        description: input.description,
        price: input.price,
        quantity: input.quantity,
        image: imageUrl,
        fornecedorId: input.fornecedorId
      })
    )
    expect(result).toEqual(savedProduto)
  })
})
