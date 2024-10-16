import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('fornecedor')
export class Fornecedor {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('varchar')
  name: string
  @Column('varchar')
  cnpj: string
  @Column('varchar')
  endereco: string
  @Column('varchar')
  contato: string
}
