import { Controller, Get, Inject } from '@nestjs/common';
import { GetUserUseCase } from 'src/applications/usecases/user/getuser.usecase';
import { UseCaseProxy } from 'src/infrastructures/usecaseproxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructures/usecaseproxy/usecase-proxy.module';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_USERS_USE_CASE)
    private readonly getUserUsecaseProxy: UseCaseProxy<GetUserUseCase>,
  ) {}

  @Get('/all')
  async getAllUsers() {
    const result = await this.getUserUsecaseProxy.getInstance().execute();
    return {
      status: 'OK',
      code: 200,
      message: 'Success',
      data: result,
    };
  }
}
