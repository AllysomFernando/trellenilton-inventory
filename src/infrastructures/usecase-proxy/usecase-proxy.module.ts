import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { RepositoriesModule } from '../repositories/repository.modules';
import { UserRepositoryOrm } from '../repositories/user.repository';
import { GetAllUsersUseCase } from 'src/applications/use-cases/user.usecase';

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule],
})
export class UsecaseProxyModule {
  static GET_ALL_USERS_USE_CASE = 'getAllUsersUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new GetAllUsersUseCase(userRepository)),
        },
      ],
      exports: [UsecaseProxyModule.GET_ALL_USERS_USE_CASE],
    };
  }
}
