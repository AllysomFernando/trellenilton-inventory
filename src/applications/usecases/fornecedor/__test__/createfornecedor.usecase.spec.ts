import { CreateFornecedorUseCase } from '../createfornecedor.usecase'
import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'
import { FornecedorModel } from '@/domain/models/fornecedor'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { CNPJValidator } from '@/applications/validators/cnpj.validators'

describe('CreateFornecedorUseCase', () => {
  let useCase: CreateFornecedorUseCase.UseCase
  let fornecedorRepository: FornecedorRepository

  beforeEach(() => {
    fornecedorRepository = {
      save: jest.fn()
    } as unknown as FornecedorRepository
    useCase = new CreateFornecedorUseCase.UseCase(fornecedorRepository)
  })

  it('should throw BadRequestError if CNPJ is invalid', async () => {
    jest.spyOn(CNPJValidator, 'isValid').mockReturnValueOnce(false)

    const input: CreateFornecedorUseCase.Input = {
      name: 'Fornecedor Teste',
      cnpj: 'invalid-cnpj',
      endereco: 'Rua Teste, 123',
      contato: '123456789'
    }

    await expect(useCase.execute(input)).rejects.toThrow(BadRequestError)
    await expect(useCase.execute(input)).rejects.toThrow('CNPJ inválido.')
  })

  it('should throw BadRequestError if required fields are missing', async () => {
    const input: CreateFornecedorUseCase.Input = {
      name: '',
      cnpj: '17.220.269/0001-86',
      endereco: 'Rua Teste, 123',
      contato: ''
    }

    await expect(useCase.execute(input)).rejects.toThrow(BadRequestError)
    await expect(useCase.execute(input)).rejects.toThrow(
      'Nome, CNPJ e Contato são obrigatórios.'
    )
  })

  it('should save fornecedor and return the entity', async () => {
    const input: CreateFornecedorUseCase.Input = {
      name: 'Fornecedor Teste',
      cnpj: 'valid-cnpj',
      endereco: 'Rua Teste, 123',
      contato: '123456789'
    }

    const savedFornecedor = new FornecedorModel()
    savedFornecedor.name = input.name
    savedFornecedor.cnpj = input.cnpj
    savedFornecedor.endereco = input.endereco
    savedFornecedor.contato = input.contato

    jest.spyOn(CNPJValidator, 'isValid').mockReturnValueOnce(true)
    jest
      .spyOn(fornecedorRepository, 'save')
      .mockResolvedValueOnce(savedFornecedor)

    const result = await useCase.execute(input)

    expect(result).toEqual(savedFornecedor)
    expect(fornecedorRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        name: input.name,
        cnpj: input.cnpj,
        endereco: input.endereco,
        contato: input.contato
      })
    )
  })

  it('should throw BadRequestError if save fails', async () => {
    const input: CreateFornecedorUseCase.Input = {
      name: 'Fornecedor Teste',
      cnpj: '17.220.269/0001-86',
      endereco: 'Rua Teste, 123',
      contato: '123456789'
    }

    jest.spyOn(CNPJValidator, 'isValid').mockReturnValueOnce(true)
    jest.spyOn(fornecedorRepository, 'save').mockResolvedValueOnce(null)

    await expect(useCase.execute(input)).rejects.toThrow(BadRequestError)
    await expect(useCase.execute(input)).rejects.toThrow(
      'Falha ao salvar o fornecedor.'
    )
  })
})
