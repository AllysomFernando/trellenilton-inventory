import { DynamicModule, Module } from '@nestjs/common'
import { EnvironmentConfigModule } from '../../config/environment-config/environment-config.module'
import { RepositoriesModule } from '../../repositories/repository.modules'
import { UserRepositoryOrm } from '../../repositories/user.repository'
import { GetAllUserUseCase } from '@/applications/usecases/user/getalluser.usecase'
import { GetUserByIdUseCase } from '@/applications/usecases/user/getuserbyid.usecase'
import { CreateUserUseCase } from '@/applications/usecases/user/createuser.usecase'
import { UseCaseProxy } from '../usecase-proxy'
import { UpdateUserUseCase } from '@/applications/usecases/user/updateuser.usecase'
import { DeleteUserUseCase } from '@/applications/usecases/user/deleteuser.usecase'
import { LoginUseCase } from '@/applications/usecases/user/login.usecase'

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule]
})
export class UserUsecaseProxyModule {
  static GET_ALL_USERS_USE_CASE = 'getAllUsersUsecaseProxy'
  static GET_USER_BY_ID_USE_CASE = 'getUserByIdUsecaseProxy'
  static CREATE_USER_USE_CASE = 'createUserUsecaseProxy'
  static UPDATE_USER_USE_CASE = 'updateUserUseCaseProxy'
  static DELETE_USER_USE_CASE = 'deleteUserUseCaseProxy'
  static LOGIN_USER_USE_CASE = 'loginUserUseCaseProxy'
  static register(): DynamicModule {
    return {
      module: UserUsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositoryOrm],
          provide: UserUsecaseProxyModule.GET_ALL_USERS_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new GetAllUserUseCase.UseCase(userRepository))
        },
        {
          inject: [UserRepositoryOrm],
          provide: UserUsecaseProxyModule.GET_USER_BY_ID_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new GetUserByIdUseCase.UseCase(userRepository))
        },
        {
          inject: [UserRepositoryOrm],
          provide: UserUsecaseProxyModule.CREATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new CreateUserUseCase.UseCase(userRepository))
        },
        {
          inject: [UserRepositoryOrm],
          provide: UserUsecaseProxyModule.UPDATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(
              new UpdateUserUseCase.UseCase(
                userRepository,
                new GetUserByIdUseCase.UseCase(userRepository)
              )
            )
        },
        {
          inject: [UserRepositoryOrm],
          provide: UserUsecaseProxyModule.DELETE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new DeleteUserUseCase.UseCase(userRepository))
        },
        {
          inject: [UserRepositoryOrm],
          provide: UserUsecaseProxyModule.LOGIN_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new LoginUseCase.UseCase(userRepository))
        }
      ],
      exports: [
        UserUsecaseProxyModule.GET_ALL_USERS_USE_CASE,
        UserUsecaseProxyModule.GET_USER_BY_ID_USE_CASE,
        UserUsecaseProxyModule.CREATE_USER_USE_CASE,
        UserUsecaseProxyModule.UPDATE_USER_USE_CASE,
        UserUsecaseProxyModule.DELETE_USER_USE_CASE,
        UserUsecaseProxyModule.LOGIN_USER_USE_CASE
      ]
    }
  }
}
