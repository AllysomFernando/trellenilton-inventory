import { CreateTransacoesUseCase } from '../createtransacoes.usecase'
import { TransacaoEnum, TransacaoModel } from '@/domain/models/transacao'
import { TransacaoRepository } from '@/domain/repository/transacao.repository'
import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

describe('CreateTransacoesUseCase', () => {
  let transacaoRepository: TransacaoRepository
  let produtoRepository: ProdutoRepository
  let pedidoRepository: PedidoRepository
  let useCase: CreateTransacoesUseCase.UseCase

  beforeEach(() => {
    transacaoRepository = {
      save: jest.fn()
    } as any

    produtoRepository = {
      findById: jest.fn()
    } as any

    pedidoRepository = {
      findById: jest.fn()
    } as any

    useCase = new CreateTransacoesUseCase.UseCase(
      transacaoRepository,
      produtoRepository,
      pedidoRepository
    )
  })

  it('should throw an error if any required field is missing', async () => {
    const input = {
      data: new Date(),
      tipo: TransacaoEnum.Entrada,
      valor: 100,
      produtoId: null,
      pedidoId: 1
    }

    await expect(useCase.execute(input)).rejects.toThrow(
      'Data, tipo, valor, id do produto e id do pedido são obrigatórios.'
    )
  })

  it('should throw an error if valor is less than or equal to zero', async () => {
    const input = {
      data: new Date(),
      tipo: TransacaoEnum.Entrada,
      valor: 0,
      produtoId: 1,
      pedidoId: 1
    }

    await expect(useCase.execute(input)).rejects.toThrow(
      'O valor da transação deve ser maior que zero.'
    )
  })

  it('should throw an error if produto is not found', async () => {
    const input = {
      data: new Date(),
      tipo: TransacaoEnum.Entrada,
      valor: 100,
      produtoId: 1,
      pedidoId: 1
    }

    ;(produtoRepository.findById as jest.Mock).mockResolvedValue(null)

    await expect(useCase.execute(input)).rejects.toThrow(
      'Produto não encontrado.'
    )
  })

  it('should throw an error if pedido is not found', async () => {
    const input = {
      data: new Date(),
      tipo: TransacaoEnum.Entrada,
      valor: 100,
      produtoId: 1,
      pedidoId: 1
    }

    ;(produtoRepository.findById as jest.Mock).mockResolvedValue({})
    ;(pedidoRepository.findById as jest.Mock).mockResolvedValue(null)

    await expect(useCase.execute(input)).rejects.toThrow(
      'Pedido não encontrado.'
    )
  })

  it('should create a transacao successfully', async () => {
    const input = {
      data: new Date(),
      tipo: TransacaoEnum.Entrada,
      valor: 100,
      produtoId: 1,
      pedidoId: 1
    }

    const expectedTransacao: TransacaoModel = {
      id: 1,
      data: input.data,
      tipo: input.tipo,
      valor: input.valor,
      produtoId: input.produtoId,
      pedidoId: input.pedidoId
    }

    ;(produtoRepository.findById as jest.Mock).mockResolvedValue({})
    ;(pedidoRepository.findById as jest.Mock).mockResolvedValue({})
    ;(transacaoRepository.save as jest.Mock).mockResolvedValue(
      expectedTransacao
    )

    const result = await useCase.execute(input)

    expect(result).toEqual(expectedTransacao)
    expect(transacaoRepository.save).toHaveBeenCalledWith(
      input.data,
      input.tipo,
      input.valor,
      input.produtoId,
      input.pedidoId
    )
  })
})
