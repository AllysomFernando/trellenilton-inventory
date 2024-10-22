import { TransacaoEnum } from '@/domain/models/transacao'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('transacao')
export class Transacao {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('enum', { enum: TransacaoEnum })
  tipo: TransacaoEnum

  @Column('datetime')
  data: Date

  @Column('int')
  valor: number

  @Column('int')
  produtoId: number

  @Column('int')
  pedidoId: number
}
