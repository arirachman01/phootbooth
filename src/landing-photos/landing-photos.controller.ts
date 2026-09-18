import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { LandingPhotosService } from './landing-photos.service';
import { CreateLandingPhotoDto } from './dto/create-landing-photo.dto';
import { UpdateLandingPhotoDto } from './dto/update-landing-photo.dto';
import { multerStorage, imageFileFilter } from '../utils/file-upload.util';

@ApiTags('Landing Photos')
@Controller('landing-photos')
export class LandingPhotosController {
  constructor(private readonly service: LandingPhotosService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        order: { type: 'number', example: 0 },
        isActive: { type: 'boolean', example: true },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multerStorage('landing'),
      fileFilter: imageFileFilter,
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateLandingPhotoDto,
  ) {
    return this.service.create(file, dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('active')
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLandingPhotoDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
