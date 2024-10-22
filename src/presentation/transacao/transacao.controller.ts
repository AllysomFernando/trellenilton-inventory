import { CreateTransacaoDto } from '@/applications/dto/transacao/createtransacao.dto'
import { GetAllClientUseCase } from '@/applications/usecases/cliente/getallcliente.usecase'
import { CreateTransacoesUseCase } from '@/applications/usecases/transacoes/createtransacoes.usecase'
import { DeleteTransacoesUseCase } from '@/applications/usecases/transacoes/deletetransacoes.usecase'
import { GetTransacaoByIdUseCase } from '@/applications/usecases/transacoes/gettransacoesbyid.usecase'
import { TransacoesUsecaseProxyModule } from '@/infrastructures/usecaseproxy/transacoes/transacoes.usecase-proxy.modules'
import { UseCaseProxy } from '@/infrastructures/usecaseproxy/usecase-proxy'
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post
} from '@nestjs/common'
import { create } from 'domain'

@Controller('transacao')
export class TransacaoController {
  constructor(
    @Inject(TransacoesUsecaseProxyModule.GET_ALL_TRANSACOES_USE_CASE)
    private readonly getAllTransacoesUsecaseProxy: UseCaseProxy<GetAllClientUseCase.UseCase>,
    @Inject(TransacoesUsecaseProxyModule.GET_TRANSACAO_BY_ID_USE_CASE)
    private readonly getTransacaoByIdUsecaseProxy: UseCaseProxy<GetTransacaoByIdUseCase.UseCase>,
    @Inject(TransacoesUsecaseProxyModule.CREATE_TRANSACAO_USE_CASE)
    private readonly createTransacaoUsecaseProxy: UseCaseProxy<CreateTransacoesUseCase.UseCase>,
    @Inject(TransacoesUsecaseProxyModule.DELETE_TRANSACAO_USE_CASE)
    private readonly deleteTransacaoUsecaseProxy: UseCaseProxy<DeleteTransacoesUseCase.UseCase>
  ) {}
  @Get('/')
  async getAllTransacoes() {
    const result = await this.getAllTransacoesUsecaseProxy
      .getInstance()
      .execute()
    return {
      status: 'OK',
      code: 200,
      message: 'Transacoes found',
      data: result
    }
  }
  @Get('/:id')
  async getTransacaoById(@Param('id') id: number) {
    const result = await this.getTransacaoByIdUsecaseProxy
      .getInstance()
      .execute({ id })
    return {
      status: 'OK',
      code: 200,
      message: 'Transacao found',
      data: result
    }
  }
  @Post('/')
  async createTransacao(@Body() createTransacaoDto: CreateTransacaoDto) {
    const result = await this.createTransacaoUsecaseProxy
      .getInstance()
      .execute(createTransacaoDto)
    return {
      status: 'OK',
      code: 200,
      message: 'Transacao created',
      data: result
    }
  }
  @Delete('/:id')
  async deleteTransacao(@Param('id') id: number) {
    const result = await this.deleteTransacaoUsecaseProxy
      .getInstance()
      .execute({ id })
    return {
      status: 'OK',
      code: 200,
      message: 'Transacao deleted',
      data: result
    }
  }
}
