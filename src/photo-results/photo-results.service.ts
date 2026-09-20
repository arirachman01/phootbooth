import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreatePhotoResultDto } from './dto/create-photo-result.dto';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class PhotoResultsService {
  constructor(private prisma: PrismaService) {}

  async create(files: Express.Multer.File[], dto: CreatePhotoResultDto) {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY,
    );

    const results = await Promise.all(
      files.map(async (file) => {
        const filePath = `${dto.sessionId}/${file.originalname}`;

        const { data, error } = await supabase.storage
          .from('photos')
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
          });

        if (error) {
          throw new Error(error.message);
        }

        return {
          filename: file.originalname,
          url: `https://gqqmtbzujcqmzdpuiqoq.supabase.co/storage/v1/object/public/photos/${data.path}`,
        };
      }),
    );

    return await this.prisma.photoSession.create({
      data: {
        sessionId: dto.sessionId,

        results: {
          create: results,
        },
      },
      include: {
        results: true,
      },
    });
  }

  async findAll() {
    const data = await this.prisma.photoSession.findMany({
      include: { results: true },
    });

    return {
      data,
    };
  }

  async findOne(id: number) {
    const result = await this.prisma.photoSession.findUnique({
      where: { id },
      include: { results: true },
    });
    if (!result) {
      throw new NotFoundException(`Hasil foto dengan id ${id} tidak ditemukan`);
    }
    return result;
  }

  async remove(id: number) {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY,
    );

    const session = await this.prisma.photoSession.findUnique({
      where: { id },
      include: {
        results: true,
      },
    });

    if (!session) {
      throw new NotFoundException('Photo session not found');
    }

    const filePaths: string[] = session.results.map(
      (result) => `${session.sessionId}/${result.filename}`,
    );

    if (filePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from('photos')
        .remove(filePaths);

      if (storageError) {
        throw new BadRequestException(
          `Failed to delete photos: ${storageError.message}`,
        );
      }
    }

    return this.prisma.photoSession.delete({
      where: { id },
    });
  }
}
