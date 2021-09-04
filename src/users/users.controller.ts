import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { UserDto } from './dto/UserDto';
import { UserEntity } from './database/user.entity';
import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

@Controller('users')
export class UsersController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  async onModuleInit() {
    const requestPatters = ['find-all-user', 'create-user'];

    requestPatters.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Get()
  index(): Observable<UserEntity[]> {
    return this.client.send('find-all-user', {});
  }
  @Post()
  create(@Body() user: UserDto): Observable<UserEntity> {
    return this.client.send('create-user', user);
  }
}
