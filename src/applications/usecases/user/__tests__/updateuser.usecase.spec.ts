import { UpdateUserUseCase } from '../updateuser.usecase'
import { UserRepository } from '@/domain/repository/user.repository'
import { UserModel } from '@/domain/models/user'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

describe('UpdateUserUseCase', () => {
  let userRepository: UserRepository
  let updateUserUseCase: UpdateUserUseCase.UseCase

  beforeEach(() => {
    userRepository = {
      update: jest.fn()
    } as unknown as UserRepository
    updateUserUseCase = new UpdateUserUseCase.UseCase(userRepository)
  })

  it('should throw an error if id is not provided', async () => {
    const input = { id: 0, email: '', name: '', password: '' }

    await expect(updateUserUseCase.execute(input)).rejects.toThrow(
      'Id é obrigatório.'
    )
  })
  it('should throw an error if user is not found', async () => {
    const input = { id: 1, email: '', name: '', password: '' }
    ;(userRepository.update as jest.Mock).mockResolvedValue(null)

    await expect(updateUserUseCase.execute(input)).rejects.toThrow(
      BadRequestError
    )
  })
  it('should throw an error if no fields are provided for update', async () => {
    const input = { id: 1, email: '', name: '', password: '' }

    await expect(updateUserUseCase.execute(input)).rejects.toThrow(
      'Informe ao menos um campo para atualização.'
    )
  })

  it('should throw a BadRequestError if update fails', async () => {
    const input = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      password: 'password'
    }
    ;(userRepository.update as jest.Mock).mockResolvedValue(null)

    await expect(updateUserUseCase.execute(input)).rejects.toThrow(
      BadRequestError
    )
  })

  it('should return the updated user if update is successful', async () => {
    const input = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      password: 'password'
    }
    const updatedUser = new UserModel()
    updatedUser.id = 1
    updatedUser.email = 'test@example.com'
    updatedUser.name = 'Test User'
    updatedUser.password = 'password'
    ;(userRepository.update as jest.Mock).mockResolvedValue(updatedUser)

    const result = await updateUserUseCase.execute(input)

    expect(result).toEqual(updatedUser)
  })
})
