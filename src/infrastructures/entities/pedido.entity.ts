import { PedidoStatus } from '@/domain/models/pedido'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('int')
  clienteId: number

  @Column('datetime')
  data: Date

  @Column('enum', { enum: PedidoStatus })
  status: PedidoStatus

  @Column('decimal')
  total: number
}
