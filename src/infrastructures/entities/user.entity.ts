import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar', [{ unique: true }])
  email: string

  @Column('varchar')
  name: string

  @Column('varchar')
  password: string
}
