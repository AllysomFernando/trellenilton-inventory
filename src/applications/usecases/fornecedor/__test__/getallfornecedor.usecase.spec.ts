import { GetAllFornecedorUseCase } from '../getallfornecedor.usecase'
import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { FornecedorModel } from '@/domain/models/fornecedor'

describe('GetAllFornecedorUseCase', () => {
  let useCase: GetAllFornecedorUseCase.UseCase
  let fornecedorRepository: FornecedorRepository

  beforeEach(() => {
    fornecedorRepository = {
      findAll: jest.fn()
    } as unknown as FornecedorRepository
    useCase = new GetAllFornecedorUseCase.UseCase(fornecedorRepository)
  })

  it('should return all fornecedores', async () => {
    const fornecedores: FornecedorModel[] = [
      {
        id: 1,
        name: 'Fornecedor 1',
        cnpj: '123456789',
        endereco: 'Rua 1',
        contato: '11999999999'
      },
      {
        id: 2,
        name: 'Fornecedor 2',
        cnpj: '987654321',
        endereco: 'Rua 2',
        contato: '11999999999'
      }
    ]
    ;(fornecedorRepository.findAll as jest.Mock).mockResolvedValue(fornecedores)

    const result = await useCase.execute()

    expect(result).toEqual(fornecedores)
    expect(fornecedorRepository.findAll).toHaveBeenCalledTimes(1)
  })

  it('should throw BadRequestError if no fornecedores are found', async () => {
    ;(fornecedorRepository.findAll as jest.Mock).mockResolvedValue(null)

    await expect(useCase.execute()).rejects.toThrow(BadRequestError)
    expect(fornecedorRepository.findAll).toHaveBeenCalledTimes(1)
  })

  it('should throw BadRequestError if an error occurs while fetching fornecedores', async () => {
    ;(fornecedorRepository.findAll as jest.Mock).mockRejectedValue(
      new Error('Database error')
    )

    await expect(useCase.execute()).rejects.toThrow(BadRequestError)
    expect(fornecedorRepository.findAll).toHaveBeenCalledTimes(1)
  })
})
