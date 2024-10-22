import { Module } from '@nestjs/common'
import { UserUsecaseProxyModule } from './infrastructures/usecaseproxy/user/user.usecase-proxy.module'
import { UserModule } from './presentation/user/user.module'
import { EnvironmentConfigModule } from './infrastructures/config/environment-config/environment-config.module'

@Module({
  imports: [
    UserUsecaseProxyModule.register(),
    UserModule,
    EnvironmentConfigModule
  ]
})
export class AppModule {}
