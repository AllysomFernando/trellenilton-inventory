import { TransacaoRepository } from '@/domain/repository/transacao.repository'
import { UseCase as DefaultUseCase } from '@/applications/usecases/use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
export namespace DeleteTransacoesUseCase {
  export type Input = {
    id: number
  }

  export type Output = boolean

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private transacoesRepository: TransacaoRepository) {}

    async execute(input: Input): Promise<boolean> {
      const getTransacao = await this.transacoesRepository.findById(input.id)
      if (!getTransacao) {
        throw new BadRequestError('Transação não encontrada')
      }
      try {
        const entity = await this.transacoesRepository.delete(input.id)
        if (!entity) {
          throw new BadRequestError('Erro ao deletar transação')
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Algo deu errado ao deletar transação')
      }
    }
  }
}
