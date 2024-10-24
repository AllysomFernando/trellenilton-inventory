import { CreatePedidoDto } from '@/applications/dto/pedido/createpedido.dto'
import { CreatePedidoUseCase } from '@/applications/usecases/pedido/createpedido.usecase'
import { DeletePedidoUseCase } from '@/applications/usecases/pedido/deletepedido.usecase'
import { GetAllPedidoUseCase } from '@/applications/usecases/pedido/getallpedido.usecase'
import { GetPedidoByClienteIdUseCase } from '@/applications/usecases/pedido/getpedidobyclienteid.usecase'
import { GetPedidoByIdUseCase } from '@/applications/usecases/pedido/getpedidobyid.usecase'
import { UpdatePedidoUseCase } from '@/applications/usecases/pedido/updatepedido.usecase'
import { PedidoUsecaseProxyModule } from '@/infrastructures/usecaseproxy/pedido/pedido.usecase-proxy.modules'
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

@Controller('pedido')
export class PedidoController {
  constructor(
    @Inject(PedidoUsecaseProxyModule.GET_ALL_PEDIDOS_USE_CASE)
    private readonly getAllPedidosUseCase: UseCaseProxy<GetAllPedidoUseCase.UseCase>,
    @Inject(PedidoUsecaseProxyModule.GET_PEDIDO_BY_ID_USE_CASE)
    private readonly getPedidoByIdUseCase: UseCaseProxy<GetPedidoByIdUseCase.UseCase>,
    @Inject(PedidoUsecaseProxyModule.CREATE_PEDIDO_USE_CASE)
    private readonly createPedidoUseCase: UseCaseProxy<CreatePedidoUseCase.UseCase>,
    @Inject(PedidoUsecaseProxyModule.UPDATE_PEDIDO_USE_CASE)
    private readonly updatePedidoUseCase: UseCaseProxy<UpdatePedidoUseCase.UseCase>,
    @Inject(PedidoUsecaseProxyModule.DELETE_PEDIDO_USE_CASE)
    private readonly deletePedidoUseCase: UseCaseProxy<DeletePedidoUseCase.UseCase>,
    @Inject(PedidoUsecaseProxyModule.GET_PEDIDO_BY_ID_CLIENTE_USE_CASE)
    private readonly getPedidoByIdClienteUseCase: UseCaseProxy<GetPedidoByClienteIdUseCase.UseCase>
  ) {}
  @Get('/')
  async getAllPedidos() {
    const result = await this.getAllPedidosUseCase.getInstance().execute()
    return {
      status: 'OK',
      code: 200,
      message: 'Pedidos found',
      data: result
    }
  }
  @Get('/:id')
  async getPedidoById(@Param('id') id: number) {
    const result = await this.getPedidoByIdUseCase.getInstance().execute({ id })
    return {
      status: 'OK',
      code: 200,
      message: 'Pedido found',
      data: result
    }
  }
  @Get('/:id')
  async getPedidoByIdCliente(@Param('id') clienteId: number) {
    const result = await this.getPedidoByIdClienteUseCase.getInstance().execute({ clienteId })
    return {
      status: 'OK',
      code: 200,
      message: 'Pedido found',
      data: result
    }
  }
  @Post('/')
  async createPedido(@Body() createPedidoDto: CreatePedidoDto) {
    const result = await this.createPedidoUseCase
      .getInstance()
      .execute(createPedidoDto)
    return {
      status: 'OK',
      code: 200,
      message: 'Pedido created',
      data: result
    }
  }
  @Patch('/:id')
  async updatePedido(
    @Param('id') id: number,
    @Body() updatePedidoDto: CreatePedidoDto
  ) {
    const result = await this.updatePedidoUseCase
      .getInstance()
      .execute({ id, ...updatePedidoDto })
    return {
      status: 'OK',
      code: 200,
      message: 'Pedido updated',
      data: result
    }
  }
  @Delete('/:id')
  async deletePedido(@Param('id') id: number) {
    const result = await this.deletePedidoUseCase.getInstance().execute({ id })
    return {
      status: 'OK',
      code: 200,
      message: 'Pedido deleted',
      data: result
    }
  }
}
