import { UserModel } from '@/domain/models/user'
import { UseCase as DefaultUseCase } from '../use-case'
import { UserRepository } from '@/domain/repository/user.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { GetUserByIdUseCase } from './getuserbyid.usecase'

export namespace UpdateUserUseCase {
  export type Input = {
    id: number
    email: string
    name: string
    password: string
  }

  export type Output = UserModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository,
      private getUserByIdUseCase: GetUserByIdUseCase.UseCase
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new Error('Id é obrigatório.')
      }
      const existingUser = await this.getUserByIdUseCase.execute({
        id: input.id
      })
      if (!existingUser) {
        throw new BadRequestError('Usuário não encontrado.')
      }
      if (!input.email.trim() && !input.name.trim() && !input.password.trim()) {
        throw new Error('Informe ao menos um campo para atualização.')
      }
      const user = new UserModel()
      user.id = input.id
      user.email = input.email
      user.name = input.name
      user.password = input.password
      try {
        const entity = await this.userRepository.update(user)
        if (!entity) {
          throw new BadRequestError('Falha ao atualizar o usuário.')
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Falha ao atualizar o usuário.')
      }
    }
  }
}
