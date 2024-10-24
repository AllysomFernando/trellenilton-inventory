import { TransacaoEnum } from '@/domain/models/transacao'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Produto } from './produto.entity'
import { Pedido } from './pedido.entity'

@Entity('transacao')
export class Transacao {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar') 
  tipo: TransacaoEnum

  @Column('string')
  data: string

  @Column('int')
  valor: number

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'produtoId' })
  produto: Produto

  @ManyToOne(() => Pedido)
  @JoinColumn({ name: 'pedidoId' })
  pedido: Pedido
}
