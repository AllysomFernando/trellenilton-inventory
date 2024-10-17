import { ClienteModel } from '../models/cliente'

export interface ClienteRepository {
  findAll(): Promise<ClienteModel[]>
  findById(id: number): Promise<ClienteModel>
  save(cliente: ClienteModel): Promise<ClienteModel>
  update(cliente: ClienteModel): Promise<ClienteModel>
  delete(id: number): Promise<boolean>
  archive(id: number): Promise<boolean>
}
