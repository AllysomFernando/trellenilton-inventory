import { TransacaoRepository } from '@/domain/repository/transacao.repository'
import { GetTransacaoByIdUseCase } from '../gettransacoesbyid.usecase'
import { PedidoEnum } from '@/applications/enum/pedido.enum'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

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
      new BadRequestError('Id is required')
    )
  })

  it('should throw BadRequestError if transaction is not found', async () => {
    ;(transacaoRepository.findById as jest.Mock).mockResolvedValue(null)

    await expect(getTransacaoByIdUseCase.execute({ id: 1 })).rejects.toThrow(
      new BadRequestError('Transacao nao encontrada')
    )
  })

  it('should return a transaction by ID successfully', async () => {
    const transacao = {
      id: 1,
      data: '2023-10-01',
      clienteId: 1,
      status: PedidoEnum.Concluido,
      total: 100
    }

    ;(transacaoRepository.findById as jest.Mock).mockResolvedValueOnce(
      transacao
    )
  
    const result = await getTransacaoByIdUseCase.execute({ id: 1 })

    expect(result).toEqual(transacao)
  })
})
