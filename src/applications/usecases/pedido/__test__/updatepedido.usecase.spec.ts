import { UpdatePedidoUseCase } from '../updatepedido.usecase'
import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { GetPedidoByIdUseCase } from '../getpedidobyid.usecase'
import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { PedidoModel, PedidoStatus } from '@/domain/models/pedido'

describe('UpdatePedidoUseCase', () => {
  let pedidoRepository: PedidoRepository
  let getPedidoByIdUseCase: GetPedidoByIdUseCase.UseCase
  let clienteRepository: ClienteRepository
  let updatePedidoUseCase: UpdatePedidoUseCase.UseCase

  beforeEach(() => {
    pedidoRepository = {
      update: jest.fn()
    } as any

    getPedidoByIdUseCase = {
      execute: jest.fn()
    } as any

    clienteRepository = {
      findById: jest.fn()
    } as any

    updatePedidoUseCase = new UpdatePedidoUseCase.UseCase(
      pedidoRepository,
      getPedidoByIdUseCase,
      clienteRepository
    )
  })

  it('should throw an error if id is not provided', async () => {
    await expect(
      updatePedidoUseCase.execute({
        id: null,
        data: new Date(),
        clienteId: 1,
        status: 'pending',
        total: 100
      })
    ).rejects.toThrow('Id é obrigatório.')
  })

  it('should throw an error if pedido is not found', async () => {
    ;(getPedidoByIdUseCase.execute as jest.Mock).mockResolvedValue(null)

    await expect(
      updatePedidoUseCase.execute({
        id: 1,
        data: new Date(),
        clienteId: 1,
        status: PedidoStatus.Concluido,
        total: 100
      })
    ).rejects.toThrow('Pedido não encontrado.')
  })

  it('should throw an error if no fields are provided for update', async () => {
    ;(getPedidoByIdUseCase.execute as jest.Mock).mockResolvedValue({})

    await expect(
      updatePedidoUseCase.execute({
        id: 1,
        data: null,
        clienteId: null,
        status: null,
        total: null
      })
    ).rejects.toThrow('Informe ao menos um campo para atualização.')
  })

  it('should throw an error if cliente is not found', async () => {
    ;(getPedidoByIdUseCase.execute as jest.Mock).mockResolvedValue({})
    ;(clienteRepository.findById as jest.Mock).mockResolvedValue(null)

    await expect(
      updatePedidoUseCase.execute({
        id: 1,
        data: new Date(),
        clienteId: 1,
        status: PedidoStatus.Concluido,
        total: 100
      })
    ).rejects.toThrow('Cliente não encontrado.')
  })

  it('should throw an error if update fails', async () => {
    ;(getPedidoByIdUseCase.execute as jest.Mock).mockResolvedValue({})
    ;(clienteRepository.findById as jest.Mock).mockResolvedValue({})
    ;(pedidoRepository.update as jest.Mock).mockResolvedValue(null)

    await expect(
      updatePedidoUseCase.execute({
        id: 1,
        data: new Date(),
        clienteId: 1,
        status: PedidoStatus.Concluido,
        total: 100
      })
    ).rejects.toThrow('Falha ao atualizar o pedido.')
  })

  it('should update the pedido successfully', async () => {
    const pedido = new PedidoModel()
    ;(getPedidoByIdUseCase.execute as jest.Mock).mockResolvedValue(pedido)
    ;(clienteRepository.findById as jest.Mock).mockResolvedValue({})
    ;(pedidoRepository.update as jest.Mock).mockResolvedValue(pedido)

    const result = await updatePedidoUseCase.execute({
      id: 1,
      data: new Date(),
      clienteId: 1,
      status: PedidoStatus.Concluido,
      total: 100
    })

    expect(result).toBe(pedido)
    expect(pedidoRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        data: expect.any(Date),
        clienteId: 1,
        status: PedidoStatus.Concluido,
        total: 100
      })
    )
  })
})
