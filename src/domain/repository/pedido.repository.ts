import { PedidoModel } from '../models/pedido'

export interface PedidoRepository {
  findAll(): Promise<PedidoModel[]>
  findById(id: number): Promise<PedidoModel>
  save(pedido: PedidoModel): Promise<PedidoModel>
  update(pedido: PedidoModel): Promise<PedidoModel>
  delete(id: number): Promise<boolean>
  findByClienteId(clienteId: number): Promise<PedidoModel[]>
}
