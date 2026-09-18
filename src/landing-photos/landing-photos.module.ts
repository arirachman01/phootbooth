import { Module } from '@nestjs/common';
import { LandingPhotosController } from './landing-photos.controller';
import { LandingPhotosService } from './landing-photos.service';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [LandingPhotosController],
  providers: [LandingPhotosService, PrismaService],
})
export class LandingPhotosModule {}
