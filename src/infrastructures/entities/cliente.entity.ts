import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
