import { ItemPedidoRepository } from '@/domain/repository/itempedido.repository'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ItemPedido } from '../entities/itemPedido.entity'
import { Repository } from 'typeorm'
import { ItemPedidoModel } from '@/domain/models/itemPedido'

@Injectable()
export class ItemPedidoRepositoryOrm implements ItemPedidoRepository {
  constructor(
    @InjectRepository(ItemPedido)
    private readonly itemPedidoRepository: Repository<ItemPedido>
  ) {}

  async findAll(): Promise<ItemPedido[]> {
    const itemPedidos = await this.itemPedidoRepository.find()
    if (!itemPedidos || itemPedidos.length === 0) {
      return []
    }
    return itemPedidos
  }

  async findById(id: number): Promise<ItemPedido> {
    const itemPedido = await this.itemPedidoRepository.findOneBy({ id })
    if (!itemPedido) {
      return null
    }
    return itemPedido
  }

  async save(itemPedido: ItemPedido): Promise<ItemPedido> {
    const entity = this.itemPedidoRepository.create(itemPedido)
    await this.itemPedidoRepository.save(entity)
    return this.toItemPedido(entity)
  }

  async update(itemPedido: ItemPedido): Promise<ItemPedido> {
    const entity = await this.itemPedidoRepository.findOneBy({
      id: itemPedido.id
    })
    if (!entity) {
      return null
    }

    entity.pedidoId = itemPedido.pedidoId
    entity.produtoId = itemPedido.produtoId
    entity.quantidade = itemPedido.quantidade
    entity.precoUnitario = itemPedido.precoUnitario

    await this.itemPedidoRepository.save(entity)
    return this.toItemPedido(entity)
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.itemPedidoRepository.findOneBy({ id })
    if (!entity) {
      return false
    }
    await this.itemPedidoRepository.remove(entity)
    return true
  }

  private toItemPedido(entity: ItemPedido): ItemPedidoModel {
    const itemPedido: ItemPedidoModel = new ItemPedidoModel()

    itemPedido.id = entity.id
    itemPedido.pedidoId = entity.pedidoId
    itemPedido.produtoId = entity.produtoId
    itemPedido.quantidade = entity.quantidade
    itemPedido.precoUnitario = entity.precoUnitario

    return itemPedido
  }
}
