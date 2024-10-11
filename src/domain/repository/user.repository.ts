import { User } from '../models/user';

export interface UserRepository {
  getAllUser(): Promise<User[]>;
}
