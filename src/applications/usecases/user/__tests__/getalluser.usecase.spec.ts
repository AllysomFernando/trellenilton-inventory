import { GetAllUserUseCase } from '@/applications/usecases/user/getalluser.usecase'
import { UserRepository } from '@/domain/repository/user.repository'
import { UserModel } from '@/domain/models/user'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { UsuarioEnum } from '@/applications/enum/user.enum'

const mockUserRepository: UserRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  login: jest.fn()
}

describe('GetAllUserUseCase', () => {
  let getAllUserUseCase: GetAllUserUseCase.UseCase

  beforeEach(() => {
    getAllUserUseCase = new GetAllUserUseCase.UseCase(mockUserRepository)
  })

  it('should return a list of users successfully', async () => {
    const users: UserModel[] = [
      {
        id: 1,
        email: 'user1@example.com',
        name: 'User One',
        password: 'password123',
        tipo: 'Admin' as UsuarioEnum
      },
      {
        id: 2,
        email: 'user2@example.com',
        name: 'User Two',
        password: 'password456',
        tipo: 'User' as UsuarioEnum
      }
    ]

    ;(mockUserRepository.findAll as jest.Mock).mockResolvedValueOnce(users)

    const result = await getAllUserUseCase.execute()
    expect(result).toEqual(users)
  })

  it('should throw BadRequestError if an error occurs while fetching users', async () => {
    ;(mockUserRepository.findAll as jest.Mock).mockRejectedValueOnce(
      new Error('Error')
    )

    await expect(getAllUserUseCase.execute()).rejects.toThrow(BadRequestError)
  })
})
