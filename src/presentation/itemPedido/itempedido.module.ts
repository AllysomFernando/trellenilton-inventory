import { ItensPedidoUsecaseProxyModule } from '@/infrastructures/usecaseproxy/itenspedido/itenspedido.usecase-proxy.modules'
import { Module } from '@nestjs/common'
import { ItemPedidoController } from './itempedido.controller'

@Module({
  imports: [ItensPedidoUsecaseProxyModule.register()],
  controllers: [ItemPedidoController]
})
export class ItemPedidoModule {}
