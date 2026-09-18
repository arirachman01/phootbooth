import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { User, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { UserResponse } from './entities/user.entity.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.frameTemplate.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(
    id: number,
  ): Promise<{ message: string; data: Omit<User, 'password'> }> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: {
        password: true,
      },
    });

    if (!user) throw new NotFoundException(`User Not Found`);
    return { message: 'User retrieved successfully', data: user };
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<{
    message: string;
    data: Omit<User, 'password'>;
  }> {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) throw new ConflictException('Email already registered');
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 10),

        setting: {
          create: {
            websiteName: '',
            websiteDescription: '',
            logoUrl: '',
            faviconUrl: '',
          },
        },
      },
      omit: {
        password: true,
      },
    });
    return { message: 'User created successfully', data: user };
  }

  async updateUser(
    id: number,
    data: Prisma.UserUpdateInput,
  ): Promise<UserResponse> {
    const updateData = { ...data };

    if (typeof data.password === 'string') {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateData,
      omit: {
        password: true,
      },
    });
    return { message: 'User updated successfully', data: user };
  }

  async removeUser(id: number): Promise<UserResponse> {
    const user = await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully', data: user };
  }
}
