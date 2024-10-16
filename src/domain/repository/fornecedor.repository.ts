import { FornecedorModel } from '../models/fornecedor'

export interface FornecedorRepository {
  findAll(): Promise<FornecedorModel[]>
  findById(id: number): Promise<FornecedorModel>
  save(produto: FornecedorModel): Promise<FornecedorModel>
  update(produto: FornecedorModel): Promise<FornecedorModel>
  delete(id: number): Promise<boolean>
}
