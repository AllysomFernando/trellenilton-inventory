import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { UpdateClienteUseCase } from '../updatecliente.usecase'
import { ClienteModel } from '@/domain/models/cliente'
import { IsCPForCnpj } from '@/applications/validators/cpfcnpj.validators'

describe('UpdateClienteUseCase', () => {
  let useCase: UpdateClienteUseCase.UseCase
  let clienteRepository: ClienteRepository

  beforeEach(() => {
    clienteRepository = {
      update: jest.fn()
    } as unknown as ClienteRepository
    useCase = new UpdateClienteUseCase.UseCase(clienteRepository)
  })

  it('should throw an error if id is not provided', async () => {
    const input: UpdateClienteUseCase.Input = {
      id: null as unknown as number,
      name: 'Cliente Teste',
      cpf_cnpj: '12345678901',
      contato: '123456789',
      endereco: 'Rua Teste, 123'
    }

    await expect(useCase.execute(input)).rejects.toThrow('Id é obrigatório.')
  })

  it('should throw an error if CPF or CNPJ is invalid', async () => {
    jest.spyOn(IsCPForCnpj, 'isValid').mockReturnValueOnce(false)

    const input: UpdateClienteUseCase.Input = {
      id: 1,
      name: 'Cliente Teste',
      cpf_cnpj: 'invalid-cpf-cnpj',
      contato: '123456789',
      endereco: 'Rua Teste, 123'
    }

    await expect(useCase.execute(input)).rejects.toThrow(
      'CPF ou CNPJ inválido.'
    )
  })

  it('should update cliente and return the updated entity', async () => {
    const input: UpdateClienteUseCase.Input = {
      id: 1,
      name: 'Cliente Teste',
      cpf_cnpj: 'valid-cpf-cnpj',
      contato: '123456789',
      endereco: 'Rua Teste, 123'
    }

    const updatedCliente = new ClienteModel()
    updatedCliente.id = input.id
    updatedCliente.name = input.name
    updatedCliente.cpf_cnpj = input.cpf_cnpj
    updatedCliente.contato = input.contato
    updatedCliente.endereco = input.endereco

    jest.spyOn(IsCPForCnpj, 'isValid').mockReturnValueOnce(true)
    jest
      .spyOn(clienteRepository, 'update')
      .mockResolvedValueOnce(updatedCliente)

    const result = await useCase.execute(input)

    expect(result).toEqual(updatedCliente)
    expect(clienteRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: input.id,
        name: input.name,
        cpf_cnpj: input.cpf_cnpj,
        contato: input.contato,
        endereco: input.endereco
      })
    )
  })

  it('should throw an error if update fails', async () => {
    const input: UpdateClienteUseCase.Input = {
      id: 1,
      name: 'Cliente Teste',
      cpf_cnpj: 'valid-cpf-cnpj',
      contato: '123456789',
      endereco: 'Rua Teste, 123'
    }

    jest.spyOn(IsCPForCnpj, 'isValid').mockReturnValueOnce(true)
    jest.spyOn(clienteRepository, 'update').mockResolvedValueOnce(null)

    await expect(useCase.execute(input)).rejects.toThrow(
      'Falha ao atualizar o cliente.'
    )
  })

  it('should throw an error if there is a failure during the update process', async () => {
    const input: UpdateClienteUseCase.Input = {
      id: 1,
      name: 'Cliente Teste',
      cpf_cnpj: 'valid-cpf-cnpj',
      contato: '123456789',
      endereco: 'Rua Teste, 123'
    }

    jest.spyOn(IsCPForCnpj, 'isValid').mockReturnValueOnce(true)
    jest
      .spyOn(clienteRepository, 'update')
      .mockRejectedValueOnce(new Error('Database error'))

    await expect(useCase.execute(input)).rejects.toThrow(
      'Falha ao atualizar o cliente.'
    )
  })
})
