import { UserModel } from 'src/domain/models/user';
import { UserRepository } from 'src/domain/repository/user.repository';

export class GetAllUsersUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(): Promise<UserModel[]> {
    return await this.usersRepository.getAllUser();
  }
}
