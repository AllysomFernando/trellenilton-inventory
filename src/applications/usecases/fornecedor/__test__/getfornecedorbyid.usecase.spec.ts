import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'
import { FornecedorModel } from '@/domain/models/fornecedor'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { GetFornecedorByIdUseCase } from '../getfornecedorbyid,usecase'

const mockFornecedorRepository: FornecedorRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}

describe('GetFornecedorByIdUseCase', () => {
  let getFornecedorByIdUseCase: GetFornecedorByIdUseCase.UseCase

  beforeEach(() => {
    getFornecedorByIdUseCase = new GetFornecedorByIdUseCase.UseCase(
      mockFornecedorRepository
    )
  })

  it('should return a fornecedor by ID successfully', async () => {
    const fornecedor: FornecedorModel = {
      id: 1,
      name: 'Fornecedor 1',
      cnpj: '123456789',
      endereco: 'Rua 1',
      contato: '11999999999'
    }

    ;(mockFornecedorRepository.findById as jest.Mock).mockResolvedValueOnce(
      fornecedor
    )

    const result = await getFornecedorByIdUseCase.execute({ id: 1 })

    expect(result).toEqual(fornecedor)
  })

  it('should throw BadRequestError if id is not provided', async () => {
    await expect(
      getFornecedorByIdUseCase.execute({ id: undefined })
    ).rejects.toThrow(new BadRequestError('Id é obrigatório.'))
  })

  it('should throw BadRequestError if an error occurs while fetching the fornecedor', async () => {
    ;(mockFornecedorRepository.findById as jest.Mock).mockRejectedValueOnce(
      new Error('Repository Error')
    )

    await expect(getFornecedorByIdUseCase.execute({ id: 1 })).rejects.toThrow(
      new BadRequestError('Fornecedor não encontrado.')
    )
  })
})
