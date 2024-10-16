import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Fornecedor } from './fornecedor.entity'

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
  @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.id)
  fornecedorId: number
}
