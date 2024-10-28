import { UsuarioEnum } from '@/domain/models/user'

export class CreateUserDto {
  name: string
  email: string
  password: string
  tipo: UsuarioEnum
}
