import { GetAllUserUseCase } from '@/applications/usecases/user/getalluser.usecase';
import { UserRepository } from '@/domain/repository/user.repository';
import { UserModel } from '@/domain/models/user';
import { BadRequestError } from '@/applications/errors/bad-request-erros';

const mockUserRepository: UserRepository = {
  findAll: jest.fn(),  
  findById: jest.fn(), 
  save: jest.fn(),   
};

describe('GetAllUserUseCase', () => {
  let getAllUserUseCase: GetAllUserUseCase.UseCase;

  beforeEach(() => {
    getAllUserUseCase = new GetAllUserUseCase.UseCase(mockUserRepository);
  });

  it('should return a list of users successfully', async () => {
    const users: UserModel[] = [
      { id: 1, email: 'user1@example.com', name: 'User One', password: 'password123' },
      { id: 2, email: 'user2@example.com', name: 'User Two', password: 'password456' },
    ];

    (mockUserRepository.findAll as jest.Mock).mockResolvedValueOnce(users);

    const result = await getAllUserUseCase.execute();

    expect(result).toEqual(users);
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should throw BadRequestError if an error occurs while fetching users', async () => {
    (mockUserRepository.findAll as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    await expect(getAllUserUseCase.execute()).rejects.toThrow(BadRequestError);
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
  });
});