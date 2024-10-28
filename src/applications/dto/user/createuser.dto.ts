import { UsuarioEnum } from '@/applications/enum/user.enum'

export class CreateUserDto {
  name: string
  email: string
  password: string
  tipo: UsuarioEnum
}
