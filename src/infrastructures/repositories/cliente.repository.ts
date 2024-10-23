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
  async findAll(): Promise<Cliente[]> {
    const clientes = await this.clienteRepository.find()
    if (!clientes || clientes.length === 0) {
      return []
    }
    return clientes
  }
  async findById(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOneBy({ id })
    if (!cliente) {
      return null
    }
    return cliente
  }
  async save(cliente: Cliente): Promise<Cliente> {
    const entity = this.clienteRepository.create(cliente)
    await this.clienteRepository.save(entity)
    return this.toCliente(entity)
  }

  async update(cliente: Cliente): Promise<Cliente> {
    const entity = await this.clienteRepository.findOneBy({ id: cliente.id })
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
    const entity = await this.clienteRepository.findOneBy({ id })
    if (!entity) {
      return false
    }
    await this.clienteRepository.remove(entity)
    return true
  }

  async archive(id: number): Promise<boolean> {
    const entity = await this.clienteRepository.findOneBy({ id })
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
    cliente.pedidos = clienteEntity.pedidos

    return cliente
  }
}
