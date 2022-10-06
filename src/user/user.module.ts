import { Module } from '@nestjs/common';

import { UserService } from '../user/user.service';

@Module({
  imports: [UserModule],
  providers: [UserService]
})
export class UserModule {}
