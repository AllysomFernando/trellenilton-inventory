import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { UseCase as DefaultUseCase } from '../use-case'

export namespace UploadImageProdutoUseCase {
  export type Input = {
    image: string
  }

  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private produtoRepository: ProdutoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.image) {
        throw new Error('Imagem é obrigatória.')
      }
      try {
        await this.produtoRepository.uploadImage(input.image)
      } catch (error) {
        throw new Error('Erro ao fazer upload da imagem.')
      }
    }
  }
}
