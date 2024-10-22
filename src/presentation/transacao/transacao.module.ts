import { TransacoesUsecaseProxyModule } from '@/infrastructures/usecaseproxy/transacoes/transacoes.usecase-proxy.modules'
import { Module } from '@nestjs/common'

@Module({
  imports: [TransacoesUsecaseProxyModule.register()],
  controllers: []
})
export class TransacaoModule {}
