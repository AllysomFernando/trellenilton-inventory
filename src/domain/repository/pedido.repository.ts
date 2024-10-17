import { PedidoModel } from '../models/pedido'

export interface PedidoRepository {
  findAll(): Promise<PedidoModel[]>
  findById(id: number): Promise<PedidoModel>
  save(produto: PedidoModel): Promise<PedidoModel>
  update(produto: PedidoModel): Promise<PedidoModel>
  delete(id: number): Promise<boolean>
}
