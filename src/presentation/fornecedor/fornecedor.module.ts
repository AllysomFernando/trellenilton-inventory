import { FornecedorUsecaseProxyModule } from '@/infrastructures/usecaseproxy/fornecedor/fornecedor.usecase-proxy.modules'
import { Module } from '@nestjs/common'
import { FornecedorController } from './fornecedor.controller'

@Module({
  imports: [FornecedorUsecaseProxyModule.register()],
  controllers: [FornecedorController]
})
export class FornecedorModule {}
