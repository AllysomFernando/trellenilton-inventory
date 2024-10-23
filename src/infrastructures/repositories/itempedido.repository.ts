import { ItemPedidoRepository } from '@/domain/repository/itempedido.repository'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ItemPedido } from '../entities/itemPedido.entity'
import { Repository } from 'typeorm'
import { ItemPedidoModel } from '@/domain/models/itemPedido'
import { Pedido } from '../entities/pedido.entity'
import { Produto } from '../entities/produto.entity'

@Injectable()
export class ItemPedidoRepositoryOrm implements ItemPedidoRepository {
  constructor(
    @InjectRepository(ItemPedido)
    private readonly itemPedidoRepository: Repository<ItemPedido>
  ) {}

  async findAll(): Promise<ItemPedidoModel[]> {
    const itemPedidos = await this.itemPedidoRepository.find({
      relations: ['pedido', 'produto']
    })
    return itemPedidos.map(this.toItemPedido)
  }

  async findById(id: number): Promise<ItemPedidoModel | null> {
    const itemPedido = await this.itemPedidoRepository.findOne({
      where: { id },
      relations: ['pedido', 'produto']
    })
    return itemPedido ? this.toItemPedido(itemPedido) : null
  }

  async save(itemPedido: ItemPedidoModel): Promise<ItemPedidoModel> {
    const pedido = await this.itemPedidoRepository.manager.findOne(Pedido, {
      where: { id: itemPedido.pedidoId }
    })
    const produto = await this.itemPedidoRepository.manager.findOne(Produto, {
      where: { id: itemPedido.produtoId }
    })

    const entity = this.itemPedidoRepository.create({
      pedido,
      produto,
      quantidade: itemPedido.quantidade,
      precoUnitario: itemPedido.precoUnitario
    })

    await this.itemPedidoRepository.save(entity)
    return this.toItemPedido(entity)
  }

  async update(itemPedido: ItemPedidoModel): Promise<ItemPedidoModel | null> {
    const entity = await this.itemPedidoRepository.findOne({
      where: { id: itemPedido.id },
      relations: ['pedido', 'produto']
    })

    if (!entity) {
      return null
    }

    const pedido = await this.itemPedidoRepository.manager.findOne(Pedido, {
      where: { id: itemPedido.pedidoId }
    })
    const produto = await this.itemPedidoRepository.manager.findOne(Produto, {
      where: { id: itemPedido.produtoId }
    })

    entity.pedido = pedido
    entity.produto = produto
    entity.quantidade = itemPedido.quantidade
    entity.precoUnitario = itemPedido.precoUnitario

    await this.itemPedidoRepository.save(entity)
    return this.toItemPedido(entity)
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.itemPedidoRepository.findOne({ where: { id } })
    if (!entity) {
      return false
    }
    await this.itemPedidoRepository.remove(entity)
    return true
  }

  private toItemPedido(entity: ItemPedido): ItemPedidoModel {
    return {
      id: entity.id,
      pedidoId: entity.pedido.id,
      produtoId: entity.produto.id,
      quantidade: entity.quantidade,
      precoUnitario: entity.precoUnitario
    }
  }
}
