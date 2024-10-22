import { PedidoRepository } from '@/domain/repository/pedido.repository'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Pedido } from '../entities/pedido.entity'
import { Repository } from 'typeorm'
import { PedidoModel, PedidoStatus } from '@/domain/models/pedido'

@Injectable()
export class PedidoRepositoryOrm implements PedidoRepository {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>
  ) {}

  async findAll(): Promise<Pedido[]> {
    const pedidos = await this.pedidoRepository.find()
    if (!pedidos || pedidos.length === 0) {
      return []
    }
    return pedidos
  }

  async findById(id: number): Promise<PedidoModel> {
    const pedido = await this.pedidoRepository.findOneBy({ id })
    if (!pedido) {
      return null
    }
    return this.toPedido(pedido)
  }

  async save(pedido: PedidoModel): Promise<PedidoModel> {
    const entity = this.pedidoRepository.create(pedido)
    await this.pedidoRepository.save(entity)
    return this.toPedido(entity)
  }

  async update(pedido: PedidoModel): Promise<PedidoModel> {
    const entity = await this.pedidoRepository.findOneBy({ id: pedido.id })
    if (!entity) {
      return null
    }
    entity.clienteId = pedido.clienteId
    entity.data = pedido.data
    entity.status = pedido.status
    entity.total = pedido.total
    await this.pedidoRepository.save(entity)
    return this.toPedido(entity)
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.pedidoRepository.findOneBy({ id })
    if (!entity) {
      return false
    }
    await this.pedidoRepository.remove(entity)
    return true
  }

  async findByClienteId(clienteId: number): Promise<PedidoModel[]> {
    const pedidos = await this.pedidoRepository.find({ where: { clienteId } })
    if (!pedidos || pedidos.length === 0) {
      return []
    }
    return pedidos.map((pedido) => this.toPedido(pedido))
  }

  private toPedido(pedidoEntity: Pedido): PedidoModel {
    const pedido: PedidoModel = new PedidoModel()

    pedido.id = pedidoEntity.id
    pedido.clienteId = pedidoEntity.clienteId
    pedido.data = pedidoEntity.data
    pedido.status = pedidoEntity.status as PedidoStatus
    pedido.total = pedidoEntity.total

    return pedido
  }
}
