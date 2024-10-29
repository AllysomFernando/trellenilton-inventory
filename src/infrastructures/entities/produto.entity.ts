import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Fornecedor } from './fornecedor.entity'
import { ItemPedido } from './itemPedido.entity'

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('varchar')
  name: string
  @Column('varchar')
  description: string
  @Column('decimal')
  price: number
  @Column('int')
  quantity: number
  @Column('varchar')
  image: string
  @OneToMany(() => ItemPedido, (itemPedido) => itemPedido.produto)
  itens: ItemPedido[]
  @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.id)
  @JoinColumn({ name: 'fornecedorId' })
  fornecedor: Fornecedor
}
