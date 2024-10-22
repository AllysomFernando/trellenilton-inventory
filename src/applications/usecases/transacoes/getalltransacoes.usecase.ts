import { TransacaoModel } from '@/domain/models/transacao'
import { UseCase as DefaultUseCase } from '@/applications/usecases/use-case'
import { TransacaoRepository } from '@/domain/repository/transacao.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
export namespace GetAllTransacoesUseCase {
  export type Input = void

  export type Output = TransacaoModel[]

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private transacaoRepository: TransacaoRepository) {}

    async execute(): Promise<TransacaoModel[]> {
      try {
        return this.transacaoRepository.findAll()
      } catch (e) {
        throw new BadRequestError('Error to get all transacoes')
      }
    }
  }
}
