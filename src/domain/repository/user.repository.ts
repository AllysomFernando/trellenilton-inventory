import { UserModel } from '../models/user';

export interface UserRepository {
  findAll(): Promise<UserModel[]>;
  findById(id: number): Promise<UserModel>;
}
