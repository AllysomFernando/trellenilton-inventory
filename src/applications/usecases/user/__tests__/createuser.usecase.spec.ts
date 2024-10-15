import { CreateUserUseCase } from '@/applications/usecases/user/createuser.usecase'
import { UserRepository } from '@/domain/repository/user.repository'
import { UserModel } from '@/domain/models/user'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

const mockUserRepository: UserRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn()
}

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase.UseCase

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase.UseCase(mockUserRepository)
  })

  it('should throw an error if required fields are missing', async () => {
    const input = { email: '', name: '', password: '' }
    await expect(createUserUseCase.execute(input)).rejects.toThrow(
      BadRequestError
    )
  })

  it('should create a user with valid input', async () => {
    const input = {
      email: 'allysomted12@gmail.com',
      name: 'Test',
      password: 'password123'
    }
    const user = new UserModel()
    user.email = input.email
    user.name = input.name
    user.password = input.password

    ;(mockUserRepository.save as jest.Mock).mockResolvedValueOnce(user)

    const result = await createUserUseCase.execute(input)

    expect(result).toEqual(user)
  })
})
