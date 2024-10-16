import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('fornecedor')
export class Fornecedor {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('varchar', { nullable: false })
  name: string
  @Column('varchar', { nullable: false })
  cnpj: string
  @Column('varchar')
  endereco: string
  @Column('varchar', { nullable: false })
  contato: string
}
