import { Module } from '@nestjs/common';
import { PhotoResultsController } from './photo-results.controller';
import { PhotoResultsService } from './photo-results.service';
import { PrismaService } from 'src/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot()],
  controllers: [PhotoResultsController],
  providers: [PhotoResultsService, PrismaService],
})
export class PhotoResultsModule {}
