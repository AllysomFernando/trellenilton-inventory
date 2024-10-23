import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Pedido } from './pedido.entity'
import { Produto } from './produto.entity'
@Entity('item_pedido')
export class ItemPedido {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Pedido, (pedido) => pedido.itens)
  @JoinColumn({ name: 'pedidoId' })
  pedido: Pedido

  @ManyToOne(() => Produto, (produto) => produto.itens)
  @JoinColumn({ name: 'produtoId' })
  produto: Produto

  @Column('int')
  quantidade: number

  @Column('decimal')
  precoUnitario: number
}
