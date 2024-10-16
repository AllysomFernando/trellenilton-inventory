import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
  @Column('int')
  fornecedorId: number
}
