import { Injectable } from '@nestjs/common'
import { User } from '../entities/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '@/domain/repository/user.repository'
import { UserModel } from '@/domain/models/user'
import { randomBytes, scrypt, createCipheriv, createDecipheriv } from 'crypto'
import { promisify } from 'util'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import * as jwt from 'jsonwebtoken'

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
    const iv = randomBytes(16)
    const key = (await promisify(scrypt)(entity.password, 'salt', 32)) as Buffer
    const cipher = createCipheriv('aes-256-ctr', key, iv)
    const encryptedPassword = Buffer.concat([
      cipher.update(entity.password),
      cipher.final()
    ]).toString('hex')
    entity.password = encryptedPassword
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
  async login(
    email: string,
    password: string
  ): Promise<{ user: UserModel; token: string }> {
    const entity = await this.userRepository.findOne({
      where: { email }
    })
    if (!entity) {
      throw new BadRequestError('User not found')
    }

    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer
    const iv = Buffer.from(entity.password.slice(0, 32), 'hex')
    const decipher = createDecipheriv('aes-256-ctr', key, iv)
    const decryptedPassword = Buffer.concat([
      decipher.update(Buffer.from(entity.password.slice(32), 'hex')),
      decipher.final()
    ]).toString()

    if (decryptedPassword !== password) {
      throw new BadRequestError('Invalid password')
    }

    const user = this.toUser(entity)
    const token = jwt.sign(
      { id: user.id, email: user.email },
      'trelles',
      { expiresIn: '1h' }
    )

    return { user, token }
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
