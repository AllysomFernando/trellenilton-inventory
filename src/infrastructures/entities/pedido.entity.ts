import { PedidoStatus } from '../../domain/models/pedido'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Cliente } from './cliente.entity'
import { ItemPedido } from './itemPedido.entity'

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  @JoinColumn({ name: 'clienteId' })
  cliente: Cliente

  @Column('varchar')
  data: string

  @Column('varchar') 
  status: PedidoStatus

  @Column('decimal')
  total: number

  @OneToMany(() => ItemPedido, (itemPedido) => itemPedido.pedido)
  itens: ItemPedido[]
}
