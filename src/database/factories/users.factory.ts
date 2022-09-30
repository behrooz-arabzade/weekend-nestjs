import { User } from 'entities/user/user.entity';
import { define } from 'typeorm-seeding';

define(User, () => {
  const user = new User();
  // TODO set user details
  // TODO iterate in a json file that contains list of default users and their details
  return user;
});
