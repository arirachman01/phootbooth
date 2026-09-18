import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync } from 'fs';
import { unlink } from 'fs/promises';
import { PrismaService } from '../prisma.service.js';
import { CreateLandingPhotoDto } from './dto/create-landing-photo.dto';
import { UpdateLandingPhotoDto } from './dto/update-landing-photo.dto';
import { buildFileUrl } from '../utils/file-upload.util';

const FOLDER = 'landing';

@Injectable()
export class LandingPhotosService {
  constructor(private prisma: PrismaService) {}

  async create(file: Express.Multer.File, dto: CreateLandingPhotoDto) {
    const url = buildFileUrl(FOLDER, file.filename);
    return this.prisma.landingPhoto.create({
      data: {
        filename: file.filename,
        url,
        order: dto.order ?? 0,
        isActive: dto.isActive ?? true,
      },
    });
  }

  findAll() {
    return this.prisma.landingPhoto.findMany({
      orderBy: { order: 'asc' },
    });
  }

  findActive() {
    return this.prisma.landingPhoto.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const photo = await this.prisma.landingPhoto.findUnique({ where: { id } });
    if (!photo) {
      throw new NotFoundException(
        `Foto landing dengan id ${id} tidak ditemukan`,
      );
    }
    return photo;
  }

  async update(id: number, dto: UpdateLandingPhotoDto) {
    await this.findOne(id);
    return this.prisma.landingPhoto.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const photo = await this.findOne(id);
    const filePath = `./uploads/${FOLDER}/${photo.filename}`;
    if (existsSync(filePath)) {
      await unlink(filePath);
    }
    return this.prisma.landingPhoto.delete({ where: { id } });
  }
}
