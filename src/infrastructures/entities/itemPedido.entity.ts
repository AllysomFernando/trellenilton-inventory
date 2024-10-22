import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity('item_pedido')
export class ItemPedido {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('int')
  pedidoId: number

  @Column('int')
  produtoId: number

  @Column('int')
  quantidade: number

  @Column('decimal')
  precoUnitario: number
}
