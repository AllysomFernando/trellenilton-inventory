import { ProdutoUsecaseProxyModule } from '@/infrastructures/usecaseproxy/produto/produto.usecase-proxy.modules'
import { Module } from '@nestjs/common'
import { ProdutoController } from './produto.controller'

@Module({
  imports: [ProdutoUsecaseProxyModule.register()],
  controllers: [ProdutoController]
})
export class ProdutoModule {}
