import { GetAllFornecedorUseCase } from '@/applications/usecases/fornecedor/getallfornecedor.usecase'
import { EnvironmentConfigModule } from '@/infrastructures/config/environment-config/environment-config.module'
import { FornecedorRepositoryOrm } from '@/infrastructures/repositories/fornecedor.repository'
import { RepositoriesModule } from '@/infrastructures/repositories/repository.modules'
import { DynamicModule, Module } from '@nestjs/common'
import { UseCaseProxy } from '../usecase-proxy'
import { GetFornecedorByIdUseCase } from '@/applications/usecases/fornecedor/getfornecedorbyid,usecase'
import { CreateFornecedorUseCase } from '@/applications/usecases/fornecedor/createfornecedor.usecase'
import { UpdateFornecedorUseCase } from '@/applications/usecases/fornecedor/updatefornecedor.usecase'
import { DeleteFornecedorUseCase } from '@/applications/usecases/fornecedor/deletefornecedor.usecase'
import { ProdutoRepositoryOrm } from '@/infrastructures/repositories/produto.repository'

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule]
})
export class FornecedorUsecaseProxyModule {
  static GET_ALL_FORNECEDOR_USE_CASE = 'getAllFornecedorUsecaseProxy'
  static GET_FORNECEDOR_BY_ID_USE_CASE = 'getFornecedorByIdUsecaseProxy'
  static CREATE_FORNECEDOR_USE_CASE = 'createFornecedorUsecaseProxy'
  static UPDATE_FORNECEDOR_USE_CASE = 'updateFornecedorUseCaseProxy'
  static DELETE_FORNECEDOR_USE_CASE = 'deleteFornecedorUseCaseProxy'

  static register(): DynamicModule {
    return {
      module: FornecedorUsecaseProxyModule,
      providers: [
        {
          inject: [FornecedorRepositoryOrm],
          provide: FornecedorUsecaseProxyModule.GET_ALL_FORNECEDOR_USE_CASE,
          useFactory: (fornecedorRepository: FornecedorRepositoryOrm) =>
            new UseCaseProxy(
              new GetAllFornecedorUseCase.UseCase(fornecedorRepository)
            )
        },
        {
          inject: [FornecedorRepositoryOrm],
          provide: FornecedorUsecaseProxyModule.GET_FORNECEDOR_BY_ID_USE_CASE,
          useFactory: (fornecedorRepository: FornecedorRepositoryOrm) =>
            new UseCaseProxy(
              new GetFornecedorByIdUseCase.UseCase(fornecedorRepository)
            )
        },
        {
          inject: [FornecedorRepositoryOrm],
          provide: FornecedorUsecaseProxyModule.CREATE_FORNECEDOR_USE_CASE,
          useFactory: (fornecedorRepository: FornecedorRepositoryOrm) =>
            new UseCaseProxy(
              new CreateFornecedorUseCase.UseCase(fornecedorRepository)
            )
        },
        {
          inject: [FornecedorRepositoryOrm],
          provide: FornecedorUsecaseProxyModule.UPDATE_FORNECEDOR_USE_CASE,
          useFactory: (fornecedorRepository: FornecedorRepositoryOrm) =>
            new UseCaseProxy(
              new UpdateFornecedorUseCase.UseCase(
                fornecedorRepository,
                new GetFornecedorByIdUseCase.UseCase(fornecedorRepository)
              )
            )
        },
        {
          inject: [FornecedorRepositoryOrm],
          provide: FornecedorUsecaseProxyModule.DELETE_FORNECEDOR_USE_CASE,
          useFactory: (
            fornecedorRepository: FornecedorRepositoryOrm,
            produtoRepository: ProdutoRepositoryOrm
          ) =>
            new UseCaseProxy(
              new DeleteFornecedorUseCase.UseCase(
                fornecedorRepository,
                produtoRepository
              )
            )
        }
      ],
      exports: [
        FornecedorUsecaseProxyModule.GET_ALL_FORNECEDOR_USE_CASE,
        FornecedorUsecaseProxyModule.GET_FORNECEDOR_BY_ID_USE_CASE,
        FornecedorUsecaseProxyModule.CREATE_FORNECEDOR_USE_CASE,
        FornecedorUsecaseProxyModule.UPDATE_FORNECEDOR_USE_CASE,
        FornecedorUsecaseProxyModule.DELETE_FORNECEDOR_USE_CASE
      ]
    }
  }
}
