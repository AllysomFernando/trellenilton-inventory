import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/repository/user.repository';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/domain/models/user';

@Injectable()
export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUser(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.toUser(user));
  }

  async findById(id: number): Promise<UserModel> {
    const user = await this.userRepository.findOneBy({ id });
    return this.toUser(user);
  }

  private toUser(userEntity: User): UserModel {
    const user: UserModel = new UserModel();

    user.id = userEntity.id;
    user.email = userEntity.email;
    user.name = userEntity.name;
    user.password = userEntity.password;

    return user;
  }
}
