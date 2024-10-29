import { ProdutoRepository } from '@/domain/repository/produto.repository'
import { UseCase as DefaultUseCase } from '../use-case'

export namespace UploadImageProdutoUseCase {
  export type Input = {
    file: Express.Multer.File
  }


  export type Output = {
    imageUrl: string
  }

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private produtoRepository: ProdutoRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.file) {
        throw new Error('Imagem é obrigatória.')
      }
      try {
        const imageUrl = await this.produtoRepository.uploadImage(input.file)
        return { imageUrl }
      } catch (error) {
        throw new Error('Erro ao fazer upload da imagem.')
      }
    }
  }
}
