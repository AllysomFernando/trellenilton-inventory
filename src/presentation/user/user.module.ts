import { Module } from '@nestjs/common'
import { UserUsecaseProxyModule } from '@/infrastructures/usecaseproxy/user/user.usecase-proxy.module'
import { UserController } from './user.controller'

@Module({
  imports: [UserUsecaseProxyModule.register()],
  controllers: [UserController]
})
export class UserModule {}
