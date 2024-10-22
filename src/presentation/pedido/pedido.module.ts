import { PedidoUsecaseProxyModule } from '@/infrastructures/usecaseproxy/pedido/pedido.usecase-proxy.modules'
import { Module } from '@nestjs/common'
import { PedidoController } from './pedido.controller'

@Module({
  imports: [PedidoUsecaseProxyModule.register()],
  controllers: [PedidoController]
})
export class PedidoModule {}
