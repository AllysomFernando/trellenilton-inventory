import { CreateFornecedorDto } from '@/applications/dto/fornecedor/createfornecedor.dto'
import { CreateFornecedorUseCase } from '@/applications/usecases/fornecedor/createfornecedor.usecase'
import { DeleteFornecedorUseCase } from '@/applications/usecases/fornecedor/deletefornecedor.usecase'
import { GetAllFornecedorUseCase } from '@/applications/usecases/fornecedor/getallfornecedor.usecase'
import { GetFornecedorByIdUseCase } from '@/applications/usecases/fornecedor/getfornecedorbyid,usecase'
import { UpdateFornecedorUseCase } from '@/applications/usecases/fornecedor/updatefornecedor.usecase'
import { FornecedorUsecaseProxyModule } from '@/infrastructures/usecaseproxy/fornecedor/fornecedor.usecase-proxy.modules'
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

@Controller('fornecedor')
export class FornecedorController {
  constructor(
    @Inject(FornecedorUsecaseProxyModule.GET_ALL_FORNECEDOR_USE_CASE)
    private readonly getAllFornecedorUsecaseProxy: UseCaseProxy<GetAllFornecedorUseCase.UseCase>,
    @Inject(FornecedorUsecaseProxyModule.GET_FORNECEDOR_BY_ID_USE_CASE)
    private readonly getFornecedorByIdUsecaseProxy: UseCaseProxy<GetFornecedorByIdUseCase.UseCase>,
    @Inject(FornecedorUsecaseProxyModule.CREATE_FORNECEDOR_USE_CASE)
    private readonly createFornecedorUsecaseProxy: UseCaseProxy<CreateFornecedorUseCase.UseCase>,
    @Inject(FornecedorUsecaseProxyModule.UPDATE_FORNECEDOR_USE_CASE)
    private readonly updateFornecedorUsecaseProxy: UseCaseProxy<UpdateFornecedorUseCase.UseCase>,
    @Inject(FornecedorUsecaseProxyModule.DELETE_FORNECEDOR_USE_CASE)
    private readonly deleteFornecedorUsecaseProxy: UseCaseProxy<DeleteFornecedorUseCase.UseCase>
  ) {}

  @Get('/')
  async getAllFornecedor() {
    const result = await this.getAllFornecedorUsecaseProxy
      .getInstance()
      .execute()
    return {
      status: 'OK',
      code: 200,
      message: 'Fornecedor found',
      data: result
    }
  }
  @Get('/:id')
  async getFornecedorById(@Param('id') id: number) {
    const result = await this.getFornecedorByIdUsecaseProxy
      .getInstance()
      .execute({ id })
    return {
      status: 'OK',
      code: 200,
      message: 'Fornecedor found',
      data: result
    }
  }
  @Post('/')
  async createFornecedor(@Body() createFornecedorDto: CreateFornecedorDto) {
    const result = await this.createFornecedorUsecaseProxy
      .getInstance()
      .execute(createFornecedorDto)
    return {
      status: 'OK',
      code: 200,
      message: 'Fornecedor created',
      data: result
    }
  }
  @Patch('/:id')
  async updateFornecedor(
    @Param('id') id: number,
    @Body() updateFornecedorDto: CreateFornecedorDto
  ) {
    const result = await this.updateFornecedorUsecaseProxy
      .getInstance()
      .execute({ id, ...updateFornecedorDto })
    return {
      status: 'OK',
      code: 200,
      message: 'Fornecedor updated',
      data: result
    }
  }
  @Delete('/:id')
  async deleteFornecedor(@Param('id') id: number) {
    const result = await this.deleteFornecedorUsecaseProxy
      .getInstance()
      .execute({ id })
    return {
      status: 'OK',
      code: 200,
      message: 'Fornecedor deleted',
      data: result
    }
  }
}
