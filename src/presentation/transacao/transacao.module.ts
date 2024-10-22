import { TransacoesUsecaseProxyModule } from '@/infrastructures/usecaseproxy/transacoes/transacoes.usecase-proxy.modules'
import { Module } from '@nestjs/common'
import { TransacaoController } from './transacao.controller'

@Module({
  imports: [TransacoesUsecaseProxyModule.register()],
  controllers: [TransacaoController]
})
export class TransacaoModule {}
