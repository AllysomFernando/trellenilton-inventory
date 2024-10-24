import { EnvironmentConfigModule } from '@/infrastructures/config/environment-config/environment-config.module'
import { ProdutoRepositoryOrm } from '@/infrastructures/repositories/produto.repository'
import { RepositoriesModule } from '@/infrastructures/repositories/repository.modules'
import { DynamicModule, Module } from '@nestjs/common'
import { UseCaseProxy } from '../usecase-proxy'
import { GetAllProdutoUseCase } from '@/applications/usecases/produto/getallproduto.usecase'
import { GetProdutoByIdUseCase } from '@/applications/usecases/produto/getprodutobyid.usecase'
import { CreateProdutoUseCase } from '@/applications/usecases/produto/createproduto.usecase'
import { FornecedorRepository } from '@/domain/repository/fornecedor.repository'
import { UpdateProdutoUseCase } from '@/applications/usecases/produto/updateproduto.usecase'
import { DeleteProdutoUseCase } from '@/applications/usecases/produto/deleteproduto.usecase'
import { FornecedorRepositoryOrm } from '@/infrastructures/repositories/fornecedor.repository'

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule]
})
export class ProdutoUsecaseProxyModule {
  static GET_ALL_PRODUTOS_USE_CASE = 'getAllProdutosUsecaseProxy'
  static GET_PRODUTO_BY_ID_USE_CASE = 'getProdutoByIdUsecaseProxy'
  static CREATE_PRODUTO_USE_CASE = 'createProdutoUsecaseProxy'
  static UPDATE_PRODUTO_USE_CASE = 'updateProdutoUseCaseProxy'
  static DELETE_PRODUTO_USE_CASE = 'deleteProdutoUseCaseProxy'

  static register(): DynamicModule {
    return {
      module: ProdutoUsecaseProxyModule,
      providers: [
        {
          inject: [ProdutoRepositoryOrm],
          provide: ProdutoUsecaseProxyModule.GET_ALL_PRODUTOS_USE_CASE,
          useFactory: (produtoRepository: ProdutoRepositoryOrm) =>
            new UseCaseProxy(
              new GetAllProdutoUseCase.UseCase(produtoRepository)
            )
        },
        {
          inject: [ProdutoRepositoryOrm],
          provide: ProdutoUsecaseProxyModule.GET_PRODUTO_BY_ID_USE_CASE,
          useFactory: (produtoRepository: ProdutoRepositoryOrm) =>
            new UseCaseProxy(
              new GetProdutoByIdUseCase.UseCase(produtoRepository)
            )
        },
        {
          inject: [ProdutoRepositoryOrm, FornecedorRepositoryOrm],
          provide: ProdutoUsecaseProxyModule.CREATE_PRODUTO_USE_CASE,
          useFactory: (
            produtoRepository: ProdutoRepositoryOrm,
            fornecedorRepository: FornecedorRepository
          ) =>
            new UseCaseProxy(
              new CreateProdutoUseCase.UseCase(
                produtoRepository,
                fornecedorRepository
              )
            )
        },
        {
          inject: [ProdutoRepositoryOrm],
          provide: ProdutoUsecaseProxyModule.UPDATE_PRODUTO_USE_CASE,
          useFactory: (produtoRepository: ProdutoRepositoryOrm) =>
            new UseCaseProxy(
              new UpdateProdutoUseCase.UseCase(
                produtoRepository,
                new GetProdutoByIdUseCase.UseCase(produtoRepository)
              )
            )
        },
        {
          inject: [ProdutoRepositoryOrm],
          provide: ProdutoUsecaseProxyModule.DELETE_PRODUTO_USE_CASE,
          useFactory: (produtoRepository: ProdutoRepositoryOrm) =>
            new UseCaseProxy(
              new DeleteProdutoUseCase.UseCase(produtoRepository)
            )
        }
      ],
      exports: [
        ProdutoUsecaseProxyModule.GET_ALL_PRODUTOS_USE_CASE,
        ProdutoUsecaseProxyModule.GET_PRODUTO_BY_ID_USE_CASE,
        ProdutoUsecaseProxyModule.CREATE_PRODUTO_USE_CASE,
        ProdutoUsecaseProxyModule.UPDATE_PRODUTO_USE_CASE,
        ProdutoUsecaseProxyModule.DELETE_PRODUTO_USE_CASE
      ]
    }
  }
}
