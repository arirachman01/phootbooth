import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { PrismaService } from '../prisma.service.js';
@Injectable()
export class SettingService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.websiteSetting.findMany();
  }

  async findOne(id: number) {
    const data = await this.prisma.websiteSetting.findUnique({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException(
        `Website setting dengan id ${id} tidak ditemukan`,
      );
    }
    return data;
  }

  async update(id: number, updateSettingDto: UpdateSettingDto) {
    await this.findOne(id);
    return this.prisma.websiteSetting.update({
      where: { id },
      data: updateSettingDto,
    });
  }
}
