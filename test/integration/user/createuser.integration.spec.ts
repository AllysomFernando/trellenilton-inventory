import { Test } from '@nestjs/testing';
import { UsecaseProxyModule } from '@/infrastructures/usecaseproxy/usecase-proxy.module';
import { CreateUserUseCase } from '@/applications/usecases/user/createuser.usecase';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user.repository';
import { UserModel } from '@/domain/models/user';

describe('CreateUserUseCase Integration Test', () => {
  let createUserUseCase: CreateUserUseCase.UseCase;
  let userRepository: UserRepositoryOrm;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsecaseProxyModule.register()],
    }).compile();

    userRepository = moduleRef.get<UserRepositoryOrm>(UserRepositoryOrm);
    const usecaseProxy = moduleRef.get(UsecaseProxyModule.CREATE_USER_USE_CASE);
    createUserUseCase = usecaseProxy.getInstance();
  });

  it('should create a new user in the database', async () => {
    const input = { email: 'integration@test.com', name: 'Integration Test', password: '123456' };
    const result = await createUserUseCase.execute(input);
    
    expect(result).toBeInstanceOf(UserModel);
    expect(result.email).toBe(input.email);
    expect(result.name).toBe(input.name);
  });
});
