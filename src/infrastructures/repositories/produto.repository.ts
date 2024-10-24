import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Produto } from '../entities/produto.entity'
import { Repository } from 'typeorm'
import { ProdutoModel } from '@/domain/models/produto'
import { Fornecedor } from '../entities/fornecedor.entity'

@Injectable()
export class ProdutoRepositoryOrm implements ProdutoRepository {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>
  ) {}

  async findAll(): Promise<ProdutoModel[]> {
    const produtos = await this.produtoRepository.find()
    return produtos.map((produto) => this.toProduto(produto))
  }

  async findById(id: number): Promise<ProdutoModel> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['fornecedor', 'itens']
    })
    return produto ? this.toProduto(produto) : null
  }

  async save(produto: ProdutoModel): Promise<ProdutoModel> {
    const fornecedor = await this.produtoRepository.manager.findOne(
      Fornecedor,
      {
        where: { id: produto.fornecedorId }
      }
    )
    if (!fornecedor) {
      throw new Error(
        `Fornecedor com id ${produto.fornecedorId} não encontrado.`
      )
    }
    const entity = this.produtoRepository.create({
      ...produto,
      fornecedor
    })
    await this.produtoRepository.save(entity)
    return this.toProduto(entity)
  }

  async update(produto: ProdutoModel): Promise<ProdutoModel> {
    const entity = await this.produtoRepository.findOneBy({ id: produto.id })
    if (!entity) return null

    entity.image = produto.image
    entity.description = produto.description
    entity.name = produto.name
    entity.price = produto.price
    entity.quantity = produto.quantity
    entity.fornecedor = { id: produto.fornecedorId } as any

    await this.produtoRepository.save(entity)
    return this.toProduto(entity)
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.produtoRepository.findOneBy({ id })
    if (!entity) return false

    await this.produtoRepository.delete(entity)
    return true
  }

  async findByFornecedorId(fornecedorId: number): Promise<ProdutoModel[]> {
    const produtos = await this.produtoRepository.find({
      where: { fornecedor: { id: fornecedorId } },
      relations: ['fornecedor']
    })
    return produtos.map((produto) => this.toProduto(produto))
  }

  private toProduto(produtoEntity: Produto): ProdutoModel {
    const produto = new ProdutoModel()
    if (produtoEntity.id !== undefined) {
      produto.id = produtoEntity.id
    }
    produto.name = produtoEntity.name
    produto.description = produtoEntity.description
    produto.price = produtoEntity.price
    produto.quantity = produtoEntity.quantity
    produto.fornecedorId = produtoEntity.fornecedor.id
    return produto
  }
}
