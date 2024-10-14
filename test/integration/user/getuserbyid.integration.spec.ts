import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByIdUseCase } from '@/applications/usecases/user/getuserbyid.usecase';
import { UserRepository } from '@/domain/repository/user.repository';
import { UserModel } from '@/domain/models/user';
import { BadRequestError } from '@/applications/errors/bad-request-erros';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user.repository';

describe('GetUserByIdUseCase Integration', () => {
  let getUserByIdUseCase: GetUserByIdUseCase.UseCase;
  let userRepository: UserRepository;

  const mockUserRepository: UserRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByIdUseCase.UseCase,
        {
          provide: UserRepositoryOrm,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    getUserByIdUseCase = module.get<GetUserByIdUseCase.UseCase>(GetUserByIdUseCase.UseCase);
    userRepository = module.get<UserRepository>(UserRepositoryOrm);
  });

  it('should return a user by ID successfully', async () => {
    const user: UserModel = { id: 1, email: 'user1@example.com', name: 'User One', password: 'pass1' };

    (userRepository.findById as jest.Mock).mockResolvedValueOnce(user);

    const result = await getUserByIdUseCase.execute({ id: 1 });

    expect(result).toEqual(user);
    expect(userRepository.findById).toHaveBeenCalledWith(1);
    expect(userRepository.findById).toHaveBeenCalledTimes(1);
  });

  it('should throw BadRequestError if ID is not provided', async () => {
    await expect(getUserByIdUseCase.execute({ id: undefined })).rejects.toThrow(
      new BadRequestError('Id é obrigatório.')
    );

    expect(userRepository.findById).not.toHaveBeenCalled();
  });

  it('should throw BadRequestError if repository throws an error', async () => {
    (userRepository.findById as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    await expect(getUserByIdUseCase.execute({ id: 1 })).rejects.toThrow(
      new BadRequestError('Falha ao buscar o usuário com id informado.')
    );

    expect(userRepository.findById).toHaveBeenCalledWith(1);
    expect(userRepository.findById).toHaveBeenCalledTimes(1);
  });
});
