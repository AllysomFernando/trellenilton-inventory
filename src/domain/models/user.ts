export enum UsuarioEnum {
  Admin = 'Admin',
  Usuario = 'Usuario'
}

export class UserModel {
  id: number;
  email: string;
  name: string;
  password: string;
  tipo: UsuarioEnum;
}
