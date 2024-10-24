import { ClienteRepository } from '@/domain/repository/cliente.repository'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Cliente } from '../entities/cliente.entity'
import { Repository } from 'typeorm'
import { ClienteModel } from '@/domain/models/cliente'

@Injectable()
export class ClienteRepositoryOrm implements ClienteRepository {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ) {}

  async findAll(): Promise<ClienteModel[]> {
    const clientes = await this.clienteRepository.find({
      relations: ['pedidos']
    })
    if (!clientes || clientes.length === 0) {
      return []
    }
    return clientes.map((cliente) => this.toCliente(cliente))
  }

  async findById(id: number): Promise<ClienteModel> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['pedidos']
    })
    if (!cliente) {
      return null
    }
    return this.toCliente(cliente)
  }

  async save(cliente: ClienteModel): Promise<ClienteModel> {
    const entity = this.clienteRepository.create(cliente)
    await this.clienteRepository.save(entity)
    return this.toCliente(entity)
  }

  async update(cliente: ClienteModel): Promise<ClienteModel> {
    const entity = await this.clienteRepository.findOne({
      where: { id: cliente.id },
      relations: ['pedidos']
    })
    if (!entity) {
      return null
    }
    entity.name = cliente.name
    entity.endereco = cliente.endereco
    entity.contato = cliente.contato
    entity.cpf_cnpj = cliente.cpf_cnpj
    await this.clienteRepository.save(entity)
    return this.toCliente(entity)
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.clienteRepository.findOne({
      where: { id },
      relations: ['pedidos']
    })
    if (!entity) {
      return false
    }
    await this.clienteRepository.remove(entity)
    return true
  }

  async archive(id: number): Promise<boolean> {
    const entity = await this.clienteRepository.findOne({
      where: { id },
      relations: ['pedidos']
    })
    if (!entity) {
      return false
    }
    entity.archived = true
    await this.clienteRepository.save(entity)
    return true
  }

  private toCliente(clienteEntity: Cliente): ClienteModel {
    const cliente: ClienteModel = new ClienteModel()
    cliente.id = clienteEntity.id
    cliente.name = clienteEntity.name
    cliente.endereco = clienteEntity.endereco
    cliente.contato = clienteEntity.contato
    cliente.cpf_cnpj = clienteEntity.cpf_cnpj
    cliente.archived = clienteEntity.archived
    cliente.pedidos =
      clienteEntity.pedidos?.map((pedido) => ({
        id: pedido.id,
        data: pedido.data,
        clienteId: pedido.cliente.id,
        status: pedido.status,
        total: pedido.total,
        itens: pedido.itens.map((item) => ({
          produtoId: item.produto.id,
          quantidade: item.quantidade,
          preco: item.precoUnitario
        }))
      })) || []

    return cliente
  }
}
