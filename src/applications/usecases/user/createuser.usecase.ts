import { UserModel } from 'src/domain/models/user'
import { UseCase as DefaultUseCase } from '../use-case'
import { UserRepository } from 'src/domain/repository/user.repository'
export namespace CreateUserUseCase {
  export type Input = {
    email: string
    name: string
    password: string
  }

  export type Output = UserModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
      const user = new UserModel()
      user.email = input.email
      user.name = input.name
      user.password = input.password

      const entity = await this.userRepository.save(user)
      return entity
    }
  }
}
