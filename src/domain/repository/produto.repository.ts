import { ProdutoModel } from '../models/produto'

export interface ProdutoRepository {
  findAll(): Promise<ProdutoModel[]>
  findById(id: number): Promise<ProdutoModel>
  save(produto: ProdutoModel): Promise<ProdutoModel>
  update(produto: ProdutoModel): Promise<ProdutoModel>
  delete(id: number): Promise<boolean>
  findByFornecedorId(fornecedorId: number): Promise<ProdutoModel[]>
  uploadImage(file: Express.Multer.File): Promise<string>
}
