import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Fornecedor } from '../entities/fornecedor.entity'
import { Repository } from 'typeorm'
import { FornecedorModel } from '@/domain/models/fornecedor'
import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'

@Injectable()
export class FornecedorRepositoryOrm implements FornecedorRepository {
  constructor(
    @InjectRepository(Fornecedor)
    private readonly fornecedorRepository: Repository<Fornecedor>
  ) {}

  async findAll(): Promise<Fornecedor[]> {
    const fornecedores = await this.fornecedorRepository.find()
    if (!fornecedores || fornecedores.length === 0) {
      return []
    }
    return fornecedores
  }

  async findById(id: number): Promise<Fornecedor> {
    const fornecedor = await this.fornecedorRepository.findOneBy({ id })
    if (!fornecedor) {
      return null
    }
    return fornecedor
  }

  async save(fornecedor: Fornecedor): Promise<Fornecedor> {
    const entity = this.fornecedorRepository.create(fornecedor)
    await this.fornecedorRepository.save(entity)
    return this.toFornecedor(entity)
  }

  async update(fornecedor: Fornecedor): Promise<Fornecedor> {
    const entity = await this.fornecedorRepository.findOneBy({
      id: fornecedor.id
    })
    if (!entity) {
      return null
    }
    entity.name = fornecedor.name
    entity.endereco = fornecedor.endereco
    entity.contato = fornecedor.contato
    entity.cnpj = fornecedor.cnpj
    await this.fornecedorRepository.save(entity)
    return this.toFornecedor(entity)
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.fornecedorRepository.findOneBy({ id })
    if (!entity) {
      return false
    }
    await this.fornecedorRepository.remove(entity)
    return true
  }

  private toFornecedor(fornecedorEntity: Fornecedor): FornecedorModel {
    const fornecedor: FornecedorModel = new FornecedorModel()
    fornecedor.id = fornecedorEntity.id
    fornecedor.name = fornecedorEntity.name
    fornecedor.endereco = fornecedorEntity.endereco
    fornecedor.contato = fornecedorEntity.contato
    fornecedor.cnpj = fornecedorEntity.cnpj
    return fornecedor
  }
}
