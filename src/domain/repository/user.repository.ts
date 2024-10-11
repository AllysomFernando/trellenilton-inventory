import { User } from '../model/user';

export interface UserRepository {
  getAllUser(): Promise<User[]>;
}
