import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  name: string;

  readonly email: string;
  readonly phone: string;
  readonly password: string;
}
