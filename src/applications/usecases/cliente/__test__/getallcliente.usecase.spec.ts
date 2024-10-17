import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { ClienteModel } from '@/domain/models/cliente'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { GetAllClientUseCase } from '../getallcliente.usecase'

describe('GetAllClientUseCase', () => {
  let useCase: GetAllClientUseCase.UseCase
  let clienteRepository: ClienteRepository

  beforeEach(() => {
    clienteRepository = {
      findAll: jest.fn()
    } as unknown as ClienteRepository
    useCase = new GetAllClientUseCase.UseCase(clienteRepository)
  })

  it('should return a list of clients', async () => {
    const clients: ClienteModel[] = [
      {
        id: 1,
        name: 'Cliente 1',
        cpf_cnpj: '12345678901',
        endereco: 'Rua A',
        contato: '123456789'
      },
      {
        id: 2,
        name: 'Cliente 2',
        cpf_cnpj: '98765432100',
        endereco: 'Rua B',
        contato: '987654321'
      }
    ]

    jest.spyOn(clienteRepository, 'findAll').mockResolvedValueOnce(clients)

    const result = await useCase.execute()

    expect(result).toEqual(clients)
    expect(clienteRepository.findAll).toHaveBeenCalledTimes(1)
  })

  it('should throw BadRequestError if no clients are found', async () => {
    jest.spyOn(clienteRepository, 'findAll').mockResolvedValueOnce(null)

    await expect(useCase.execute()).rejects.toThrow(BadRequestError)
  })

  it('should throw BadRequestError if there is an error during the search', async () => {
    jest
      .spyOn(clienteRepository, 'findAll')
      .mockRejectedValueOnce(new Error('Database error'))

    await expect(useCase.execute()).rejects.toThrow(BadRequestError)
    await expect(useCase.execute()).rejects.toThrow(
      'Falha ao buscar os clientes.'
    )
  })
})
