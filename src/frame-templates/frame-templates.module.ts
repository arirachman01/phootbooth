import { Module } from '@nestjs/common';
import { FrameTemplatesController } from './frame-templates.controller';
import { FrameTemplatesService } from './frame-templates.service';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [FrameTemplatesController],
  providers: [FrameTemplatesService, PrismaService],
})
export class FrameTemplatesModule {}
