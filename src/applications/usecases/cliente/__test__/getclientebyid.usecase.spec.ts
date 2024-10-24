import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { ClienteModel } from '@/domain/models/cliente'
import { GetClientByIdUseCase } from '../getclientebyid.usecase'

describe('GetClientByIdUseCase', () => {
  let useCase: GetClientByIdUseCase.UseCase
  let clienteRepository: ClienteRepository

  beforeEach(() => {
    clienteRepository = {
      findById: jest.fn()
    } as unknown as ClienteRepository
    useCase = new GetClientByIdUseCase.UseCase(clienteRepository)
  })

  it('should throw an error if id is not provided', async () => {
    const input: GetClientByIdUseCase.Input = { id: null as unknown as number }

    await expect(useCase.execute(input)).rejects.toThrow('Id é obrigatório.')
  })

  it('should return a client if found by id', async () => {
    const client: ClienteModel = {
      id: 1,
      name: 'Cliente Teste',
      cpf_cnpj: '12345678901',
      endereco: 'Rua Teste',
      contato: '123456789',
      archived: false
    }

    jest.spyOn(clienteRepository, 'findById').mockResolvedValueOnce(client)

    const input: GetClientByIdUseCase.Input = { id: 1 }
    const result = await useCase.execute(input)

    expect(result).toEqual(client)
    expect(clienteRepository.findById).toHaveBeenCalledWith(1)
    expect(clienteRepository.findById).toHaveBeenCalledTimes(1)
  })

  it('should throw an error if client is not found', async () => {
    jest.spyOn(clienteRepository, 'findById').mockResolvedValueOnce(null)

    const input: GetClientByIdUseCase.Input = { id: 1 }

    await expect(useCase.execute(input)).rejects.toThrow(
      'Falha ao buscar o cliente.'
    )
  })

  it('should throw an error if there is a failure during the search', async () => {
    jest
      .spyOn(clienteRepository, 'findById')
      .mockRejectedValueOnce(new Error('Database error'))

    const input: GetClientByIdUseCase.Input = { id: 1 }

    await expect(useCase.execute(input)).rejects.toThrow(
      'Falha ao buscar o cliente.'
    )
  })
})
