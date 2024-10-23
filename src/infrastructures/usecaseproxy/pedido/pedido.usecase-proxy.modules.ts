import { GetAllPedidoUseCase } from '@/applications/usecases/pedido/getallpedido.usecase'
import { EnvironmentConfigModule } from '@/infrastructures/config/environment-config/environment-config.module'
import { PedidoRepositoryOrm } from '@/infrastructures/repositories/pedido.repository'
import { RepositoriesModule } from '@/infrastructures/repositories/repository.modules'
import { DynamicModule, Module } from '@nestjs/common'
import { UseCaseProxy } from '../usecase-proxy'
import { GetPedidoByIdUseCase } from '@/applications/usecases/pedido/getpedidobyid.usecase'
import { CreatePedidoUseCase } from '@/applications/usecases/pedido/createpedido.usecase'
import { UpdatePedidoUseCase } from '@/applications/usecases/pedido/updatepedido.usecase'
import { DeletePedidoUseCase } from '@/applications/usecases/pedido/deletepedido.usecase'
import { ClienteRepositoryOrm } from '@/infrastructures/repositories/cliente.repository'

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule]
})
export class PedidoUsecaseProxyModule {
  static GET_ALL_PEDIDOS_USE_CASE = 'getAllPedidosUsecaseProxy'
  static GET_PEDIDO_BY_ID_USE_CASE = 'getPedidoByIdUsecaseProxy'
  static CREATE_PEDIDO_USE_CASE = 'createPedidoUsecaseProxy'
  static UPDATE_PEDIDO_USE_CASE = 'updatePedidoUseCaseProxy'
  static DELETE_PEDIDO_USE_CASE = 'deletePedidoUseCaseProxy'

  static async register(): Promise<DynamicModule> {
    return {
      module: PedidoUsecaseProxyModule,
      providers: [
        {
          inject: [PedidoRepositoryOrm],
          provide: PedidoUsecaseProxyModule.GET_ALL_PEDIDOS_USE_CASE,
          useFactory: (pedidoRepository: PedidoRepositoryOrm) =>
            new UseCaseProxy(new GetAllPedidoUseCase.UseCase(pedidoRepository))
        },
        {
          inject: [PedidoRepositoryOrm],
          provide: PedidoUsecaseProxyModule.GET_PEDIDO_BY_ID_USE_CASE,
          useFactory: (pedidoRepository: PedidoRepositoryOrm) =>
            new UseCaseProxy(new GetPedidoByIdUseCase.UseCase(pedidoRepository))
        },
        {
          inject: [PedidoRepositoryOrm],
          provide: PedidoUsecaseProxyModule.CREATE_PEDIDO_USE_CASE,
          useFactory: (pedidoRepository: PedidoRepositoryOrm) =>
            new UseCaseProxy(new CreatePedidoUseCase.UseCase(pedidoRepository))
        },
        {
          inject: [PedidoRepositoryOrm],
          provide: PedidoUsecaseProxyModule.UPDATE_PEDIDO_USE_CASE,
          useFactory: async (
            pedidoRepository: PedidoRepositoryOrm,
            clienteRepository: ClienteRepositoryOrm
          ) => {
            const getPedidoByIdUseCase = new GetPedidoByIdUseCase.UseCase(
              pedidoRepository
            )
            const updatePedidoUseCase = new UpdatePedidoUseCase.UseCase(
              pedidoRepository,
              getPedidoByIdUseCase,
              clienteRepository
            )
            return new UseCaseProxy(updatePedidoUseCase)
          }
        },
        {
          inject: [PedidoRepositoryOrm],
          provide: PedidoUsecaseProxyModule.DELETE_PEDIDO_USE_CASE,
          useFactory: (pedidoRepository: PedidoRepositoryOrm) =>
            new UseCaseProxy(new DeletePedidoUseCase.UseCase(pedidoRepository))
        }
      ],
      exports: [
        PedidoUsecaseProxyModule.GET_ALL_PEDIDOS_USE_CASE,
        PedidoUsecaseProxyModule.GET_PEDIDO_BY_ID_USE_CASE,
        PedidoUsecaseProxyModule.CREATE_PEDIDO_USE_CASE,
        PedidoUsecaseProxyModule.UPDATE_PEDIDO_USE_CASE,
        PedidoUsecaseProxyModule.DELETE_PEDIDO_USE_CASE
      ]
    }
  }
}
