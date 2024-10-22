import { CreateClienteDto } from '@/applications/dto/cliente/createcliente.dto'
import { CreateItemPedidoDto } from '@/applications/dto/itemPedido/createitempedido.dto'
import { CreateItemPedidoUseCase } from '@/applications/usecases/itenspedido/createitempedido.usecase'
import { DeleteItemPedidoUseCase } from '@/applications/usecases/itenspedido/deleteitempedido.usecase'
import { GetAllItensPedidoUseCase } from '@/applications/usecases/itenspedido/getallitempedido.usecase'
import { GetItemPedidoByIdUseCase } from '@/applications/usecases/itenspedido/getitempedidobyid.usecase'
import { UpdateItemPedidoUseCase } from '@/applications/usecases/itenspedido/updateitempedido.usecase'
import { ItensPedidoUsecaseProxyModule } from '@/infrastructures/usecaseproxy/itenspedido/itenspedido.usecase-proxy.modules'
import { UseCaseProxy } from '@/infrastructures/usecaseproxy/usecase-proxy'
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post
} from '@nestjs/common'

@Controller('itempedido')
export class ItemPedidoController {
  constructor(
    @Inject(ItensPedidoUsecaseProxyModule.GET_ALL_ITENS_PEDIDO_USE_CASE)
    private readonly getAllItensPedidoUsecaseProxy: UseCaseProxy<GetAllItensPedidoUseCase.UseCase>,
    @Inject(ItensPedidoUsecaseProxyModule.GET_ITENS_PEDIDO_BY_ID_USE_CASE)
    private readonly getItensPedidoByIdUsecaseProxy: UseCaseProxy<GetItemPedidoByIdUseCase.UseCase>,
    @Inject(ItensPedidoUsecaseProxyModule.CREATE_ITENS_PEDIDO_USE_CASE)
    private readonly createItensPedidoUsecaseProxy: UseCaseProxy<CreateItemPedidoUseCase.UseCase>,
    @Inject(ItensPedidoUsecaseProxyModule.UPDATE_ITENS_PEDIDO_USE_CASE)
    private readonly updateItensPedidoUsecaseProxy: UseCaseProxy<UpdateItemPedidoUseCase.UseCase>,
    @Inject(ItensPedidoUsecaseProxyModule.DELETE_ITENS_PEDIDO_USE_CASE)
    private readonly deleteItensPedidoUsecaseProxy: UseCaseProxy<DeleteItemPedidoUseCase.UseCase>
  ) {}

  @Get('/')
  async getAllItensPedido() {
    const result = await this.getAllItensPedidoUsecaseProxy
      .getInstance()
      .execute()
    return {
      status: 'OK',
      code: 200,
      message: 'ItensPedido found',
      data: result
    }
  }
  @Get('/:id')
  async getItensPedidoById(@Param('id') id: number) {
    const result = await this.getItensPedidoByIdUsecaseProxy
      .getInstance()
      .execute({ id })
    return {
      status: 'OK',
      code: 200,
      message: 'ItensPedido found',
      data: result
    }
  }
  @Post('/')
  async createItensPedido(@Body() createItensPedidoDto: CreateItemPedidoDto) {
    const result = await this.createItensPedidoUsecaseProxy
      .getInstance()
      .execute(createItensPedidoDto)
    return {
      status: 'OK',
      code: 200,
      message: 'ItensPedido created',
      data: result
    }
  }
  @Patch('/:id')
  async updateItensPedido(
    @Param('id') id: number,
    @Body() updateItensPedidoDto: CreateItemPedidoDto
  ) {
    const result = await this.updateItensPedidoUsecaseProxy
      .getInstance()
      .execute({ id, ...updateItensPedidoDto })
    return {
      status: 'OK',
      code: 200,
      message: 'ItensPedido updated',
      data: result
    }
  }
  @Delete('/:id')
  async deleteItensPedido(@Param('id') id: number) {
    const result = await this.deleteItensPedidoUsecaseProxy
      .getInstance()
      .execute({ id })
    return {
      status: 'OK',
      code: 200,
      message: 'ItensPedido deleted',
      data: result
    }
  }
}
