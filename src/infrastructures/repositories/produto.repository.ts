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

  // Salva um novo produto
  async save(produto: ProdutoModel): Promise<ProdutoModel> {
    const entity = this.produtoRepository.create(produto)
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
    return {
      id: produtoEntity.id,
      name: produtoEntity.name,
      description: produtoEntity.description,
      price: produtoEntity.price,
      quantity: produtoEntity.quantity,
      image: produtoEntity.image,
      fornecedorId: produtoEntity.fornecedor.id
    }
  }
}
