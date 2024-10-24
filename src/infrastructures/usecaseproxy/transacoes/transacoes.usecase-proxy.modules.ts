import { EnvironmentConfigModule } from '@/infrastructures/config/environment-config/environment-config.module'
import { RepositoriesModule } from '@/infrastructures/repositories/repository.modules'
import { TransacaoRepositoryOrm } from '@/infrastructures/repositories/transcacao.repository'
import { DynamicModule, Module } from '@nestjs/common'
import { UseCaseProxy } from '../usecase-proxy'
import { GetAllTransacoesUseCase } from '@/applications/usecases/transacoes/getalltransacoes.usecase'
import { GetTransacaoByIdUseCase } from '@/applications/usecases/transacoes/gettransacoesbyid.usecase'
import { CreateTransacoesUseCase } from '@/applications/usecases/transacoes/createtransacoes.usecase'
import { ProdutoRepositoryOrm } from '@/infrastructures/repositories/produto.repository'
import { PedidoRepositoryOrm } from '@/infrastructures/repositories/pedido.repository'
import { DeleteTransacoesUseCase } from '@/applications/usecases/transacoes/deletetransacoes.usecase'

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule]
})
export class TransacoesUsecaseProxyModule {
  static GET_ALL_TRANSACOES_USE_CASE = 'getAllTransacoesUsecaseProxy'
  static GET_TRANSACAO_BY_ID_USE_CASE = 'getTransacaoByIdUsecaseProxy'
  static CREATE_TRANSACAO_USE_CASE = 'createTransacaoUsecaseProxy'
  static DELETE_TRANSACAO_USE_CASE = 'deleteTransacaoUseCaseProxy'
  static register(): DynamicModule {
    return {
      module: TransacoesUsecaseProxyModule,
      providers: [
        {
          inject: [TransacaoRepositoryOrm],
          provide: TransacoesUsecaseProxyModule.GET_ALL_TRANSACOES_USE_CASE,
          useFactory: (transacoesRepository: TransacaoRepositoryOrm) =>
            new UseCaseProxy(
              new GetAllTransacoesUseCase.UseCase(transacoesRepository)
            )
        },
        {
          inject: [TransacaoRepositoryOrm],
          provide: TransacoesUsecaseProxyModule.GET_TRANSACAO_BY_ID_USE_CASE,
          useFactory: (transacoesRepository: TransacaoRepositoryOrm) =>
            new UseCaseProxy(
              new GetTransacaoByIdUseCase.UseCase(transacoesRepository)
            )
        },
        {
          inject: [
            TransacaoRepositoryOrm,
            ProdutoRepositoryOrm,
            PedidoRepositoryOrm
          ],
          provide: TransacoesUsecaseProxyModule.CREATE_TRANSACAO_USE_CASE,
          useFactory: (
            transacoesRepository: TransacaoRepositoryOrm,
            produtoRepository: ProdutoRepositoryOrm,
            pedidoRepository: PedidoRepositoryOrm
          ) =>
            new UseCaseProxy(
              new CreateTransacoesUseCase.UseCase(
                transacoesRepository,
                produtoRepository,
                pedidoRepository
              )
            )
        },
        {
          inject: [TransacaoRepositoryOrm],
          provide: TransacoesUsecaseProxyModule.DELETE_TRANSACAO_USE_CASE,
          useFactory: (transacoesRepository: TransacaoRepositoryOrm) =>
            new UseCaseProxy(
              new DeleteTransacoesUseCase.UseCase(transacoesRepository)
            )
        }
      ],
      exports: [
        TransacoesUsecaseProxyModule.GET_ALL_TRANSACOES_USE_CASE,
        TransacoesUsecaseProxyModule.GET_TRANSACAO_BY_ID_USE_CASE,
        TransacoesUsecaseProxyModule.CREATE_TRANSACAO_USE_CASE,
        TransacoesUsecaseProxyModule.DELETE_TRANSACAO_USE_CASE
      ]
    }
  }
}
