import {
  Controller,
  UploadedFiles,
  UseInterceptors,
  Post,
  Body,
  Get,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { PhotoResultsService } from './photo-results.service';
import { CreatePhotoResultDto } from './dto/create-photo-result.dto';
import { memoryStorage } from 'multer';

@ApiTags('Photo Results')
@Controller('photo-results')
export class PhotoResultsController {
  constructor(private readonly service: PhotoResultsService) {}
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: 'File gambar hasil foto pengguna',
        },
        sessionId: {
          type: 'string',
          example: 'sesi-abc123',
        },
      },
      required: ['files'],
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 50, {
      storage: memoryStorage(),
    }),
  )
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: CreatePhotoResultDto,
  ) {
    return this.service.create(files, dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  c(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
