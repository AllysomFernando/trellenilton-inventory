import { Controller, Get, Inject, Param, Post } from '@nestjs/common'
import { GetUserByIdUseCase } from '@/applications/usecases/user/getuserbyid.usecase'
import { GetAllUserUseCase } from '@/applications/usecases/user/getalluser.usecase'

import { UseCaseProxy } from 'src/infrastructures/usecaseproxy/usecase-proxy'
import { UsecaseProxyModule } from 'src/infrastructures/usecaseproxy/usecase-proxy.module'

@Controller('user')
export class UserController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_USERS_USE_CASE)
    private readonly getAllUsersUsecaseProxy: UseCaseProxy<GetAllUserUseCase.UseCase>,
    @Inject(UsecaseProxyModule.GET_USER_BY_ID_USE_CASE)
    private readonly getUserByIdUsecaseProxy: UseCaseProxy<GetUserByIdUseCase.UseCase>
  ) {}
  @Get('/')
  async getAllUsers() {
    const result = await this.getAllUsersUsecaseProxy.getInstance().execute()
    return {
      status: 'OK',
      code: 200,
      message: 'Users found',
      data: result
    }
  }
  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    const result = await this.getUserByIdUsecaseProxy
      .getInstance()
      .execute({ id })
    return {
      status: 'OK',
      code: 200,
      message: 'User found',
      data: result
    }
  }
  @Post('/')
  async createUser() {
    return {
      status: 'OK',
      code: 200,
      message: 'User created',
      data: {}
    }
  }
}
