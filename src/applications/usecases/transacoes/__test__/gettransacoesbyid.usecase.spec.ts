import { TransacaoRepository } from '@/domain/repository/transacao.repository'
import { GetTransacaoByIdUseCase } from '../gettransacoesbyid.usecase'
import { PedidoStatus } from '@/domain/models/pedido'

describe('GetTransacaoByIdUseCase', () => {
  let getTransacaoByIdUseCase: GetTransacaoByIdUseCase.UseCase
  let transacaoRepository: TransacaoRepository

  beforeEach(() => {
    transacaoRepository = {
      findById: jest.fn(),
      delete: jest.fn()
    } as any
    getTransacaoByIdUseCase = new GetTransacaoByIdUseCase.UseCase(
      transacaoRepository
    )
  })

  it('should throw BadRequestError if id is not provided', async () => {
    await expect(getTransacaoByIdUseCase.execute({ id: null })).rejects.toThrow(
      'Id is required'
    )
  })

  it('should throw BadRequestError if transaction is not found', async () => {
    ;(transacaoRepository.findById as jest.Mock).mockResolvedValue(null)

    await expect(getTransacaoByIdUseCase.execute({ id: 1 })).rejects.toThrow(
      'Transacao nao encontrada'
    )
  })

  it('should return a transaction by ID successfully', async () => {
    const transacao = {
      id: 1,
      data: '2023-10-01',
      clienteId: 1,
      status: PedidoStatus.Concluido,
      total: 100
    }

    ;(transacaoRepository.findById as jest.Mock).mockResolvedValueOnce(
      transacao
    )

    const result = await getTransacaoByIdUseCase.execute({ id: 1 })

    expect(result).toEqual(transacao)
  })
})
