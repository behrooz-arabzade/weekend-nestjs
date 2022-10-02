import { ApiProperty } from "@nestjs/swagger";

export class RegisterBody {
  @ApiProperty({ name: 'username' })
  username: string;
  @ApiProperty({ name: 'password' })
  password: string;
}

export class ForgetPasswordBody {
  @ApiProperty({ name: 'emailOrMobile' })
  emailOrMobile: string;
}
