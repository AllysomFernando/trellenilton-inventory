import { UseCase as DefaultUseCase } from '../use-case'
import { UserRepository } from '@/domain/repository/user.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { ProdutoRepository } from '@/domain/repository/produto.repository'

export namespace DeleteUserUseCase {
  export type Input = {
    id: number
  }

  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository,
      private produtoRepository: ProdutoRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new Error('Id é obrigatório.')
      }
      const produtos = await this.produtoRepository.findById(input.id)
      try {
        const entity = await this.userRepository.delete(input.id)
        if (!entity) {
          throw new BadRequestError('Falha ao deletar o usuário.')
        }
      } catch (e) {
        throw new BadRequestError('Falha ao deletar o usuário.')
      }
    }
  }
}
