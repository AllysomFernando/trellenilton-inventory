import { DynamicModule, Module } from '@nestjs/common'
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module'
import { RepositoriesModule } from '../repositories/repository.modules'
import { UserRepositoryOrm } from '../repositories/user.repository'
import { GetAllUserUseCase } from '@/applications/usecases/user/getalluser.usecase'
import { GetUserByIdUseCase } from '@/applications/usecases/user/getuserbyid.usecase'
import { CreateUserUseCase } from '@/applications/usecases/user/createuser.usecase'
import { UseCaseProxy } from './usecase-proxy'

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule]
})
export class UsecaseProxyModule {
  static GET_ALL_USERS_USE_CASE = 'getAllUsersUsecaseProxy'
  static GET_USER_BY_ID_USE_CASE = 'getUserByIdUsecaseProxy'
  static CREATE_USER_USE_CASE = 'createUserUsecaseProxy'

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new GetAllUserUseCase.UseCase(userRepository))
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.GET_USER_BY_ID_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new GetUserByIdUseCase.UseCase(userRepository))
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.CREATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new CreateUserUseCase.UseCase(userRepository))
        }
      ],
      exports: [UsecaseProxyModule.GET_USER_BY_ID_USE_CASE]
    }
  }
}
