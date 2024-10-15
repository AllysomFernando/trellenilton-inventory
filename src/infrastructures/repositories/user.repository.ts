import { Injectable } from '@nestjs/common'
import { User } from '../entities/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '@/domain/repository/user.repository'
import { UserModel } from '@/domain/models/user'

@Injectable()
export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find()
    if (!users || users.length === 0) {
      return []
    }
    return users
  }

  async findById(id: number): Promise<UserModel> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      return null
    }
    return this.toUser(user)
  }

  async save(user: UserModel): Promise<UserModel> {
    const entity = this.userRepository.create(user)
    await this.userRepository.save(entity)
    return this.toUser(entity)
  }

  async update(user: UserModel): Promise<UserModel> {
    const entity = await this.userRepository.findOneBy({ id: user.id })
    if (!entity) {
      return null
    }
    entity.email = user.email
    entity.name = user.name
    entity.password = user.password
    await this.userRepository.save(entity)
    return this.toUser(entity)
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.userRepository.findOneBy({ id })
    if (!entity) {
      return false
    }
    await this.userRepository.remove(entity)
    return true
  }

  private toUser(userEntity: User): UserModel {
    const user: UserModel = new UserModel()

    user.id = userEntity.id
    user.email = userEntity.email
    user.name = userEntity.name
    user.password = userEntity.password

    return user
  }
}
