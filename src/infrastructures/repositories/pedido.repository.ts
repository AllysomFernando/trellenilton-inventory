import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Pedido } from '../entities/pedido.entity'
import { Repository } from 'typeorm'
import { PedidoModel } from '@/domain/models/pedido'
import { PedidoEnum } from '@/applications/enum/pedido.enum'

@Injectable()
export class PedidoRepositoryOrm implements PedidoRepository {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>
  ) {}

  async findAll(): Promise<PedidoModel[]> {
    const pedidos = await this.pedidoRepository.find({
      relations: ['cliente', 'itens', 'itens.produto']
    })
    return pedidos.map((pedido) => this.toPedido(pedido))
  }

  async findById(id: number): Promise<PedidoModel> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['cliente', 'itens', 'itens.produto']
    })
    return this.toPedido(pedido)
  }

  async save(pedido: PedidoModel): Promise<PedidoModel> {
    const entity = this.pedidoRepository.create({
      ...pedido,
      cliente: { id: pedido.clienteId } as any,
      itens: pedido.itens.map((item) => ({
        produto: { id: item.produtoId } as any,
        quantidade: item.quantidade,
        preco: item.preco
      }))
    })
    const savedEntity = await this.pedidoRepository.save(entity)
    const savedPedido = await this.pedidoRepository.findOne({
      where: { id: savedEntity.id },
      relations: ['cliente', 'itens', 'itens.produto']
    })
    return this.toPedido(savedPedido)
  }

  async update(pedido: PedidoModel): Promise<PedidoModel> {
    const entity = await this.pedidoRepository.findOneBy({ id: pedido.id })
    if (!entity) return null

    entity.cliente = { id: pedido.clienteId } as any
    entity.data = pedido.data
    entity.status = pedido.status
    entity.total = pedido.total
  
    await this.pedidoRepository.save(entity)
    return this.toPedido(entity)
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.pedidoRepository.findOneBy({ id })
    if (!entity) return false

    await this.pedidoRepository.remove(entity)
    return true
  }

  async findByClienteId(clienteId: number): Promise<PedidoModel[]> {
    const pedidos = await this.pedidoRepository.find({
      where: { cliente: { id: clienteId } },
      relations: ['cliente']
    })
    return pedidos.map((pedido) => this.toPedido(pedido))
  }

  private toPedido(pedidoEntity: Pedido): PedidoModel {
    const pedido: PedidoModel = new PedidoModel()

    pedido.id = pedidoEntity.id
    pedido.clienteId = pedidoEntity.cliente.id
    pedido.data = pedidoEntity.data
    pedido.status = pedidoEntity.status as PedidoEnum
    pedido.total = pedidoEntity.total
    pedido.itens = pedidoEntity.itens.map((item) => ({
      produtoId: item.produto.id,
      quantidade: item.quantidade,
      preco: item.precoUnitario
    }))

    return pedido
  }
}
