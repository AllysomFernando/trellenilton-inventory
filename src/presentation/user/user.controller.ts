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
import { GetUserByIdUseCase } from '@/applications/usecases/user/getuserbyid.usecase'
import { GetAllUserUseCase } from '@/applications/usecases/user/getalluser.usecase'
import { CreateUserUseCase } from '@/applications/usecases/user/createuser.usecase'
import { UseCaseProxy } from '@/infrastructures/usecaseproxy/usecase-proxy'
import { CreateUserDto } from '@/applications/dto/user/createuser.dto'
import { UpdateUserUseCase } from '@/applications/usecases/user/updateuser.usecase'
import { DeleteUserUseCase } from '@/applications/usecases/user/deleteuser.usecase'
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  validateOrReject
} from 'class-validator'
import { UserUsecaseProxyModule } from '@/infrastructures/usecaseproxy/user/user.usecase-proxy.module'
import { LoginUseCase } from '@/applications/usecases/user/login.usecase'

class LoginDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(6)
  password: string
}

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserUsecaseProxyModule.GET_ALL_USERS_USE_CASE)
    private readonly getAllUsersUsecaseProxy: UseCaseProxy<GetAllUserUseCase.UseCase>,
    @Inject(UserUsecaseProxyModule.GET_USER_BY_ID_USE_CASE)
    private readonly getUserByIdUsecaseProxy: UseCaseProxy<GetUserByIdUseCase.UseCase>,
    @Inject(UserUsecaseProxyModule.CREATE_USER_USE_CASE)
    private readonly createUserUsecaseProxy: UseCaseProxy<CreateUserUseCase.UseCase>,
    @Inject(UserUsecaseProxyModule.UPDATE_USER_USE_CASE)
    private readonly updateUserUsecaseProxy: UseCaseProxy<UpdateUserUseCase.UseCase>,
    @Inject(UserUsecaseProxyModule.DELETE_USER_USE_CASE)
    private readonly deleteUserUsecaseProxy: UseCaseProxy<DeleteUserUseCase.UseCase>,
    @Inject(UserUsecaseProxyModule.LOGIN_USER_USE_CASE)
    private readonly loginUserUsecaseProxy: UseCaseProxy<LoginUseCase.UseCase>
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

  @Post('/login')
  async loginUser(@Body() loginDto: LoginDto) {
    await validateOrReject(loginDto)
    const result = await this.loginUserUsecaseProxy
      .getInstance()
      .execute(loginDto)
    return {
      status: 'OK',
      code: 200,
      message: 'User logged in',
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

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    const result = await this.deleteUserUsecaseProxy
      .getInstance()
      .execute({ id })
    return {
      status: 'OK',
      code: 200,
      message: 'User deleted',
      data: result
    }
  }
}
