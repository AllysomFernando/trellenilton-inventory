import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Produto } from './produto.entity'
import { Pedido } from './pedido.entity'
import { TransacaoEnum } from '@/applications/enum/transacao.enum'

@Entity('transacao')
export class Transacao {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  data: string

  @Column('varchar')
  tipo: TransacaoEnum

  @Column('int')
  valor: number

  @ManyToOne(() => Produto, { eager: true, nullable: false })
  produto: Produto

  @ManyToOne(() => Pedido, { eager: true, nullable: false })
  pedido: Pedido
}
