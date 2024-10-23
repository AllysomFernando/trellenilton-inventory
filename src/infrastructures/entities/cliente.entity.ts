import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Pedido } from './pedido.entity'

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar')
  name: string

  @Column('varchar', [{ unique: true }])
  cpf_cnpj: string

  @Column('varchar')
  endereco: string

  @Column('varchar')
  contato: string

  @Column('boolean')
  archived: boolean

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[]
}
