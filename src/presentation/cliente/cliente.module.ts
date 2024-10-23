import { ClienteUsecaseProxyModule } from '@/infrastructures/usecaseproxy/cliente/cliente.usecase-proxy.modules'
import { Module } from '@nestjs/common'
import { ClienteController } from './cliente.controller'

@Module({
  imports: [ClienteUsecaseProxyModule.register()],
  controllers: [ClienteController]
})
export class ClienteModule {}
