import { DeleteTransacoesUseCase } from '../deletetransacoes.usecase'
import { TransacaoRepository } from '@/domain/repository/transacao.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

describe('DeleteTransacoesUseCase', () => {
  let transacaoRepository: TransacaoRepository
  let deleteTransacoesUseCase: DeleteTransacoesUseCase.UseCase

  beforeEach(() => {
    transacaoRepository = {
      findById: jest.fn(),
      delete: jest.fn()
    } as any
    deleteTransacoesUseCase = new DeleteTransacoesUseCase.UseCase(
      transacaoRepository
    )
  })

  it('should delete a transaction successfully', async () => {
    const input = { id: 1 }
    ;(transacaoRepository.findById as jest.Mock).mockResolvedValue(true)
    ;(transacaoRepository.delete as jest.Mock).mockResolvedValue(true)

    const result = await deleteTransacoesUseCase.execute(input)

    expect(result).toBe(true)
    expect(transacaoRepository.findById).toHaveBeenCalledWith(input.id)
    expect(transacaoRepository.delete).toHaveBeenCalledWith(input.id)
  })

  it('should throw BadRequestError if transaction is not found', async () => {
    const input = { id: 1 }
    ;(transacaoRepository.findById as jest.Mock).mockResolvedValue(null)

    await expect(deleteTransacoesUseCase.execute(input)).rejects.toThrow(
      BadRequestError
    )
    expect(transacaoRepository.findById).toHaveBeenCalledWith(input.id)
    expect(transacaoRepository.delete).not.toHaveBeenCalled()
  })

  it('should throw BadRequestError if delete operation fails', async () => {
    const input = { id: 1 }
    ;(transacaoRepository.findById as jest.Mock).mockResolvedValue(true)
    ;(transacaoRepository.delete as jest.Mock).mockResolvedValue(false)

    await expect(deleteTransacoesUseCase.execute(input)).rejects.toThrow(
      BadRequestError
    )
    expect(transacaoRepository.findById).toHaveBeenCalledWith(input.id)
    expect(transacaoRepository.delete).toHaveBeenCalledWith(input.id)
  })

  it('should throw BadRequestError if an exception occurs during delete operation', async () => {
    const input = { id: 1 }
    ;(transacaoRepository.findById as jest.Mock).mockResolvedValue(true)
    ;(transacaoRepository.delete as jest.Mock).mockRejectedValue(
      new Error('Unexpected error')
    )

    await expect(deleteTransacoesUseCase.execute(input)).rejects.toThrow(
      BadRequestError
    )
    expect(transacaoRepository.findById).toHaveBeenCalledWith(input.id)
    expect(transacaoRepository.delete).toHaveBeenCalledWith(input.id)
  })
})
