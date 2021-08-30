import { UserEntity } from './database/user.entity';
import { User } from './interfaces/users.interfaces';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async update(id: string, user: User): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    return this.findOne(id);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.userRepository.delete(id);
  }
}
