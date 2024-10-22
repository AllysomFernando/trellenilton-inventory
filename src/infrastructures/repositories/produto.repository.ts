import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Produto } from '../entities/produto.entity'
import { Repository } from 'typeorm'
import { ProdutoModel } from '@/domain/models/produto'

@Injectable()
export class ProdutoRepositoryOrm implements ProdutoRepository {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>
  ) {}

  async findAll(): Promise<Produto[]> {
    const produtos = await this.produtoRepository.find()
    if (!produtos || produtos.length === 0) {
      return []
    }
    return produtos
  }

  async findById(id: number): Promise<ProdutoModel> {
    const produto = await this.produtoRepository.findOneBy({ id })
    if (!produto) {
      return null
    }
    return this.toProduto(produto)
  }

  async save(produto: ProdutoModel): Promise<ProdutoModel> {
    const entity = this.produtoRepository.create(produto)
    await this.produtoRepository.save(entity)
    return this.toProduto(entity)
  }

  async update(produto: ProdutoModel): Promise<ProdutoModel> {
    const entity = await this.produtoRepository.findOneBy({ id: produto.id })
    if (!entity) {
      return null
    }
    entity.image = produto.image
    entity.description = produto.description
    entity.name = produto.name
    entity.price = produto.price
    entity.quantity = produto.quantity
    entity.fornecedorId = produto.fornecedorId

    await this.produtoRepository.save(entity)
    return this.toProduto(entity)
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.produtoRepository.findOneBy({ id })
    if (!entity) {
      return false
    }
    await this.produtoRepository.delete(entity)
    return true
  }

  async findByFornecedorId(fornecedorId: number): Promise<ProdutoModel[]> {
    const produtos = await this.produtoRepository.find({
      where: { fornecedorId }
    })
    if (!produtos || produtos.length === 0) {
      return []
    }
    return produtos.map((produto) => this.toProduto(produto))
  }

  private toProduto(produtoEntity: Produto): ProdutoModel {
    const produto: ProdutoModel = new ProdutoModel()

    produto.id = produtoEntity.id
    produto.image = produtoEntity.image
    produto.description = produtoEntity.description
    produto.name = produtoEntity.name
    produto.price = produtoEntity.price
    produto.quantity = produtoEntity.quantity
    produto.fornecedorId = produtoEntity.fornecedorId

    return produto
  }
}
