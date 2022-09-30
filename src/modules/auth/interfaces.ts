import { ApiProperty } from '@nestjs/swagger';

export class LoginBody {
  @ApiProperty({ name: 'username' })
  username: string;

  @ApiProperty({ name: 'password' })
  password: string;
}
