import { EnvironmentConfigModule } from '@/infrastructures/config/environment-config/environment-config.module'
import { Cliente } from '@/infrastructures/entities/cliente.entity'
import { ClienteRepositoryOrm } from '@/infrastructures/repositories/cliente.repository'
import { RepositoriesModule } from '@/infrastructures/repositories/repository.modules'
import { DynamicModule, Module } from '@nestjs/common'
import { UseCaseProxy } from '../usecase-proxy'
import { GetAllClientUseCase } from '@/applications/usecases/cliente/getallcliente.usecase'
import { GetClientByIdUseCase } from '@/applications/usecases/cliente/getclientebyid.usecase'
import { CreateClienteUseCase } from '@/applications/usecases/cliente/createcliente.usecase'
import { UpdateClienteUseCase } from '@/applications/usecases/cliente/updatecliente.usecase'

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule]
})
export class ClienteUsecaseProxyModule {
  static GET_ALL_CLIENTE_USE_CASE = 'getAllClienteUsecaseProxy'
  static GET_CLIENTE_BY_ID_USE_CASE = 'getClienteByIdUsecaseProxy'
  static CREATE_CLIENTE_USE_CASE = 'createClienteUsecaseProxy'
  static UPDATE_CLIENTE_USE_CASE = 'updateClienteUseCaseProxy'
  static DELETE_CLIENTE_USE_CASE = 'deleteClienteUseCaseProxy'

  static register(): DynamicModule {
    return {
      module: ClienteUsecaseProxyModule,
      providers: [
        {
          inject: [ClienteRepositoryOrm],
          provide: ClienteUsecaseProxyModule.GET_ALL_CLIENTE_USE_CASE,
          useFactory: (clienteRepository: ClienteRepositoryOrm) =>
            new UseCaseProxy(new GetAllClientUseCase.UseCase(clienteRepository))
        },
        {
          inject: [ClienteRepositoryOrm],
          provide: ClienteUsecaseProxyModule.GET_CLIENTE_BY_ID_USE_CASE,
          useFactory: (clienteRepository: ClienteRepositoryOrm) =>
            new UseCaseProxy(
              new GetClientByIdUseCase.UseCase(clienteRepository)
            )
        },
        {
          inject: [ClienteRepositoryOrm],
          provide: ClienteUsecaseProxyModule.CREATE_CLIENTE_USE_CASE,
          useFactory: (clienteRepository: ClienteRepositoryOrm) =>
            new UseCaseProxy(
              new CreateClienteUseCase.UseCase(clienteRepository)
            )
        },
        {
          inject: [ClienteRepositoryOrm],
          provide: ClienteUsecaseProxyModule.UPDATE_CLIENTE_USE_CASE,
          useFactory: (clienteRepository: ClienteRepositoryOrm) =>
            new UseCaseProxy(
              new UpdateClienteUseCase.UseCase(clienteRepository)
            )
        }
      ],
      exports: [
        ClienteUsecaseProxyModule.GET_ALL_CLIENTE_USE_CASE,
        ClienteUsecaseProxyModule.GET_CLIENTE_BY_ID_USE_CASE,
        ClienteUsecaseProxyModule.CREATE_CLIENTE_USE_CASE,
        ClienteUsecaseProxyModule.UPDATE_CLIENTE_USE_CASE,
        ClienteUsecaseProxyModule.DELETE_CLIENTE_USE_CASE
      ]
    }
  }
}
