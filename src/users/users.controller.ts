import { UserDto } from './dto/UserDto';
import { UserEntity } from './database/user.entity';
import { UsersService } from './users.service';
import { User } from './interfaces/users.interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async list(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Body() user: UserDto,
    @Param('id') id: string,
  ): Promise<UserEntity> {
    return await this.userService.update(id, user);
  }

  @Post()
  async create(@Body() user: UserDto): Promise<UserEntity> {
    return await this.userService.create(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
