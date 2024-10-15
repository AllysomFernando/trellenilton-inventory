import { GetUserByIdUseCase } from '@/applications/usecases/user/getuserbyid.usecase'
import { UserRepository } from '@/domain/repository/user.repository'
import { UserModel } from '@/domain/models/user'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

const mockUserRepository: UserRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn()
}

describe('GetUserByIdUseCase', () => {
  let getUserByIdUseCase: GetUserByIdUseCase.UseCase

  beforeEach(() => {
    getUserByIdUseCase = new GetUserByIdUseCase.UseCase(mockUserRepository)
  })

  it('should return a user by ID successfully', async () => {
    const user: UserModel = {
      id: 1,
      email: 'user@example.com',
      name: 'User One',
      password: 'password123'
    }

    ;(mockUserRepository.findById as jest.Mock).mockResolvedValueOnce(user)

    const result = await getUserByIdUseCase.execute({ id: 1 })

    expect(result).toEqual(user)
    expect(mockUserRepository.findById).toHaveBeenCalledWith(1)
    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1)
  })

  it('should throw BadRequestError if id is not provided', async () => {

    await expect(getUserByIdUseCase.execute({ id: undefined })).rejects.toThrow(
      new BadRequestError('Id é obrigatório.')
    )

    // Verifica se o repositório não foi chamado
    expect(mockUserRepository.findById).not.toHaveBeenCalled()
  })

  it('should throw BadRequestError if an error occurs while fetching the user', async () => {
    ;(mockUserRepository.findById as jest.Mock).mockRejectedValueOnce(
      new Error('Repository Error')
    )

    await expect(getUserByIdUseCase.execute({ id: 1 })).rejects.toThrow(
      new BadRequestError('Falha ao buscar o usuário com id informado.')
    )
  })
})
