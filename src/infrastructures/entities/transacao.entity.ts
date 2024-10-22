import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('transacao')
export class Transacao {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar')
  tipo: string

  @Column('int')
  pedidoId: number

  @Column('varchar')
  status: string

  @Column('datetime')
  data: Date
}
