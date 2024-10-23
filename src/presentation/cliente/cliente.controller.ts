import { CreateClienteDto } from '@/applications/dto/cliente/createcliente.dto'
import { CreateClienteUseCase } from '@/applications/usecases/cliente/createcliente.usecase'
import { DeleteClienteUseCase } from '@/applications/usecases/cliente/deletecliente.usecase'
import { GetAllClientUseCase } from '@/applications/usecases/cliente/getallcliente.usecase'
import { GetClientByIdUseCase } from '@/applications/usecases/cliente/getclientebyid.usecase'
import { UpdateClienteUseCase } from '@/applications/usecases/cliente/updatecliente.usecase'
import { ClienteUsecaseProxyModule } from '@/infrastructures/usecaseproxy/cliente/cliente.usecase-proxy.modules'
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

@Controller('cliente')
export class ClienteController {
  constructor(
    @Inject(ClienteUsecaseProxyModule.GET_ALL_CLIENTE_USE_CASE)
    private readonly getAllClienteUsecaseProxy: UseCaseProxy<GetAllClientUseCase.UseCase>,
    @Inject(ClienteUsecaseProxyModule.GET_CLIENTE_BY_ID_USE_CASE)
    private readonly getClienteByIdUsecaseProxy: UseCaseProxy<GetClientByIdUseCase.UseCase>,
    @Inject(ClienteUsecaseProxyModule.CREATE_CLIENTE_USE_CASE)
    private readonly createClienteUsecaseProxy: UseCaseProxy<CreateClienteUseCase.UseCase>,
    @Inject(ClienteUsecaseProxyModule.UPDATE_CLIENTE_USE_CASE)
    private readonly updateClienteUsecaseProxy: UseCaseProxy<UpdateClienteUseCase.UseCase>,
    @Inject(ClienteUsecaseProxyModule.DELETE_CLIENTE_USE_CASE)
    private readonly deleteClienteUsecaseProxy: UseCaseProxy<DeleteClienteUseCase.UseCase>
  ) {}

  @Get('/')
  async getAllCliente() {
    const result = await this.getAllClienteUsecaseProxy.getInstance().execute()
    return {
      status: 'OK',
      code: 200,
      message: 'Cliente found',
      data: result
    }
  }
  @Get('/:id')
  async getClienteById(@Param('id') id: number) {
    const result = await this.getClienteByIdUsecaseProxy
      .getInstance()
      .execute({ id })
    return {
      status: 'OK',
      code: 200,
      message: 'Cliente found',
      data: result
    }
  }
  @Post('/')
  async createCliente(@Body() createClienteDto: CreateClienteDto) {
    const result = await this.createClienteUsecaseProxy
      .getInstance()
      .execute(createClienteDto)
    return {
      status: 'OK',
      code: 200,
      message: 'Cliente created',
      data: result
    }
  }
  @Patch('/:id')
  async updateCliente(
    @Param('id') id: number,
    @Body() updateClienteDto: CreateClienteDto
  ) {
    const result = await this.updateClienteUsecaseProxy
      .getInstance()
      .execute({ id, ...updateClienteDto })
    return {
      status: 'OK',
      code: 200,
      message: 'Cliente updated',
      data: result
    }
  }
  @Delete('/:id')
  async deleteCliente(@Param('id') id: number) {
    const result = await this.deleteClienteUsecaseProxy
      .getInstance()
      .execute({ id })
    return {
      status: 'OK',
      code: 200,
      message: 'Cliente deleted',
      data: result
    }
  }
}
