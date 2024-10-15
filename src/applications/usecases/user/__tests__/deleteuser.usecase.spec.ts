import { DeleteUserUseCase } from '../deleteuser.usecase'
import { UserRepository } from '@/domain/repository/user.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

describe('DeleteUserUseCase', () => {
  let userRepository: UserRepository
  let deleteUserUseCase: DeleteUserUseCase.UseCase

  beforeEach(() => {
    userRepository = {
      delete: jest.fn()
    } as unknown as UserRepository
    deleteUserUseCase = new DeleteUserUseCase.UseCase(userRepository)
  })

  it('should throw an error if id is not provided', async () => {
    await expect(deleteUserUseCase.execute({ id: null })).rejects.toThrow(
      'Id é obrigatório.'
    )
  })

  it('should throw BadRequestError if user deletion fails', async () => {
    ;(userRepository.delete as jest.Mock).mockResolvedValue(null)
    await expect(deleteUserUseCase.execute({ id: 1 })).rejects.toThrow(
      BadRequestError
    )
  })

  it('should delete user successfully', async () => {
    ;(userRepository.delete as jest.Mock).mockResolvedValue(true)
    await expect(deleteUserUseCase.execute({ id: 1 })).resolves.toBeUndefined()
    expect(userRepository.delete).toHaveBeenCalledWith(1)
  })

  it('should throw BadRequestError if an exception occurs during deletion', async () => {
    ;(userRepository.delete as jest.Mock).mockRejectedValue(
      new Error('Some error')
    )
    await expect(deleteUserUseCase.execute({ id: 1 })).rejects.toThrow(
      BadRequestError
    )
  })
})
