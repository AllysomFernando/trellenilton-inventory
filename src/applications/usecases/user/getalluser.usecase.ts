import { UserModel } from '@/domain/models/user'
import { UseCase as DefaultUseCase } from '../use-case'
import { UserRepository } from '@/domain/repository/user.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace GetAllUserUseCase {
  export type Output = UserModel[]

  export class UseCase implements DefaultUseCase<void, Output> {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<Output> {
      try {
        const entity = await this.userRepository.findAll()
        if (!entity) {
          throw new BadRequestError('Usuários não encontrados.')
        }
        return entity
      } catch (error) {
        throw new BadRequestError('Falha ao buscar os usuários.')
      }
    }
  }
}
