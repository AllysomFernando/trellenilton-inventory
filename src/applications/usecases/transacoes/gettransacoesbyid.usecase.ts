import { TransacaoModel } from '@/domain/models/transacao'
import { UseCase as DefaultUseCase } from '../use-case'
import { TransacaoRepository } from '@/domain/repository/transacao.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
export namespace GetTransacaoByIdUseCase {
  export type Input = {
    id: number
  }

  export type Output = TransacaoModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private transacaoRepository: TransacaoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Id is required')
      }
      const transacao = await this.transacaoRepository.findById(input.id)
      if (!transacao) {
        throw new BadRequestError('Transacao nao encontrada')
      }

      try {
        const entity = await this.transacaoRepository.findById(input.id)

        if (!entity) {
          throw new BadRequestError('Não realizada com sucesso')
        }

        return entity
      } catch (e) {
        throw new BadRequestError('Algo deu errado ao buscar a transação')
      }
    }
  }
}
