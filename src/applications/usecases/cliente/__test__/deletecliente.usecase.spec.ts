import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { DeleteClienteUseCase } from '../deletecliente.usecase'

describe('DeleteClienteUseCase', () => {
  let useCase: DeleteClienteUseCase.UseCase
  let clienteRepository: ClienteRepository

  beforeEach(() => {
    clienteRepository = {
      findById: jest.fn(),
      delete: jest.fn()
    } as unknown as ClienteRepository
    useCase = new DeleteClienteUseCase.UseCase(clienteRepository)
  })

  it('should throw an error if id is not provided', async () => {
    const input: DeleteClienteUseCase.Input = { id: null as unknown as number }

    await expect(useCase.execute(input)).rejects.toThrow('Id é obrigatório.')
  })

  it('should throw an error if cliente is not found', async () => {
    const input: DeleteClienteUseCase.Input = { id: 1 }

    jest.spyOn(clienteRepository, 'findById').mockResolvedValueOnce(null)

    await expect(useCase.execute(input)).rejects.toThrow(
      'Cliente não encontrado.'
    )
  })

  it('should call clienteRepository.findById and clienteRepository.delete', async () => {
    const input: DeleteClienteUseCase.Input = { id: 1 }

    const foundCliente = {
      id: 1,
      name: 'Cliente Teste',
      contato: 'test',
      endereco: 'test',
      cpf_cnpj: 'test'
    }
    jest
      .spyOn(clienteRepository, 'findById')
      .mockResolvedValueOnce(foundCliente)
    jest.spyOn(clienteRepository, 'delete').mockResolvedValueOnce(void 0)

    await useCase.execute(input)

    expect(clienteRepository.findById).toHaveBeenCalledWith(1)
    expect(clienteRepository.delete).toHaveBeenCalledWith(1)
  })

  it('should throw an error if deletion fails', async () => {
    const input: DeleteClienteUseCase.Input = { id: 1 }

    const foundCliente = {
      id: 1,
      name: 'Cliente Teste',
      contato: 'test',
      endereco: 'test',
      cpf_cnpj: 'test'
    }
    jest
      .spyOn(clienteRepository, 'findById')
      .mockResolvedValueOnce(foundCliente)
    jest
      .spyOn(clienteRepository, 'delete')
      .mockRejectedValueOnce(new Error('Falha ao deletar o cliente.'))

    await expect(useCase.execute(input)).rejects.toThrow(
      'Falha ao deletar o cliente.'
    )
  })
})
