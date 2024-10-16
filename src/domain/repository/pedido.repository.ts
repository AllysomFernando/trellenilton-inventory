import { PedidoModels } from '../models/pedido'

export interface PedidoRepository {
  findAll(): Promise<PedidoModels[]>
  findById(id: number): Promise<PedidoModels>
  save(produto: PedidoModels): Promise<PedidoModels>
  update(produto: PedidoModels): Promise<PedidoModels>
  delete(id: number): Promise<boolean>
}
