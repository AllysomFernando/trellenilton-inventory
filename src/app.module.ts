import { Module } from '@nestjs/common'
import { UsecaseProxyModule } from './infrastructures/usecaseproxy/usecase-proxy.module'
import { UserModule } from './presentation/user/user.module'
import { EnvironmentConfigModule } from './infrastructures/config/environment-config/environment-config.module'

@Module({
  imports: [UsecaseProxyModule.register(), UserModule, EnvironmentConfigModule]
})
export class AppModule {}
