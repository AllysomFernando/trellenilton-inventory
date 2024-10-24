import { EnvironmentConfigModule } from '@/infrastructures/config/environment-config/environment-config.module'
import { ItemPedidoRepositoryOrm } from '@/infrastructures/repositories/itempedido.repository'
import { RepositoriesModule } from '@/infrastructures/repositories/repository.modules'
import { DynamicModule, Module } from '@nestjs/common'
import { UseCaseProxy } from '../usecase-proxy'
import { GetAllItensPedidoUseCase } from '@/applications/usecases/itenspedido/getallitempedido.usecase'
import { GetItemPedidoByIdUseCase } from '@/applications/usecases/itenspedido/getitempedidobyid.usecase'
import { CreateItemPedidoUseCase } from '@/applications/usecases/itenspedido/createitempedido.usecase'
import { PedidoRepositoryOrm } from '@/infrastructures/repositories/pedido.repository'
import { UpdateItemPedidoUseCase } from '@/applications/usecases/itenspedido/updateitempedido.usecase'
import { DeleteItemPedidoUseCase } from '@/applications/usecases/itenspedido/deleteitempedido.usecase'
import { ProdutoRepositoryOrm } from '@/infrastructures/repositories/produto.repository'

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule]
})
export class ItensPedidoUsecaseProxyModule {
  static GET_ALL_ITENS_PEDIDO_USE_CASE = 'getAllItensPedidoUsecaseProxy'
  static GET_ITENS_PEDIDO_BY_ID_USE_CASE = 'getItensPedidoByIdUsecaseProxy'
  static CREATE_ITENS_PEDIDO_USE_CASE = 'createItensPedidoUsecaseProxy'
  static UPDATE_ITENS_PEDIDO_USE_CASE = 'updateItensPedidoUseCaseProxy'
  static DELETE_ITENS_PEDIDO_USE_CASE = 'deleteItensPedidoUseCaseProxy'

  static register(): DynamicModule {
    return {
      module: ItensPedidoUsecaseProxyModule,
      providers: [
        {
          inject: [ItemPedidoRepositoryOrm],
          provide: ItensPedidoUsecaseProxyModule.GET_ALL_ITENS_PEDIDO_USE_CASE,
          useFactory: (itensPedidoRepository: ItemPedidoRepositoryOrm) =>
            new UseCaseProxy(
              new GetAllItensPedidoUseCase.UseCase(itensPedidoRepository)
            )
        },
        {
          inject: [ItemPedidoRepositoryOrm],
          provide:
            ItensPedidoUsecaseProxyModule.GET_ITENS_PEDIDO_BY_ID_USE_CASE,
          useFactory: (itensPedidoRepository: ItemPedidoRepositoryOrm) =>
            new UseCaseProxy(
              new GetItemPedidoByIdUseCase.UseCase(itensPedidoRepository)
            )
        },
        {
          inject: [
            ItemPedidoRepositoryOrm,
            PedidoRepositoryOrm,
            ProdutoRepositoryOrm
          ],
          provide: ItensPedidoUsecaseProxyModule.CREATE_ITENS_PEDIDO_USE_CASE,
          useFactory: (
            itensPedidoRepository: ItemPedidoRepositoryOrm,
            pedidoRepository: PedidoRepositoryOrm,
            produtoRepository: ProdutoRepositoryOrm
          ) =>
            new UseCaseProxy(
              new CreateItemPedidoUseCase.UseCase(
                itensPedidoRepository,
                pedidoRepository,
                produtoRepository
              )
            )
        },
        {
          inject: [
            ItemPedidoRepositoryOrm,
            PedidoRepositoryOrm,
            ProdutoRepositoryOrm
          ],
          provide: ItensPedidoUsecaseProxyModule.UPDATE_ITENS_PEDIDO_USE_CASE,
          useFactory: (
            itensPedidoRepository: ItemPedidoRepositoryOrm,
            pedidoRepository: PedidoRepositoryOrm,
            produtoRepository: ProdutoRepositoryOrm
          ) =>
            new UseCaseProxy(
              new UpdateItemPedidoUseCase.UseCase(
                itensPedidoRepository,
                produtoRepository,
                pedidoRepository
              )
            )
        },
        {
          inject: [ItemPedidoRepositoryOrm],
          provide: ItensPedidoUsecaseProxyModule.DELETE_ITENS_PEDIDO_USE_CASE,
          useFactory: (itensPedidoRepository: ItemPedidoRepositoryOrm) =>
            new UseCaseProxy(
              new DeleteItemPedidoUseCase.UseCase(itensPedidoRepository)
            )
        }
      ],
      exports: [
        ItensPedidoUsecaseProxyModule.GET_ALL_ITENS_PEDIDO_USE_CASE,
        ItensPedidoUsecaseProxyModule.GET_ITENS_PEDIDO_BY_ID_USE_CASE,
        ItensPedidoUsecaseProxyModule.CREATE_ITENS_PEDIDO_USE_CASE,
        ItensPedidoUsecaseProxyModule.UPDATE_ITENS_PEDIDO_USE_CASE,
        ItensPedidoUsecaseProxyModule.DELETE_ITENS_PEDIDO_USE_CASE
      ]
    }
  }
}
