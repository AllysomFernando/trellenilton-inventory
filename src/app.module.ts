import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { UserUsecaseProxyModule } from './infrastructures/usecaseproxy/user/user.usecase-proxy.module'
import { UserModule } from './presentation/user/user.module'
import { EnvironmentConfigModule } from './infrastructures/config/environment-config/environment-config.module'
import { ClienteUsecaseProxyModule } from './infrastructures/usecaseproxy/cliente/cliente.usecase-proxy.modules'
import { ClienteModule } from './presentation/cliente/cliente.module'
import { FornecedorUsecaseProxyModule } from './infrastructures/usecaseproxy/fornecedor/fornecedor.usecase-proxy.modules'
import { FornecedorModule } from './presentation/fornecedor/fornecedor.module'
import { ItensPedidoUsecaseProxyModule } from './infrastructures/usecaseproxy/itenspedido/itenspedido.usecase-proxy.modules'
import { ItemPedidoModule } from './presentation/itemPedido/itempedido.module'
import { PedidoUsecaseProxyModule } from './infrastructures/usecaseproxy/pedido/pedido.usecase-proxy.modules'
import { PedidoModule } from './presentation/pedido/pedido.module'
import { TransacoesUsecaseProxyModule } from './infrastructures/usecaseproxy/transacoes/transacoes.usecase-proxy.modules'
import { TransacaoModule } from './presentation/transacao/transacao.module'
import { ProdutoUsecaseProxyModule } from './infrastructures/usecaseproxy/produto/produto.usecase-proxy.modules'
import { ProdutoModule } from './presentation/produto/produto.module'
import { join } from 'path'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    UserUsecaseProxyModule.register(),
    UserModule,
    ClienteUsecaseProxyModule.register(),
    ClienteModule,
    FornecedorUsecaseProxyModule.register(),
    FornecedorModule,
    ItensPedidoUsecaseProxyModule.register(),
    ItemPedidoModule,
    PedidoUsecaseProxyModule.register(),
    PedidoModule,
    TransacoesUsecaseProxyModule.register(),
    TransacaoModule,
    ProdutoUsecaseProxyModule.register(),
    ProdutoModule,
    EnvironmentConfigModule
  ]
})
export class AppModule {}
