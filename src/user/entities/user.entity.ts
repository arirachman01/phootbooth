import { User } from '@prisma/client';

export interface UserResponse {
  message: string;
  data: Omit<User, 'password'>;
}
