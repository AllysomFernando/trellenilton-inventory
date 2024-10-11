import { UserModel } from '../models/user';

export interface UserRepository {
  getAllUser(): Promise<UserModel[]>;
}
