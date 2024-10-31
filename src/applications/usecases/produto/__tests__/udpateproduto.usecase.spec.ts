import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { UpdateProdutoUseCase } from '../updateproduto.usecase'
import { GetProdutoByIdUseCase } from '../getprodutobyid.usecase'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { ProdutoModel } from '@/domain/models/produto'

describe('UpdateProdutoUseCase', () => {
  let produtoRepository: ProdutoRepository
  let updateProdutoUseCase: UpdateProdutoUseCase.UseCase
  let getProdutoByIdUseCase: GetProdutoByIdUseCase.UseCase

  beforeEach(() => {
    produtoRepository = {
      update: jest.fn(),
      uploadImage: jest.fn()
    } as unknown as ProdutoRepository

    getProdutoByIdUseCase = {
      execute: jest.fn()
    } as unknown as GetProdutoByIdUseCase.UseCase

    updateProdutoUseCase = new UpdateProdutoUseCase.UseCase(
      produtoRepository,
      getProdutoByIdUseCase
    )
  })

  it('should throw an error if id is not provided', async () => {
    const input = {
      id: null,
      name: '',
      description: '',
      price: null,
      quantity: null,
      image: {} as Express.Multer.File,
      fornecedorId: null
    }

    await expect(updateProdutoUseCase.execute(input)).rejects.toThrow(
      'Id é obrigatório.'
    )
  })

  it('should throw BadRequestError if produto is not found', async () => {
    const input = {
      id: 3,
      name: 'test',
      description: 'teste',
      price: 10,
      quantity: 2,
      image: {} as Express.Multer.File,
      fornecedorId: 1
    }
    ;(getProdutoByIdUseCase.execute as jest.Mock).mockResolvedValueOnce(null)

    await expect(updateProdutoUseCase.execute(input)).rejects.toThrow(
      'Produto não encontrado.'
    )
  })

  it('should throw BadRequestError if update fails', async () => {
    const input = {
      id: 1,
      name: 'test',
      description: 'teste',
      price: 10,
      quantity: 2,
      image: {} as Express.Multer.File,
      fornecedorId: 1
    }
    const existingProduto = {
      id: 1,
      name: 'test',
      description: 'teste',
      price: 10,
      quantity: 2,
      image: 'image-url',
      fornecedorId: 1
    }
    ;(getProdutoByIdUseCase.execute as jest.Mock).mockResolvedValueOnce(
      existingProduto
    )
    ;(produtoRepository.update as jest.Mock).mockResolvedValueOnce(null)

    await expect(updateProdutoUseCase.execute(input)).rejects.toThrow(
      'Falha ao atualizar o produto.'
    )
  })

  it('should return the updated product if update is successful', async () => {
    const input = {
      id: 1,
      name: 'test',
      description: 'teste',
      price: 10,
      quantity: 2,
      image: {} as Express.Multer.File,
      fornecedorId: 1
    }
    const existingProduto = {
      id: 1,
      name: 'test',
      description: 'teste',
      price: 10,
      quantity: 2,
      image: 'image-url',
      fornecedorId: 1
    }
    const updatedProduto = {
      id: 1,
      name: 'tested',
      description: 'teste',
      price: 10,
      quantity: 2,
      image: 'image-url',
      fornecedorId: 1
    }
    ;(getProdutoByIdUseCase.execute as jest.Mock).mockResolvedValueOnce(
      existingProduto
    )
    ;(produtoRepository.update as jest.Mock).mockResolvedValueOnce(
      updatedProduto
    )

    const result = await updateProdutoUseCase.execute(input)

    expect(result).toEqual(updatedProduto)
  })

  it('should upload a new image if provided', async () => {
    const input = {
      id: 1,
      name: 'test',
      description: 'teste',
      price: 10,
      quantity: 2,
      image: {} as Express.Multer.File,
      fornecedorId: 1
    }
    const existingProduto = {
      id: 1,
      name: 'test',
      description: 'teste',
      price: 10,
      quantity: 2,
      image: 'old-image-url',
      fornecedorId: 1
    }
    const updatedProduto = {
      id: 1,
      name: 'test',
      description: 'teste',
      price: 10,
      quantity: 2,
      image: 'new-image-url',
      fornecedorId: 1
    }
    ;(getProdutoByIdUseCase.execute as jest.Mock).mockResolvedValueOnce(
      existingProduto
    )
    ;(produtoRepository.uploadImage as jest.Mock).mockResolvedValueOnce(
      'new-image-url'
    )
    ;(produtoRepository.update as jest.Mock).mockResolvedValueOnce(
      updatedProduto
    )

    const result = await updateProdutoUseCase.execute(input)

    expect(produtoRepository.uploadImage).toHaveBeenCalledWith(input.image)
    expect(result).toEqual(updatedProduto)
  })
})
