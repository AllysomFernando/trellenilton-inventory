import { UserModel } from '@/domain/models/user'
import { UseCase as DefaultUseCase } from '../use-case'
import { UserRepository } from '@/domain/repository/user.repository'
export namespace GetAllUserUseCase {
  export type Input = void

  export type Output = UserModel[]

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findAll()
      return entity
    }
  }
}
