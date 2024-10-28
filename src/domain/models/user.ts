import { UsuarioEnum } from '@/applications/enum/user.enum'

export class UserModel {
  id: number
  email: string
  name: string
  password: string
  tipo: UsuarioEnum
}
