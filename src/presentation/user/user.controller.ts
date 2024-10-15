import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { GetUserByIdUseCase } from '@/applications/usecases/user/getuserbyid.usecase'
import { GetAllUserUseCase } from '@/applications/usecases/user/getalluser.usecase'
import { CreateUserUseCase } from '@/applications/usecases/user/createuser.usecase'
import { UseCaseProxy } from 'src/infrastructures/usecaseproxy/usecase-proxy'
import { UsecaseProxyModule } from 'src/infrastructures/usecaseproxy/usecase-proxy.module'
import { CreateUserDto } from '@/applications/dto/user/createuser.dto'
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  validateOrReject
} from 'class-validator'
import { UpdateUserUseCase } from '@/applications/usecases/user/updateuser.usecase'

@Controller('user')
export class UserController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_USERS_USE_CASE)
    private readonly getAllUsersUsecaseProxy: UseCaseProxy<GetAllUserUseCase.UseCase>,
    @Inject(UsecaseProxyModule.GET_USER_BY_ID_USE_CASE)
    private readonly getUserByIdUsecaseProxy: UseCaseProxy<GetUserByIdUseCase.UseCase>,
    @Inject(UsecaseProxyModule.CREATE_USER_USE_CASE)
    private readonly createUserUsecaseProxy: UseCaseProxy<CreateUserUseCase.UseCase>,
    @Inject(UsecaseProxyModule.UPDATE_USER_USE_CASE)
    private readonly updateUserUsecaseProxy: UseCaseProxy<UpdateUserUseCase.UseCase>
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
  async createUser(@Body() createUserDto: CreateUserDto) {
    class CreateUserValidation {
      @IsEmail()
      email: string

      @IsNotEmpty()
      name: string

      @IsNotEmpty()
      @MinLength(6)
      password: string

      constructor(createUserDto: CreateUserDto) {
        this.email = createUserDto.email
        this.name = createUserDto.name
        this.password = createUserDto.password
      }
    }

    await validateOrReject(new CreateUserValidation(createUserDto))
    const result = await this.createUserUsecaseProxy
      .getInstance()
      .execute(createUserDto)
    return {
      status: 'OK',
      code: 200,
      message: 'User created',
      data: result
    }
  }
  @Patch('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() createUserDto: CreateUserDto
  ) {
    class UpdateUserValidation {
      @IsEmail()
      email: string

      @IsNotEmpty()
      name: string

      @IsNotEmpty()
      @MinLength(6)
      password: string

      constructor(createUserDto: CreateUserDto) {
        this.email = createUserDto.email
        this.name = createUserDto.name
        this.password = createUserDto.password
      }
    }

    await validateOrReject(new UpdateUserValidation(createUserDto))
    const result = await this.updateUserUsecaseProxy
      .getInstance()
      .execute({ ...createUserDto, id })
    return {
      status: 'OK',
      code: 200,
      message: 'User updated',
      data: result
    }
  }
}
