import { ProdutoRepository } from '@/domain/repository/produto.repository';
import { UseCase as DefaultUseCase } from '../use-case';
import { BadRequestError } from '@/applications/errors/bad-request-erros';

export namespace DeleteProdutoUseCase {
  export type Input = {
    id: number;
  };

  export type Output = boolean;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private produtoRepository: ProdutoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Id é obrigatório.');
      }
      const produto = await this.produtoRepository.findById(input.id);
      if (!produto) {
        throw new BadRequestError('Produto não encontrado.');
      }
      try {
        const deleted = await this.produtoRepository.delete(input.id);
        if (!deleted) {
          throw new BadRequestError('Erro ao deletar produto.');
        }
        return deleted;
      } catch (e) {
        throw new BadRequestError('Erro ao deletar produto.');
      }
    }
  }
}