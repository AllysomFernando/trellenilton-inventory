import { UserModel } from 'src/domain/models/user';
import { UseCase as DefaultUseCase } from '../use-case';
import { UserRepository } from 'src/domain/repository/user.repository';
export namespace GetUserUseCase {
  export type Input = {
    id: number;
  };

  export type Output = UserModel;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);
      return entity
    }
  }
}
