import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUserUseCase } from '@/applications/usecases/user/getalluser.usecase';
import { UserRepository } from '@/domain/repository/user.repository';
import { UserModel } from '@/domain/models/user';
import { BadRequestError } from '@/applications/errors/bad-request-erros';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user.repository';

describe('GetAllUserUseCase Integration', () => {
  let getAllUserUseCase: GetAllUserUseCase.UseCase;
  let userRepository: UserRepository;

  const mockUserRepository: UserRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllUserUseCase.UseCase,
        {
          provide: UserRepositoryOrm,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    getAllUserUseCase = module.get<GetAllUserUseCase.UseCase>(GetAllUserUseCase.UseCase);
    userRepository = module.get<UserRepository>(UserRepositoryOrm);
  });

  it('should return all users successfully', async () => {
    const users: UserModel[] = [
      { id: 1, email: 'user1@example.com', name: 'User One', password: 'pass1' },
      { id: 2, email: 'user2@example.com', name: 'User Two', password: 'pass2' },
    ];
  
    (userRepository.findAll as jest.Mock).mockResolvedValueOnce(users);
  
    const result = await getAllUserUseCase.execute();
  
    expect(result).toEqual(users);
    expect(userRepository.findAll).toHaveBeenCalledTimes(1);
  });
  

  it('should throw BadRequestError if repository throws an error', async () => {
    (userRepository.findAll as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    await expect(getAllUserUseCase.execute()).rejects.toThrow(
      new BadRequestError('Falha ao buscar os usuários.')
    );

    expect(userRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
