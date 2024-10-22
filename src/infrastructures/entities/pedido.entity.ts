import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('int')
  clienteId: number

  @Column('datetime')
  data: Date

  @Column('varchar')
  status: string
  
  @Column('decimal')
  valorTotal: number
}
