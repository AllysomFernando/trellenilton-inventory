import { UpdateFornecedorUseCase } from '../updatefornecedor.usecase'
import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'
import { FornecedorModel } from '@/domain/models/fornecedor'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { GetFornecedorByIdUseCase } from '../getfornecedorbyid,usecase'

describe('UpdateFornecedorUseCase', () => {
  let fornecedorRepository: FornecedorRepository
  let updateFornecedorUseCase: UpdateFornecedorUseCase.UseCase
  let getFornecedorByIdUseCase: GetFornecedorByIdUseCase.UseCase

  beforeEach(() => {
    fornecedorRepository = {
      update: jest.fn()
    } as unknown as FornecedorRepository

    getFornecedorByIdUseCase = {
      execute: jest.fn()
    } as unknown as GetFornecedorByIdUseCase.UseCase

    updateFornecedorUseCase = new UpdateFornecedorUseCase.UseCase(
      fornecedorRepository,
      getFornecedorByIdUseCase
    )
  })

  it('should throw an error if id is not provided', async () => {
    const input = { id: 0, name: '', cnpj: '', endereco: '', contato: '' }

    await expect(updateFornecedorUseCase.execute(input)).rejects.toThrow(
      'Id é obrigatório.'
    )
  })

  it('should throw an error if fornecedor is not found', async () => {
    const input = { id: 1, name: '', cnpj: '', endereco: '', contato: '' }
    ;(getFornecedorByIdUseCase.execute as jest.Mock).mockResolvedValue(null)

    await expect(updateFornecedorUseCase.execute(input)).rejects.toThrow(
      'Fornecedor não encontrado.'
    )
  })

  it('should throw an error if no fields are provided for update', async () => {
    const input = { id: 1, name: '', cnpj: '', endereco: '', contato: '' }
    const existingFornecedor = new FornecedorModel()
    existingFornecedor.id = 1
    ;(getFornecedorByIdUseCase.execute as jest.Mock).mockResolvedValue(
      existingFornecedor
    )

    await expect(updateFornecedorUseCase.execute(input)).rejects.toThrow(
      'Informe ao menos um campo para atualização.'
    )
  })

  it('should throw a BadRequestError if update fails', async () => {
    const input = {
      id: 1,
      name: 'Fornecedor Teste',
      cnpj: 'CNPJ Teste',
      endereco: 'Endereço Teste',
      contato: 'Contato Teste'
    }
    const existingFornecedor = new FornecedorModel()
    existingFornecedor.id = 1
    ;(getFornecedorByIdUseCase.execute as jest.Mock).mockResolvedValue(
      existingFornecedor
    )
    ;(fornecedorRepository.update as jest.Mock).mockResolvedValue(null)

    await expect(updateFornecedorUseCase.execute(input)).rejects.toThrow(
      BadRequestError
    )
  })

  it('should return the updated fornecedor if update is successful', async () => {
    const input = {
      id: 1,
      name: 'Fornecedor Teste',
      cnpj: '17.220.269/0001-86',
      endereco: 'Endereço Teste',
      contato: 'Contato Teste'
    }
    const existingFornecedor = new FornecedorModel()
    existingFornecedor.id = 1
    ;(getFornecedorByIdUseCase.execute as jest.Mock).mockResolvedValue(
      existingFornecedor
    )

    const updatedFornecedor = new FornecedorModel()
    updatedFornecedor.id = 1
    updatedFornecedor.name = 'Fornecedor Testes'
    updatedFornecedor.cnpj = '17.220.269/0001-86'
    updatedFornecedor.endereco = 'Endereço Teste'
    updatedFornecedor.contato = 'Contato Teste'
    ;(fornecedorRepository.update as jest.Mock).mockResolvedValue(
      updatedFornecedor
    )

    const result = await updateFornecedorUseCase.execute(input)

    expect(result).toEqual(updatedFornecedor)
  })
})
