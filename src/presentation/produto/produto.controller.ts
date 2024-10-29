import { CreateProdutoDto } from '@/applications/dto/produto/createproduto.dto'
import { CreateProdutoUseCase } from '@/applications/usecases/produto/createproduto.usecase'
import { DeleteProdutoUseCase } from '@/applications/usecases/produto/deleteproduto.usecase'
import { GetAllProdutoUseCase } from '@/applications/usecases/produto/getallproduto.usecase'
import { GetProdutoByFornecedorIdUseCase } from '@/applications/usecases/produto/getprodutobyfornecedorid'
import { GetProdutoByIdUseCase } from '@/applications/usecases/produto/getprodutobyid.usecase'
import { UpdateProdutoUseCase } from '@/applications/usecases/produto/updateproduto.usecase'
import { ProdutoUsecaseProxyModule } from '@/infrastructures/usecaseproxy/produto/produto.usecase-proxy.modules'
import { UseCaseProxy } from '@/infrastructures/usecaseproxy/usecase-proxy'
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('produto')
export class ProdutoController {
  constructor(
    @Inject(ProdutoUsecaseProxyModule.GET_ALL_PRODUTOS_USE_CASE)
    private readonly getAllProdutosUsecaseProxy: UseCaseProxy<GetAllProdutoUseCase.UseCase>,
    @Inject(ProdutoUsecaseProxyModule.GET_PRODUTO_BY_ID_USE_CASE)
    private readonly getProdutoByIdUsecaseProxy: UseCaseProxy<GetProdutoByIdUseCase.UseCase>,
    @Inject(ProdutoUsecaseProxyModule.CREATE_PRODUTO_USE_CASE)
    private readonly createProdutoUsecaseProxy: UseCaseProxy<CreateProdutoUseCase.UseCase>,
    @Inject(ProdutoUsecaseProxyModule.UPDATE_PRODUTO_USE_CASE)
    private readonly updateProdutoUsecaseProxy: UseCaseProxy<UpdateProdutoUseCase.UseCase>,
    @Inject(ProdutoUsecaseProxyModule.DELETE_PRODUTO_USE_CASE)
    private readonly deleteProdutoUsecaseProxy: UseCaseProxy<DeleteProdutoUseCase.UseCase>,
    @Inject(ProdutoUsecaseProxyModule.GET_PRODUTO_BY_FORNECEDOR_ID_USE_CASE)
    private readonly getProdutoByFornecedorIdUsecaseProxy: UseCaseProxy<GetProdutoByFornecedorIdUseCase.UseCase>
  ) {}

  @Get('/')
  async getAllProdutos() {
    const result = await this.getAllProdutosUsecaseProxy.getInstance().execute()
    return {
      status: 'OK',
      code: 200,
      message: 'Produtos found',
      data: result
    }
  }
  @Get('/:id')
  async getProdutoById(@Param('id') id: number) {
    const result = await this.getProdutoByIdUsecaseProxy
      .getInstance()
      .execute({ id })
    return {
      status: 'OK',
      code: 200,
      message: 'Produto found',
      data: result
    }
  }
  @Get('/produto/:id')
  async getProdutoByFornecedorId(@Param('id') fornecedorId: number) {
    const result = await this.getProdutoByFornecedorIdUsecaseProxy
      .getInstance()
      .execute({ fornecedorId })
    return {
      status: 'OK',
      code: 200,
      message: 'Produto found',
      data: result
    }
  }
  @Post('/')
  @UseInterceptors(FileInterceptor('image'))
  async createProduto(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: string,
    @Body('quantity') quantity: string,
    @Body('fornecedorId') fornecedorId: string
  ) {
    const result = await this.createProdutoUsecaseProxy.getInstance().execute({
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
      image: file,
      fornecedorId: Number(fornecedorId)
    })
    return {
      status: 'OK',
      code: 200,
      message: 'Produto created',
      data: result
    }
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProduto(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: string,
    @Body('quantity') quantity: string,
    @Body('fornecedorId') fornecedorId: string
  ) {
    const result = await this.updateProdutoUsecaseProxy.getInstance().execute({
      id,
      name,
      description,
      price: price ? Number(price) : undefined,
      quantity: quantity ? Number(quantity) : undefined,
      image: file,
      fornecedorId: fornecedorId ? Number(fornecedorId) : undefined
    })
    return {
      status: 'OK',
      code: 200,
      message: 'Produto updated',
      data: result
    }
  }
  @Delete('/:id')
  async deleteProduto(@Param('id') id: number) {
    const result = await this.deleteProdutoUsecaseProxy
      .getInstance()
      .execute({ id })
    return {
      status: 'OK',
      code: 200,
      message: 'Produto deleted',
      data: result
    }
  }
}
