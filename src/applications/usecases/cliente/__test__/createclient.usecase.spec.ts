import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { ClienteModel } from '@/domain/models/cliente'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { CreateClienteUseCase } from '../createcliente.usecase'
import { IsCPFOrCnpj } from '@/applications/validators/cpfcnpj.validators'

describe('CreateClienteUseCase', () => {
  let useCase: CreateClienteUseCase.UseCase
  let clienteRepository: ClienteRepository

  beforeEach(() => {
    clienteRepository = {
      save: jest.fn()
    } as unknown as ClienteRepository
    useCase = new CreateClienteUseCase.UseCase(clienteRepository)
  })

  it('should throw BadRequestError if CPF or CNPJ is invalid', async () => {
    jest.spyOn(IsCPFOrCnpj, 'isValid').mockReturnValueOnce(false)

    const input: CreateClienteUseCase.Input = {
      name: 'Cliente Teste',
      cpf_cnpj: '110.476.609-46',
      endereco: 'Rua Teste, 123',
      contato: '123456789'
    }

    await expect(useCase.execute(input)).rejects.toThrow(BadRequestError)
    await expect(useCase.execute(input)).rejects.toThrow(
      'Falha ao salvar o cliente.'
    )
  })

  it('should throw BadRequestError if required fields are missing', async () => {
    const input: CreateClienteUseCase.Input = {
      name: undefined,
      cpf_cnpj: '110.476.609-46',
      endereco: 'Rua Teste, 123',
      contato: 'Teste'
    }

    await expect(useCase.execute(input)).rejects.toThrow(
      'Nome, CPF/CNPJ, Endereço e Contato são obrigatórios.'
    )
  })

  it('should save cliente and return the entity', async () => {
    const input: CreateClienteUseCase.Input = {
      name: 'Cliente Teste',
      cpf_cnpj: 'valid-cpf-cnpj',
      endereco: 'Rua Teste, 123',
      contato: '123456789'
    }

    const savedCliente = new ClienteModel()
    savedCliente.name = input.name
    savedCliente.cpf_cnpj = input.cpf_cnpj
    savedCliente.endereco = input.endereco
    savedCliente.contato = input.contato

    jest.spyOn(IsCPFOrCnpj, 'isValid').mockReturnValueOnce(true)
    jest.spyOn(clienteRepository, 'save').mockResolvedValueOnce(savedCliente)

    const result = await useCase.execute(input)

    expect(result).toEqual(savedCliente)
    expect(clienteRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        name: input.name,
        cpf_cnpj: input.cpf_cnpj,
        endereco: input.endereco,
        contato: input.contato
      })
    )
  })

  it('should throw BadRequestError if save fails', async () => {
    const input: CreateClienteUseCase.Input = {
      name: 'Cliente Teste',
      cpf_cnpj: '110.476.609-46',
      endereco: 'Rua Teste, 123',
      contato: '123456789'
    }

    jest.spyOn(IsCPFOrCnpj, 'isValid').mockReturnValueOnce(true)
    jest.spyOn(clienteRepository, 'save').mockResolvedValueOnce(null)

    await expect(useCase.execute(input)).rejects.toThrow(BadRequestError)
    await expect(useCase.execute(input)).rejects.toThrow(
      'Falha ao salvar o cliente.'
    )
  })
})
